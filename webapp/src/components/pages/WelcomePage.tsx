import Navbar from "../Navbar";
import Footer from "../Footer";
import Link from "next/link";

const WelcomePage = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans"
      style={{ backgroundImage: "url('/splashBackground.jpg')" }}
    >
      <Navbar />

      {/* Main content wrapper that grows */}
      <main className="flex-grow relative">
        <div className="flex flex-col items-center justify-center text-white relative mt-20">
          {/* Create A Poll Card */}
          <Link href="/create-poll">
            <div className="hidden md:block absolute top-20 left-10 bg-neutral-800 p-4 rounded-md shadow-md w-64">
              <h2 className="text-lg font-semibold mb-2">Create A Poll</h2>
              <div className="bg-white text-black p-2 rounded-sm mb-2 text-sm">
                Enter poll question here
              </div>
              <div className="bg-white text-black p-2 rounded-sm mb-2 text-sm">
                Option 1
              </div>
              <div className="bg-white text-black p-2 rounded-sm text-sm">
                Option 2
              </div>
            </div>
          </Link>
          {/* Featured Poll Card */}
          <Link href="/polls">
            <div className="hidden md:block absolute top-20 right-10 bg-neutral-800 p-4 rounded-md shadow-md w-64">
              <h2 className="text-lg font-semibold mb-2">Featured Poll</h2>
              <div className="bg-white text-black p-2 rounded-sm mb-2 text-sm">
                Top Programming Languages?
              </div>
              <div className="bg-white text-black p-2 rounded-sm mb-2 text-sm">
                HTML/CSS/JS
              </div>
              <div className="bg-white text-black p-2 rounded-sm text-sm">
                Java
              </div>
            </div>
          </Link>

          {/* Center Text */}
          <div className="flex flex-col items-center justify-center text-center z-10">
            <h2 className="text-4xl font-bold mb-4 z-10 mt-20">PollsCheck</h2>
            <p className="mb-8 z-10 text-center px-4">
              Create polls and get feedback from your community!
            </p>
            <Link href="/search">
              <p className="underline z-10">Continue to site</p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WelcomePage;
