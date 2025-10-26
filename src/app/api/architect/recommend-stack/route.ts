import { generateText } from "ai";
import { auth } from "@clerk/nextjs/server";
import { PROMPT_RECOMMEND_STACK } from "@/lib/prompts";
import { getAIModel, isAIConfigured } from "@/lib/ai-provider";

export async function POST(req: Request) {
  console.log("[API] Stack recommendation request received");
  
  try {
    const { userId } = await auth();

    if (!userId) {
      console.log("[API] Unauthorized - no userId");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("[API] User authenticated:", userId);

    if (!isAIConfigured()) {
      console.log("[API] AI provider not configured");
      return new Response(
        JSON.stringify({
          error: "AI provider not configured. Please add an API key.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("[API] AI provider configured");

    const { description } = await req.json();
    console.log("[API] Description received:", description?.substring(0, 100));

    if (!description) {
      return new Response(
        JSON.stringify({ error: "Project description is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Generating stack recommendation for:", description);
    
    const result = await generateText({
      model: getAIModel("smart"),
      messages: [
        { role: "system", content: PROMPT_RECOMMEND_STACK },
        {
          role: "user",
          content: `Project Description: ${description}

Please analyze this project and return a JSON object with recommended technologies for frontend, backend, database, authentication, hosting, and any additional tools needed.`,
        },
      ],
    });

    console.log("Raw AI response:", result.text);
    console.log("Response length:", result.text.length);

    // Try to extract JSON from the response
    let stackRecommendation;
    try {
      // First, try to parse directly
      stackRecommendation = JSON.parse(result.text);
    } catch (parseError) {
      // If that fails, try to extract JSON from markdown code blocks
      const jsonMatch = result.text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        stackRecommendation = JSON.parse(jsonMatch[1]);
      } else {
        // Try to find JSON object in the text
        const jsonObjectMatch = result.text.match(/\{[\s\S]*\}/);
        if (jsonObjectMatch) {
          stackRecommendation = JSON.parse(jsonObjectMatch[0]);
        } else {
          throw new Error("Could not extract valid JSON from AI response");
        }
      }
    }

    return new Response(JSON.stringify(stackRecommendation), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[API] Stack recommendation error:", error);
    
    // Provide more detailed error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Failed to generate stack recommendation";
    
    const errorDetails = error instanceof Error 
      ? {
          message: error.message,
          stack: error.stack,
          name: error.name,
        }
      : { message: "Unknown error" };
    
    console.error("[API] Error details:", errorDetails);
    
    return new Response(
      JSON.stringify({
        error: errorMessage,
        details: errorDetails,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
