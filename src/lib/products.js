import { createClient } from "@/lib/supabaseClient";

export async function getProducts({ category = "" } = {}) {
  const supabase = createClient();
  let query = supabase.from("products").select("*").order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getCategories() {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select("category");
  if (error) throw error;
  return [...new Set(data.map((p) => p.category))];
}