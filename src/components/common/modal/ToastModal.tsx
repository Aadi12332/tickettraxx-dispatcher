import { Modal } from "@mui/material";
import { Check, AlertTriangle, X } from "lucide-react";

type StatusType = "success" | "warning" | "error";

interface ToastModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  type?: StatusType;
}

const ToastModal = ({
  open,
  onClose,
  title,
  type = "success",
}: ToastModalProps) => {
  const config = {
    success: {
      bg: "bg-[#1E8449]",
      icon: <Check size={50} color="white" strokeWidth={3} />,
    },
    warning: {
      bg: "bg-[#F59E0B]",
      icon: <AlertTriangle size={34} color="white" strokeWidth={3} />,
    },
    error: {
      bg: "bg-[#DC2626]",
      icon: <X size={34} color="white" strokeWidth={3} />,
    },
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-[9999]">
        <div className="w-full max-w-[520px] bg-white rounded-[2px] shadow-md flex flex-col items-center justify-center py-14 px-8">
          {/* Icon */}
          <div
            className={`w-[62px] h-[62px] rounded-full flex items-center justify-center ${config[type].bg}`}
          >
            {config[type].icon}
          </div>

          {/* Title */}
          <h2 className="mt-10 text-[18px] xl:text-[22px] font-medium text-black text-center">
            {title}
          </h2>
        </div>
      </div>
    </Modal>
  );
};

export default ToastModal;