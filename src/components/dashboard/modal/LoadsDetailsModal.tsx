import { X } from "lucide-react";
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
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-base font-semibold font-archivo text-black">
            {title}
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
  <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
    <table className="w-full table-fixed border-collapse min-w-[450px]">
      <thead>
        <tr className="text-sm font-semibold text-[#343434] border-b border-[#E5E7EB]">
          <th className="px-3 py-2 border border-[#E5E7EB] text-left">
            Customer
          </th>
          <th className="px-3 py-2 border border-[#E5E7EB] text-left">
            Loads
          </th>
          <th className="px-3 py-2 border border-[#E5E7EB] text-left">
            Grand Total
          </th>
          <th className="px-3 py-2 border border-[#E5E7EB] text-left">
            Status
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className="border-b border-[#F3F4F6] text-sm hover:bg-gray-50"
          >
            <td className="px-3 py-2 border border-[#E5E7EB] text-[#6B7280]">
              {item.customer}
            </td>

            <td className="px-3 py-2 border border-[#E5E7EB] text-[#6B7280]">
              {item.loads}
            </td>

            <td className="px-3 py-2 border border-[#E5E7EB] text-[#6B7280]">
              {item.total}
            </td>

            <td className="px-3 py-2 border border-[#E5E7EB] font-medium text-green">
              {item.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
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
