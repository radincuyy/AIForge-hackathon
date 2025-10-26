import { auth } from "@clerk/nextjs/server";
import { TemplateRepo } from "@/lib/template-repos";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { template, projectName } = await req.json();

    if (!template || !projectName) {
      return new Response(
        JSON.stringify({ error: "Template and project name are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const templateRepo = template as TemplateRepo;

    // Download template from GitHub
    const zipBlob = await downloadTemplateFromGitHub(templateRepo);

    return new Response(zipBlob, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${projectName}.zip"`,
      },
    });
  } catch (error) {
    console.error("Template download error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to download template",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

async function downloadTemplateFromGitHub(
  template: TemplateRepo
): Promise<Blob> {
  const branch = template.branch || "main";

  // Extract owner and repo from URL
  // URL format: https://github.com/owner/repo or https://github.com/owner/repo/tree/branch/path
  const urlParts = template.repoUrl.replace("https://github.com/", "").split("/");
  const owner = urlParts[0];
  const repo = urlParts[1];

  // GitHub API to download zip
  const zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.zip`;

  console.log("Downloading from:", zipUrl);

  const response = await fetch(zipUrl, {
    headers: {
      "User-Agent": "AI-Project-Architect",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to download from GitHub: ${response.status} ${response.statusText}`
    );
  }

  return await response.blob();
}
