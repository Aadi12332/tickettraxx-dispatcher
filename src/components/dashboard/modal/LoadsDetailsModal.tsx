import { CircleX } from "lucide-react";
import BaseModal from "../../common/modal/BaseModal";
import CommonPagination from "../../common/CommonPagination";

interface LoadsDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const data = [
  {
    customer: "ABC Logistics",
    loads: 6,
    total: "$1,245.50",
    status: "Active",
  },
  {
    customer: "Global Freight Co",
    loads: 5,
    total: "$3,890.00",
    status: "Active",
  },
  {
    customer: "Express Transport",
    loads: 5,
    total: "$567.25",
    status: "Active",
  },
  {
    customer: "Prime Carriers",
    loads: 5,
    total: "$2,134.75",
    status: "Active",
  },
  {
    customer: "ABC Logistics",
    loads: 10,
    total: "$1,245.50",
    status: "Active",
  },
];

const LoadsDetailsModal = ({
  isOpen,
  onClose,
  title,
}: LoadsDetailsModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      position="center"
      className="max-w-[520px]"
      showCloseButton={false}
    >
      <div className="bg-white rounded-xl border border-(--border-gray) overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-base font-semibold font-archivo text-black">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="cursor-pointer text-black hover:opacity-70"
          >
            <CircleX size={20} />
          </button>
        </div>

        <div className="h-px bg-[#E5E7EB]" />

        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1.5fr_1fr] px-4 py-3 text-sm font-medium text-[#343434]">
          <span>Customer</span>
          <span>Loads</span>
          <span>Grand Total</span>
          <span>Status</span>
        </div>

        {/* Table Body */}
        <div className="max-h-[320px] overflow-y-auto custom-scrollbar px-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_1fr_1.5fr_1fr] py-3 text-sm"
            >
              <span className="text-[#6B7280]">{item.customer}</span>

              <span className="text-[#6B7280]">{item.loads}</span>

              <span className="text-[#6B7280]">{item.total}</span>

              <span className="font-medium text-green">{item.status}</span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <CommonPagination
          currentPage={1}
          totalPages={15}
          totalItems={16}
          pageSize={10}
          onPageChange={() => {}}
          isLeftText={false}
        />
      </div>
    </BaseModal>
  );
};

export default LoadsDetailsModal;
