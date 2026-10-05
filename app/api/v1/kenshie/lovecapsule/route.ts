import { connectDB } from "@/lib/connect";
import loveCapsuleModel from "@/models/loveCapsuleSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { recipient, sender, message, unlockDate, unlockTime } =
    await req.json();
  try {
    if (!recipient || !sender || !message || !unlockDate || !unlockTime)
      return NextResponse.json(
        { success: false, message: "Missing parameters" },
        { status: 400 },
      );
    await connectDB();
    const newCapsule = new loveCapsuleModel({
      recipient,
      sender,
      message,
      unlockDate,
      unlockTime,
    });
    await newCapsule.save();
    return NextResponse.json(
      {
        success: true,
        message:
          "Your love capsule has been safely sealed. Your memories are locked away until the perfect moment.",
        id: newCapsule._id,
      },
      { status: 200 },
    );
  } catch (error) {
    const err = error instanceof Error ? error.message : "Server Unreachable";
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
}

export async function GET(req:NextRequest){
    const params = req.nextUrl.searchParams;
    const id = params.get("id");
    try {
        if(!id) return NextResponse.json({success: false, message: "Missing parameter"}, {status: 400});
        await connectDB();
        const capsule = await loveCapsuleModel.findById(id);
        return NextResponse.json({success: true, capsule}, {status: 200});
    } catch (error) {
        const err = error instanceof Error ? error.message : "Server Unreachable";
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}