import { connectDB } from "@/lib/connect";
import kenshieModel from "@/models/kenshieSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    yourName,
    theirName,
    beginning,
    firstImpression,
    firstMemorableMoment,
    littleThings,
    importantDate,
    challenge,
    realization,
    favoriteMemory,
    loveTruth,
    future,
    image,
  } = await req.json();
  try {
    if (!yourName || !theirName || !image)
      return NextResponse.json(
        {
          success: false,
          message: "A masterpiece cannot be nameless or faceless",
        },
        { status: 400 },
      );
    await connectDB();
    const newKenshie = new kenshieModel({
      yourName,
      theirName,
      beginning,
      firstImpression,
      firstMemorableMoment,
      littleThings,
      importantDate,
      challenge,
      realization,
      favoriteMemory,
      loveTruth,
      future,
      image,
    });
    await newKenshie.save();
    return NextResponse.json(
      { success: true, message: "Your story is alive.", id: newKenshie._id },
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
    const kenshie = await kenshieModel.findById(id);
    return NextResponse.json({success: true, kenshie}, {status: 200})
  } catch (error) {
    const err = error instanceof Error ? error.message : "Server Unreachable";
    return NextResponse.json({success: false, message: err}, {status: 500});
  }
}