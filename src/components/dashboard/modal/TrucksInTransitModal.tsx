import { Search, X } from "lucide-react";
import BaseModal from "../../common/modal/BaseModal";
import CommonPagination from "../../common/CommonPagination";

interface TrucksInTransitModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleNextModalOpen: () => void;
}

const data = [
  {
    truckId: "#280099",
    driver: "Jaydon Saris",
    loadsRemaining: "7 of 10",
    pickup: "Sunnyvale Park",
    deliver: "Sunnyvale Delivery Hub",
  },
  {
    truckId: "#280099",
    driver: "Lincoln Korsgaard",
    loadsRemaining: "7 of 14",
    pickup: "Greenwood Station",
    deliver: "Greenwood Dispatch Center",
  },
  {
    truckId: "#280099",
    driver: "Erin Philips",
    loadsRemaining: "7 of 18",
    pickup: "Riverbend Terminal",
    deliver: "Riverbend Shipping Terminal",
  },
  {
    truckId: "#280099",
    driver: "Emery Lipshutz",
    loadsRemaining: "7 of 20",
    pickup: "Maplewood Plaza",
    deliver: "Maplewood Distribution Point",
  },
  {
    truckId: "#280099",
    driver: "Jaydon Saris",
    loadsRemaining: "7 of 10",
    pickup: "Sunnyvale Park",
    deliver: "Sunnyvale Delivery Hub",
  },
];

const TrucksInTransitModal = ({
  isOpen,
  onClose,
  handleNextModalOpen,
}: TrucksInTransitModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      position="center"
      className="max-w-[850px]"
      showCloseButton={false}
    >
      <div className="bg-white rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex sm:items-center items-start justify-between px-3 xl:px-6 py-2 xl:py-5">
          <div className="flex sm:flex-row flex-col sm:items-center items-start gap-3">
            <h2 className="text-base font-semibold font-archivo text-black whitespace-nowrap">
              Trucks in Transit
            </h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-1.5 border border-gray-200 rounded-md text-sm outline-none focus:border-blue-500 md:w-[300px]"
              />
            </div>
          </div>
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
            <table className="w-full table-fixed border-collapse min-w-[700px]">
              <thead>
                <tr className="text-sm font-semibold text-[#343434] border-b border-[#E5E7EB]">
                  <th className="px-3 text-sm py-2 border border-[#E5E7EB] text-left">Truck ID</th>
                  <th className="px-3 text-sm py-2 border border-[#E5E7EB] text-left">Driver</th>
                  <th className="px-3 text-sm py-2 border border-[#E5E7EB] text-left">Loads Remaining</th>
                  <th className="px-3 text-sm py-2 border border-[#E5E7EB] text-left">Pickup</th>
                  <th className="px-3 text-sm py-2 border border-[#E5E7EB] text-left">Deliver</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="max-h-[400px] overflow-y-auto">
                {data.map((item, index) => (
                  <tr
                    key={index}
                    onClick={handleNextModalOpen}
                    className="border-b border-[#F3F4F6] text-sm hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-3 text-sm py-2 border border-[#E5E7EB] text-[#6B7280]">
                      {item.truckId}
                    </td>

                    <td className="px-3 text-sm py-2 border border-[#E5E7EB] text-[#6B7280]">
                      {item.driver}
                    </td>

                    <td className="px-3 text-sm py-2 border border-[#E5E7EB] text-[#6B7280]">
                      {item.loadsRemaining}
                    </td>

                    <td className="px-3 text-sm py-2 border border-[#E5E7EB] text-[#6B7280]">
                      {item.pickup}
                    </td>

                    <td className="px-3 text-sm py-2 border border-[#E5E7EB] text-[#6B7280]">
                      {item.deliver}
                    </td>
                  </tr>
                ))}
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

export default TrucksInTransitModal;
