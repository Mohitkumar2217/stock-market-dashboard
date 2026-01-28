import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { DashboardContent } from './components/DashboardContent';
import { MarketsPage } from './pages/MarketPage';
import { PortfolioPage } from './pages/PortFolioPage';
import { SettingsPage } from './pages/Settings';
import { Menu, X, RefreshCw } from 'lucide-react';

export default function App() {
  // Removed TypeScript type definitions
  const [currency, setCurrency] = useState('USD');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Update timestamp every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setLastUpdate(new Date());
      // Short delay to show the refresh animation
      setTimeout(() => setIsRefreshing(false), 500);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar
          currency={currency}
          onCurrencyChange={setCurrency}
          isOpen={sidebarOpen}
        />

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Market Overview</h2>
                  <p className="text-sm text-gray-500">
                    Last updated: {lastUpdate.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isRefreshing && (
                  <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                )}
                <span className="text-sm text-gray-500 hidden sm:inline">
                  Auto-refresh: 30s
                </span>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-4 lg:p-8">
            <Routes>
              <Route path="/" element={<DashboardContent currency={currency} />} />
              <Route path="/markets" element={<MarketsPage currency={currency} />} />
              <Route path="/portfolio" element={<PortfolioPage currency={currency} />} />
              <Route path="/settings" element={<SettingsPage currency={currency} onCurrencyChange={setCurrency} />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}