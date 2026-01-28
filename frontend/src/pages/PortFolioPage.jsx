import React, { useState } from 'react';
import { convertCurrency, formatCurrency, formatLargeNumber } from '../utils/currency';
import { TrendingUp, TrendingDown, Wallet, DollarSign, PieChart } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

export function PortfolioPage({ currency }) {
  // Removed TypeScript Holding interface and type annotation
  const [holdings] = useState([
    {
      id: 'btc',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.5,
      avgPrice: 43000,
      currentPrice: 45000,
      type: 'crypto',
    },
    {
      id: 'eth',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 5,
      avgPrice: 2300,
      currentPrice: 2400,
      type: 'crypto',
    },
    {
      id: 'aapl',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      amount: 10,
      avgPrice: 175,
      currentPrice: 182,
      type: 'stock',
    },
    {
      id: 'tsla',
      symbol: 'TSLA',
      name: 'Tesla',
      amount: 5,
      avgPrice: 240,
      currentPrice: 248,
      type: 'stock',
    },
  ]);

  // Calculate portfolio stats
  const totalValue = holdings.reduce((sum, h) => sum + h.amount * h.currentPrice, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.amount * h.avgPrice, 0);
  const totalGain = totalValue - totalCost;
  const totalGainPercent = (totalGain / totalCost) * 100;

  // Prepare pie chart data
  const pieData = holdings.map(h => ({
    name: h.symbol,
    value: h.amount * h.currentPrice,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Portfolio</h1>
        <p className="text-gray-500">Monitor your investments and performance</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm font-medium">Total Value</p>
            <Wallet className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold">
            {formatLargeNumber(convertCurrency(totalValue, 'USD', currency), currency)}
          </h3>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm font-medium">Total Cost</p>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold">
            {formatLargeNumber(convertCurrency(totalCost, 'USD', currency), currency)}
          </h3>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm font-medium">Total Gain/Loss</p>
            {totalGain >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
          </div>
          <h3 className={`text-2xl font-bold ${totalGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {formatCurrency(Math.abs(convertCurrency(totalGain, 'USD', currency)), currency)}
          </h3>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm font-medium">Return</p>
            <PieChart className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className={`text-2xl font-bold ${totalGainPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalGainPercent >= 0 ? '+' : ''}{totalGainPercent.toFixed(2)}%
          </h3>
        </div>
      </div>

      {/* Portfolio Allocation Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Portfolio Allocation</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  // Removed TypeScript number annotation
                  formatter={(value) =>
                    formatCurrency(convertCurrency(value, 'USD', currency), currency)
                  }
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Asset Distribution</h3>
          <div className="space-y-5">
            {holdings.map((holding, index) => {
              const value = holding.amount * holding.currentPrice;
              const percentage = (value / totalValue) * 100;
              return (
                <div key={holding.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700">{holding.symbol}</span>
                    <span className="text-sm font-medium text-gray-500">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
          <h3 className="text-lg font-semibold text-gray-900">Asset Holdings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-left">Asset</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Amount</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Avg Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Current Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Value</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Gain/Loss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {holdings.map(holding => {
                const hValue = holding.amount * holding.currentPrice;
                const hCost = holding.amount * holding.avgPrice;
                const hGain = hValue - hCost;
                const hGainPercent = (hGain / hCost) * 100;

                return (
                  <tr key={holding.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-bold text-gray-900">{holding.symbol}</div>
                        <div className="text-xs text-gray-500">{holding.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-700">
                      {holding.amount}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-600">
                      {formatCurrency(convertCurrency(holding.avgPrice, 'USD', currency), currency)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-600 font-medium">
                      {formatCurrency(convertCurrency(holding.currentPrice, 'USD', currency), currency)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                      {formatCurrency(convertCurrency(hValue, 'USD', currency), currency)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={hGain >= 0 ? 'text-green-600' : 'text-red-600'}>
                        <div className="text-sm font-bold">
                          {hGain >= 0 ? '+' : ''}
                          {formatCurrency(Math.abs(convertCurrency(hGain, 'USD', currency)), currency)}
                        </div>
                        <div className="text-xs font-medium">
                          {hGainPercent >= 0 ? '+' : ''}{hGainPercent.toFixed(2)}%
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}