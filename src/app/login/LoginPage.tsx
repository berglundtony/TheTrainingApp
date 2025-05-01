"use client";

import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import Login from "../components/login/Login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(true);
    // const [session, setSession] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const supabase = createPagesBrowserClient();
        const checkSession = async () => {
        const { data } = await supabase.auth.getSession();
            if (data.session) {
                router.push("/create-workout");
            } else {
                setIsLoading(false);
            }
        };

        checkSession();

    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
            router.push("/");
        }
    });
        return () => subscription.unsubscribe();
    }, [router]);

    if (isLoading) return <p>Laddar...</p>;

    return (
        <Login onLoginSuccess={() => router.push("/")} />
    );
}