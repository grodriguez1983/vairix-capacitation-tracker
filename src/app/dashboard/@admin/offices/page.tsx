"use client";
import React from "react";

import TextInput from "@/components/TextInput";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function OfficePage() {
  const [loading, setLoading] = React.useState(false);

  let onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    const { officeName, officeType } = data;

    fetch("/api/office", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: officeName,
        type: officeType,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <div className="py-8">
          <center>
            <span className="text-2xl text-black font-semibold">
              Create Office
            </span>
          </center>
        </div>
        <form className="flex gap-4 flex-col" onSubmit={onSubmit}>
          <TextInput
            label="Office Name"
            name="officeName"
            type="text"
            placeholder="Office Name"
            required
          />
          <Select label="Type" name="officeType" required />
          <div className="flex items-center justify-end mt-4">
            <Button type="submit" disabled={loading}>
              Create
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
}
