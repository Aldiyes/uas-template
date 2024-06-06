import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-tokens";
import { db } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } },
) {
  const token = params.token;

  try {
    const tokenExists = await getVerificationTokenByToken(token);

    if (!tokenExists) {
      return NextResponse.json(
        { error: "Token does not exists" },
        { status: 404 },
      );
    }

    const hasExpired = new Date(tokenExists.expires) < new Date();

    if (hasExpired) {
      return NextResponse.json({ error: "Token has expired" }, { status: 403 });
    }

    if (!tokenExists.email) {
      return NextResponse.json(
        { error: "Email does not exist" },
        { status: 404 },
      );
    }
    const userExists = await getUserByEmail(tokenExists.email);
    if (!userExists) {
      return NextResponse.json(
        { error: "Email does not exists" },
        { status: 404 },
      );
    }

    await db.user.update({
      where: {
        id: userExists.id,
      },
      data: {
        emailVerified: new Date(),
        email: tokenExists.email,
      },
    });

    await db.verificationToken.delete({
      where: {
        id: tokenExists.id,
      },
    });

    return NextResponse.json({ success: "Email verified" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
