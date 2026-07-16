import { memo } from "react";
import { Map } from "lucide-react";
import ShipmentMap from "./ShipmentMap";
import DriverTrackingCard from "./DrivingTrackingCard";
import SectionTitle from "../common/SectionTitle";
import CommonFilterDropdown from "../common/CommonFilterDropdown";

const TrackingSection = memo(
  ({
    currentDriver,
    selectedDriver,
    setSelectedDriver,
    trackingData,
  }: any) => {
    return (
      <div className="bg-white border border-(--border-gray-2) rounded-[5px] shadow-sm p-3 lg:p-6">

        <div className="flex justify-between items-center mb-6">
          <SectionTitle title="Live Shipment Tracking" />

          <CommonFilterDropdown
            value={selectedDriver}
            onChange={setSelectedDriver}
            options={trackingData.map((d: any) => ({
              label: d.label,
              value: d.value,
            }))}
            size="auto"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[5fr_2fr] gap-3">

          <div className="min-h-[250px] xl:h-full rounded-lg overflow-hidden">

            {/* IMPORTANT */}
            <ShipmentMap
              key={currentDriver.id}
              data={currentDriver.map}
            />

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

      </div>
    );
  }
);

export default TrackingSection;