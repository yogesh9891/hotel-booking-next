// import { withAuth } from "next-auth/middleware"
// export default withAuth(
//   function middleware (req) {
//   },
//   {
//     callbacks: {
//       authorized: ({ req, token }) => {
//         if (
//           req.nextUrl.pathname.startsWith('/protected') &&
//           token === null
//         ) {
//           return false
//         }
//         return true
//       }
//     }
//   }
// )

import { NextResponse, type NextRequest } from "next/server";

export async function middleware(
  request: NextRequest,
): Promise<NextResponse | undefined> {
  const requestHeaders = new Headers(request.headers);

  // to get pathname in generateMetadata , you need set "x-url here
  requestHeaders.set("x-url", request.url);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,  //  put your headers here
    },
  });
 
  

  return response;
}