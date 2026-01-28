// currency.js

export const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  INR: 83.12,
};

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  INR: '₹',
};

/**
 * Converts an amount from one currency to another using USD as the base.
 */
export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const usdAmount = amount / EXCHANGE_RATES[fromCurrency];
  return usdAmount * EXCHANGE_RATES[toCurrency];
};

/**
 * Formats a number with 2 decimal places and the appropriate currency symbol.
 */
export const formatCurrency = (amount, currency) => {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
};

/**
 * Formats large financial numbers into readable strings (T, B, M, K).
 */
export const formatLargeNumber = (num, currency) => {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  
  if (num >= 1e12) {
    return `${symbol}${(num / 1e12).toFixed(2)}T`;
  } else if (num >= 1e9) {
    return `${symbol}${(num / 1e9).toFixed(2)}B`;
  } else if (num >= 1e6) {
    return `${symbol}${(num / 1e6).toFixed(2)}M`;
  } else if (num >= 1e3) {
    return `${symbol}${(num / 1e3).toFixed(2)}K`;
  }
  
  return formatCurrency(num, currency);
};