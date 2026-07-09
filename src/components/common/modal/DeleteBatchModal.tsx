import CommonConfirmModal from "./CommonConfirmModal";

interface DeleteBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteBatchModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteBatchModalProps) => {
  return (
    <CommonConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Are you sure you want to delete the batch?"
      description="Lorem Ipsum is simply dummy text"
      confirmText="Confirm"
      cancelText="Cancel"
    />
  );
};

export default DeleteBatchModal;
