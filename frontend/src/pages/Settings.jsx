import React, { useState } from 'react';
import { User, Globe, Bell, Shield, ChevronDown } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto pb-10">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-sm text-gray-500">Manage your account and preferences</p>
      </header>

      {/* 1. Profile Settings Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b flex items-center gap-3">
          <User size={20} className="text-gray-400" />
          <h3 className="font-bold text-gray-800">Profile Settings</h3>
        </div>
        <div className="p-6 space-y-4">
          <InputGroup label="Full Name" placeholder="Name" />
          <InputGroup label="Email" placeholder="Email@gmail.com" type="email" />
          <InputGroup label="Phone" placeholder="+91 - 0000000000" />
        </div>
      </section>

      {/* 2. Preferences Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b flex items-center gap-3">
          <Globe size={20} className="text-gray-400" />
          <h3 className="font-bold text-gray-800">Preferences</h3>
        </div>
        <div className="p-6 space-y-4">
          <SelectGroup label="Currency" options={["USD US Dollar", "EUR Euro", "INR Rupee"]} />
          <SelectGroup label="Current Language" options={["English", "Hindi", "Spanish"]} />
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm font-bold text-gray-700">Dark Mode</p>
              <p className="text-[10px] text-gray-400">Use dark theme</p>
            </div>
            <Toggle />
          </div>
        </div>
      </section>

      {/* 3. Notifications Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b flex items-center gap-3">
          <Bell size={20} className="text-gray-400" />
          <h3 className="font-bold text-gray-800">Notifications</h3>
        </div>
        <div className="p-6 space-y-6">
          <NotificationToggle label="price Alerts" sub="Get notified when prices change significantly" defaultChecked />
          <NotificationToggle label="News/Updates" sub="Receive market news and updates" defaultChecked />
          <NotificationToggle label="Portfolio Changes" sub="Updates on your portfolio performance" defaultChecked />
          <NotificationToggle label="Market Trends" sub="Get insights on market trends" defaultChecked />
        </div>
      </section>

      {/* 4. Security Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b flex items-center gap-3">
          <Shield size={20} className="text-gray-400" />
          <h3 className="font-bold text-gray-800">Security</h3>
        </div>
        <div className="p-6 space-y-3">
          <SecurityAction label="Change Password" sub="Update your password regularly" />
          <SecurityAction label="Two-Factor Authentication" sub="Add an extra layer of security" />
          <SecurityAction label="Active Sessions" sub="Manage your active devices" />
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button className="px-6 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2 rounded-lg text-sm font-bold bg-[#6366F1] text-white shadow-lg hover:bg-indigo-700 transition-all">
          Save Change
        </button>
      </div>
    </div>
  );
};

// --- Internal Helper Components ---

const InputGroup = ({ label, placeholder, type = "text" }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
    />
  </div>
);

const SelectGroup = ({ label, options }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <select className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50/50 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
    </div>
  </div>
);

const NotificationToggle = ({ label, sub, defaultChecked }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-bold text-gray-700 capitalize">{label}</p>
      <p className="text-[10px] text-gray-400">{sub}</p>
    </div>
    <Toggle defaultChecked={defaultChecked} />
  </div>
);

const SecurityAction = ({ label, sub }) => (
  <div className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-bold text-gray-700">{label}</p>
        <p className="text-[10px] text-gray-400">{sub}</p>
      </div>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 group-hover:text-indigo-400 transition-colors">
        <ChevronDown className="-rotate-90" size={18} />
      </div>
    </div>
  </div>
);

const Toggle = ({ defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button 
      onClick={() => setChecked(!checked)}
      className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${checked ? 'bg-[#6366F1]' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${checked ? 'left-5' : 'left-0.5'}`} />
    </button>
  );
};

export default Settings;