import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // You can add custom logic here later if needed
      // return NextResponse.next()


  },
  {
    pages: {
      signIn: "/login",
      error: "/login?error=1",
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*"],
}
