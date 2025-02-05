import { LuSofa } from "react-icons/lu";

export default function Footer ()  {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Left Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <LuSofa />
            <span className="text-2xl font-semibold">Comforty</span>
          </div>
          <p className="text-gray-400 text-sm">Bringing you the best furniture collection.</p>
        </div>

        {/* Middle Section */}
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white hover:underline">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white hover:underline">About</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white hover:underline">Categories</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-400">info@Comforty.com</p>
          <p className="text-gray-400">+1 123-456-7890</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Company Name. All rights reserved.
      </div>
    </footer>
  );
};
