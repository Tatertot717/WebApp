// src/app/api/polls/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/src/config/mongodb";
import Poll from "@/src/models/pollSchema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/config/authOptions";

export async function GET() {
  try {
    await connectMongoDB();
    const polls = await Poll.find({});
    return NextResponse.json(polls);
  } catch (err) {
    console.error("API /polls error:", err);
    return NextResponse.json({ error: "Failed to fetch polls" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    // require a logged‑in user
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const { polltitle, pollImage, options, allowmultiple, requirelogin } =
      await req.json();

    if (!polltitle || !options || options.length < 2) {
      return NextResponse.json(
        { error: "Poll must have a title and at least two options." },
        { status: 400 }
      );
    }

    const pollOptions = options.map((text: string) => ({ text, votes: 0 }));

    const newPoll = await Poll.create({
      polltitle,
      pollImage,
      options: pollOptions,
      allowmultiple,
      requirelogin,
      owner: userId,
    });

    return NextResponse.json(newPoll, { status: 201 });
  } catch (error) {
    console.error("Error creating poll:", error);
    return NextResponse.json({ error: "Failed to create poll" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectMongoDB();
    const { searchParams } = req.nextUrl;
    const pollId = searchParams.get("id");

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
    return NextResponse.json({ error: "Failed to edit poll" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectMongoDB();

    // require a logged‑in user
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // get poll ID
    const url = new URL(req.url);
    const pollId = url.searchParams.get("id");
    if (!pollId) {
      return NextResponse.json({ error: "Poll id missing" }, { status: 400 });
    }

    // verify ownership
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }
    if (poll.owner?.toString() !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // delete and respond
    await Poll.findByIdAndDelete(pollId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting poll:", err);
    return NextResponse.json({ error: "Failed to delete poll" }, { status: 500 });
  }
}
