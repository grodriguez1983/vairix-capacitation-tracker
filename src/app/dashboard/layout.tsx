import { checkUserRole } from "@/lib/auth";
import { ReactNode } from "react";

export default async function Layout({
  user,
  admin,
}: {
  user: ReactNode;
  admin: ReactNode;
}) {
  const role = await checkUserRole();
  return <>{role === "admin" ? admin : user}</>;
}
