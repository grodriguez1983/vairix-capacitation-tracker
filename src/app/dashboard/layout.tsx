import { checkUserRole } from "@/lib/auth";
import { ReactNode } from "react";
import Header from "@/components/Header";

export default async function Layout({
  user,
  admin,
}: {
  user: ReactNode;
  admin: ReactNode;
}) {
  const role = await checkUserRole();
  return (
    <main className=" min-h-screen flex flex-col items-center mx-auto">
      <div className="relative w-full flex flex-col h-screen overflow-y-hidden">
        <Header />
        {role === "admin" ? admin : user}
      </div>
    </main>
  );
}
