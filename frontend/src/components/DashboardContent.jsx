import React, { useState, useEffect } from 'react';
import { StatsCard } from './StatsCard';
import { ChartWidget } from './ChartWidget';
import { MarketTable } from './MarketTable';
import { generateMockAssets, updateAssetPrices, generateHistoricalData } from '../utils/mockData';
import { convertCurrency, formatCurrency, formatLargeNumber } from '../utils/currency';
import { 
  TrendingUp, 
  DollarSign, 
  Activity, 
  BarChart3 
} from 'lucide-react';

export function DashboardContent({ currency }) {
  // Removed TypeScript type annotations
  const [assets, setAssets] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState('btc');
  const [chartData, setChartData] = useState([]);

  // Initialize data
  useEffect(() => {
    const initialAssets = generateMockAssets();
    setAssets(initialAssets);
    updateChartData('btc');
  }, []);

  // Update chart data function - removed string type annotation
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
      setAssets(prevAssets => updateAssetPrices(prevAssets));
      
      // Update chart data for selected asset
      if (selectedAssetId) {
        updateChartData(selectedAssetId);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedAssetId, currency]); // Added currency to dependency to refresh chart on toggle

  const handleAssetSelect = (assetId) => {
    setSelectedAssetId(assetId);
    updateChartData(assetId);
  };

  // Calculate stats - logic remains same, types removed
  const selectedAsset = assets.find(a => a.id === selectedAssetId);
  const totalMarketCap = assets.reduce((sum, asset) => sum + asset.marketCap, 0);
  const total24hVolume = assets.reduce((sum, asset) => sum + asset.volume24h, 0);
  
  const avgChange = assets.length > 0 
    ? assets.reduce((sum, asset) => sum + asset.changePercent24h, 0) / assets.length 
    : 0;

  const convertedMarketCap = convertCurrency(totalMarketCap, 'USD', currency);
  const convertedVolume = convertCurrency(total24hVolume, 'USD', currency);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Market Cap"
          value={formatLargeNumber(convertedMarketCap, currency)}
          change={`${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}% (24h)`}
          changeType={avgChange >= 0 ? 'positive' : 'negative'}
          icon={DollarSign}
          iconColor="bg-blue-500"
        />
        <StatsCard
          title="24h Trading Volume"
          value={formatLargeNumber(convertedVolume, currency)}
          icon={Activity}
          iconColor="bg-purple-500"
        />
        <StatsCard
          title="Active Markets"
          value={assets.length.toString()}
          change="+2 this week"
          changeType="positive"
          icon={BarChart3}
          iconColor="bg-green-500"
        />
        {selectedAsset && (
          <StatsCard
            title={`${selectedAsset.symbol} Price`}
            value={formatCurrency(convertCurrency(selectedAsset.currentPrice, 'USD', currency), currency)}
            change={`${selectedAsset.changePercent24h >= 0 ? '+' : ''}${selectedAsset.changePercent24h.toFixed(2)}%`}
            changeType={selectedAsset.changePercent24h >= 0 ? 'positive' : 'negative'}
            icon={TrendingUp}
            iconColor="bg-orange-500"
          />
        )}
      </div>

      {/* Charts Section */}
      {selectedAsset && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWidget
            data={chartData}
            title={`${selectedAsset.name} - Price Trend (7 Days)`}
            type="area"
            currency={currency}
            color={selectedAsset.changePercent24h >= 0 ? '#10b981' : '#ef4444'}
          />
          <ChartWidget
            data={chartData}
            title={`${selectedAsset.name} - Volume (7 Days)`}
            type="bar"
            currency={currency}
            color="#8b5cf6"
          />
        </div>
      )}

      {/* Market Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Markets</h3>
        </div>
        <MarketTable
          assets={assets}
          currency={currency}
          onSelectAsset={handleAssetSelect}
          selectedAssetId={selectedAssetId}
        />
      </div>
    </div>
  );
}