import { Map as MapIcon } from "lucide-react";
import BaseModal from "../../common/modal/BaseModal";
import ShipmentMap from "../ShipmentMap";
import LiveShipmentTrackingCard from "./LiveShipmentTrackingCard";
import driverImg from "../../../assets/images/placeholderUser.svg";
import SectionTitle from "../../common/SectionTitle";

interface LiveShipmentTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const driverData = {
  name: "Darlee Robertson",
  avatar: driverImg,
  subcontractor: "Robert Cooper",
  truckId: "TRK-4582",
};

const LiveShipmentTrackingModal = ({ isOpen, onClose }: LiveShipmentTrackingModalProps) => {
  return (
<BaseModal
  isOpen={isOpen}
  onClose={onClose}
  position="center"
  className="max-w-[1200px]"
>
  <div
    className="
      bg-white
      rounded-xl
      border
      border-(--border-gray)
      p-3
      xl:p-6

      flex
      flex-col

      h-[90dvh]
      xl:h-[75vh]

      overflow-y-auto
      xl:overflow-hidden
    "
  >
    {/* Header */}
    <SectionTitle
      title="Live Shipment Tracking"
      className="mb-6 shrink-0"
    />

    {/* Content */}
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 flex-1 min-h-0">
      {/* Left */}
      <div className="flex flex-col min-h-0">
        <div className="h-[320px] sm:h-[380px] xl:flex-1 xl:max-h-none">
          <ShipmentMap />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-1 sm:gap-2 text-[9px] sm:text-xs xl:text-[0.65vw]">
          <MapIcon size={12} />

          <span className="font-normal">
            Current Location:
          </span>

          <span className="text-sky-blue">
            Riverbend Terminal
          </span>

          <span className="text-gray-300 hidden xl:inline">|</span>
          <span>24 hours speed: 80km/h</span>

          <span className="text-gray-300 hidden xl:inline">|</span>
          <span>12 hours speed: 84km/h</span>

          <span className="text-gray-300 hidden xl:inline">|</span>
          <span>Max speed: 104km/h</span>

          <span className="text-gray-300 hidden xl:inline">|</span>
          <span>Avg speed: 82km/h</span>
        </div>
      </div>

      {/* Right */}
      <div className="min-h-0 h-full xl:overflow-hidden">
        <LiveShipmentTrackingCard data={driverData} />
      </div>
    </div>
  </div>
</BaseModal>
  );
};

export default LiveShipmentTrackingModal;
