import { NextResponse } from "next/server";
import ApiError from "@/classes/api-error";
import { networkMessage } from "@/constants";
import { createClient } from "@/utils/supabase/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password || password.trim() === "") {
      return NextResponse.json(
        ApiError.fromError(412, "Password is required"),
        { status: 412 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({ password: password });

    if (error) {
      console.error(error.message);
      return NextResponse.json(ApiError.fromError(500, error.message), {
        status: 500,
      });
    }

    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json(ApiError.fromError(500, networkMessage), {
      status: 500,
    });
  }
}
