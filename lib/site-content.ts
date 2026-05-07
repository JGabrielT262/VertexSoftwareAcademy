import { createSupabaseServerClient } from "@/lib/supabase/server";

type Row = {
  key: string;
  value: unknown;
};

export async function getSiteContent<T>(key: string, fallback: T): Promise<T> {
  const hasEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  if (!hasEnv) return fallback;

  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("site_content")
      .select("key,value")
      .eq("key", key)
      .maybeSingle()
      .returns<Row | null>();

    if (!data?.value) return fallback;
    return data.value as T;
  } catch {
    return fallback;
  }
}
