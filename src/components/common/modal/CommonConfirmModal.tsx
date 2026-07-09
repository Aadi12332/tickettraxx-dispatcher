import { Modal, Box } from "@mui/material";

interface CommonConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

const CommonConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: CommonConfirmModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="common-confirm-modal"
    >
      <Box
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          bg-white
          rounded-[28px]
          w-[90%]
          max-w-[503px]
          min-h-[240px]
          flex
          flex-col
          outline-none
          overflow-hidden
        "
      >
        {/* Content */}
        <div className="flex-1 px-6 pt-8 text-center">
          <h2 className="text-sm md:text-2xl font-semibold leading-[1.4] text-[#161616]">
            {title}
          </h2>

         {description && <p className="mt-3 text-xs md:text-lg font-normal text-[#444]">
            {description}
          </p>}
        </div>

        {/* Footer */}
        <div className="h-[55px] flex border-t border-[#D9D9D9] mt-3">
          <button
            onClick={onClose}
            className="
              flex-1
              text-base
              font-medium
              text-black
              cursor-pointer
              hover:bg-gray-50
              border-r border-[#D9D9D9]
              transition-colors
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="
              flex-1
              text-base
              font-semibold
              text-black
              cursor-pointer
              hover:bg-gray-50
              transition-colors
            "
          >
            {confirmText}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default CommonConfirmModal;
