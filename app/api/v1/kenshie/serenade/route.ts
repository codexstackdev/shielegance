import { connectDB } from "@/lib/connect";
import serenadeModel from "@/models/serenadeSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { recipient, sender, message, songId } = await req.json();
  try {
    if (!recipient || !message || !songId)
      return NextResponse.json(
        { success: false, message: "Missing parameters" },
        { status: 400 },
      );
    await connectDB();
    const newSerenade = new serenadeModel({
      recipient,
      sender,
      message,
      songId,
    });
    await newSerenade.save();
    return NextResponse.json(
      {
        success: true,
        message:
          "Serenade created! Hope they're ready to hit play and feel something.",
        id: newSerenade._id,
      },
      { status: 200 },
    );
  } catch (error) {
    const err = error instanceof Error ? error.message : "Server Unreachable";
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
}

export async function GET(req:NextRequest){
  const param = req.nextUrl.searchParams;
  const id = param.get("id");
  try {
    if(!id) return NextResponse.json({success: false, message: "Missing parameter"}, {status: 400});
    await connectDB();
    const serenade = await serenadeModel.findById(id);
    return NextResponse.json({success: true, serenade}, {status: 200});
  } catch (error) {
    const err = error instanceof Error ? error.message : "Server Unreachable";
    return NextResponse.json({success: false, message: err}, {status: 500});
  }
}