import Navbar from "../Navbar";
import Footer from "../Footer";
const ErrorPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/splashBackground.jpg')" }}
    >
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorPage;
