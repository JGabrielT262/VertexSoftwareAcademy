import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/admin", "/aula-virtual"] as const;
const AUTH_PAGES = ["/login", "/register"] as const;
const AULA_PREFIX = "/aula-virtual";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Global Redirects for Auth to Aula Virtual
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/aula-virtual/login", request.url));
  }
  if (pathname === "/register") {
    return NextResponse.redirect(new URL("/aula-virtual/register", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-vsa-pathname", pathname);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !anonKey) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  let response = NextResponse.next({ request: { headers: requestHeaders } });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({ request: { headers: requestHeaders } });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAulaAuth = pathname === "/aula-virtual/login" || pathname === "/aula-virtual/register";

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (isProtected && !user && !isAulaAuth) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname.startsWith(AULA_PREFIX) ? "/aula-virtual/login" : "/login";
    const next = request.nextUrl.pathname + request.nextUrl.search;
    redirectUrl.searchParams.set("next", next);
    return NextResponse.redirect(redirectUrl);
  }

  const isAuthPage = AUTH_PAGES.some((p) => pathname === p);
  if (isAuthPage && user) {
    const next = request.nextUrl.searchParams.get("next");
    if (next && next.startsWith("/")) {
      return NextResponse.redirect(new URL(next, request.url));
    }
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  if (isAulaAuth && user) {
    const next = request.nextUrl.searchParams.get("next");
    if (next && next.startsWith("/aula-virtual")) {
      return NextResponse.redirect(new URL(next, request.url));
    }
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/aula-virtual";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
