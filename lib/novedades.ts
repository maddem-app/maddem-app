import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export function getNovedadImageUrl(path: string | null) {
  if (!path) {
    return null;
  }

  const { data } = supabase.storage
    .from("news-images")
    .getPublicUrl(path);

  return data.publicUrl;
}