import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import UpdateForm from "./update-form";

export default async function UpdatePassword() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main>
      <UpdateForm />
    </main>
  );
}
