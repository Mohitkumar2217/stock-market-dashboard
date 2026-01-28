import React from 'react';
import { convertCurrency, formatCurrency, formatLargeNumber } from '../utils/currency';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MarketTable({ assets, currency, onSelectAsset, selectedAssetId }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                Asset
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                Type
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">
                Price
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">
                24h Change
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">
                Market Cap
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">
                Volume (24h)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assets.map(asset => {
              const convertedPrice = convertCurrency(asset.currentPrice, 'USD', currency);
              const convertedMarketCap = convertCurrency(asset.marketCap, 'USD', currency);
              const convertedVolume = convertCurrency(asset.volume24h, 'USD', currency);
              const isPositive = asset.changePercent24h >= 0;
              const isSelected = asset.id === selectedAssetId;

              return (
                <tr 
                  key={asset.id}
                  onClick={() => onSelectAsset(asset.id)}
                  className={`hover:bg-blue-50/30 cursor-pointer transition-all duration-200 ${
                    isSelected ? 'bg-blue-50 ring-1 ring-inset ring-blue-200' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{asset.symbol}</span>
                        <span className="text-xs text-gray-500">{asset.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md tracking-wider ${
                      asset.type === 'crypto' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                    {formatCurrency(convertedPrice, currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className={`flex items-center justify-end gap-1.5 font-bold ${
                      isPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {isPositive ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      <span className="text-sm">
                        {isPositive ? '+' : ''}{asset.changePercent24h.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                    {formatLargeNumber(convertedMarketCap, currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                    {formatLargeNumber(convertedVolume, currency)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}