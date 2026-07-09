import { X } from "lucide-react";
import { useState } from "react";
import ShipmentMap from "../ShipmentMap";
import SectionTitle from "../../common/SectionTitle";

interface Props {
  open: boolean;
  onClose: () => void;
  drivers: any[];
}

const AllDriversModal = ({ open, onClose, drivers }: Props) => {
  const [selectedDriver, setSelectedDriver] = useState(drivers[0]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl w-full max-w-[1400px] p-6">
        {/* Header */}

        <div className="flex items-center justify-between mb-6">
          <SectionTitle title="All Active Drivers" />

          <button onClick={onClose} className="cursor-pointer">
            <X size={24} color="#696969" />
          </button>
        </div>

        {/* Content */}

        <div className="relative h-[400px]">
          <ShipmentMap />

          {/* Driver markers */}

          <div className="absolute inset-0 pointer-events-none">
            {drivers.map((driver) => (
              <button
                key={driver.id}
                onClick={() => setSelectedDriver(driver)}
                className="
                  absolute
                  pointer-events-auto
                  cursor-pointer
                "
                style={{
                  left: driver.left,
                  top: driver.top,
                }}
              >
                <img
                  src={driver.avatar}
                  alt=""
                  className="
                    w-16
                    h-16
                    rounded-full
                    border-2
                    border-orange-400
                  "
                />
              </button>
            ))}
          </div>

          {/* Selected driver card */}

          {selectedDriver && (
            <div className="absolute left-[180px] top-[80px] w-[320px] z-999">
              {/* <DriverTrackingCard data={selectedDriver} /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDriversModal;
