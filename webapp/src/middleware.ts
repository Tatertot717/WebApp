import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;

  //console.log(`${method} ${pathname} Authenticated? ${isAuthenticated}`);

  //handle GET request to /api/polls as public
  if (pathname === "/api/polls" && method === "GET") {
    return NextResponse.next();
  }

  //block everything else defined in matcher if not authenticated
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}


//will need to add more later
export const config = {
  matcher: [
    "/api/polls",
  ],
};
//api/polls/vote route is not here because it changes based on the poll option itself, the create page and poll page itself also handles
//redirecting and gives a splash so it's not in here. The route for the create page is blocked above, as its the POST in /api/polls