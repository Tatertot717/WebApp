// src/app/vote/[id]/page.tsx

import { notFound } from "next/navigation";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import connectMongoDB from "@/src/config/mongodb";
import PollModel from "@/src/models/pollSchema";
import VoteOptions from "../VoteOptions";
import { VoteProvider } from "@/src/components/Votes";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import LoginRedirectNotice from "@/src/components/loginRedirect";

type Params = Promise<{ id: string }>;

export default async function VotePage({ params }: { params: Params }) {
  const { id } = await params;

  await connectMongoDB();

  if (!mongoose.Types.ObjectId.isValid(id)) return notFound();

  const pollDoc = await PollModel.findById(id).lean();
  if (!pollDoc) return notFound();

  const session = await getServerSession(authOptions);
  const requiresAuth = pollDoc.requirelogin;

  // User not logged in, but login is required
  if (requiresAuth && !session) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 text-black">
        <Navbar />
        <main className="flex-grow flex justify-center items-center p-4">
          <div className="max-w-lg text-center">
            <h1 className="text-2xl font-bold mb-2">Restricted Poll</h1>
            <p className="mb-4">You must be logged in to view this poll.</p>
            <LoginRedirectNotice />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const poll = {
  id: pollDoc._id.toString(),
  polltitle: pollDoc.polltitle,
  pollImage: pollDoc.pollImage || "",
  options: pollDoc.options.map((opt: any) => ({
    text: opt.text,
    votes: opt.votes,
  })),
  allowmultiple: pollDoc.allowmultiple,
  requirelogin: pollDoc.requirelogin,
  owner: pollDoc.owner?.toString() || null,
  createdAt: pollDoc.createdAt?.toISOString() || null,
  updatedAt: pollDoc.updatedAt?.toISOString() || null,
};


  return (
    <VoteProvider>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <main className="flex-grow py-10 px-4 text-black flex justify-center">
          <div className="w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-4 text-center">{poll.polltitle}</h1>
            {poll.pollImage && (
              <img
                src={poll.pollImage}
                className="w-full rounded mb-6"
                alt="Poll banner"
              />
            )}
            <VoteOptions poll={poll} />
          </div>
        </main>
        <Footer />
      </div>
    </VoteProvider>
  );
}