/* ==========================================================================*/
// middleware.ts — Next.js middleware for authentication
/* ==========================================================================*/
// Purpose: Handle authentication middleware using Supabase session management
// Sections: Imports, Middleware, Configuration

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// Next.js Core ---
import { type NextRequest } from "next/server";

// Local Files ---
import { updateSession } from "@/db/supabase/middleware";

/* ==========================================================================*/
// Middleware Function
/* ==========================================================================*/

/**
 * middleware
 *
 * Next.js middleware function to handle authentication on each request.
 *
 * @param request - The Next.js request object
 * @returns Promise resolving to middleware response
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

/* ==========================================================================*/
// Configuration
/* ==========================================================================*/

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - auth (auth pages)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|login|auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
