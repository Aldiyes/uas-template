import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const headerLists = await req.headers;

  const authToken = headerLists.get("Authorization");
  const token = authToken?.split("Bearer ").at(1);
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const secret = process.env.JWT_SECRET || "";

  try {
    verify(token, secret);
    return NextResponse.json({ message: "Authenticated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
