import { useEffect, useState } from "react";
import { Calendar1, GripVertical } from "lucide-react";
import type { Dayjs } from "dayjs";
import type { LatLngTuple } from "leaflet";
import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import DashboardQuickView from "../../components/dashboard/DashboardQuickView";
import RevenueChart from "../../components/dashboard/RevenueChart";
import ShipmentOverview from "../../components/dashboard/ShipmentOverview";
// import ShipmentMap from "../../components/dashboard/ShipmentMap";
// import DriverTrackingCard from "../../components/dashboard/DrivingTrackingCard";
import truck_fast_outline from "../../assets/icons/truck_fast_outline.svg";
import truck from "../../assets/icons/heroicons_truck.svg";
import box from "../../assets/icons/solar_box.svg";
import box2 from "../../assets/icons/proicons_box.svg";
// import SectionTitle from "../../components/common/SectionTitle";
import CalendarModal from "../../components/common/modal/CalendorModal";
import LoadsDetailsModal from "../../components/dashboard/modal/LoadsDetailsModal";
import TrucksInTransitModal from "../../components/dashboard/modal/TrucksInTransitModal";
import TrucksDispatchedModal from "../../components/dashboard/modal/TrucksDispatchedModal";
import LoadsRemainingModal from "../../components/dashboard/modal/LoadsRemainingModal";
import LiveShipmentTrackingModal from "../../components/dashboard/modal/LiveShipmentTrackingModal";
import NextInQueueModal from "../../components/dashboard/modal/NextInQueueModal";
// import CommonFilterDropdown from "../../components/common/CommonFilterDropdown";
import { Reorder } from "framer-motion";
import TrackingSection from "../../components/dashboard/TrackingSection";

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

type DriverCardData = {
  name: string;
  truckId: string;
  avatar: string;
  subcontractor: string;
  status: string;
  eta: string;
  location: string;
  rating: number;
};

type TrackingItem = {
  id: number;
  label: string;
  value: string;
  card: DriverCardData;
  map: {
    start: LatLngTuple;
    end: LatLngTuple;
    route: LatLngTuple[];
  };
};

const trackingData: TrackingItem[] = [
  {
    id: 1,
    label: "Darlee Robertson",
    value: "Darlee Robertson",
    card: {
      name: "Darlee Robertson",
      truckId: "TRK-102",
      avatar: "https://i.pravatar.cc/150?img=1",
      subcontractor: "ABC Logistics",
      status: "In Transit",
      eta: "25 mins",
      location: "Dallas, TX",
      rating: 4.8,
    },
    map: {
      start: [34.0522, -118.2437] as LatLngTuple,
      end: [34.0528, -118.2851] as LatLngTuple,
      route: [
        [34.0522, -118.2437],
        [34.0489, -118.2568],
        [34.0407, -118.2468],
        [34.0347, -118.269],
        [34.0528, -118.2851],
      ] as LatLngTuple[],
    },
  },
  {
    id: 2,
    label: "Kevin Mark",
    value: "Kevin Mark",
    card: {
      name: "Kevin Mark",
      truckId: "TRK-205",
      avatar: "https://i.pravatar.cc/150?img=2",
      subcontractor: "Prime Transport",
      status: "Loading",
      eta: "10 mins",
      location: "Houston, TX",
      rating: 4.6,
    },
    map: {
      start: [29.7604, -95.3698] as LatLngTuple,
      end: [29.746, -95.39] as LatLngTuple,
      route: [
        [29.7604, -95.3698],
        [29.756, -95.375],
        [29.752, -95.381],
        [29.746, -95.39],
      ] as LatLngTuple[],
    },
  },
];

  const DEFAULT_SECTIONS = [
  "quick-view",
  "analytics",
  "tracking",
];

const Dashboard = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
const [sections, setSections] = useState<string[]>(() => {
  const saved = localStorage.getItem("dashboard-sections");

  return saved ? JSON.parse(saved) : DEFAULT_SECTIONS;
});

useEffect(() => {
  localStorage.setItem(
    "dashboard-sections",
    JSON.stringify(sections)
  );
}, [sections]);


  const [selectedDate, setSelectedDate] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [isLiveTrackingModalOpen, setIsLiveTrackingModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(trackingData[0].value);

  const currentDriver =
    trackingData.find((d) => d.value === selectedDriver) ?? trackingData[0];

  const handleNextModalOpen = () => {
    setIsNextModalOpen(true);
    setSelectedStat(null);
  };

  const handleNextModalClose = () => {
    setIsNextModalOpen(false);
    setSelectedStat("trucks-transit");
  };

  const formatDateRange = () => {
    const [start, end] = selectedDate;

    if (!start && !end) return "Select Date Range";

    if (start && !end) return start.format("DD/MM/YYYY");

    if (start && end) {
      return `${start.format("DD/MM/YYYY")} - ${end.format("DD/MM/YYYY")}`;
    }

    return "Select Date Range";
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
          <span className="text-sm font-normal">{formatDateRange()}</span>
        </button>
      </div>

      <div className=" grid gap-2 md:gap-3 grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((item) => (
          <DashboardStatCard
            key={item.title}
            {...item}
            onClick={() => setSelectedStat(item.type)}
          />
        ))}
      </div>

      <Reorder.Group
        axis="y"
        values={sections}
        onReorder={setSections}
        className="space-y-3"
      >
        {sections.map((section) => (
          <Reorder.Item
            key={section}
            value={section}
            className="relative"
            whileDrag={{ scale: 1.02 }}
          >
            <div className="absolute top-5 left-0 z-20 cursor-grab">
              <GripVertical size={18} />
            </div>
            {section === "quick-view" && (
              <DashboardQuickView selectedDate={selectedDate} />
            )}

            {section === "analytics" && (
              <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-3">
                <div className="">
                  <RevenueChart />
                </div>

                <ShipmentOverview />
              </div>
            )}

            {section === "tracking" && (
              <TrackingSection
                trackingData={trackingData}
                currentDriver={currentDriver}
                selectedDriver={selectedDriver}
                setSelectedDriver={setSelectedDriver}
              />
            )}
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onApply={setSelectedDate}
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
