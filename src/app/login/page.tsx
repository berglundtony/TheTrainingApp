import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginPage from "./LoginPage";

export default async function LoginRoute() {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    console.log(session?.user?.id); 

    if (session) {
        redirect("/"); 
    }

    return <LoginPage />;
}


