import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

// Assumes CURRENCY_SYMBOLS is moved to your converted JS utils
const CURRENCY_SYMBOLS = {
  USD: '$',
  INR: '₹',
  EUR: '€'
};

export function ChartWidget({ 
  data, 
  title, 
  type, 
  currency,
  color = '#3b82f6' 
}) {
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';

  // Custom Tooltip component in JS
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl">
          <p className="text-sm text-gray-600 mb-1">{payload[0].payload.date}</p>
          <p className="text-sm">
            <span className="text-gray-700 font-medium">Price: </span>
            <span className="font-bold text-gray-900">
              {currencySymbol}{Number(payload[0].value).toLocaleString()}
            </span>
          </p>
          {payload[1] && (
            <p className="text-sm">
              <span className="text-gray-700 font-medium">Volume: </span>
              <span className="font-bold text-gray-900">
                {currencySymbol}{(payload[1].value / 1e9).toFixed(2)}B
              </span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11 }}
              stroke="#9ca3af"
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              tick={{ fontSize: 11 }}
              stroke="#9ca3af"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${currencySymbol}${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e5e7eb', strokeWidth: 2 }} />
            <Legend verticalAlign="top" height={36} />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={color} 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Price"
            />
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11 }}
              stroke="#9ca3af"
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              tick={{ fontSize: 11 }}
              stroke="#9ca3af"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${currencySymbol}${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={color} 
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPrice)"
              name="Price"
            />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11 }}
              stroke="#9ca3af"
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              tick={{ fontSize: 11 }}
              stroke="#9ca3af"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${currencySymbol}${(value / 1e9).toFixed(1)}B`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
            <Legend verticalAlign="top" height={36} />
            <Bar 
              dataKey="volume" 
              fill={color}
              name="Volume"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}