"use server";

import * as z from "zod";

import { LoginSchema, RegisterSchema } from "@/lib/schemas";

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN;

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  return {
    success: "Email sent!",
  };
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const res = await fetch(`${APP_DOMAIN}/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(validatedFields.data),
    headers: {
      "content-type": "application/json",
    },
  });

  return res.json();
};
