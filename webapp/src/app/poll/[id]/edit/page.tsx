import { notFound, redirect } from "next/navigation";
import connectMongoDB from "@/src/config/mongodb";
import Poll from "@/src/models/pollSchema";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { authOptions } from "@/src/config/authOptions";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import EditPollPage from "@/src/components/pages/EditPage";
import { IPollOption } from "@/src/models/pollSchema";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) return notFound();

  await connectMongoDB();

  const pollDoc = await Poll.findById(id).lean();
  if (!pollDoc) return notFound();

  const session = await getServerSession(authOptions);
  const isOwner = session?.user?.id === pollDoc.owner?.toString();

  if (pollDoc.requirelogin && !session) {
    redirect("/api/auth/signin?callbackUrl=/poll/" + id + "/edit");
  }

  if (!isOwner) {
    return redirect(`/poll/${id}`);
  }

  const poll = {
    id: pollDoc._id.toString(),
    polltitle: pollDoc.polltitle,
    pollImage: pollDoc.pollImage || "",
    options:  pollDoc.options.map((opt: IPollOption) => opt.text),
    allowmultiple: pollDoc.allowmultiple,
    requirelogin: pollDoc.requirelogin,
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/splashBackground.jpg')" }}
    >
      <Navbar />
      <main className="flex-grow flex items-center justify-center text-black">
        <div>
          <EditPollPage poll={poll} />
        </div>
      </main>
      <Footer />
    </div>
  );
}