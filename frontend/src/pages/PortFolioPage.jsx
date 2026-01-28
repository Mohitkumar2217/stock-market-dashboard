import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid } from 'recharts';
import { TrendingUp, Award, Activity, Percent } from 'lucide-react';

const PortfolioPage = () => {
  // Data for Portfolio Allocation (Pie Chart)
  const allocationData = [
    { name: 'BTC', value: 50, color: '#6366F1' },
    { name: 'ETH', value: 25, color: '#A855F7' },
    { name: 'SOL', value: 15, color: '#EF4444' },
    { name: 'AAPL', value: 10, color: '#F59E0B' },
  ];

  // Data for Asset Distribution (Horizontal Bar)
  const distributionData = [
    { name: 'BTC', percentage: 100, color: '#6366F1' },
    { name: 'ETH', percentage: 71.3, color: '#A855F7' },
    { name: 'BNB', percentage: 4.8, color: '#F59E0B' },
    { name: 'SOL', percentage: 3.2, color: '#EF4444' },
  ];

  const stats = [
    { label: 'Total Value', value: '$20.46T', change: '+0.02% (24h)', color: 'bg-orange-400', icon: <Award size={18} /> },
    { label: 'Total Cost', value: '$34.16B', change: '', color: 'bg-red-500', icon: <Activity size={18} /> },
    { label: 'Total Gain/Loss', value: '$1,610.00', change: '+2 this week', color: 'bg-green-500', icon: <TrendingUp size={18} /> },
    { label: 'Return', value: '+4.48%', change: '', color: 'bg-blue-600', icon: <Percent size={18} /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-gray-800">Portfolio</h2>
        <p className="text-sm text-gray-500">Monitor your investments and performance</p>
      </header>

      {/* 1. Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between relative overflow-hidden">
            <div className="z-10">
              <p className="text-[10px] text-gray-400 font-bold uppercase">{s.label}</p>
              <h3 className="text-xl font-extrabold mt-1 text-gray-800">{s.value}</h3>
              <p className="text-[10px] text-green-500 font-bold mt-1">{s.change}</p>
            </div>
            <div className={`${s.color} w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-lg`}>
              {s.icon}
            </div>
            <div className={`absolute bottom-0 left-0 w-full h-1 ${s.color} opacity-20`} />
          </div>
        ))}
      </div>

      {/* 2. Top Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Allocation Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80">
          <h4 className="text-[10px] font-bold text-gray-400 text-center uppercase mb-4">Portfolio Allocation</h4>
          <div className="h-full">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={allocationData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 text-[10px] font-bold text-gray-500 uppercase">
              {allocationData.map(d => <span key={d.name}>{d.name} {d.value}%</span>)}
            </div>
          </div>
        </div>

        {/* Asset Distribution Horizontal Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80">
          <h4 className="text-[10px] font-bold text-gray-400 text-center uppercase mb-4">Asset Distribution</h4>
          <div className="h-full">
            <ResponsiveContainer width="100%" height="90%">
              <BarChart layout="vertical" data={distributionData} margin={{ left: 40, right: 40 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="percentage" radius={[0, 4, 4, 0]} barSize={8}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. My Holdings Area Chart */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-700 mb-6">My Holdings</h3>
        <div className="h-72">
          <h4 className="text-center text-[10px] font-bold text-gray-400 uppercase mb-4">Portfolio Asset Value Over Time</h4>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { name: 'Mon', value: 300 }, { name: 'Tue', value: 450 },
              { name: 'Wed', value: 380 }, { name: 'Thu', value: 520 },
              { name: 'Fri', value: 480 }, { name: 'Sat', value: 600 },
              { name: 'Sun', value: 550 }
            ]}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
              <YAxis hide />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;