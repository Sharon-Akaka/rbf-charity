import { redirect } from "next/navigation";
import { isAuthenticated } from "@/backend/auth/utils";

export async function AdminProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}

