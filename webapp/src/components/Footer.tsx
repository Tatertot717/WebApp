//Footer, has website name, 4dudes! and social links
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex justify-between items-center px-10 py-4 bg-neutral-900 text-sm font-sans">
      <span className="text-gray-300">PollsCheck by 4Dudes!</span>
      <div>
        <Link
          href="https://github.com/Tatertot717/WebApp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FaGithub size={20} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
