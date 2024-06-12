import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  const emailExists = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (emailExists) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 409 },
    );
  }

  const hashedPassword = await hash(password, 10);

  try {
    const createUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        data: createUser,
        success: "User created successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
