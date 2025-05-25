import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/login";
  let error2 = "";
  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    error2 = error?.message || "";

    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }
  // redirect the user to an error page with some instructions
  console.error("Error verifying OTP:", error2);
  redirect("/error");
}
