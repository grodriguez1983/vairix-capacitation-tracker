"use client";

import { signOut } from "next-auth/react";

import type { ClientSafeProvider } from "next-auth/react";
import { useState } from "react";
import { LogoutModal } from "./LogoutModal";

export default function LogoutButton({ auth }: { auth?: ClientSafeProvider }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => setModalOpen(true)}
      >
        Log out
      </button>
      <LogoutModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
