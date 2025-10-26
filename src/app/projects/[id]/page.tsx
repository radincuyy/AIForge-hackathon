"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProject } from "@/lib/db/projects";
import { Loader2, ArrowLeft, Download, Layers, FileText } from "lucide-react";
import Navigation from "@/components/navigation";

type Project = {
  id: string;
  name: string;
  description: string | null;
  generated_spec: string | null;
  generated_stack: Record<string, any> | null;
  created_at: string;
  updated_at: string;
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [params.id]);

  const loadProject = async () => {
    try {
      const data = await getProject(params.id as string);
      setProject(data);
    } catch (error) {
      console.error("Failed to load project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSpec = () => {
    if (!project?.generated_spec) return;

    const blob = new Blob([project.generated_spec], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.name}-techspec.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-violet-600" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The project you&apos;re looking for doesn&apos;t exist or you
            don&apos;t have access to it.
          </p>
          <Button onClick={() => router.push("/projects")}>
            Back to Projects
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => router.push("/projects")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
          {project.description && (
            <p className="text-lg text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>

        <Tabs defaultValue="stack" className="space-y-6">
          <TabsList>
            <TabsTrigger value="stack">
              <Layers className="w-4 h-4 mr-2" />
              Tech Stack
            </TabsTrigger>
            <TabsTrigger value="spec">
              <FileText className="w-4 h-4 mr-2" />
              Specification
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stack">
            {project.generated_stack ? (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Recommended Tech Stack
                </h2>
                <div className="grid gap-4">
                  {Object.entries(project.generated_stack).map(
                    ([key, value]: [string, any]) => {
                      if (key === "additional" && Array.isArray(value)) {
                        return value.map((item: any, i: number) => (
                          <StackItem
                            key={`${key}-${i}`}
                            title={item.category}
                            name={item.name}
                            reason={item.reason}
                          />
                        ));
                      }
                      if (typeof value === "object" && value.name) {
                        return (
                          <StackItem
                            key={key}
                            title={
                              key.charAt(0).toUpperCase() + key.slice(1)
                            }
                            name={value.name}
                            reason={value.reason}
                          />
                        );
                      }
                      return null;
                    }
                  )}
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  No tech stack generated yet
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="spec">
            {project.generated_spec ? (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">
                    Technical Specification
                  </h2>
                  <Button onClick={downloadSpec} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm">
                    {project.generated_spec}
                  </pre>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  No specification generated yet
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </>
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
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
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
