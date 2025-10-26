"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

type Project = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  generated_spec: string | null;
  generated_stack: Record<string, any> | null;
  created_at: string;
  updated_at: string;
};

async function getSupabaseClient() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  return { supabase, userId };
}

export async function createProject(data: {
  name: string;
  description: string;
}) {
  const { supabase, userId } = await getSupabaseClient();

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      user_id: userId,
      name: data.name,
      description: data.description,
    })
    .select()
    .single();

  if (error) throw error;
  return project as Project;
}

export async function updateProject(
  id: string,
  data: {
    name?: string;
    description?: string;
    generated_spec?: string;
    generated_stack?: Record<string, any>;
  }
) {
  const { supabase, userId } = await getSupabaseClient();

  const { data: project, error } = await supabase
    .from("projects")
    .update(data)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return project as Project;
}

export async function getProject(id: string) {
  const { supabase, userId } = await getSupabaseClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return project as Project;
}

export async function getUserProjects() {
  const { supabase, userId } = await getSupabaseClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return projects as Project[];
}

export async function deleteProject(id: string) {
  const { supabase, userId } = await getSupabaseClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw error;
  return { success: true };
}
