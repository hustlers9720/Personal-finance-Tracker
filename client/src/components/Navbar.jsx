import React from "react";
import { Search, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-3 mb-2 bg-gray-900 shadow-lg text-white ">
      <h2 className="text-2xl font-semibold tracking-wide">Finance Dashboard</h2>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="pl-9 pr-3 py-2 w-60 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600 placeholder-gray-400"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
      </div>

      {/* Profile Icon */}
      
    </div>
  );
};

export default Navbar;
