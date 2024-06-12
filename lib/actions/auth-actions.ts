"use server";
import { cookies } from "next/headers";

import * as z from "zod";

import { LoginSchema, RegisterSchema } from "@/lib/schemas";

const API_URL = process.env.API_URL;

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(validatedFields.data),
    });

    const response = await res.json();
    console.log("[CLIENT > LOGIN_ACTION > RESPONSE] - ", response);

    if (response.token) {
      console.log("[CLIENT > LOGIN_ACTION > TOKEN] - ", response.token);
      cookies().set({
        name: "auth.token",
        value: response.token,
        secure: true,
        httpOnly: true,
        path: "/",
        sameSite: true,
      });
      console.log("[CLIENT > LOGIN_ACTION > USER] - ", response.user);
      cookies().set({
        name: "session.token",
        value: JSON.stringify(response.user),
        secure: true,
      });
    }
    return response;
  } catch (error) {
    return { error: "Internal server error" };
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(validatedFields.data),
    headers: {
      "content-type": "application/json",
    },
  });

  const response = await res.json();
  console.log("[CLIENT > REGISTER_ACTION > RESPONSE] - ", response);

  return response;
};

export const logout = async () => {
  await removeToken();
};

export const getUser = async () => {
  const chipertext = cookies().get("session.token")?.value;
  return chipertext ? JSON.parse(chipertext) : null;
};

export async function getToken() {
  const chipertext = cookies().get("auth.token")?.value;
  return chipertext ? chipertext : null;
}

export const removeToken = async () => {
  cookies().delete("session.token");
  cookies().delete("auth.token");
};
