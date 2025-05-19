// import { createClient } from "@/app/utils/supabase/middleware";
// or, if createClient is not exported from middleware, import from the correct path, e.g.:
import { createClient } from "@supabase/supabase-js";
// Make sure the path and export are correct according to your project structure.
import { NextRequest, NextResponse } from "next/server";

// Removed redundant interfaces MiddlewareRequest and MiddlewareResponse

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const res = NextResponse.next()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { session } } = await supabase.auth.getSession()

    const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/create-user'
    if (!session && !isAuthPage) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (session && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    return res;
}
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        ['/', '/login', '/create-user'],

    ],
};