import { useState } from "react";
import { X, Eye } from "lucide-react";
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
      <div className="bg-white rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="text-base font-semibold font-archivo text-black">
            Loads Remaining Today
          </h2>

          <button
            onClick={onClose}
            className="cursor-pointer text-black hover:opacity-70"
          >
            <X size={20} />
          </button>
        </div>

        <div className="h-px bg-[#E5E7EB]" />

<div className="overflow-hidden p-3">
  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
    <table className="w-full table-fixed border-collapse min-w-[500px]">
      <thead>
        <tr className="text-sm font-semibold text-[#343434] border-b border-[#E5E7EB]">
          <th className="px-3 py-2 text-left border border-[#E5E7EB]">
            Customer
          </th>
          <th className="px-3 py-2 text-left border border-[#E5E7EB]">
            Remaining Loads
          </th>
          <th className="px-3 py-2 text-left border border-[#E5E7EB]">
            Completion %
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <>
              {/* Main Row */}
              <tr
                key={item.id}
                className="text-sm border-b border-[#E5E7EB] hover:bg-gray-50"
              >
                <td className="px-3 py-2 border border-[#E5E7EB] text-[#6B7280]">
                  <div className="flex items-center gap-2">
                    <span>{item.customer}</span>

                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="cursor-pointer"
                    >
                      {isExpanded ? (
                        <Eye size={16} color="#666666" className="min-w-4" />
                      ) : (
                        <img className="size-4 min-w-4" src={eyesClosed} />
                      )}
                    </button>
                  </div>
                </td>

                <td className="px-3 py-2 border border-[#E5E7EB] text-[#6B7280]">
                  {item.remainingLoads}
                </td>

                <td className="px-3 py-2 border border-[#E5E7EB] font-semibold text-[#E2B93B]">
                  {item.completion}
                </td>
              </tr>

              {/* Expanded Row */}
              {isExpanded && item.details?.length > 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="border border-[#E5E7EB] bg-[#D3EAFF] p-4"
                  >
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="text-sm font-semibold text-[#343434] border-b border-[#A8CDEE]">
                          <th className="text-left py-2">Pickup</th>
                          <th className="text-left py-2">Deliver</th>
                          <th className="text-left py-2">Material</th>
                          <th className="text-left py-2">Tonnage</th>
                          <th className="text-left py-2">Rate</th>
                        </tr>
                      </thead>

                      <tbody>
                        {item.details.map((detail, idx) => (
                          <tr
                            key={idx}
                            className="text-sm text-[#6B7280] border-b border-[#BFD9F0]"
                          >
                            <td className="py-2">{detail.pickup}</td>
                            <td className="py-2">{detail.deliver}</td>
                            <td className="py-2">{detail.material}</td>
                            <td className="py-2">{detail.tonage}</td>
                            <td className="py-2">{detail.rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </>
          );
        })}
      </tbody>
    </table>
  </div>
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
