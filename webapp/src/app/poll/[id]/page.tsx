import { notFound } from "next/navigation";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import connectMongoDB from "@/src/config/mongodb";
import PollModel from "@/src/models/pollSchema";
import VoteOptions from "@/src/components/VoteOptions";
import { VoteProvider } from "@/src/components/Votes";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/config/authOptions";
import LoginRedirectNotice from "@/src/components/loginRedirect";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

export const metadata = {
  title: "PollsCheck - Poll",
};

export default async function VotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectMongoDB();

  if (!mongoose.Types.ObjectId.isValid(id)) return notFound();

  const pollDoc = await PollModel.findById(id).lean();
  if (!pollDoc) return notFound();

  const session = await getServerSession(authOptions);
  const requiresAuth = pollDoc.requirelogin;

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

  type PollOption = {
    text: string;
    votes: number;
  };

  const poll = {
    id: pollDoc._id.toString(),
    polltitle: pollDoc.polltitle,
    pollImage: pollDoc.pollImage || "",
    options: pollDoc.options.map((opt: PollOption) => ({
      text: opt.text,
      votes: opt.votes,
    })),
    allowmultiple: pollDoc.allowmultiple,
    requirelogin: pollDoc.requirelogin,
    owner: pollDoc.owner?.toString() || null,
    createdAt: pollDoc.createdAt?.toISOString() || null,
    updatedAt: pollDoc.updatedAt?.toISOString() || null,
  };

  // Render the Edit button if the logged-in user is the owner of the poll
  const isOwner = session?.user?.id === poll.owner;

  return (
    <VoteProvider>
      <div className="min-h-screen flex flex-col bg-gray-100 text-black">
        <Navbar />

        {/* Title */}
        <div className="py-6 px-4 grid grid-cols-3 items-center text-center">
          {/* Back Button on the Left */}
          <div className="justify-self-start">
            <Link
              href="/polls"
              className="text-blue-600 hover:text-blue-800 font-semibold text-base flex items-center gap-1"
            >
              <HiArrowLeft className="text-lg" />
              Back to Polls
            </Link>
          </div>

          {/* Centered Title */}
          <h1 className="text-3xl lg:text-4xl font-bold col-start-2">
            {poll.polltitle}
          </h1>

          {/* Empty space on the right to balance the grid */}
          <div className="justify-self-end" />
        </div>

        {/* Main content layout */}
        <main className="flex flex-col-reverse lg:flex-row flex-grow px-4 pb-10 gap-8 justify-center items-start max-w-7xl mx-auto w-full">
          {/* Poll Section */}
          <div className="w-full lg:w-1/2">
            <VoteOptions poll={poll} />

            {/* Edit Button for Owner */}
            {isOwner && (
              <div className="mt-6 text-center">
                <Link
                  href={`/poll/${poll.id}/edit`}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Edit Poll
                </Link>
              </div>
            )}
          </div>

          {/* Images Section */}
          <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
            {/* Poll Image */}
            {poll.pollImage && (
              <div className="relative w-full h-64 max-w-md mx-auto">
                <Image
                  src={poll.pollImage}
                  alt="Poll banner"
                  fill
                  className="object-contain rounded"
                />
              </div>
            )}

            {/* QR Code */}
            <Image
              src={`http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                `${baseUrl}/poll/${poll.id}`
              )}&size=200x200`}
              alt="QR Code"
              width={200}
              height={200}
            />
          </div>
        </main>

        <Footer />
      </div>
    </VoteProvider>
  );
}
