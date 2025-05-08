"use client";

import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@/lib/supabase/client";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    const [supabaseClient] = useState(() => createClient());

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    );
}