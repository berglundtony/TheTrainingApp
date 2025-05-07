import { createClient } from '@supabase/supabase-js';
import { Workout } from '@/lib/supabase/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL och/eller nyckel saknas i miljövariablerna');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

