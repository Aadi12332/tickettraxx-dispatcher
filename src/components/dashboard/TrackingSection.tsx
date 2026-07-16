import { memo, useState } from "react";
import { Map } from "lucide-react";
import ShipmentMap from "./ShipmentMap";
import DriverTrackingCard from "./DrivingTrackingCard";
import SectionTitle from "../common/SectionTitle";
import CommonFilterDropdown from "../common/CommonFilterDropdown";
import AllDriversModal from "./modal/AllDriversModal";
import CommonButton from "../common/CommonButton";
import avatar1 from "../../assets/images/placeholderUser.svg";

export const driversData = [
  {
    id: 1,
    name: "Darlee Robertson",
    truckId: "TRK-4582",
    avatar: avatar1,
    subcontractor: "Ramesh Kapoor",
    status: "In Transit",
    eta: "2h 15m",
    location: "Pune, Maharashtra",
    rating: 4.2,
    left: "8%",
    top: "12%",
  },
  {
    id: 2,
    name: "Brian Smith",
    truckId: "TRK-7854",
    avatar: avatar1,
    subcontractor: "John Miller",
    status: "Loading",
    eta: "1h 05m",
    location: "Los Angeles",
    rating: 4.7,
    left: "22%",
    top: "26%",
  },
  {
    id: 3,
    name: "Aarav Mehta",
    truckId: "TRK-1298",
    avatar: avatar1,
    subcontractor: "Vikram Singh",
    status: "Delivered",
    eta: "Completed",
    location: "Nagpur, Maharashtra",
    rating: 4.5,
    left: "38%",
    top: "10%",
  },
  {
    id: 4,
    name: "Sophia Turner",
    truckId: "TRK-3476",
    avatar: avatar1,
    subcontractor: "David Wilson",
    status: "Unloading",
    eta: "45m",
    location: "Dallas, Texas",
    rating: 4.8,
    left: "44%",
    top: "52%",
  },
  {
    id: 5,
    name: "Liam Carter",
    truckId: "TRK-6521",
    avatar: avatar1,
    subcontractor: "Michael Brown",
    status: "Idle",
    eta: "N/A",
    location: "Houston, Texas",
    rating: 4.1,
    left: "16%",
    top: "78%",
  },
  {
    id: 6,
    name: "Emily Johnson",
    truckId: "TRK-9034",
    avatar: avatar1,
    subcontractor: "Sarah Davis",
    status: "In Transit",
    eta: "3h 10m",
    location: "Chicago, Illinois",
    rating: 4.6,
    left: "56%",
    top: "40%",
  },
  {
    id: 7,
    name: "Noah Williams",
    truckId: "TRK-2217",
    avatar: avatar1,
    subcontractor: "Chris Evans",
    status: "Loading",
    eta: "1h 30m",
    location: "Phoenix, Arizona",
    rating: 4.4,
    left: "64%",
    top: "12%",
  },
  {
    id: 8,
    name: "Olivia Brown",
    truckId: "TRK-3021",
    avatar: avatar1,
    subcontractor: "Andrew Clark",
    status: "In Transit",
    eta: "55m",
    location: "Seattle",
    rating: 4.5,
    left: "80%",
    top: "32%",
  },
  {
    id: 9,
    name: "James Wilson",
    truckId: "TRK-7788",
    avatar: avatar1,
    subcontractor: "Ryan Scott",
    status: "Loading",
    eta: "2h",
    location: "Denver",
    rating: 4.3,
    left: "88%",
    top: "14%",
  },
  {
    id: 10,
    name: "Emma Thomas",
    truckId: "TRK-8421",
    avatar: avatar1,
    subcontractor: "Jacob White",
    status: "Delivered",
    eta: "Completed",
    location: "Miami",
    rating: 4.9,
    left: "64%",
    top: "76%",
  },
  {
    id: 11,
    name: "Daniel Harris",
    truckId: "TRK-9911",
    avatar: avatar1,
    subcontractor: "Kevin Lewis",
    status: "In Transit",
    eta: "3h",
    location: "Austin",
    rating: 4.4,
    left: "90%",
    top: "60%",
  },
  {
    id: 12,
    name: "Mia Walker",
    truckId: "TRK-6674",
    avatar: avatar1,
    subcontractor: "Thomas Hall",
    status: "Idle",
    eta: "N/A",
    location: "San Diego",
    rating: 4.1,
    left: "2%",
    top: "74%",
  },
];
const TrackingSection = memo(
  ({ currentDriver, selectedDriver, setSelectedDriver, trackingData }: any) => {
    const [openDriversModal, setOpenDriversModal] = useState(false);

    return (
      <div className="bg-white border border-(--border-gray-2) rounded-[5px] shadow-sm px-5 sm:py-3 py-2">
        <div className="flex justify-between items-center mb-3">
          <SectionTitle title="Live Shipment Tracking" />

          <div className="flex items-center gap-2">
            <CommonFilterDropdown
            value={selectedDriver}
            onChange={setSelectedDriver}
            options={trackingData.map((d: any) => ({
              label: d.label,
              value: d.value,
            }))}
            size="auto"
          />
          <CommonButton
            onClick={() => setOpenDriversModal(true)}
            variant="secondary"
            size="md"
          >
            View All
          </CommonButton>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[5fr_2fr] gap-3">
          <div className="min-h-[250px] xl:h-full rounded-lg overflow-hidden">
            {/* IMPORTANT */}
            <ShipmentMap key={currentDriver.id} data={currentDriver.map} />
          </div>

          <DriverTrackingCard data={currentDriver.card} />
        </div>

        <div className="mt-4 flex items-center gap-1 text-[10px] sm:text-[0.8vw] flex-wrap">
          <Map size={16} />
          <span>Current Location :</span>
          <span className="text-sky-blue">Riverbend Terminal</span>
          <span>|</span>
          <span>24 hours speed: 80km/h</span>
          <span>|</span>
          <span>12 hours speed: 84km/h</span>
          <span>|</span>
          <span>Max speed: 104km/h</span>
          <span>|</span>
          <span>Avg speed: 82km/h</span>
        </div>
        <AllDriversModal
          open={openDriversModal}
          onClose={() => setOpenDriversModal(false)}
          drivers={driversData}
        />
      </div>
    );
  },
);

export default TrackingSection;
