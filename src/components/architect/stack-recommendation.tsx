"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle, Layers } from "lucide-react";
import { updateProject } from "@/lib/db/projects";

interface StackRecommendationProps {
  projectId: string;
  description: string;
  onStackGenerated: (stack: any) => void;
  onNext: () => void;
}

export default function StackRecommendation({
  projectId,
  description,
  onStackGenerated,
  onNext,
}: StackRecommendationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [stack, setStack] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const generateStack = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      console.log("Sending request to /api/architect/recommend-stack");
      console.log("Description:", description);

      const response = await fetch("/api/architect/recommend-stack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          const textError = await response.text();
          console.error("Error response (text):", textError);
          throw new Error(`API Error (${response.status}): ${textError || "Unknown error"}`);
        }
        console.error("Error response:", errorData);
        throw new Error(errorData.error || `Failed to generate stack recommendation (${response.status})`);
      }

      const stackData = await response.json();
      console.log("Stack data received:", stackData);
      
      setStack(stackData);
      onStackGenerated(stackData);

      // Save to database
      await updateProject(projectId, { generated_stack: stackData });
    } catch (err) {
      console.error("Stack generation error:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    if (stack) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Tech Stack Recommendation</h2>
        <p className="text-muted-foreground">
          Let AI recommend the best technologies for your project
        </p>
      </div>

      {!stack && !isGenerating && (
        <Button onClick={generateStack} size="lg" className="w-full">
          <Layers className="w-4 h-4 mr-2" />
          Generate Stack Recommendation
        </Button>
      )}

      {isGenerating && (
        <Card className="p-8 text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-violet-600" />
          <p className="text-lg font-medium">Analyzing your project...</p>
          <p className="text-sm text-muted-foreground mt-2">
            This may take a few moments
          </p>
        </Card>
      )}

      {error && (
        <Card className="p-4 border-red-200 bg-red-50 dark:bg-red-900/20">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </Card>
      )}

      {stack && (
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold">
                Recommended Tech Stack
              </h3>
            </div>

            <div className="grid gap-4">
              {stack.frontend && (
                <StackItem
                  title="Frontend"
                  name={stack.frontend.name}
                  reason={stack.frontend.reason}
                />
              )}
              {stack.backend && (
                <StackItem
                  title="Backend"
                  name={stack.backend.name}
                  reason={stack.backend.reason}
                />
              )}
              {stack.database && (
                <StackItem
                  title="Database"
                  name={stack.database.name}
                  reason={stack.database.reason}
                />
              )}
              {stack.authentication && (
                <StackItem
                  title="Authentication"
                  name={stack.authentication.name}
                  reason={stack.authentication.reason}
                />
              )}
              {stack.hosting && (
                <StackItem
                  title="Hosting"
                  name={stack.hosting.name}
                  reason={stack.hosting.reason}
                />
              )}
              {stack.additional &&
                stack.additional.map((item: any, i: number) => (
                  <StackItem
                    key={i}
                    title={item.category}
                    name={item.name}
                    reason={item.reason}
                  />
                ))}
            </div>
          </Card>

          <Button onClick={handleNext} size="lg" className="w-full">
            Continue to Specification
          </Button>
        </div>
      )}
    </div>
  );
}

function StackItem({
  title,
  name,
  reason,
}: {
  title: string;
  name: string;
  reason: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          {title}
        </span>
        <span className="font-semibold text-violet-600">{name}</span>
      </div>
      <p className="text-sm text-muted-foreground">{reason}</p>
    </div>
  );
}
