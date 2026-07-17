import { Modal } from "@mui/material";
import { X, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import CommonTextInput from "../../common/CommonTextInput";
import CommonButton from "../../common/CommonButton";

interface MaterialData {
  id: number;
  material: string;
}

interface CreateMaterialModalProps {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  editData?: MaterialData | null;
}
const initialMaterial = "";
const CreateMaterialModal = ({
  open,
  onClose,
  isEdit = false,
  editData,
}: CreateMaterialModalProps) => {
  const [materialName, setMaterialName] = useState("");

useEffect(() => {
  if (!open) return;

  if (isEdit && editData) {
    setMaterialName(editData.material);
  } else {
    setMaterialName(initialMaterial);
  }
}, [open, isEdit, editData]);

const handleClose = () => {
  setMaterialName(initialMaterial);
  onClose();
};

  const handleSubmit = () => {
    console.log({
      materialName,
    });

    handleClose();
  };

  const isDisabled = materialName.trim() === "";

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[9999]">
        <div className="w-full max-w-[600px] bg-white rounded-[8px] shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-3 pt-4 pb-4 flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-normal text-black">
                {isEdit ? "Edit Material" : "Create Materials"}
              </h2>

              <p className="mt-3 text-sm text-[#717182]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>

            <button onClick={handleClose} className="cursor-pointer">
              <X className="size-6 text-black" />
            </button>
          </div>

          {/* Form */}
          <div className="px-3 pb-4 mt-6">
            <div className="grid grid-cols-1 gap-6 max-h-[55dvh] overflow-y-auto">
              <CommonTextInput
                label="Material Name"
                placeholder="Enter name..."
                value={materialName}
                onChange={setMaterialName}
              />
            </div>

            {/* Footer */}
            <div className="border-t border-[#E5E7EB] mt-8 pt-5 flex justify-center flex-wrap gap-4">
              <CommonButton
                size="md"
                variant="primary"
                icon={!isEdit ? <Plus size={18} /> : undefined}
                onClick={handleSubmit}
                className={`sm:flex-1 ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isEdit ? "Save" : "Create Material"}
              </CommonButton>

              <CommonButton
                size="md"
                variant="secondary"
                onClick={handleClose}
                className="sm:flex-1"
              >
                Cancel
              </CommonButton>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateMaterialModal;