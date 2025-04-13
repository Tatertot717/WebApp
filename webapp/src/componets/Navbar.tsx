//Navbar, has name of website and login/out buttons

const Navbar = () => {
  return (
    <header className="w-full flex justify-between items-center px-10 py-4 bg-neutral-900 shadow-md z-20">
      <h1 className="text-2xl font-bold">PollsCheck</h1>
      <div className="space-x-4">
        <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm font-medium">
          Login
        </button>
        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm font-medium">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Navbar;
