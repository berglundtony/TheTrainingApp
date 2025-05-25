"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Workout } from "./types"; 

export async function createServerClient() {
    const cookieStore = cookies();
    return createServerComponentClient<Workout>({
        cookies: () => cookieStore,
    });
}