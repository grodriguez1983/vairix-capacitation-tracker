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
    <>
      <div id="dialogs" />
      <main className="relative w-full flex flex-col sm:flex-row h-screen overflow-y-hidden">
        <Sidebar />

        <div className="w-full flex flex-col h-full bg-white">
          <Header />
          <section className="h-full w-full overflow-auto">
            {role === "admin" ? admin : user}
          </section>
        </div>
      </main>
    </>
  );
}
