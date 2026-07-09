import { Box, IconButton, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeftCircle, X } from "lucide-react";
import logo2 from "../../assets/images/CollapseLogo.svg";
import logo from "../../assets/images/Logo.svg";
import Truck from "../../assets/icons/deliverytruck.svg";
import LayoutIconBlack from "../../assets/icons/layoutIconBlack.svg";
import LayoutIconWhite from "../../assets/icons/layoutIconWhite.svg";
import ListCheck from "../../assets/icons/Frame.svg";
import ListCheckWhite from "../../assets/icons/ListCheckWhite.svg";
import fuel from "../../assets/icons/fuel.svg";
import fuelwhite from "../../assets/icons/fuelwhite.svg";
import material from "../../assets/icons/material.svg";
import materialwhite from "../../assets/icons/materialwhite.svg";
import truckwhite from "../../assets/icons/hugeicons_pickup-01.svg";
import truckwhite2 from "../../assets/icons/hugeicons_pickup.svg";
import usersblack from "../../assets/icons/users.svg";
import userswhite from "../../assets/icons/userWhite.svg";
import code from "../../assets/icons/pepicons-pencil_code.svg";
import codewhite from "../../assets/icons/pepicons-pencil_code_white.svg";

const TruckWhite = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 18C8.53043 18 9.03914 17.7893 9.41421 17.4142C9.78929 17.0391 10 16.5304 10 16C10 15.4696 9.78929 14.9609 9.41421 14.5858C9.03914 14.2107 8.53043 14 8 14C7.46957 14 6.96086 14.2107 6.58579 14.5858C6.21071 14.9609 6 15.4696 6 16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18ZM18 18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16C20 15.4696 19.7893 14.9609 19.4142 14.5858C19.0391 14.2107 18.5304 14 18 14C17.4696 14 16.9609 14.2107 16.5858 14.5858C16.2107 14.9609 16 15.4696 16 16C16 16.5304 16.2107 17.0391 16.5858 17.4142C16.9609 17.7893 17.4696 18 18 18Z"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.05 16H15V5.6C15 5.44087 14.9368 5.28826 14.8243 5.17574C14.7117 5.06321 14.5591 5 14.4 5H1M5.65 16H3.6C3.52121 16 3.44319 15.9845 3.37039 15.9543C3.29759 15.9242 3.23145 15.88 3.17574 15.8243C3.12002 15.7685 3.07583 15.7024 3.04567 15.6296C3.01552 15.5568 3 15.4788 3 15.4V10.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M2 8H6"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 8H20.61C20.726 8.00003 20.8395 8.03367 20.9367 8.09685C21.034 8.16003 21.1108 8.25005 21.158 8.356L22.948 12.384C22.9821 12.4605 22.9998 12.5433 23 12.627V15.4C23 15.4788 22.9845 15.5568 22.9543 15.6296C22.9242 15.7024 22.88 15.7685 22.8243 15.8243C22.7685 15.88 22.7024 15.9242 22.6296 15.9543C22.5568 15.9845 22.4788 16 22.4 16H20.5M15 16H16"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  setIsMobileOpen?: (open: boolean) => void;
}

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutIconBlack,
    activeIcon: LayoutIconWhite,
  },
  { name: "Dispatch", path: "/dispatch", icon: Truck, activeIcon: TruckWhite },
  {
    name: "Assign Loads",
    path: "/assign-loads",
    icon: ListCheck,
    activeIcon: ListCheckWhite,
  },
  {
    name: "PO Code / Job# ID",
    path: "/po-code",
    icon: code,
    activeIcon: codewhite,
  },
  {
    name: "Pickup/Deliver",
    path: "/pickup-deliver",
    icon: truckwhite,
    activeIcon: truckwhite2,
  },
  {
    name: "Materials",
    path: "/materials",
    icon: material,
    activeIcon: materialwhite,
  },
  { name: "FSC", path: "/fsc", icon: fuel, activeIcon: fuelwhite },
  {
    name: "Contractors",
    path: "/contractors",
    icon: usersblack,
    activeIcon: userswhite,
  },
];

const HoverPill = ({
  icon: Icon,
  activeIcon,
  title,
  active,
}: {
  icon: any;
  activeIcon: any;
  title: string;
  active: boolean;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      backgroundColor: active ? "#333333" : "#ffffff",
      borderRadius: "50px",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
      border: "0.5px solid #181818",
      height: "48px",
      paddingRight: "16px",
      position: "fixed",
    }}
  >
    <Box
      sx={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <img
        src={active ? activeIcon : Icon}
        alt=""
        className="h-7 w-7 object-contain"
      />
    </Box>
    <Typography
      sx={{
        color: active ? "#ffffff" : "#181818",
        fontWeight: 500,
        fontSize: "14px",
        whiteSpace: "nowrap",
        fontFamily: "'Archivo', sans-serif",
      }}
    >
      {title}
    </Typography>
  </Box>
);

const SidebarItem = ({
  icon: Icon,
  active,
  title,
  isCollapsed,
  activeIcon,
}: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: isCollapsed ? { xs: "0 16px", lg: 0 } : "0 16px",
        width: "100%",
        justifyContent: isCollapsed
          ? { xs: "flex-start", lg: "center" }
          : "flex-start",
      }}
    >
      <IconButton
        sx={{
          width: isCollapsed ? { xs: "100%", lg: "44px" } : "100%",
          height: isCollapsed ? { xs: "44px", lg: "44px" } : "44px",
          borderRadius: isCollapsed ? { xs: "8px", lg: "50%" } : "8px",
          border: "0.5px solid #181818",
          backgroundColor: isCollapsed
            ? active
              ? "#333333"
              : "#ffffff"
            : active
              ? "#333333"
              : "#ffffff",
          color: active ? "#ffffff" : "#1D3461",
          transition: "all 0.2s ease-in-out",
          justifyContent: isCollapsed
            ? { xs: "flex-start", lg: "center" }
            : "flex-start",
          padding: isCollapsed ? { xs: "0 16px", lg: "8px" } : "0 16px",
          position: "relative",
          "&:hover": {
            backgroundColor: active ? "#333333" : "#ffffff",
          },
          "&:hover .hover-pill": {
            opacity: 1,
            pointerEvents: "auto",
          },
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
          className={isCollapsed ? "lg:justify-center" : ""}
        >
          {/* Icon (always visible on mobile, visible on desktop if collapsed or we add it to expanded too) */}
          {isCollapsed && (
            <img
              src={active ? activeIcon : Icon}
              alt=""
              className={`h-7 w-7 object-contain block`}
            />
          )}
          {/* Text (visible on mobile always, hidden on desktop if collapsed) */}
          <span
            className={`font-medium text-sm whitespace-nowrap text-inherit font-primary ${isCollapsed ? "lg:hidden block" : "block"}`}
          >
            {title}
          </span>
        </Box>

        {/* Hover Pill strictly overlapping */}
        <Box
          className="hover-pill"
          sx={{
            position: "absolute",
            top: "-1px",
            left: "-1px",
            opacity: 0,
            pointerEvents: "none",
            transition: "opacity 0.2s ease-in-out",
            zIndex: 1000,
            display: isCollapsed ? { xs: "none", lg: "block" } : "none",
          }}
        >
          {title && (
            <HoverPill
              icon={Icon}
              activeIcon={activeIcon}
              title={title}
              active={active}
            />
          )}
        </Box>
      </IconButton>
    </Box>
  );
};

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  setIsMobileOpen,
}: SidebarProps) => {
  const location = useLocation();

  return (
    <div
      className={`flex flex-col gap-4 transition-all duration-300 h-full w-[280px] ${
        isCollapsed ? "lg:w-[100px]" : "lg:w-[280px]"
      }`}
    >
      {/* Top Logo Container */}
      <div className="bg-primary rounded-[14px] flex items-center justify-between p-4 h-[80px] shrink-0 shadow-sm">
        <img
          src={isCollapsed ? logo2 : logo}
          alt=""
          className={`hidden lg:block ${isCollapsed ? "w-[35px] h-[40px]" : "max-w-30"}`}
        />
        <img src={logo} alt="" className="lg:hidden max-w-32" />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:block text-white hover:text-gray-300 transition-colors cursor-pointer"
        >
          <ArrowLeftCircle
            size={25}
            strokeWidth={1.5}
            className={`${isCollapsed ? "rotate-180" : ""}`}
          />
        </button>
        <button
          onClick={() => setIsMobileOpen?.(false)}
          className="lg:hidden text-white hover:text-gray-300 transition-colors cursor-pointer"
        >
          <X size={25} strokeWidth={1.5} />
        </button>
      </div>

      {/* Navigation Menu Container */}
      <div className="bg-primary rounded-[14px] flex-1 py-6 flex flex-col gap-3 overflow-y-auto shadow-sm">
        {navItems.map((item) => {
          const isActive = location.pathname.includes(item.path);

          return (
            <Link key={item.name} to={item.path}>
              <SidebarItem
                icon={item.icon}
                active={isActive}
                title={item.name}
                isCollapsed={isCollapsed}
                activeIcon={item.activeIcon}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
