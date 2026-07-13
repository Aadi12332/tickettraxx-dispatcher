import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#F2F2F7] p-[0.2vw] md:p-[0.5vw] gap-[0.8vw] 2xl:gap-4 font-primary overflow-hidden relative">
      {/* Overlay for mobile sidebar */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-[99]"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 transform lg:relative z-[99] lg:translate-x-0 transition-transform duration-300 ease-in-out p-2 md:p-4 lg:p-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          setIsMobileOpen={setIsMobileOpen}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden min-w-0 bg-[#F2F2F7]">
        {/* Header */}
        <Header setIsMobileOpen={setIsMobileOpen} />

        {/* Page Content */}
        <div className="flex-1 mt-4 lg:mt-3 overflow-y-auto px-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
