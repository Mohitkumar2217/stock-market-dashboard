import React from 'react';

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  iconColor = 'bg-blue-500'
}) {
  // Mapping the change color classes without TypeScript annotations
  const changeColorClass = {
    positive: 'text-green-500',
    negative: 'text-red-500',
    neutral: 'text-gray-500',
  }[changeType];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-1 uppercase tracking-tight">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{value}</h3>
          {change && (
            <p className={`text-sm font-semibold ${changeColorClass}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`${iconColor} p-3 rounded-xl shadow-lg transition-transform group-hover:scale-110`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}