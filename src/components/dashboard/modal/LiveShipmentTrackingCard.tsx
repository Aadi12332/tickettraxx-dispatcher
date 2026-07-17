import { useState } from "react";
import { createPortal } from "react-dom";
import { Clock, Mail, MessageSquareText, PhoneCall, Truck } from "lucide-react";

interface LiveShipmentTrackingCardProps {
  data: {
    name: string;
    avatar: string;
    subcontractor: string;
    truckId: string;
  };
}

const inProgressLoads = [
  { id: "56743", eta: "2h 15m" },
  { id: "56743", eta: "3h 15m" },
  { id: "56743", eta: "4h 15m" },
];

const remainingLoads = [
  { id: "56743" },
  { id: "56743" },
  { id: "56743" },
  { id: "56743" },
  { id: "56743" },
];

const LiveShipmentTrackingCard = ({ data }: LiveShipmentTrackingCardProps) => {
  const [tooltipState, setTooltipState] = useState<{
    visible: boolean;
    x: number;
    y: number;
  } | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipState({
      visible: true,
      x: rect.right - 15,
      y: rect.top + rect.height / 2,
    });
  };

  const handleMouseLeave = () => {
    setTooltipState(null);
  };

  return (
    <div className="flex flex-col h-full bg-white border border-(--border-gray-2) rounded-2xl p-4 overflow-y-auto">
      {/* Driver Info */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={data.avatar}
          alt={data.name}
          className="w-10 h-10 rounded-full bg-orange object-cover"
        />
        <h3 className="font-semibold text-black">
          Driver: <span className="font-medium">{data.name}</span>
        </h3>
      </div>

      <div className="font-semibold text-black mb-3 text-xs xl:text-base">
        Subcontractor:{" "}
        <span className="font-medium text-gray-700 text-xs xl:text-sm">
          {data.subcontractor}
        </span>
      </div>

      <div className="inline-block px-3 py-1 bg-pink-50 text-pink-500 rounded text-xs w-fit mb-3">
        Truck ID: {data.truckId}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 border-t border-(--border-gray-2) pt-3 min-h-[300px] xl:min-h-[200px]">
        {/* Load In Progress */}
        <div className="mb-3 pb-3 border-b border-(--border-gray-2)">
          <h4 className="font-semibold text-black mb-3 text-sm xl:text-base">Load In Progress</h4>
          <div className="space-y-1">
            {inProgressLoads.map((load, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm"
              >
                <div
                  className="flex items-center gap-2 text-black text-sm relative cursor-pointer w-fit pr-4 group"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Truck
                    size={18}
                    className="text-gray-400 group-hover:text-black transition-colors"
                  />
                  <p className="font-semibold text-xs xl:text-sm">Load ID:</p>{" "}
                  <span className="font-medium text-xs xl:text-sm">{load.id}</span>
                </div>
                <div className="flex items-center gap-2 text-black text-sm">
                  <Clock size={16} className="text-gray-400" />
                  <span className="font-semibold text-xs xl:text-sm">ETA:</span>{" "}
                  <span className="font-medium text-xs xl:text-sm">{load.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining Loads */}
        <div>
          <h4 className="font-semibold text-black mb-3 text-sm xl:text-base">
            Remaining Loads ({remainingLoads.length})
          </h4>
          <div className="space-y-1">
            {remainingLoads.map((load, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-black text-sm relative cursor-pointer w-fit pr-4 group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Truck
                  size={18}
                  className="text-gray-400 group-hover:text-black transition-colors"
                />
                <span className="font-semibold text-xs xl:text-sm">Load ID:</span>{" "}
                <span className="font-medium text-xs xl:text-sm group-hover:bg-gray-100 px-1 rounded transition-colors">
                  {load.id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portal Tooltip */}
      {tooltipState &&
        tooltipState.visible &&
        createPortal(
          <div
            className="fixed z-[9999] w-[200px] lg:w-[320px] bg-[#333333] text-white rounded-lg p-4 shadow-xl pointer-events-none text-left"
            style={{
              top: tooltipState.y,
              left: tooltipState.x,
              transform: "translateY(-50%)",
            }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-[#333333]"></div>

            <div className="text-sm border-b border-gray-500 pb-3 mb-3 text-xs xl:text-sm">
              <span className="text-gray-300">Customer:</span>{" "}
              <span className="font-semibold">John Smith</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3 border-b border-gray-500 pb-3 text-xs xl:text-sm">
              <div>
                <div className="text-gray-400 text-xs mb-1 font-normal">
                  Pickup:
                </div>
                <div className="font-semibold text-xs xl:text-sm">HBERG-LakeBP</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1 font-normal">
                  Delivery:
                </div>
                <div className="font-semibold text-xs xl:text-sm">4950 Plano</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3 border-b border-gray-500 pb-3">
              <div>
                <div className="text-gray-400 text-xs mb-1 font-normal">
                  Material:
                </div>
                <div className="font-semibold text-xs xl:text-sm">Man Sand</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-1 font-normal">
                  Loads:
                </div>
                <div className="font-semibold text-sm">2</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-300 text-xs xl:text-sm">
              <Clock size={16} />
              <span>10:30 AM - 07:30 PM</span>
            </div>
          </div>,
          document.body,
        )}

      {/* Actions */}
      <div className="flex gap-4 mt-1 pt-2 mb-1">
        <ActionIcon icon={<Mail size={18} />} active />
        <ActionIcon icon={<PhoneCall size={18} />} />
        <ActionIcon icon={<MessageSquareText size={18} />} active />
      </div>
    </div>
  );
};

const ActionIcon = ({
  icon,
  active,
}: {
  icon: React.ReactNode;
  active?: boolean;
}) => (
  <button
    className={`
      w-8 h-8 xl:w-10 xl:h-10 rounded-full flex items-center justify-center cursor-pointer
      ${active ? "bg-[#FAE7E7] text-orange" : "text-green bg-[#dcf5e3]"}
    `}
  >
    {icon}
  </button>
);

export default LiveShipmentTrackingCard;
