import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "sv_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const LEGACY_HASH_SALT = "sv$alt|";

type AdminIdentity = {
  id: string;
  email: string;
  role: string;
};

export type AdminSession = AdminIdentity & {
  exp: number;
};

function base64url(value: Buffer | string) {
  return Buffer.from(value).toString("base64url");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function hasAdminSessionSecret() {
  try {
    getAdminSessionSecret();
    return true;
  } catch {
    return false;
  }
}

export function getAdminSessionSecret() {
  const explicitSecret = process.env.ADMIN_SESSION_SECRET;
  if (explicitSecret && explicitSecret.length >= 32) return explicitSecret;

  // Legacy deployments already require DATABASE_URL. Its credential remains
  // server-only, giving this security migration a stable fallback without
  // locking the administrator out before the dedicated secret is configured.
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    return createHash("sha256")
      .update(`socialviens:admin-session:${databaseUrl}`)
      .digest("base64url");
  }
  throw new Error("Set ADMIN_SESSION_SECRET or DATABASE_URL before using admin sessions.");
}

function sign(payload: string) {
  return createHmac("sha256", getAdminSessionSecret()).update(payload).digest("base64url");
}

export function createAdminSession(user: AdminIdentity) {
  const payload = base64url(
    JSON.stringify({
      ...user,
      exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
      nonce: randomBytes(12).toString("base64url"),
    })
  );
  return `${payload}.${sign(payload)}`;
}

export function getAdminSession(request: NextRequest): AdminSession | null {
  try {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (!token) return null;

    const [payload, signature] = token.split(".");
    if (!payload || !signature || !safeEqual(signature, sign(payload))) return null;

    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;
    if (!parsed.id || !parsed.email || parsed.role !== "admin" || parsed.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function hashAdminPassword(password: string) {
  const salt = randomBytes(16).toString("base64url");
  const derived = scryptSync(password, salt, 64).toString("base64url");
  return `scrypt$${salt}$${derived}`;
}

export function verifyAdminPassword(password: string, storedHash: string | null) {
  if (!storedHash) return { valid: false, needsUpgrade: false };

  if (storedHash.startsWith("scrypt$")) {
    const [, salt, expected] = storedHash.split("$");
    if (!salt || !expected) return { valid: false, needsUpgrade: false };
    const actual = scryptSync(password, salt, 64).toString("base64url");
    return { valid: safeEqual(actual, expected), needsUpgrade: false };
  }

  const legacy = createHash("sha256").update(`${LEGACY_HASH_SALT}${password}`).digest("hex");
  return { valid: safeEqual(legacy, storedHash), needsUpgrade: safeEqual(legacy, storedHash) };
}

type RateLimitEntry = { attempts: number; resetAt: number };
const loginAttempts = new Map<string, RateLimitEntry>();

export function canAttemptAdminLogin(identifier: string) {
  const now = Date.now();
  const current = loginAttempts.get(identifier);
  if (!current || current.resetAt <= now) {
    loginAttempts.set(identifier, { attempts: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }
  current.attempts += 1;
  loginAttempts.set(identifier, current);
  return current.attempts <= 10;
}

export function clearAdminLoginAttempts(identifier: string) {
  loginAttempts.delete(identifier);
}

export const adminSessionMaxAge = SESSION_TTL_SECONDS;
