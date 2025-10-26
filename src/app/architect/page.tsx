"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { createProject } from "@/lib/db/projects";
import StackRecommendation from "@/components/architect/stack-recommendation";
import SpecGenerator from "@/components/architect/spec-generator";
import Navigation from "@/components/navigation";

export default function ArchitectPage() {
  const [step, setStep] = useState<"input" | "stack" | "spec">("input");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState<string | null>(null);
  const [stack, setStack] = useState<any>(null);
  const [spec, setSpec] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);

  const handleStartProject = async () => {
    if (!projectName.trim() || !description.trim()) return;

    setIsCreating(true);
    try {
      const project = await createProject({
        name: projectName,
        description,
      });
      setProjectId(project.id);
      setStep("stack");
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleStackGenerated = (generatedStack: any) => {
    setStack(generatedStack);
  };

  const handleSpecGenerated = (generatedSpec: string) => {
    setSpec(generatedSpec);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold">
              AI Project Architect
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Transform your idea into a complete project in minutes
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {["input", "stack", "spec"].map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step === s
                      ? "bg-violet-600 text-white"
                      : ["input", "stack", "spec"].indexOf(step) >
                        ["input", "stack", "spec"].indexOf(s)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i + 1}
                </div>
                {i < 2 && (
                  <div className="w-12 h-0.5 bg-gray-200 dark:bg-gray-700" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <Card className="p-6">
          {step === "input" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Describe Your Project
                </h2>
                <p className="text-muted-foreground">
                  Tell us about your project idea and we&apos;ll help you build
                  it
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Name
                  </label>
                  <Input
                    placeholder="e.g., Task Manager Pro"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Description
                  </label>
                  <Textarea
                    placeholder="Describe your project in detail. What problem does it solve? Who is it for? What features do you need?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={8}
                  />
                </div>

                <Button
                  onClick={handleStartProject}
                  disabled={
                    !projectName.trim() || !description.trim() || isCreating
                  }
                  className="w-full"
                  size="lg"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Project...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Start Building
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === "stack" && projectId && (
            <StackRecommendation
              projectId={projectId}
              description={description}
              onStackGenerated={handleStackGenerated}
              onNext={() => setStep("spec")}
            />
          )}

          {step === "spec" && projectId && (
            <SpecGenerator
              projectId={projectId}
              description={description}
              stack={stack}
              onSpecGenerated={handleSpecGenerated}
              onBack={() => setStep("stack")}
            />
          )}
        </Card>
      </div>
    </div>
    </>
  );
}
