# 📈 Crypto Market Dashboard

A high-performance, responsive financial dashboard built with **React**, **Tailwind CSS**, and **Recharts**. This project demonstrates real-time data simulation, complex data visualization, and multi-currency support in a modern "FinTech" UI.

## ## ✨ Key Features

* **Real-time Data Simulation:** Prices and market trends update every 30 seconds to simulate a live market feed.
* **Interactive Visualizations:** Uses `Recharts` to render Area, Line, and Bar charts for price history and trading volume.
* **Multi-Currency Engine:** Instant global toggle between **USD**, **INR**, and **EUR** with automatic formatting (symbols like ₹, $, €).
* **Responsive Layout:** A "Mobile-First" design featuring a persistent sidebar on desktop and a slide-out menu on mobile.
* **Asset Management:** dedicated views for Market rankings, Portfolio tracking, and User settings.

---

## ## 🚀 Tech Stack

| Category | Technology |
| --- | --- |
| **Frontend** | React (JSX) |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Routing** | React Router DOM |
| **State** | React Hooks (useState, useEffect, useCallback) |

---

## ## 📂 Project Structure

```text
src/
├── components/
│   ├── Sidebar.jsx        # Navigation & Currency Toggle
│   ├── StatsCard.jsx      # KPI summary cards
│   ├── ChartWidget.jsx    # Area/Line/Bar Recharts logic
│   └── MarketTable.jsx    # Interactive asset list
├── pages/
│   ├── MarketsPage.jsx    # Global market overview
│   ├── PortfolioPage.jsx  # Personal holdings & allocation
│   └── SettingsPage.jsx   # User preferences
├── utils/
│   ├── currency.js        # Formatting & conversion logic
│   └── mockData.js        # Historical & live simulation engines
└── App.jsx                # Main Router & Layout shell

```

---

## ## 🛠️ Setup Instructions

### **1. Prerequisites**

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### **2. Installation**

Clone the repository and install the dependencies:

```bash
npm install

```

### **3. Dependencies**

This project requires the following packages:

```bash
npm install lucide-react recharts react-router-dom

```

### **4. Running the Application**

Start the development server:

```bash
npm start

```

The application will be available at `http://localhost:3000`.

---

## ## 📊 Simulation Logic

The dashboard uses a **Volatility-Based Simulation** located in `utils/mockData.js`.

* **Initial Load:** Generates 168 hourly data points (7 days) for each asset.
* **Live Updates:** Every 30 seconds, the `updateAssetPrices` function applies a random  fluctuation to the current price, triggering a re-render across all currency-aware components.

> **Note:** To connect this to a real API, you can replace the mock calls in `DashboardContent.jsx` with `fetch()` calls to the CoinGecko or Binance API.

---

## ## 📝 Future Roadmap

* [ ] **WebSockets:** Implement real-time socket connections for sub-second price updates.
* [ ] **Dark Mode:** Add a global theme provider for high-contrast viewing.
* [ ] **Alerts:** Allow users to set price thresholds that trigger browser notifications.
 