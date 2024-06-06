import { getUserByEmail } from "@/lib/actions/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {}

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  try {
    const userExists = await getUserByEmail(email);

    if (userExists) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // TODO: Send verification token email

    return NextResponse.json({ success: "Email sent!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
