"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, FileText, Download, Edit } from "lucide-react";
import { updateProject } from "@/lib/db/projects";

interface TechItem {
  name: string;
  reason: string;
}

interface AdditionalItem extends TechItem {
  category: string;
}

interface StackData {
  frontend?: TechItem;
  backend?: TechItem;
  database?: TechItem;
  authentication?: TechItem;
  hosting?: TechItem;
  additional?: AdditionalItem[];
}

interface SpecGeneratorProps {
  projectId: string;
  description: string;
  stack: StackData;
  onBack: () => void;
}

export default function SpecGenerator({
  projectId,
  description,
  stack,
  onBack,
}: SpecGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [spec, setSpec] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSpec = async () => {
    setIsGenerating(true);
    setError(null);
    setSpec("");

    try {
      console.log("Starting spec generation...");
      const response = await fetch("/api/architect/generate-spec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, stack }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate specification");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      let fullSpec = "";
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        // AI SDK v5 streams plain text directly
        fullSpec += chunk;
        setSpec(fullSpec);
      }

      console.log("Spec generation complete, length:", fullSpec.length);
      await updateProject(projectId, { generated_spec: fullSpec });
    } catch (err) {
      console.error("Spec generation error:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadSpec = () => {
    const blob = new Blob([spec], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "techspec.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    await updateProject(projectId, { generated_spec: spec });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Technical Specification</h2>
          <p className="text-muted-foreground">
            Generate a comprehensive technical document
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>

      {!spec && !isGenerating && (
        <Button onClick={generateSpec} size="lg" className="w-full">
          <FileText className="w-4 h-4 mr-2" />
          Generate Technical Specification
        </Button>
      )}

      {isGenerating && (
        <Card className="p-8">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-violet-600" />
          <p className="text-lg font-medium text-center">
            Generating specification...
          </p>
          {spec && (
            <div className="mt-4 max-h-96 overflow-y-auto">
              <pre className="text-xs whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-4 rounded">
                {spec}
              </pre>
            </div>
          )}
        </Card>
      )}

      {error && (
        <Card className="p-4 border-red-200 bg-red-50 dark:bg-red-900/20">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </Card>
      )}

      {spec && !isGenerating && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Preview" : "Edit"}
            </Button>
            <Button variant="outline" onClick={downloadSpec} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={spec}
                onChange={(e) => setSpec(e.target.value)}
                rows={20}
                className="font-mono text-sm"
              />
              <Button onClick={handleSave} className="w-full">
                Save Changes
              </Button>
            </div>
          ) : (
            <Card className="p-6 max-h-[600px] overflow-y-auto">
              <div className="prose dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm">{spec}</pre>
              </div>
            </Card>
          )}

          <div className="space-y-3">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <h4 className="font-semibold mb-2 text-sm">
                ✅ Specification Complete!
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Your technical specification is ready. Now you can:
              </p>
              <div className="space-y-2">
                <a href="/templates" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    📦 Browse Templates
                  </Button>
                </a>
                <Link href="/projects" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    📁 View My Projects
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => (window.location.href = "/architect")}
                >
                  🆕 Start New Project
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
