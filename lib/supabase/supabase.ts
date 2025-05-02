
// import { createClient } from '@supabase/supabase-js';
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

import { createPagesBrowserClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export const supabase = createPagesBrowserClient();

export const createClientBrowser = () =>
    createPagesBrowserClient();
export { createServerComponentClient };
