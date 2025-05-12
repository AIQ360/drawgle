// This file is deprecated - use lib/supabase/server.ts instead
import { createClient as createClientFromLib } from "@/lib/supabase/server"

export async function createClient() {
  console.warn("utils/supabase/server.ts is deprecated - use lib/supabase/server.ts instead")
  return createClientFromLib()
}
