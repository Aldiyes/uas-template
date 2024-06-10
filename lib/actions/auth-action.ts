"use server";

import { redirect } from "next/navigation";

const API_URL = process.env.API_URL;

export const login = async (provider: "google" | "github") => {
  const data = {
    provider: provider,
  };
  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (res.ok) return redirect("/my-day");
};
