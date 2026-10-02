import { connectDB } from "@/lib/connect";
import loveLetterModel from "@/models/loveletterSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    recipient,
    sender,
    selectedTemplate,
    selectedFont,
    message,
    closing,
  } = await req.json();
  try {
    if (
      !recipient ||
      !selectedTemplate ||
      !selectedFont ||
      !message ||
      !closing
    )
      return NextResponse.json(
        { success: false, message: "Missing parameters" },
        { status: 400 },
      );
    await connectDB();
    const newLetter = new loveLetterModel({
      recipient,
      sender,
      selectedTemplate,
      selectedFont,
      message,
      closing,
    });
    await newLetter.save();
    return NextResponse.json(
      {
        success: true,
        message: "Written from the heart. Your love letter is ready!",
        id: newLetter._id,
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
    const getLetter = await loveLetterModel.findById(id);
    return NextResponse.json({success: true, getLetter}, {status: 200});
  } catch (error) {
    const err = error instanceof Error ? error.message : "Server Unreachable";
    return NextResponse.json({success: false, message: err}, {status: 500});
  }
}