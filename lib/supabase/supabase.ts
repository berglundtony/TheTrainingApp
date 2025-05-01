
// import { createClient } from '@supabase/supabase-js';
import { createPagesBrowserClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// lib/supabase/supabase.ts

// Klient-instans (för client-components)
export const supabase = createPagesBrowserClient();

// Server-fabrik (i dina server-components)


// import { Database } from '../../lib/supabase/types';


// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const createClientBrowser = () => createPagesBrowserClient();
// export const createClientServer = () =>
//     createServerComponentClient({ cookies: async () => cookies() });
export { createServerComponentClient };
