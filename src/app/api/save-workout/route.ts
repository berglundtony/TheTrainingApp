// app/api/save-workout/route.ts

import { createClient } from '../../utils/supabase/server'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { error } = await supabase
        .from("workouts")
        .insert({
            ...body,
            user_id: user.id,
        });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Workout saved!" }, { status: 200 });
}