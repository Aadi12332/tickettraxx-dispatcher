import View from "../../assets/icons/viewfilled.svg";
import Copy from "../../assets/icons/copyfilled.svg";
import Edit from "../../assets/icons/editfilled.svg";
import Download from "../../assets/icons/downloadfilled.svg";

interface DispatchMobileCardProps {
  date: string;
  total: string;
  status: string;
  onView?: () => void;
  onEdit?: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
}

const DispatchMobileCard = ({
  date,
  total,
  status,
  onView,
  onEdit,
  onCopy,
  onDownload,
}: DispatchMobileCardProps) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <span className="font-medium">{date}</span>

        <span
          className={`font-normal text-sm ${
            status === "Active" ? "text-green" : "text-red-500"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="mt-2 text-text-gray text-sm font-medium">
        Grand Total: {total}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <ActionButton
          icon={<img src={View} alt="" className="" />}
          onClick={onView}
        />

        {status === "Active" && (
          <ActionButton
            icon={<img src={Edit} alt="" className="" />}
            onClick={onEdit}
          />
        )}

        <ActionButton
          icon={<img src={Copy} alt="" className="" />}
          onClick={onCopy}
        />

        <ActionButton
          icon={<img src={Download} alt="" className="" />}
          onClick={onDownload}
        />
      </div>
    </div>
  );
};

export default DispatchMobileCard;

interface ActionButtonProps {
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ActionButton = ({ icon, onClick }: ActionButtonProps) => (
  <button
    onClick={onClick}
    className="
      w-7
      h-7
      border
      border-[#E8E8E8]
      shadow-lg
      rounded-sm
      flex
      items-center
      justify-center
      hover:bg-gray-50
      transition-all
      cursor-pointer
      shrink-0
    "
  >
    {icon}
  </button>
);
