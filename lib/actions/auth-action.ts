"use server";

import { AuthError } from "next-auth";
import * as z from "zod";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const userExists = await getUserByEmail(email);

  if (!userExists || !userExists.email || !userExists.password) {
    return { error: "Email does not exists!" };
  }

  if (!userExists.emailVerified) {
    const verificationToken = await generateVerificationToken(userExists.email);
    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        case "CallbackRouteError":
          return { error: "Callback Route Error" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
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

export const newVerification = async (token: string) => {
  const res = await fetch(`${APP_DOMAIN}/api/auth/new-verification/${token}`, {
    method: "POST",
    // body: token,
    headers: {
      "content-type": "aplication/json",
    },
  });

  return res.json();
};
