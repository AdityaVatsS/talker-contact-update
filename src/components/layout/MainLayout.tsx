import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-[280px] overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;