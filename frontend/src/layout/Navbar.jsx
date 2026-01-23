import React from 'react';
import { ChevronDown, Bell, User } from 'lucide-react';

const Navbar = ({ title = "Market Overview" }) => {
  return (
    <header className="bg-white p-4 px-8 border-b flex justify-between items-center sticky top-0 z-30 shadow-sm">
      <div className="flex flex-col">
        <h2 className="text-sm font-bold text-gray-700">{title}</h2>
        <p className="text-[10px] text-gray-400 font-medium">Your update is here today</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Currency Selector */}
        <select className="px-3 py-1 border rounded-lg text-xs font-bold bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-100">
          <option value="USD">USD ($)</option>
          <option value="INR">INR (₹)</option>
          <option value="EUR">EUR (€)</option>
        </select>

        {/* Optional Icons (Notifications/Profile) */}
        <div className="flex items-center gap-3 border-l pl-6">
          <Bell size={18} className="text-gray-400 cursor-pointer hover:text-gray-600" />
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;