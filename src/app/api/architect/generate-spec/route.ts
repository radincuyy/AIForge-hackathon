import { streamText } from "ai";
import { auth } from "@clerk/nextjs/server";
import { PROMPT_GENERATE_TECHSPEC } from "@/lib/prompts";
import { getAIModel, isAIConfigured } from "@/lib/ai-provider";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!isAIConfigured()) {
    return new Response(
      JSON.stringify({
        error: "AI provider not configured. Please add an API key.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { description, stack } = await req.json();

    if (!description) {
      return new Response(
        JSON.stringify({ error: "Project description is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const stackInfo = stack
      ? `\n\nRecommended Tech Stack:\n${JSON.stringify(stack, null, 2)}`
      : "";

    const result = streamText({
      model: getAIModel("smart"),
      messages: [
        { role: "system", content: PROMPT_GENERATE_TECHSPEC },
        {
          role: "user",
          content: `Project Description: ${description}${stackInfo}`,
        },
      ],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Spec generation error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate technical specification",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
