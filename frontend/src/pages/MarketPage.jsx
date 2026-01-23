import React from 'react';
import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const MarketPage = () => {
  // Mock data for the Area Chart
  const marketCapData = [
    { time: '0', value: 200000 }, { time: 'Mon', value: 250000 },
    { time: 'Tues', value: 220000 }, { time: 'Wed', value: 380000 },
    { time: 'Thu', value: 300000 }, { time: 'Fri', value: 350000 },
    { time: 'Sat', value: 420000 }, { time: 'Sun', value: 400000 },
  ];

  const gainers = [
    { symbol: 'XRP', name: 'Ripple', change: '+1.23%', color: 'text-green-500' },
    { symbol: 'GOOGL', name: 'Alphabet', change: '+0.58%', color: 'text-green-500' },
    { symbol: 'MSFT', name: 'Microsoft', change: '+0.13%', color: 'text-green-500' },
  ];

  const losers = [
    { symbol: 'SOL', name: 'Solana', change: '-1.13%', color: 'text-red-500' },
    { symbol: 'AAPL', name: 'Apple Inc.', change: '-0.38%', color: 'text-red-500' },
    { symbol: 'NVDA', name: 'NVIDIA', change: '-0.11%', color: 'text-red-500' },
  ];

  const marketData = [
    { asset: 'BTC', name: 'Bitcoin', type: 'crypto', price: '$44,941.37', change: '-0.13%', cap: '$8.39T', volume: '$3.54B' },
    { asset: 'ETH', name: 'Ethereum', type: 'crypto', price: '$2,403.84', change: '+0.15%', cap: '$1.11T', volume: '$5.86B' },
    { asset: 'BNB', name: 'Binance Coin', type: 'crypto', price: '$319.71', change: '-0.33%', cap: '$235.45B', volume: '$5.73B' },
    { asset: 'AAPL', name: 'Apple Inc.', type: 'stock', price: '$180.32', change: '-0.38%', cap: '$105.80B', volume: '$5.77B' },
    { asset: 'MSFT', name: 'Microsoft', type: 'stock', price: '$377.52', change: '-0.13%', cap: '$77.64B', volume: '$2.78B' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Title Section */}
      <header>
        <h2 className="text-2xl font-bold text-gray-800">Markets</h2>
        <p className="text-sm text-gray-500">Track and analyze market performance</p>
      </header>

      {/* Top Gainers & Losers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PerformanceCard title="Top Gainers" data={gainers} isGainer={true} />
        <PerformanceCard title="Top Losers" data={losers} isGainer={false} />
      </div>

      {/* Marketcap Chart Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-center text-gray-700 mb-8">Crypto Marketcap Over Time</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketCapData}>
              <defs>
                <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#ef4444" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorMarket)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Assets Table */}
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
              {marketData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="font-bold text-gray-800 group-hover:text-[#6366F1] transition-colors">{row.asset}</div>
                    <div className="text-[10px] text-gray-400">{row.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      row.type === 'crypto' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">{row.price}</td>
                  <td className={`px-6 py-4 font-bold ${row.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                    <div className="flex items-center gap-1">
                      {row.change.startsWith('-') ? <TrendingDown size={14}/> : <TrendingUp size={14}/>}
                      {row.change}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{row.cap}</td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{row.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-6 border-t flex justify-center items-center gap-2">
          <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><ChevronLeft size={18}/></button>
          <button className="w-8 h-8 rounded-lg bg-black text-white text-xs font-bold">1</button>
          <button className="w-8 h-8 rounded-lg text-gray-400 text-xs font-bold hover:bg-gray-100">2</button>
          <button className="w-8 h-8 rounded-lg text-gray-400 text-xs font-bold hover:bg-gray-100">3</button>
          <span className="text-gray-300">...</span>
          <button className="w-8 h-8 rounded-lg text-gray-400 text-xs font-bold hover:bg-gray-100">68</button>
          <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><ChevronRight size={18}/></button>
        </div>
      </div>
    </div>
  );
};

// Internal Helper Component for Gainers/Losers
const PerformanceCard = ({ title, data, isGainer }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex items-center gap-2 mb-6">
      {isGainer ? <TrendingUp size={18} className="text-green-500" /> : <TrendingDown size={18} className="text-red-500" />}
      <h4 className="font-bold text-sm text-gray-700">{title}</h4>
    </div>
    <div className="space-y-5">
      {data.map((item, i) => (
        <div key={i} className="flex justify-between items-center">
          <div>
            <p className="font-bold text-sm text-gray-800">{item.symbol}</p>
            <p className="text-[10px] text-gray-400 font-medium">{item.name}</p>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isGainer ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {item.change}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default MarketPage;