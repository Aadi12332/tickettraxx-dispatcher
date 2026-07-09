import { useState } from "react";
import { CircleX, Eye } from "lucide-react";
import BaseModal from "../../common/modal/BaseModal";
import CommonPagination from "../../common/CommonPagination";
import eyesClosed from "../../../assets/icons/EyeClosed.svg"

interface LoadsRemainingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const data = [
  {
    id: 1,
    customer: "ABC Logistics",
    remainingLoads: "2 of 15",
    completion: "98%",
    details: [
      {
        pickup: "Central Park, New York",
        deliver: "Downtown Express",
        material: "Sand",
        tonage: "29.00",
        rate: "$13.00",
      },
      {
        pickup: "Central Park, New York",
        deliver: "Downtown Express",
        material: "Sand",
        tonage: "29.00",
        rate: "$13.00",
      },
    ],
  },
  {
    id: 2,
    customer: "Global Freight Co",
    remainingLoads: "3 of 20",
    completion: "97.5%",
    details: [
      {
        pickup: "Central Park, New York",
        deliver: "Downtown Express",
        material: "Gravel",
        tonage: "20.00",
        rate: "$15.00",
      },
    ],
  },
  {
    id: 3,
    customer: "Express Transport",
    remainingLoads: "8 of 21",
    completion: "96%",
    details: [],
  },
  {
    id: 4,
    customer: "Prime Carriers",
    remainingLoads: "10 of 27",
    completion: "95%",
    details: [],
  },
  {
    id: 5,
    customer: "ABC Logistics",
    remainingLoads: "2 of 15",
    completion: "98%",
    details: [],
  },
];

const LoadsRemainingModal = ({ isOpen, onClose }: LoadsRemainingModalProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      position="center"
      className="max-w-[550px] max-h-[80dvh]"
      showCloseButton={false}
    >
      <div className="bg-white rounded-xl border border-(--border-gray) overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="text-base font-semibold font-archivo text-black">
            Loads Remaining Today
          </h2>

          <button
            onClick={onClose}
            className="cursor-pointer text-black hover:opacity-70"
          >
            <CircleX size={22} />
          </button>
        </div>

        <div className="h-px bg-[#E5E7EB]" />

        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1.5fr_1.5fr] px-4 py-4 text-sm font-medium text-[#343434]">
          <span>Customer</span>
          <span>Remaining Loads</span>
          <span>Completion %</span>
        </div>

        {/* Table Body */}
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar px-4 flex-1 space-y-2 mb-4">
          {data.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div key={item.id} className="flex flex-col">
                {/* Main Row */}
                <div className="grid grid-cols-[2fr_1.5fr_1.5fr] py-3 text-sm items-center">
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <span>{item.customer}</span>
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="cursor-pointer hover:text-black transition-colors"
                    >
                      {isExpanded ? <Eye size={16} color="#666666" /> : <img className="size-4" src={eyesClosed}/>}
                    </button>
                  </div>

                  <span className="text-[#6B7280]">{item.remainingLoads}</span>

                  <span className="font-semibold text-[#E2B93B]">
                    {item.completion}
                  </span>
                </div>

                {/* Expanded Details */}
                {isExpanded && item.details && item.details.length > 0 && (
                  <div className="bg-[#D3EAFF] rounded-[4px] p-4 mt-1 mb-2">
                    <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] text-xs font-semibold text-black mb-3">
                      <span>Pickup</span>
                      <span>Deliver</span>
                      <span>Material</span>
                      <span>Tonage</span>
                      <span>Rate</span>
                    </div>
                    <div className="space-y-3">
                      {item.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] text-xs font-normal text-[#343434]"
                        >
                          <span>{detail.pickup}</span>
                          <span>{detail.deliver}</span>
                          <span>{detail.material}</span>
                          <span>{detail.tonage}</span>
                          <span>{detail.rate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-auto">
          <CommonPagination
            currentPage={3}
            totalPages={15}
            totalItems={150}
            pageSize={10}
            onPageChange={() => {}}
            isLeftText={false}
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default LoadsRemainingModal;
