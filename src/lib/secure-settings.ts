import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import { db } from "@/lib/db";
import { getAdminSessionSecret } from "@/lib/admin-auth";

const ENCRYPTED_PREFIX = "enc:v1:";
const SENSITIVE_SETTING_KEYS = new Set(["ai_api_key", "smtp_pass"]);

function getEncryptionKey() {
  return createHash("sha256")
    .update(`socialviens:settings:${getAdminSessionSecret()}`)
    .digest();
}

export function isSensitiveSetting(key: string) {
  return SENSITIVE_SETTING_KEYS.has(key);
}

export function encryptSetting(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${ENCRYPTED_PREFIX}${iv.toString("base64url")}.${tag.toString("base64url")}.${encrypted.toString("base64url")}`;
}

export function decryptSetting(value: string) {
  if (!value.startsWith(ENCRYPTED_PREFIX)) return value;
  const [ivValue, tagValue, encryptedValue] = value.slice(ENCRYPTED_PREFIX.length).split(".");
  if (!ivValue || !tagValue || !encryptedValue) throw new Error("Invalid encrypted setting");

  const decipher = createDecipheriv("aes-256-gcm", getEncryptionKey(), Buffer.from(ivValue, "base64url"));
  decipher.setAuthTag(Buffer.from(tagValue, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(encryptedValue, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

export async function getSettingValues(keys?: string[]) {
  const rows = await db.siteSetting.findMany({
    where: keys ? { key: { in: keys } } : undefined,
  });
  return Object.fromEntries(rows.map((row) => [row.key, decryptSetting(row.value)]));
}
