/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { networkMessage } from '@/constants'
import { createClient } from '@/utils/supabase/server';
import ApiError from '@/classes/api-error';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function POST(req: { json: () => any; }) {    
    try {
        const body = await req.json();
        const { email } = body;

        if (!email || email.trim() === '') {
            return NextResponse.json(ApiError.fromError(412, 'Email is required'), { status: 412 });
        }
        
        const supabase = await createClient();

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${baseUrl}/forgot-password-authentication`,
        })

        if (error) {
            return NextResponse.json(ApiError.fromError(500, error.message), { status: 500 });
        }

        return NextResponse.json({ status: 200 });

    } catch {
        return NextResponse.json(ApiError.fromError(500, networkMessage), { status: 500 });
    }
}