import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/src/config/mongodb";
import Poll from "@/src/models/pollSchema";
import { getRedisClient } from "@/src/config/redis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/config/authOptions";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const { pollId, options, previousOptions = [] } = await req.json();

    if (!pollId || !Array.isArray(options)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const poll = await Poll.findById(pollId);
    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    //If the poll requires login, check for session
    if (poll.requirelogin) {
      const session = await getServerSession({ req, ...authOptions });
      if (!session) {
        return NextResponse.json({ error: "You must be logged in to vote." }, { status: 401 });
      }
    }

    poll.options.forEach((opt) => {
      const wasSelected = previousOptions.includes(opt.text);
      const isSelected = options.includes(opt.text);

      if (wasSelected && !isSelected) {
        opt.votes = Math.max(0, opt.votes - 1);
      } else if (!wasSelected && isSelected) {
        opt.votes += 1;
      }
    });

    await poll.save();

    const redis = await getRedisClient();
    await redis.publish("poll-updates", JSON.stringify({
      pollId,
      options: poll.options.map(opt => ({
        text: opt.text,
        votes: opt.votes
      }))
    }));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/polls/vote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}