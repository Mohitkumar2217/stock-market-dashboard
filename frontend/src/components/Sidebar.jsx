import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Wallet, 
  Settings,
  DollarSign,
  Euro,
  IndianRupee
} from 'lucide-react';

export function Sidebar({ currency, onCurrencyChange, isOpen }) {
  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: TrendingUp, label: 'Markets', path: '/markets' },
    { icon: Wallet, label: 'Portfolio', path: '/portfolio' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const currencies = [
    { value: 'USD', icon: DollarSign, label: 'USD' },
    { value: 'EUR', icon: Euro, label: 'EUR' },
    { value: 'INR', icon: IndianRupee, label: 'INR' },
  ];

  return (
    <aside className={`
      bg-white border-r border-gray-200 
      fixed lg:static inset-y-0 left-0 z-30
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      w-64 flex flex-col
    `}>
      {/* Brand Header */}
      <div className="p-6 border-b border-gray-200 bg-gray-50/50">
        <h1 className="text-xl font-bold text-gray-900">Market Dashboard</h1>
        <p className="text-sm text-gray-500 font-medium">Real-time Analytics</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200 font-medium
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Currency Switcher Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50/30">
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-3 px-4">
          Select Currency
        </p>
        <div className="grid grid-cols-1 gap-1">
          {currencies.map((curr) => {
            const Icon = curr.icon;
            const isSelected = currency === curr.value;
            return (
              <button
                key={curr.value}
                onClick={() => onCurrencyChange(curr.value)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 rounded-lg
                  transition-all duration-200 border
                  ${isSelected
                    ? 'bg-white border-blue-200 text-blue-600 shadow-sm ring-1 ring-blue-100 font-bold'
                    : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 font-medium'
                  }
                `}
              >
                <div className={`p-1 rounded ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm">{curr.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}