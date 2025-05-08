"use client";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@/lib/supabase/client";
import { Session } from "@supabase/auth-helpers-react";

export function SupabaseProvider({
    children,
    initialSession,
}: {
    children: React.ReactNode;
    initialSession: Session | null;
}) {
    const supabase = createClient();

    return (
        <SessionContextProvider supabaseClient={supabase} initialSession={initialSession}>
            {children}
        </SessionContextProvider>
    );
}