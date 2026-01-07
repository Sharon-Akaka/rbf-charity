import { cookies } from "next/headers";
import { AUTH_CONFIG } from "./config";

export async function createSession() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_CONFIG.sessionCookieName, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: AUTH_CONFIG.sessionMaxAge,
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_CONFIG.sessionCookieName);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_CONFIG.sessionCookieName);
  return session?.value === "authenticated";
}

