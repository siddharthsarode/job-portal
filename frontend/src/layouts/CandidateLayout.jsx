import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import SideBar from "../components/SideBar";
import { candidateLinks } from "../helpers/componentLinks";
import useAuth from "../hooks/useAuth";

const CandidateLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-light">
      <ToastContainer />
      {/* sidebar */}
      <SideBar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        actionLinks={candidateLinks}
      />

      {/* Main content */}
      <div className="flex-1 md:ml-64 w-full">
        {/* Sidebar menu button */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
          <button onClick={toggleSidebar} className="text-dark text-2xl">
            <FiMenu />
          </button>
          <h1 className="text-lg font-bold text-primary">
            {user?.username || "Candidate Panel"}
          </h1>
        </div>
        {/* Page Content */}
        <main className="p-4 min-h-screen bg-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CandidateLayout;
