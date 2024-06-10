import { signIn } from "@/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const values = await req.json();

  await signIn(values.provider, {
    callbackUrl: "/my-day",
  });
}
