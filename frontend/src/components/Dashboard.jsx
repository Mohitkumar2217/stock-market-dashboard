import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { StatsCard } from './StatsCard';
import { ChartWidget } from './ChartWidget';
import { MarketTable } from './MarketTable';
import { generateMockAssets, updateAssetPrices, generateHistoricalData } from '../utils/mockData';
import { convertCurrency, formatCurrency, formatLargeNumber } from '../utils/currency';
import { 
  TrendingUp, 
  DollarSign, 
  Activity, 
  BarChart3,
  Menu,
  X,
  RefreshCw
} from 'lucide-react';

export function Dashboard() {
  // Removed TypeScript generic types
  const [currency, setCurrency] = useState('USD');
  const [assets, setAssets] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState('btc');
  const [chartData, setChartData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initialize data
  useEffect(() => {
    const initialAssets = generateMockAssets();
    setAssets(initialAssets);
    updateChartData('btc');
  }, []);

  // Update chart data function - removed type annotations
  const updateChartData = (assetId) => {
    const historicalData = generateHistoricalData(assetId);
    
    // Sample data to show last 7 days (one point per day)
    const sampledData = historicalData.filter((_, index) => index % 24 === 0);
    
    const formatted = sampledData.map(point => ({
      date: new Date(point.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: convertCurrency(point.price, 'USD', currency),
      volume: convertCurrency(point.volume, 'USD', currency),
    }));
    
    setChartData(formatted);
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setAssets(prevAssets => updateAssetPrices(prevAssets));
      setLastUpdate(new Date());
      
      if (selectedAssetId) {
        updateChartData(selectedAssetId);
      }
      
      setTimeout(() => setIsRefreshing(false), 500);
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedAssetId, currency]);

  const handleAssetSelect = (assetId) => {
    setSelectedAssetId(assetId);
    updateChartData(assetId);
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    updateChartData(selectedAssetId);
  };

  // Calculate global stats
  const selectedAsset = assets.find(a => a.id === selectedAssetId);
  const totalMarketCap = assets.reduce((sum, asset) => sum + asset.marketCap, 0);
  const total24hVolume = assets.reduce((sum, asset) => sum + asset.volume24h, 0);
  const avgChange = assets.length > 0 
    ? assets.reduce((sum, asset) => sum + asset.changePercent24h, 0) / assets.length 
    : 0;

  const convertedMarketCap = convertCurrency(totalMarketCap, 'USD', currency);
  const convertedVolume = convertCurrency(total24hVolume, 'USD', currency);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-900">
      {/* Sidebar */}
      <Sidebar 
        currency={currency} 
        onCurrencyChange={handleCurrencyChange}
        isOpen={sidebarOpen}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
              </button>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Market Overview</h2>
                <p className="text-xs text-slate-500 font-medium">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              {isRefreshing && (
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
              )}
              <span className="text-xs font-bold text-slate-600 hidden sm:inline uppercase tracking-wider">
                Live Feed: 30s
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8 space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Market Cap"
              value={formatLargeNumber(convertedMarketCap, currency)}
              change={`${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}% (24h)`}
              changeType={avgChange >= 0 ? 'positive' : 'negative'}
              icon={DollarSign}
              iconColor="bg-blue-600"
            />
            <StatsCard
              title="24h Trading Volume"
              value={formatLargeNumber(convertedVolume, currency)}
              icon={Activity}
              iconColor="bg-indigo-600"
            />
            <StatsCard
              title="Active Markets"
              value={assets.length.toString()}
              change="+2 this week"
              changeType="positive"
              icon={BarChart3}
              iconColor="bg-emerald-600"
            />
            {selectedAsset && (
              <StatsCard
                title={`${selectedAsset.symbol} Current Price`}
                value={formatCurrency(convertCurrency(selectedAsset.currentPrice, 'USD', currency), currency)}
                change={`${selectedAsset.changePercent24h >= 0 ? '+' : ''}${selectedAsset.changePercent24h.toFixed(2)}%`}
                changeType={selectedAsset.changePercent24h >= 0 ? 'positive' : 'negative'}
                icon={TrendingUp}
                iconColor="bg-orange-500"
              />
            )}
          </div>

          {/* Visualization Widgets */}
          {selectedAsset && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-1 rounded-3xl shadow-sm border border-slate-200">
                <ChartWidget
                  data={chartData}
                  title={`${selectedAsset.name} Price (7D)`}
                  type="area"
                  currency={currency}
                  color={selectedAsset.changePercent24h >= 0 ? '#10b981' : '#ef4444'}
                />
              </div>
              <div className="bg-white p-1 rounded-3xl shadow-sm border border-slate-200">
                <ChartWidget
                  data={chartData}
                  title={`${selectedAsset.name} Volume (7D)`}
                  type="bar"
                  currency={currency}
                  color="#6366f1"
                />
              </div>
            </div>
          )}

          {/* Market Listings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-bold text-slate-800">Global Market Rankings</h3>
              <button className="text-sm font-bold text-blue-600 hover:underline">View All Assets</button>
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <MarketTable
                assets={assets}
                currency={currency}
                onSelectAsset={handleAssetSelect}
                selectedAssetId={selectedAssetId}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}