/**
 * Template Repository System
 * Uses pre-built, tested starter kits from GitHub repositories
 */

export interface TemplateRepo {
  name: string;
  description: string;
  repoUrl: string;
  branch?: string;
  tags: string[];
  features: string[];
}

/**
 * Official template repositories
 * These are high-quality, tested starter kits
 */
export const TEMPLATE_REPOSITORIES: Record<string, TemplateRepo> = {
  // ===== NEXT.JS TEMPLATES =====
  "nextjs-basic": {
    name: "CodeGuide Starter Pro",
    description: "A modern web application starter template built with Next.js 14, featuring authentication, database integration, and payment processing capabilities.",
    repoUrl: "https://github.com/CodeGuide-dev/codeguide-starter-pro",
    tags: ["nextjs", "clerk", "supabase", "tailwindcss", "stripe", "shadcn/ui"],
    features: ["App Router", "Supabase DB", "Stripe Payments"],
  },
  "nextjs-clerk-supabase": {
    name: "CodeGuide Starter Lite",
    description: "A modern web application starter template built with Next.js 15, featuring authentication, database integration, AI capabilities, and dark mode support.",
    repoUrl: "https://github.com/CodeGuide-dev/codeguide-starter-lite",
    tags: ["nextjs", "typescript", "clerk", "supabase", "tailwindCSS", "shadcn/ui", "Vercel AI SDK", "next-themes"],
    features: ["App Router", "Dark mode ", "AI Chat Interface"],
  },
  "nextjs-prisma": {
    name: "CodeGuide Starter Fullstack",
    description: "A modern web application starter template built with Next.js 15, featuring authentication, database integration, and dark mode support.",
    repoUrl: "https://github.com/CodeGuide-dev/codeguide-starter-fullstack",
    tags: ["nextjs", "typescript", "betterauth", "drizzleorm", "tailwindcss", "shadcn/ui", "next-themes", "lucidereact"],
    features: ["Authentication with BetterAuth", "PostgreSQL with Drizzle ORM", "App Router", "Dark Mode"],
  },

  // ===== REACT TEMPLATES =====
  "react-vite-basic": {
    name: "CodeGuide Vite Supabase",
    description: "A modern web application starter template built with Vite and React, featuring a beautiful UI and Supabase integration.",
    repoUrl: "https://github.com/CodeGuide-dev/codeguide-vite-supabase",
    tags: ["vite + react", "supabase", "tailwindcss", "shadcn/ui", "tanstackquery", "reacthookform", "framermotion", "zod"],
    features: ["Supabase DB", "Data Fetching with TanStack Query", "Beautiful Animations with Framer Motion"],
  },
  "react-vite-tailwind": {
    name: "React + Vite + Tailwind",
    description: "React with Vite, TypeScript, and Tailwind CSS",
    repoUrl: "https://github.com/jonasschmedtmann/react-vite-tailwind-starter",
    tags: ["react", "vite", "tailwindcss", "typescript"],
    features: ["Vite", "Tailwind CSS", "TypeScript", "ESLint"],
  },

  // ===== VUE TEMPLATES =====
  "vue-vite-basic": {
    name: "Vue 3 + Vite",
    description: "Vue 3 with Vite and TypeScript",
    repoUrl: "https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts",
    tags: ["vue", "vite", "typescript"],
    features: ["Vue 3", "Composition API", "Vite", "TypeScript"],
  },

  // ===== EXPRESS TEMPLATES =====
  "express-typescript": {
    name: "Express + TypeScript",
    description: "Express.js backend with TypeScript",
    repoUrl: "https://github.com/microsoft/TypeScript-Node-Starter",
    tags: ["express", "typescript", "nodejs"],
    features: ["Express", "TypeScript", "MongoDB", "Passport.js"],
  },
  "express-prisma": {
    name: "Express + Prisma",
    description: "Express.js with Prisma ORM",
    repoUrl: "https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express",
    tags: ["express", "prisma", "postgresql", "typescript"],
    features: ["Express", "Prisma", "PostgreSQL", "REST API"],
  },

  // ===== FULL-STACK TEMPLATES =====
  "t3-stack": {
    name: "T3 Stack",
    description: "The best way to start a full-stack, typesafe Next.js app",
    repoUrl: "https://github.com/t3-oss/create-t3-app",
    tags: ["nextjs", "typescript", "prisma", "trpc"],
    features: ["Next.js", "tRPC", "Prisma", "NextAuth", "Tailwind"],
  },
  "mern-stack": {
    name: "MERN Stack",
    description: "MongoDB, Express, React, Node.js full-stack",
    repoUrl: "https://github.com/amazingandyyy/mern-stack-example",
    tags: ["react", "express", "mongodb", "nodejs"],
    features: ["React", "Express", "MongoDB", "Node.js"],
  },
};

/**
 * Match template repository based on tech stack
 */
export function matchTemplateRepo(stack: any): TemplateRepo | null {
  const frontend = stack.frontend?.name?.toLowerCase() || "";
  const backend = stack.backend?.name?.toLowerCase() || "";
  const database = stack.database?.name?.toLowerCase() || "";
  const auth = stack.authentication?.name?.toLowerCase() || "";

  // Next.js combinations
  if (frontend.includes("next")) {
    if (auth.includes("clerk") && database.includes("supabase")) {
      return TEMPLATE_REPOSITORIES["nextjs-clerk-supabase"];
    }
    if (database.includes("postgres") && !auth) {
      return TEMPLATE_REPOSITORIES["nextjs-prisma"];
    }
    return TEMPLATE_REPOSITORIES["nextjs-basic"];
  }

  // React combinations
  if (frontend.includes("react") && !frontend.includes("next")) {
    if (backend.includes("express") && database.includes("mongo")) {
      return TEMPLATE_REPOSITORIES["mern-stack"];
    }
    return TEMPLATE_REPOSITORIES["react-vite-tailwind"];
  }

  // Vue
  if (frontend.includes("vue")) {
    return TEMPLATE_REPOSITORIES["vue-vite-basic"];
  }

  // Express backend
  if (backend.includes("express")) {
    if (database.includes("postgres")) {
      return TEMPLATE_REPOSITORIES["express-prisma"];
    }
    return TEMPLATE_REPOSITORIES["express-typescript"];
  }

  // T3 Stack (special case)
  if (
    frontend.includes("next") &&
    database.includes("postgres") &&
    backend.includes("trpc")
  ) {
    return TEMPLATE_REPOSITORIES["t3-stack"];
  }

  return null;
}

/**
 * Get all available templates
 */
export function getAllTemplates(): TemplateRepo[] {
  return Object.values(TEMPLATE_REPOSITORIES);
}

/**
 * Search templates by tags
 */
export function searchTemplatesByTags(tags: string[]): TemplateRepo[] {
  return getAllTemplates().filter((template) =>
    tags.some((tag) => template.tags.includes(tag.toLowerCase()))
  );
}

/**
 * Get template by name
 */
export function getTemplateByName(name: string): TemplateRepo | null {
  return TEMPLATE_REPOSITORIES[name] || null;
}

/**
 * Clone template repository (for server-side use)
 */
export async function cloneTemplate(
  template: TemplateRepo,
  targetPath: string
): Promise<void> {
  // This would use git clone or download zip
  // Implementation depends on your deployment environment
  throw new Error("Not implemented - use downloadTemplateZip instead");
}

/**
 * Download template as zip from GitHub
 */
export async function downloadTemplateZip(
  template: TemplateRepo
): Promise<Blob> {
  const branch = template.branch || "main";
  
  // Extract owner and repo from URL
  const urlParts = template.repoUrl.split("/");
  const owner = urlParts[3];
  const repo = urlParts[4];
  
  // GitHub API to download zip
  const zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.zip`;
  
  const response = await fetch(zipUrl);
  if (!response.ok) {
    throw new Error(`Failed to download template: ${response.statusText}`);
  }
  
  return await response.blob();
}

/**
 * Get recommended templates for a stack
 */
export function getRecommendedTemplates(stack: any): TemplateRepo[] {
  const matched = matchTemplateRepo(stack);
  if (matched) {
    return [matched];
  }

  // Return similar templates
  const frontend = stack.frontend?.name?.toLowerCase() || "";
  const tags: string[] = [];

  if (frontend.includes("next")) tags.push("nextjs");
  if (frontend.includes("react")) tags.push("react");
  if (frontend.includes("vue")) tags.push("vue");

  return searchTemplatesByTags(tags).slice(0, 3);
}
