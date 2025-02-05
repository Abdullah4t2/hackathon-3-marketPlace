import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
  // Check if the user is authenticated by verifying if `auth` contains a valid user
  if (!auth) {
    return Response.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/cart", "/checkout"], // Protects cart and checkout pages
};
