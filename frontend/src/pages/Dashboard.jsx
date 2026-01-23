import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../layout/Sidebar'; // Adjust path based on your folder structure
import Navbar from '../layout/Navbar';

const Dashboard = () => {
  const location = useLocation();
  
  // Dynamically set title based on the route
  const getTitle = () => {
    if (location.pathname.includes('market')) return "Market Performance";
    if (location.pathname.includes('portfolio')) return "My Portfolio";
    if (location.pathname.includes('settings')) return "Settings";
    return "Market Overview";
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title={getTitle()} />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;