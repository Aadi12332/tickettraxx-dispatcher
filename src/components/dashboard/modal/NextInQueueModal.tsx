import { CircleX } from "lucide-react";
import BaseModal from "../../common/modal/BaseModal";

interface NextInQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const remainingData = [
  {
    loadId: "#64657",
    pickup: "HBERG-Bridgeport",
    delivery: "4950 Plano",
  },
  {
    loadId: "#87631",
    pickup: "HBERG-LakeBP",
    delivery: "4950 Plano",
  },
  {
    loadId: "#34674",
    pickup: "AMRIZE-Melissa",
    delivery: "4950 Plano",
  },
  {
    loadId: "#55218",
    pickup: "AMRIZE-Ambrose",
    delivery: "4950 Plano",
  },
  {
    loadId: "#91463",
    pickup: "AMRIZE-Rosser",
    delivery: "4950 Plano",
  },
  {
    loadId: "#73125",
    pickup: "HBERG-Bridgeport",
    delivery: "4951 Denton",
  },
];

const NextInQueueModal = ({ isOpen, onClose }: NextInQueueModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      position="center"
      className="max-w-[500px]"
      showCloseButton={false}
    >
      <div className="bg-white rounded-xl border border-(--border-gray) overflow-hidden md:p-6 p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 cursor-pointer text-black hover:opacity-70"
        >
          <CircleX size={22} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-medium font-archivo text-black mb-6">
          Next in Queue
        </h2>

        {/* Next Load */}
        <div className="grid grid-cols-[1fr_1.5fr_1.5fr] gap-4 mb-8">
          <div>
            <div className="text-sm text-gray-500 mb-1">Load ID:</div>
            <div className="text-sm font-medium text-black">#64657</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Pickup:</div>
            <div className="text-sm font-medium text-black">Sunnyvale Park</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Delivery:</div>
            <div className="text-sm font-medium text-black">Greenwood Station</div>
          </div>
        </div>

        {/* Remaining Loads */}
        <h3 className="text-base font-medium font-archivo text-black mb-1">
          Remaining Loads (6)
        </h3>
        
        <div className="space-y-6 max-h-[350px] overflow-y-auto custom-scrollbar">
          {remainingData.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_1.5fr_1.5fr] gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Load ID:</div>
                <div className="font-medium text-sm text-black">{item.loadId}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Pickup:</div>
                <div className="font-medium text-sm text-black">{item.pickup}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Delivery:</div>
                <div className="font-medium text-sm text-black">{item.delivery}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  );
};

export default NextInQueueModal;
