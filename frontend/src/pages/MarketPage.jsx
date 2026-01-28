import React, { useState, useEffect } from 'react';
import { MarketTable } from '../components/MarketTable';
import { generateMockAssets, updateAssetPrices } from '../utils/mockData';
import { Search, SlidersHorizontal, TrendingUp, TrendingDown } from 'lucide-react';

export function MarketsPage({ currency }) {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Initialize and auto-refresh data
  useEffect(() => {
    const initialAssets = generateMockAssets();
    setAssets(initialAssets);

    const interval = setInterval(() => {
      setAssets(prevAssets => updateAssetPrices(prevAssets));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Filter and sort assets logic
  const filteredAssets = assets
    .filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || asset.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.currentPrice - a.currentPrice;
        case 'change':
          return b.changePercent24h - a.changePercent24h;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Calculate top movers
  const gainers = [...assets]
    .sort((a, b) => b.changePercent24h - a.changePercent24h)
    .slice(0, 3);

  const losers = [...assets]
    .sort((a, b) => a.changePercent24h - b.changePercent24h)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Markets</h1>
        <p className="text-gray-500">Track and analyze market performance</p>
      </div>

      {/* Top Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold">Top Gainers</h3>
          </div>
          <div className="space-y-4">
            {gainers.map(asset => (
              <div key={asset.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase">{asset.symbol}</p>
                  <p className="text-xs text-gray-400">{asset.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-500">
                    +{asset.changePercent24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold">Top Losers</h3>
          </div>
          <div className="space-y-4">
            {losers.map(asset => (
              <div key={asset.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase">{asset.symbol}</p>
                  <p className="text-xs text-gray-400">{asset.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-500">
                    {asset.changePercent24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Type Filter Buttons */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {['all', 'crypto', 'stock'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                    filterType === type
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
              <SlidersHorizontal className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-medium focus:outline-none"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="change">Sort by 24h Change</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Market Table Component */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <MarketTable
          assets={filteredAssets}
          currency={currency}
          onSelectAsset={() => {}}
        />
      </div>
    </div>
  );
}