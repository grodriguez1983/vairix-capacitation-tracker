"use client";
import { signOut } from "next-auth/react";
import { MouseEventHandler, useRef, useState } from "react";
import { UserIcon } from "./icons/UserIcon";
import Link from "next/link";
import useClickOutside from "@/hooks/useClickOutside";

const NavbarItem = ({
  href = "",
  label,
  onClick,
}: {
  href?: string;
  label?: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
}) => (
  <li onClick={onClick}>
    <Link
      href={href}
      className="hover:bg-blue-600 block px-4 py-2 account-link hover:text-white"
    >
      {label}
    </Link>
  </li>
);

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const headerRef = useRef<HTMLHeadElement>(null);

  useClickOutside(headerRef, () => setNavbarOpen(false));

  return (
    <header
      className="w-full hidden sm:flex items-center px-6 py-2 bg-white"
      ref={headerRef}
    >
      <div className="relative w-full flex justify-end">
        <button
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="flex justify-center items-center text-gray-400 hover:text-gray-300 focus:text-gray-300 z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
        >
          <UserIcon />
        </button>
        {navbarOpen && (
          <ul className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
            <NavbarItem href="/account" label="Account" />
            <NavbarItem href="/support" label="Support" />
            <NavbarItem href="/" label="Sign Out" onClick={() => signOut()} />
          </ul>
        )}
      </div>
    </header>
  );
}
