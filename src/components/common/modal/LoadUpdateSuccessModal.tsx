import { Modal, Box } from "@mui/material";
import { Check } from "lucide-react";
import { useEffect } from "react";

interface LoadUpdateSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const LoadUpdateSuccessModal = ({
  isOpen,
  onClose,
  title,
}: LoadUpdateSuccessModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="load-update-success"
    >
      <Box
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          bg-white
          rounded-[10px]
          w-[90%]
          max-w-[414px]
          min-h-[216px]
          px-4
          py-8
          flex
          flex-col
          items-center
          justify-center
          outline-none
        "
      >
        <div className="w-13 h-13 rounded-full bg-[#1E8449] flex items-center justify-center">
          <Check size={42} className="text-white stroke-3" />
        </div>

        <h2 className="mt-8 text-center text-sm md:text-base font-normal text-black">
          {title ?? "You Have Successfully Updated The Loads."}
        </h2>
      </Box>
    </Modal>
  );
};

export default LoadUpdateSuccessModal;
