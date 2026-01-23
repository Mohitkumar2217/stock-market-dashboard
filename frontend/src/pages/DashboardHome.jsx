import React from 'react';
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const DashboardHome = () => {
  // 1. Working Dummy Data for Charts
  const priceData = [
    { name: 'Dec 29', price: 40000 }, { name: 'Dec 31', price: 42000 },
    { name: 'Jan 1', price: 41000 }, { name: 'Jan 2', price: 44000 },
    { name: 'Jan 3', price: 43500 }, { name: 'Jan 5', price: 44901 },
  ];

  const volumeData = [
    { name: 'Oct 28', vol: 100 }, { name: 'Oct 29', vol: 60 },
    { name: 'Oct 30', vol: 40 }, { name: 'Jan 1', vol: 95 },
    { name: 'Jan 2', vol: 70 }, { name: 'Jan 4', vol: 55 },
  ];

  // 2. Statistics Data
  const stats = [
    { label: 'Total Market Cap', value: '$20.46T', change: '+0.02% (24h)', color: 'bg-orange-400', icon: '$' },
    { label: '24h Trading Volume', value: '$34.16B', change: '', color: 'bg-red-500', icon: '📈' },
    { label: 'Active Markets', value: '10', change: '+2 this week', color: 'bg-green-500', icon: '📊' },
    { label: 'BTC Price', value: '$44,901.57', change: '', color: 'bg-blue-600', icon: '₿' },
  ];

  // 3. Asset List Dummy Data
  const assets = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', type: 'crypto', price: '$44,941.37', change: '-0.13%', cap: '$8.39T', volume: '$3.54B' },
    { id: 2, name: 'Ethereum', symbol: 'ETH', type: 'crypto', price: '$2,403.84', change: '+0.15%', cap: '$1.11T', volume: '$5.86B' },
    { id: 3, name: 'Binance Coin', symbol: 'BNB', type: 'crypto', price: '$319.71', change: '-0.33%', cap: '$235.45B', volume: '$5.73B' },
    { id: 4, name: 'Solana', symbol: 'SOL', type: 'crypto', price: '$99.11', change: '+1.13%', cap: '$33.41B', volume: '$5.37B' },
    { id: 5, name: 'Ripple', symbol: 'XRP', type: 'crypto', price: '$0.63', change: '+1.23%', cap: '$396.78B', volume: '$4.25B' },
    { id: 6, name: 'Apple Inc.', symbol: 'AAPL', type: 'stock', price: '$180.32', change: '-0.38%', cap: '$105.80B', volume: '$5.77B' },
    { id: 7, name: 'Microsoft', symbol: 'MSFT', type: 'stock', price: '$377.52', change: '-0.13%', cap: '$77.64B', volume: '$2.78B' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* --- Section 1: Statistics Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-start relative overflow-hidden">
            <div className="z-10">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{s.label}</p>
              <h3 className="text-xl font-extrabold mt-1 text-gray-800">{s.value}</h3>
              <p className="text-[10px] text-green-500 font-bold mt-1">{s.change}</p>
            </div>
            <div className={`${s.color} w-9 h-9 rounded-lg flex items-center justify-center text-white text-lg shadow-lg z-10`}>
              {s.icon}
            </div>
            <div className={`absolute bottom-0 left-0 w-full h-1 ${s.color} opacity-20`} />
          </div>
        ))}
      </div>

      {/* --- Section 2: Dual Charts Row --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Trend Area Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80 flex flex-col">
          <h4 className="text-[10px] font-bold text-gray-400 text-center uppercase mb-6 tracking-widest">Bitcoin - Price Trend (7 Days)</h4>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" hide />
                <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="price" stroke="#ef4444" strokeWidth={3} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volume Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80 flex flex-col">
          <h4 className="text-[10px] font-bold text-gray-400 text-center uppercase mb-6 tracking-widest">Bitcoin - Volume (7 Days)</h4>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="vol" fill="#818cf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- Section 3: Asset List Table --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-gray-800">All Markets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8FAFC] text-gray-400 uppercase text-[10px] tracking-widest font-bold">
              <tr>
                <th className="px-8 py-4">Asset</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">24h Change</th>
                <th className="px-6 py-4">Market Cap</th>
                <th className="px-6 py-4">Volume (24h)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="font-bold text-gray-800">{asset.symbol}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{asset.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      asset.type === 'crypto' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">{asset.price}</td>
                  <td className={`px-6 py-4 font-bold ${asset.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                    <div className="flex items-center gap-1">
                      {asset.change.startsWith('-') ? <TrendingDown size={14}/> : <TrendingUp size={14}/>}
                      {asset.change}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{asset.cap}</td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{asset.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;