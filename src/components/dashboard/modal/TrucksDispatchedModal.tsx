import { X, Search } from "lucide-react";
import BaseModal from "../../common/modal/BaseModal";
import CommonPagination from "../../common/CommonPagination";

interface TrucksDispatchedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRowClicked: () => void;
}

const data = [
  {
    truckId: "#280099",
    driver: "Jaydon Saris",
    tonnage: "26.00",
    total: "$1,245.50",
    pickup: "Sunnyvale Park",
    deliver: "Sunnyvale Delivery Hub",
  },
  {
    truckId: "#280099",
    driver: "Lincoln Korsgaard",
    tonnage: "24.00",
    total: "$3,890.00",
    pickup: "Greenwood Station",
    deliver: "Greenwood Dispatch Center",
  },
  {
    truckId: "#280099",
    driver: "Erin Philips",
    tonnage: "19.00",
    total: "$567.25",
    pickup: "Riverbend Terminal",
    deliver: "Riverbend Shipping Terminal",
  },
  {
    truckId: "#280099",
    driver: "Emery Lipshutz",
    tonnage: "20.00",
    total: "$2,134.75",
    pickup: "Maplewood Plaza",
    deliver: "Maplewood Distribution Point",
  },
  {
    truckId: "#280099",
    driver: "Jaydon Saris",
    tonnage: "18.00",
    total: "$1,245.50",
    pickup: "Sunnyvale Park",
    deliver: "Sunnyvale Delivery Hub",
  },
];

const TrucksDispatchedModal = ({ isOpen, onClose,onRowClicked }: TrucksDispatchedModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      position="center"
      className="max-w-[600px] lg:max-w-[800px] xl:max-w-[850px]"
      showCloseButton={false}
    >
      <div className="bg-white rounded-xl border border-(--border-gray) overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-3 xl:px-6 py-2 xl:py-5">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-base xl:text-lg font-semibold font-archivo text-black whitespace-nowrap">
              Trucks Dispatched
            </h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm outline-none focus:border-blue-500 w-[300px]"
              />
            </div>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer text-black hover:opacity-70"
          >
            <X size={22} />
          </button>
        </div>

        <div className="h-px bg-[#E5E7EB]" />

        {/* Table Header */}
        <div className="grid grid-cols-[1fr_2fr_1fr_1.5fr_2fr_2fr] px-3 xl:px-6 py-2 xl:py-5 text-xs xl:text-sm font-semibold text-[#343434]">
          <span>Truck ID</span>
          <span>Driver</span>
          <span>Tonnage</span>
          <span>Grand Total</span>
          <span>Pickup</span>
          <span>Deliver</span>
        </div>

        {/* Table Body */}
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar px-6 flex-1">
          {data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr_1fr_1.5fr_2fr_2fr] py-2 overflow-hidden xl:py-4 text-xs xl:text-sm cursor-pointer"
              onClick={onRowClicked}
            >
              <span className="text-[#6B7280]">{item.truckId}</span>
              <span className="text-[#6B7280]">{item.driver}</span>
              <span className="text-[#6B7280]">{item.tonnage}</span>
              <span className="text-[#6B7280]">{item.total}</span>
              <span className="text-[#6B7280]">{item.pickup}</span>
              <span className="text-[#6B7280]">{item.deliver}</span>
            </div>
          ))}
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

export default TrucksDispatchedModal;
