"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@lib/supabase/database.types"; 

export async function createServerClient() {
    const cookieStore = cookies();
    return createServerComponentClient<Database>({
        cookies: () => cookieStore,
    });
}