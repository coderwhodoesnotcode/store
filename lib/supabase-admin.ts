import { createClient } from "@supabase/supabase-js"

// Server-only client — uses the service role key, which bypasses RLS.
// NEVER import this file into a "use client" component.
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)