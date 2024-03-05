import { checkUserRole } from "@/lib/auth";
import { ReactNode } from "react";
import Header from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default async function Layout({
  user,
  admin,
}: {
  user: ReactNode;
  admin: ReactNode;
}) {
  const role = await checkUserRole();
  return (
    <main className="relative w-full flex flex-col sm:flex-row h-screen overflow-y-hidden">
      <Sidebar role={role} />

      <div className="w-full flex flex-col h-full bg-white">
        <Header />
        {role === "admin" ? admin : user}
      </div>
    </main>
  );
}
