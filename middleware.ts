import { NextResponse } from "next/server";

// Définir les pages protégées et celles qui doivent être redirigées
interface MiddlewareRequest {
  nextUrl: {
    pathname: string;
  };
  cookies: {
    get: (name: string) => string | undefined;
  };
  url: string;
}

export function middleware(req: MiddlewareRequest): Response {
  const { pathname } = req.nextUrl;

  // Si l'utilisateur est connecté, redirige vers /Home
  if (pathname === "/Login" || pathname === "/Home") {
    // Vérification de la session
    const session = req.cookies.get("next-auth.session-token");

    // Si l'utilisateur est authentifié et tente d'accéder à la page de login, le rediriger vers /Home
    if (session) {
      if (pathname === "/Login") {
        return Response.redirect(new URL("/Home", req.url));
      }
    } else {
      // Si l'utilisateur n'est pas authentifié et tente d'accéder à /Home, le rediriger vers /Login
      if (pathname === "/Home") {
        return Response.redirect(new URL("/Login", req.url));
      }
    }
  }
  return NextResponse.next(); // Continuer le processus si aucune redirection n'est nécessaire
}

export const config = {
  matcher: ["/Login", "/Home"], // Les pages à matcher
};
