import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LineChart, Wallet, Settings, Menu } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/market', label: 'Market', icon: <LineChart size={20} /> },
    { path: '/portfolio', label: 'Portfolio', icon: <Wallet size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r h-screen flex flex-col sticky top-0">
      {/* Brand Logo Section */}
      <div className="p-6 border-b flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg leading-tight text-gray-800">Market Dashboard</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Real-time Analytics</p>
        </div>
        <Menu size={18} className="text-gray-400 cursor-pointer lg:hidden" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 mt-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-[#D1D5FF] text-[#6366F1] shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              <span className={`${isActive ? 'text-[#6366F1]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                {item.icon}
              </span>
              <span className="font-bold text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Tag */}
      <div className="p-6 border-t">
        <div className="flex items-center gap-2 text-gray-400">
          <span className="text-xs font-medium">@ mohit kumawat</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;