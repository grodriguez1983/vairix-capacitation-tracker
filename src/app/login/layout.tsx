import { checkUserRole } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role = await checkUserRole();

  if (role === "user" || role === "admin") {
    redirect("/dashboard");
  }

  return (<div>{ children }</div>);
}
