import { checkUserRole } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NotFound() {
  const role = await checkUserRole();

  if (role === null) redirect("/login");

  redirect("/dashboard");
}
