import { useState } from "react";
import { Calendar1, Map} from "lucide-react";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardQuickView from "../../components/dashboard/DashboardQuickView";
import RevenueChart from "../../components/dashboard/RevenueChart";
import ShipmentOverview from "../../components/dashboard/ShipmentOverview";
import ShipmentMap from "../../components/dashboard/ShipmentMap";
import DriverTrackingCard from "../../components/dashboard/DrivingTrackingCard";
import driver from "../../assets/images/placeholderUser.svg";
import truck_fast_outline from "../../assets/icons/truck_fast_outline.svg";
import truck from "../../assets/icons/heroicons_truck.svg";
import box from "../../assets/icons/solar_box.svg";
import box2 from "../../assets/icons/proicons_box.svg";
import SectionTitle from "../../components/common/SectionTitle";
import CalendarModal from "../../components/common/modal/CalendorModal";
import LoadsDetailsModal from "../../components/dashboard/modal/LoadsDetailsModal";
import TrucksInTransitModal from "../../components/dashboard/modal/TrucksInTransitModal";
import TrucksDispatchedModal from "../../components/dashboard/modal/TrucksDispatchedModal";
import LoadsRemainingModal from "../../components/dashboard/modal/LoadsRemainingModal";
import LiveShipmentTrackingModal from "../../components/dashboard/modal/LiveShipmentTrackingModal";
import NextInQueueModal from "../../components/dashboard/modal/NextInQueueModal";
import CommonFilterDropdown from "../../components/common/CommonFilterDropdown";

const dashboardStats = [
  {
    type: "loads-dispatched",
    title: "Loads Dispatched Today",
    value: 248,
    change: "+19.01%",
    positive: true,
    icon: box,
    chartBars: [23, 43, 23, 28, 48, 30, 44],
  },
  {
    type: "loads-remaining",
    title: "Loads Remaining Today",
    value: 75,
    change: "-12%",
    positive: false,
    icon: box2,
    chartBars: [9, 43, 23, 15, 28, 30, 38],
  },
  {
    type: "trucks-transit",
    title: "Trucks in Transit",
    value: 30,
    change: "+6%",
    positive: true,
    icon: truck,
    chartBars: [10, 20, 43, 23, 30, 40],
  },
  {
    type: "trucks-dispatched",
    title: "Trucks Dispatched",
    value: 58,
    change: "-16%",
    positive: false,
    icon: truck_fast_outline,
    chartBars: [23, 33, 13, 28, 38, 10, 44],
  },
];
const driverData = {
  name: "Darlee Robertson",
  truckId: "TRK-4582",
  avatar: driver,

  subcontractor: "Ramesh Kapoor",
  status: "In Transit",
  eta: "2h 15m",
  location: "Sunnyvale Park",

  rating: 4.2,
};
const Dashboard = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [isLiveTrackingModalOpen, setIsLiveTrackingModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);

  const handleNextModalOpen = () => {
    setIsNextModalOpen(true);
    setSelectedStat(null);
  };

  const handleNextModalClose = () => {
    setIsNextModalOpen(false);
    setSelectedStat("trucks-transit");
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-wrap gap-3 lg:items-center lg:justify-between">
        <h1 className="text-base md:text-xl 2xl:text-2xl font-semibold text-(--color-text-black) font-primary">
          Dispatch Dashboard
        </h1>

        <button
          onClick={() => setIsCalendarOpen(true)}
          className="bg-white border border-(--border-gray-2) rounded-[5px] px-2 xl:px-4 py-1 xl:py-2 flex items-center gap-3 cursor-pointer w-fit ml-auto"
        >
          <Calendar1 size={16} />
          <span className="text-sm font-normal">15/05/2025 - 21/05/2025</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className=" grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {dashboardStats.map((item) => (
          <DashboardStatCard
            key={item.title}
            {...item}
            onClick={() => setSelectedStat(item.type)}
          />
        ))}
      </div>

      <DashboardQuickView />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-[0.5vw] 2xl:gap-4">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <ShipmentOverview />
      </div>
      <div className=" bg-white border border-(--border-gray-2) rounded-[5px] shadow-sm p-4 lg:p-6">
        {/* Header */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center gap-1 sm:gap-4">
            <SectionTitle
              title="Live Shipment Tracking"
              // className="text-sm md:text-[18px]"
            />
            {/* <button
              onClick={() => setIsLiveTrackingModalOpen(true)}
              className="p-1.5 text-gray-500 hover:text-black rounded-md hover:bg-gray-100 cursor-pointer"
            >
              <Expand size={18} />
            </button> */}
          </div>

          <CommonFilterDropdown
            value={"Darlee Robertson"}
            onChange={() => {}}
            options={[{ label: "Darlee Robertson", value: "Darlee Robertson" }]}
            size="auto"
          />
        </div>

        {/* Content */}
  <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-2 xl:gap-4">
  <div className="min-h-[250px] xl:h-full">
    <ShipmentMap />
  </div>

  <div>
    <DriverTrackingCard data={driverData} />
  </div>
</div>

        {/* Footer Stats */}

        <div className="mt-4 md:text-nowrap flex-wrap flex items-center gap-1 text-[10px] sm:text-[0.8vw]">
          <span className="font-semibold text-text-gray">
            <Map size={16} />
          </span>
          <span className="font-normal">Current Location :</span>

          <span className="text-sky-blue font-normal">Riverbend Terminal</span>

          <span className="text-gray-300">|</span>

          <span>24 hours speed: 80km/h</span>

          <span className="text-gray-300">|</span>

          <span>12 hours speed: 84km/h</span>

          <span className="text-gray-300">|</span>

          <span>Max speed: 104km/h</span>

          <span className="text-gray-300">|</span>

          <span>Avg speed: 82km/h</span>
        </div>
      </div>

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />

      <LoadsDetailsModal
        isOpen={selectedStat === "loads-dispatched"}
        onClose={() => setSelectedStat(null)}
        title={
          dashboardStats.find((stat) => stat.type === "loads-dispatched")?.title
        }
      />
      <LoadsRemainingModal
        isOpen={selectedStat === "loads-remaining"}
        onClose={() => setSelectedStat(null)}
      />
      <TrucksInTransitModal
        isOpen={selectedStat === "trucks-transit"}
        onClose={() => setSelectedStat(null)}
        handleNextModalOpen={handleNextModalOpen}
      />
      <NextInQueueModal
        isOpen={isNextModalOpen}
        onClose={handleNextModalClose}
      />
      <TrucksDispatchedModal
        isOpen={selectedStat === "trucks-dispatched"}
        onClose={() => setSelectedStat(null)}
        onRowClicked={() => setIsLiveTrackingModalOpen(true)}
      />
      <LiveShipmentTrackingModal
        isOpen={isLiveTrackingModalOpen}
        onClose={() => setIsLiveTrackingModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
