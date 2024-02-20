// this is a componet that will be used to render the login page
// this componet must be created using react, tailwindcss and react-aria-components and typescript
"use client";
import React from "react";
import { Form } from "react-aria-components";
import { signIn } from "next-auth/react";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Toast from "@/components/Toast";
import { useSearchParams } from "next/navigation";

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
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <div className="py-8">
          <center>
            <span className="text-2xl font-semibold">Log In</span>
          </center>
        </div>
        <Form className="gap-2 flex gap-4 flex-col" onSubmit={onSubmit}>
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
            <Button type="submit" isDisabled={loading}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </main>
  );
}
