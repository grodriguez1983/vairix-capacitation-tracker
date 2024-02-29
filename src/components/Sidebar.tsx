"use client";
import { MouseEventHandler, ReactElement, useState } from "react";
import HamburgerOpen from "./icons/HamburgerOpen";
import HamburgerClosed from "./icons/HamburgerClosed";
import Link from "next/link";
import { SignOutIcon } from "./icons/SignOutIcon";
import { signOut } from "next-auth/react";
import { DashboardIcon } from "./icons/DashboardIcon";

const SidebarItem = ({
  icon: IconComponent,
  href = "",
  onClick,
  label,
}: {
  label?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
  icon?: ({ className }: { className: string }) => ReactElement;
}) => (
  <li onClick={onClick}>
    <Link
      href={href}
      className="flex sm:font-semibold items-center text-white bg-blue-700 opacity-75 hover:opacity-100 py-2 pl-4 w-full sm:py-4 sm:pl-6"
    >
      {IconComponent && (
        <IconComponent className="mr-3 w-4 h-4 sm:w-5 sm:h-5" />
      )}
      {label}
    </Link>
  </li>
);

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <aside className="sm:h-full py-5 px-6 sm:px-0 sm:py-0 h-fit w-full sm:w-64 bg-blue-600">
      <div className="relative w-full flex justify-between items-center text-white">
        <span className="text-3xl sm:p-6 font-semibold uppercase">Admin</span>
        <button
          className="sm:hidden"
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <HamburgerOpen /> : <HamburgerClosed />}
        </button>
      </div>

      <nav className="flex w-full h-full">
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <ul className="sm:hidden pt-4 w-full h-full flex flex-col">
            <SidebarItem
              href="/dashboard"
              label="Dashboard"
              icon={DashboardIcon}
            />
            <SidebarItem
              href="/"
              label="Sign Out"
              icon={SignOutIcon}
              onClick={() => signOut()}
            />
          </ul>
        )}

        {/* Desktop Sidebar */}
        <ul className="hidden w-full h-full sm:flex flex-col">
          <SidebarItem
            href="/dashboard"
            label="Dashboard"
            icon={DashboardIcon}
          />
        </ul>
      </nav>
    </aside>
  );
};
