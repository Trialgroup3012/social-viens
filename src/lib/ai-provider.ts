/**
 * AI Provider abstraction layer for Social Viens.
 *
 * Reads provider configuration from the database (admin-configurable via
 * /admin/settings) and routes chat-completion requests to the selected
 * provider: OpenAI, Google Gemini, or (sandbox-only fallback) Z.AI SDK.
 *
 * This makes the chatbot deployment-portable: the admin simply pastes an
 * API key in the admin panel — no code changes or env redeploy needed.
 */

import { db } from "@/lib/db";
import { decryptSetting } from "@/lib/secure-settings";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export type AIProvider = "openai" | "gemini" | "zai" | "none";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIProviderConfig {
  provider: AIProvider;
  apiKey: string;
  model: string;
}

export interface ChatCompletionResult {
  content: string;
  provider: AIProvider;
  model: string;
  error?: string;
}

/* ------------------------------------------------------------------ */
/* Cached settings (in-process, 30s TTL)                              */
/* ------------------------------------------------------------------ */

let cachedConfig: { data: AIProviderConfig | null; ts: number } = {
  data: null,
  ts: 0,
};
const CACHE_TTL_MS = 30_000; // 30 seconds

export function refreshAIProviderConfig(): void {
  cachedConfig = { data: null, ts: 0 };
}

/* ------------------------------------------------------------------ */
/* Config loader (DB → env → none)                                    */
/* ------------------------------------------------------------------ */

/**
 * Load the active AI provider config. Priority:
 *   1. DB SiteSetting (admin-controlled):
 *        - ai_provider       : "openai" | "gemini" | "zai"
 *        - ai_api_key        : the provider API key
 *        - ai_model          : model name (e.g. "gpt-4o-mini", "gemini-1.5-flash")
 *   2. Environment variables (fallback for initial bootstrap):
 *        - OPENAI_API_KEY / GEMINI_API_KEY / ZAI_API_KEY
 *   3. "none" — no provider configured
 */
export async function getAIProviderConfig(): Promise<AIProviderConfig> {
  // Cache hit?
  if (cachedConfig.data && Date.now() - cachedConfig.ts < CACHE_TTL_MS) {
    return cachedConfig.data;
  }

  let provider: AIProvider = "none";
  let apiKey = "";
  let model = "";

  // 1. Try DB settings
  try {
    const rows = await db.siteSetting.findMany({
      where: {
        key: { in: ["ai_provider", "ai_api_key", "ai_model"] },
      },
    });
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = decryptSetting(r.value);

    if (map.ai_provider && ["openai", "gemini", "zai"].includes(map.ai_provider)) {
      provider = map.ai_provider as AIProvider;
      apiKey = map.ai_api_key || "";
      model = map.ai_model || "";
    }
  } catch (err) {
    console.error("[ai-provider] Failed to read AI settings from DB:", err);
  }

  // 2. Env fallback (only if DB didn't yield a usable config)
  if (provider === "none" || !apiKey) {
    if (process.env.OPENAI_API_KEY) {
      provider = "openai";
      apiKey = process.env.OPENAI_API_KEY;
      model = model || "gpt-4o-mini";
    } else if (process.env.GEMINI_API_KEY) {
      provider = "gemini";
      apiKey = process.env.GEMINI_API_KEY;
      model = model || "gemini-1.5-flash";
    } else if (process.env.ZAI_API_KEY) {
      provider = "zai";
      apiKey = process.env.ZAI_API_KEY;
    }
  }

  // Default model per provider if still empty
  if (!model) {
    if (provider === "openai") model = "gpt-4o-mini";
    else if (provider === "gemini") model = "gemini-1.5-flash";
  }

  const config: AIProviderConfig = { provider, apiKey, model };

  // Cache for 30s
  cachedConfig = { data: config, ts: Date.now() };

  return config;
}

/* ------------------------------------------------------------------ */
/* Public API: chat completion                                        */
/* ------------------------------------------------------------------ */

/**
 * Send a chat-completion request to the configured AI provider.
 *
 * @param messages - Array of { role, content } messages, oldest first.
 *                   The first message should typically be a system prompt.
 * @returns The assistant's text response + provider metadata.
 */
export async function createChatCompletion(
  messages: ChatMessage[]
): Promise<ChatCompletionResult> {
  const config = await getAIProviderConfig();

  if (config.provider === "none" || !config.apiKey) {
    return {
      content:
        "I'm not fully configured yet. Please contact us directly at +91 81780 04800 or socialviens@gmail.com — we'd love to help!",
      provider: "none",
      model: "",
      error: "No AI provider configured",
    };
  }

  try {
    switch (config.provider) {
      case "openai":
        return await callOpenAI(config, messages);
      case "gemini":
        return await callGemini(config, messages);
      case "zai":
        return await callZAI(config, messages);
      default:
        return {
          content: "AI provider not supported.",
          provider: "none",
          model: "",
          error: `Unsupported provider: ${config.provider}`,
        };
    }
  } catch (err) {
    console.error(`[ai-provider] ${config.provider} call failed:`, err);
    return {
      content:
        "I'm having trouble connecting right now. Please reach us directly at +91 81780 04800 or socialviens@gmail.com — we'd love to help!",
      provider: config.provider,
      model: config.model,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/* ------------------------------------------------------------------ */
/* Provider implementations                                           */
/* ------------------------------------------------------------------ */

async function callOpenAI(
  config: AIProviderConfig,
  messages: ChatMessage[]
): Promise<ChatCompletionResult> {
  // Dynamic import so the package isn't loaded unless needed
  const { default: OpenAI } = await import("openai");

  const client = new OpenAI({ apiKey: config.apiKey });

  const completion = await client.chat.completions.create({
    model: config.model || "gpt-4o-mini",
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
    temperature: 0.7,
    max_tokens: 600,
  });

  const content =
    completion.choices[0]?.message?.content?.trim() ||
    "I apologize, I couldn't generate a response. Please try again.";

  return { content, provider: "openai", model: config.model };
}

async function callGemini(
  config: AIProviderConfig,
  messages: ChatMessage[]
): Promise<ChatCompletionResult> {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");

  const genAI = new GoogleGenerativeAI(config.apiKey);
  const model = genAI.getGenerativeModel({
    model: config.model || "gemini-1.5-flash",
    // Gemini supports a "system instruction" separately from contents.
    systemInstruction:
      messages.find((m) => m.role === "system")?.content || undefined,
  });

  // Convert the OpenAI-style messages to Gemini's "contents" format.
  // Gemini only accepts "user" and "model" roles; system is handled above.
  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  const result = await model.generateContent({ contents });
  const content =
    result.response.text()?.trim() ||
    "I apologize, I couldn't generate a response. Please try again.";

  return { content, provider: "gemini", model: config.model };
}

/**
 * Z.AI SDK fallback — only works inside this sandbox environment.
 * Used when no OpenAI/Gemini key is configured AND ZAI_API_KEY is in env.
 */
async function callZAI(
  _config: AIProviderConfig,
  messages: ChatMessage[]
): Promise<ChatCompletionResult> {
  const ZAI = (await import("z-ai-web-dev-sdk")).default;

  let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }

  const completion = await zaiInstance.chat.completions.create({
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
    thinking: { type: "disabled" },
  });

  const content =
    completion.choices[0]?.message?.content?.trim() ||
    "I apologize, I couldn't generate a response. Please try again.";

  return { content, provider: "zai", model: "zai-default" };
}
