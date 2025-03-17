import { Link } from "react-router-dom";
import { Home, List, Wallet, BarChart3, MessageSquare, User, Menu, X } from "lucide-react";
import React, { useState } from "react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`h-screen ${isSidebarOpen ? "w-60" : "w-30"} bg-gray-900 text-white p-6 shadow-xl transition-all duration-300`}>
      {/* Hamburger icon to open sidebar */}
      <button
        onClick={toggleSidebar}
        className="absolute  text-white lg:hidden"
      >
        {isSidebarOpen ? <X className="text-green-400 top-4 right-0 mb-5 " /> : <Menu className="text-green-400 top-4 right-0" />}
      </button>

      {/* Sidebar content */}
      {/* <h1 className="text-2xl font-bold text-green-400">Finance Tracker</h1> */}
      <ul className="mt-6 space-y-5">
        <li>
          <Link to="/" onClick={toggleSidebar} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800">
            <Home className="text-green-400" /> {isSidebarOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/transactions" onClick={toggleSidebar} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800">
            <List className="text-green-400" /> {isSidebarOpen && <span>Transactions</span>}
          </Link>
        </li>
        <li>
          <Link to="/wallet" onClick={toggleSidebar} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800">
            <Wallet className="text-green-400" /> {isSidebarOpen && <span>Wallet</span>}
          </Link>
        </li>
        <li>
          <Link to="/budget-Manager" onClick={toggleSidebar} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800">
            <BarChart3 className="text-green-400" /> {isSidebarOpen && <span>Budget Manager</span>}
          </Link>
        </li>
        <li>
          <Link to="/profile" onClick={toggleSidebar} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800">
            <User className="text-green-400" /> {isSidebarOpen && <span>Profile</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
