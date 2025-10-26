"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getUserProjects, deleteProject } from "@/lib/db/projects";
import { Loader2, Plus, Trash2, FileText, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Navigation from "@/components/navigation";

type Project = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getUserProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeletingId(id);
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Projects</h1>
            <p className="text-muted-foreground">
              View and manage your AI-generated projects
            </p>
          </div>
          <Link href="/architect">
            <Button size="lg">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <Card className="p-12 text-center">
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-violet-600" />
            <p className="text-muted-foreground">Loading projects...</p>
          </Card>
        ) : projects.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first AI-powered project to get started
            </p>
            <Link href="/architect">
              <Button size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {project.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    disabled={deletingId === project.id}
                  >
                    {deletingId === project.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 text-red-500" />
                    )}
                  </Button>
                </div>

                {project.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>
                )}

                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDistanceToNow(new Date(project.created_at), {
                    addSuffix: true,
                  })}
                </div>

                <Link href={`/projects/${project.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
