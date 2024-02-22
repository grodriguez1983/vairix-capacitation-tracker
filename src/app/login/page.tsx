"use client";
import React from "react";
import { signIn } from "next-auth/react";

import TextInput from "@/components/TextInput";
import Toast from "@/components/Toast";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    const { email, password } = data;

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
      });
    } catch (error) {
      setLoading(false);
      console.log("Failed to sign in", error);
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {error && <Toast>Usuario o contraseña invalidos</Toast>}
      <Card>
        <div className="py-8">
          <center>
            <span className="text-2xl font-semibold">Log In</span>
          </center>
        </div>
        <form className="gap-2 flex gap-4 flex-col" onSubmit={onSubmit}>
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <TextInput
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
            required
          />
          <div className="flex items-center justify-end mt-4">
            <Button type="submit" disabled={loading}>
              Login
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
}
