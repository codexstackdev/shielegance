import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const token = jwt.sign(
      { clientApp: "OfficialWebFrontend", scope: "public-read" },
      process.env.SECRET_KEY as string,
      { expiresIn: "15min" },
    );
    const response = NextResponse.json({ initialize: true }, { status: 200 });
    response.cookies.set({
      name: "app_session_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });
    return response;
  } catch (error) {
    const err = error instanceof Error ? error.message : "Server Unreachable";
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
}
