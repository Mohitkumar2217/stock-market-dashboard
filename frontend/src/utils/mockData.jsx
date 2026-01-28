// mockData.js

const ASSETS_BASE = [
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', type: 'crypto' },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', type: 'crypto' },
  { id: 'bnb', symbol: 'BNB', name: 'Binance Coin', type: 'crypto' },
  { id: 'sol', symbol: 'SOL', name: 'Solana', type: 'crypto' },
  { id: 'xrp', symbol: 'XRP', name: 'Ripple', type: 'crypto' },
  { id: 'aapl', symbol: 'AAPL', name: 'Apple Inc.', type: 'stock' },
  { id: 'msft', symbol: 'MSFT', name: 'Microsoft', type: 'stock' },
  { id: 'googl', symbol: 'GOOGL', name: 'Alphabet', type: 'stock' },
  { id: 'tsla', symbol: 'TSLA', name: 'Tesla', type: 'stock' },
  { id: 'nvda', symbol: 'NVDA', name: 'NVIDIA', type: 'stock' },
];

const BASE_PRICES = {
  btc: 45000,
  eth: 2400,
  bnb: 320,
  sol: 98,
  xrp: 0.62,
  aapl: 182,
  msft: 378,
  googl: 142,
  tsla: 248,
  nvda: 495,
};

/**
 * Generates a random price fluctuation based on a base price and volatility.
 */
export const generatePriceFluctuation = (basePrice, volatility = 0.02) => {
  const change = (Math.random() - 0.5) * 2 * volatility * basePrice;
  return basePrice + change;
};

/**
 * Generates historical data for 7 days (hourly data points).
 */
export const generateHistoricalData = (assetId) => {
  const basePrice = BASE_PRICES[assetId] || 100;
  const points = [];
  const now = Date.now();
  const hoursInWeek = 7 * 24;
  
  let currentPrice = basePrice;
  
  for (let i = hoursInWeek; i >= 0; i--) {
    const timestamp = now - i * 60 * 60 * 1000;
    currentPrice = generatePriceFluctuation(currentPrice, 0.01);
    const volume = Math.random() * 1000000000 + 500000000;
    
    points.push({
      timestamp,
      price: currentPrice,
      volume,
    });
  }
  
  return points;
};

/**
 * Creates the initial list of assets with full market data.
 */
export const generateMockAssets = () => {
  return ASSETS_BASE.map(asset => {
    const basePrice = BASE_PRICES[asset.id];
    const currentPrice = generatePriceFluctuation(basePrice, 0.005);
    const openPrice = basePrice;
    const change24h = currentPrice - openPrice;
    const changePercent24h = (change24h / openPrice) * 100;
    
    return {
      ...asset,
      currentPrice,
      change24h,
      changePercent24h,
      marketCap: currentPrice * (Math.random() * 1000000000 + 100000000),
      volume24h: Math.random() * 5000000000 + 1000000000,
      high24h: currentPrice * (1 + Math.random() * 0.05),
      low24h: currentPrice * (1 - Math.random() * 0.05),
    };
  });
};

/**
 * Simulates a "Live" price update for an existing array of assets.
 */
export const updateAssetPrices = (assets) => {
  return assets.map(asset => {
    const newPrice = generatePriceFluctuation(asset.currentPrice, 0.003);
    const openPrice = BASE_PRICES[asset.id];
    const change24h = newPrice - openPrice;
    const changePercent24h = (change24h / openPrice) * 100;
    
    return {
      ...asset,
      currentPrice: newPrice,
      change24h,
      changePercent24h,
      high24h: Math.max(asset.high24h, newPrice),
      low24h: Math.min(asset.low24h, newPrice),
    };
  });
};