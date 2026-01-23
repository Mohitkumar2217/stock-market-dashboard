import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard.jsx';
import MarketPage from './pages/MarketPage.jsx';
import DashboardHome from "./pages/DashboardHome.jsx";
import PortfolioPage from "./pages/PortFolioPage.jsx";
import Settings from "./pages/Settings.jsx";
function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard acts as the Layout wrapper for all these routes */}
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<DashboardHome />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="market" element={<MarketPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;