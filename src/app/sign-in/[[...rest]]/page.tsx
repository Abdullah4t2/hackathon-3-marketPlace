import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return <SignIn afterSignInUrl="/cart" routing="path" path="/sign-in" />;
}
