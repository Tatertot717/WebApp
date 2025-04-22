import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from "@/src/config/mongodb";
import Poll from "@/src/models/pollSchema";

export async function GET() {
  try {
    await connectMongoDB();
    
    const polls = await Poll.find({});
    return NextResponse.json(polls);
  } catch (err) {
    console.error("API /polls error:", err);
    return NextResponse.json(
      { error: "Failed to fetch polls" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body = await req.json();

    const {
      polltitle,
      pollImage,
      options,
      allowmultiple,
      requirelogin,
      owner,
    } = body;

    if (!polltitle || !options || options.length < 2) {
      return NextResponse.json(
        { error: "Poll must have a title and at least two options." },
        { status: 400 }
      );
    }

    const pollOptions = options.map((text: string) => ({
      text,
      votes: 0,
    }));

    const newPoll = await Poll.create({
      polltitle,
      pollImage,
      options: pollOptions,
      allowmultiple,
      requirelogin,
      owner: owner ? owner : undefined,
    });

    return NextResponse.json(newPoll, { status: 201 });
  } catch (error) {
    console.error("Error creating poll:", error);
    return NextResponse.json(
      { error: "Failed to create poll" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB();

    const { searchParams } = req.nextUrl;
    const pollId = searchParams.get('id'); // Get the 'id' query parameter

    if (!pollId) {
      return NextResponse.json({ error: "Poll ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const updatedPoll = await Poll.findByIdAndUpdate(pollId, body, { new: true });

    if (!updatedPoll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPoll);
  } catch (error) {
    console.error("Error editing poll:", error);
    return NextResponse.json(
      { error: "Failed to edit poll" },
      { status: 500 }
    );
  }
}

