import View from "../../assets/icons/viewfilled.svg";
import Copy from "../../assets/icons/copyfilled.svg";
import Edit from "../../assets/icons/editfilled.svg";
import Download from "../../assets/icons/downloadfilled.svg";
import CommonPagination from "../common/CommonPagination";
import { ActionButton } from "./DispatchMobileCard";
import { useState } from "react";
import { Check, ArrowBigDownDash } from "lucide-react";

export interface DispatchItem {
  date: string;
  total: string;
  status: "Active" | "Closed";
}

interface DispatchTableProps {
  data: DispatchItem[];
  onView?: (item: DispatchItem) => void;
  onEdit?: (item: DispatchItem) => void;
  onCopy?: (item: DispatchItem) => void;
  onDownload?: (item: DispatchItem) => void;
}

const DispatchTable = ({
  data,
  onView,
  onEdit,
  onCopy,
  onDownload,
}: DispatchTableProps) => {
  const [copiedRow, setCopiedRow] = useState<number | null>(null);
  const [downloadedRow, setDownloadedRow] = useState<number | null>(null);

  const handleCopy = async (item: DispatchItem, index: number) => {
    onCopy?.(item);

    setCopiedRow(index);

    setTimeout(() => {
      setCopiedRow(null);
    }, 2200);
  };

  const handleDownload = (item: DispatchItem, index: number) => {
    onDownload?.(item);

    setDownloadedRow(index);

    setTimeout(() => {
      setDownloadedRow(null);
    }, 2200);
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] table-fixed">
        <thead>
          <tr className="bg-[#E5E7EB]">
            <th className="w-1/4 px-6 py-3 text-left text-xs xl:text-sm  font-semibold">
              Dispatch Date
            </th>

            <th className="w-1/4 px-6 py-3 text-left text-xs xl:text-sm  font-semibold">
              Grand Total
            </th>

            <th className="w-1/4 px-6 py-3 text-left text-xs xl:text-sm  font-semibold">
              Status
            </th>

            <th className="w-1/4 px-6 py-3 text-left text-xs xl:text-sm  font-semibold">
              Details
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-(--border-gray-2)">
              <td className="w-1/4 px-6 py-4 text-xs xl:text-sm  text-[#666666]">
                {item.date}
              </td>

              <td className="w-1/4 px-6 py-4 text-xs xl:text-sm  text-[#666666]">
                {item.total}
              </td>

              <td className="w-fit xl:w-1/4 px-6 py-4">
                <span
                  className={`text-xs xl:text-sm  ${
                    item.status === "Active" ? "text-green" : "text-red-500"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="w-1/4 pl-6 py-4">
                <div className="flex justify-left gap-3">
                  <ActionButton
                    icon={<img src={View} alt="" />}
                    onClick={() => onView?.(item)}
                  />

                  {item.status === "Active" && (
                    <ActionButton
                      icon={<img src={Edit} alt="" />}
                      onClick={() => onEdit?.(item)}
                    />
                  )}

                  <ActionButton
                    icon={
                      copiedRow === index ? (
                        <Check
                          size={15}
                          className="text-green-500 animate-[ping_0.9s_ease-out]"
                        />
                      ) : (
                        <img
                          src={Copy}
                          alt="copy"
                          className="transition-transform duration-500"
                        />
                      )
                    }
                    onClick={() => handleCopy(item, index)}
                  />

                  <ActionButton
                    icon={
                      downloadedRow === index ? (
                        <ArrowBigDownDash
                          size={15}
                          className="text-green-500 animate-bounce"
                        />
                      ) : (
                        <img
                          src={Download}
                          alt="download"
                          className="transition-transform duration-500"
                        />
                      )
                    }
                    onClick={() => handleDownload(item, index)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CommonPagination
        currentPage={1}
        totalPages={15}
        totalItems={16}
        pageSize={10}
        onPageChange={() => {}}
      />
    </div>
  );
};

export default DispatchTable;
