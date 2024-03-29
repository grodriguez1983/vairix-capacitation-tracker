"use client";

import { signIn } from "next-auth/react";
import TextInput from "@/components/inputs/TextInput";
import Toast from "@/components/Toast";
import { useSearchParams } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
import Card from "@/components/Card";
import { useState } from "react";

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false);

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);

    let data = Object.fromEntries(new FormData(e.currentTarget));
    const { email, password } = data;

      try {
        await signIn("credentials", {
          email,
          password,
          redirect: true,
        });
      } catch (error) {
        console.log("Failed to sign in", error);
      }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {error && <Toast>Incorrect credentials</Toast>}
      <Card>
        <div className="py-8">
          <center>
            <span className="text-2xl text-black font-semibold">Log In</span>
          </center>
        </div>
        <form className="flex gap-4 flex-col" onSubmit={onSubmit}>
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <TextInput
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
          />
          <div className="flex items-center justify-end mt-4">
            <SubmitButton pending={isPending} label="Submit" />
          </div>
        </form>
      </Card>
    </main>
  );
}
