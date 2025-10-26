import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { createGroq } from "@ai-sdk/groq";

// Initialize Groq
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

// AI Provider configuration
export type AIProvider = "openai" | "groq" | "anthropic";

export const AI_MODELS = {
  openai: {
    default: "gpt-4o",
    fast: "gpt-4o-mini",
    smart: "gpt-4o",
  },
  groq: {
    default: "llama-3.3-70b-versatile",
    fast: "llama-3.1-8b-instant",
    smart: "llama-3.3-70b-versatile",
  },
  anthropic: {
    default: "claude-3-5-sonnet-20241022",
    fast: "claude-3-5-haiku-20241022",
    smart: "claude-3-5-sonnet-20241022",
  },
} as const;

/**
 * Get the configured AI provider from environment variables
 */
export function getAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER?.toLowerCase() as AIProvider;

  // Validate provider and check if API key exists
  if (provider === "groq" && process.env.GROQ_API_KEY) {
    return "groq";
  }
  if (provider === "anthropic" && process.env.ANTHROPIC_API_KEY) {
    return "anthropic";
  }
  if (provider === "openai" && process.env.OPENAI_API_KEY) {
    return "openai";
  }

  // Fallback: check which API keys are available
  if (process.env.GROQ_API_KEY) return "groq";
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";

  // Default to OpenAI if nothing is configured
  return "openai";
}

/**
 * Get the AI model instance based on provider and model type
 */
export function getAIModel(modelType: "default" | "fast" | "smart" = "default"): any {
  const provider = getAIProvider();
  const modelName = AI_MODELS[provider][modelType];

  switch (provider) {
    case "groq":
      return groq(modelName);
    case "anthropic":
      return anthropic(modelName);
    case "openai":
    default:
      return openai(modelName);
  }
}

/**
 * Get provider display name
 */
export function getProviderName(): string {
  const provider = getAIProvider();
  switch (provider) {
    case "groq":
      return "Groq (Llama 3.3 70B)";
    case "anthropic":
      return "Anthropic (Claude)";
    case "openai":
    default:
      return "OpenAI (GPT-4o)";
  }
}

/**
 * Check if AI provider is properly configured
 */
export function isAIConfigured(): boolean {
  const provider = getAIProvider();
  switch (provider) {
    case "groq":
      return !!process.env.GROQ_API_KEY;
    case "anthropic":
      return !!process.env.ANTHROPIC_API_KEY;
    case "openai":
      return !!process.env.OPENAI_API_KEY;
    default:
      return false;
  }
}
