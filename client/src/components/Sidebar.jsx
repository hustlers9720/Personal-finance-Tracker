import { Link } from "react-router-dom";
import { Home, List, Wallet, BarChart3, MessageSquare, User } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-gray-900 text-white p-6 shadow-xl">
      <h1 className="text-2xl font-bold text-green-400">Finance Tracker</h1>
      <ul className="mt-6 space-y-5">
        <li>
          <Link to="/" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800">
            <Home className="text-green-400" /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/transactions" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800">
            <List className="text-green-400" /> <span>Transactions</span>
          </Link>
        </li>
        <li>
          <Link to="/wallet" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800">
            <Wallet className="text-green-400" /> <span>Wallet</span>
          </Link>
        </li>
        <li>
          <Link to="/analytics" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800">
            <BarChart3 className="text-green-400" /> <span>Statistics</span>
          </Link>
        </li>
        <li>
          <Link to="/messages" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800">
            <MessageSquare className="text-green-400" /> <span>Messages</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800">
            <User className="text-green-400" /> <span>Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
