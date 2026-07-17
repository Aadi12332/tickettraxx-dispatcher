import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { X, Plus } from "lucide-react";
import CommonTextInput from "../../common/CommonTextInput";
import CommonSelectInput from "../../common/CommonSelectInput";
import CommonButton from "../../common/CommonButton";
import dayjs from "dayjs";
import { poCustomerOptions } from "../../../utils/data";

interface FscData {
  customer: string;
  from: string;
  to: string;
  percentage: string;
}

interface CreateFscModalProps {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  editData?: FscData | null;
}

const initialState = {
  customer: "",
  percentage: "",
  from: "",
  to: "",
};
const CreateFscModal = ({
  open,
  onClose,
  isEdit = false,
  editData,
}: CreateFscModalProps) => {
  const [form, setForm] = useState(initialState);
  useEffect(() => {
    if (!open) return;

    if (isEdit && editData) {
      setForm({
        customer: editData.customer,
        percentage: editData.percentage,
        from: dayjs(editData.from, "MM/DD/YYYY").format("YYYY-MM-DD"),
        to: dayjs(editData.to, "MM/DD/YYYY").format("YYYY-MM-DD"),
      });
    } else {
      setForm(initialState);
    }
  }, [open, isEdit, editData]);

  const handleClose = () => {
    setForm(initialState);
    onClose();
  };

  const handleSubmit = () => {
    console.log(form);

    // API Call

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[9999]">
        <div className="w-full max-w-[600px] bg-white rounded-[8px] shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-3 pt-4 pb-4 flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-normal text-black">
                {isEdit ? "Edit FSC" : "Create FSC"}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 max-h-[55dvh] overflow-y-auto">
              <CommonSelectInput
                label="Customer"
                value={form.customer}
                options={poCustomerOptions}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    customer: value,
                  }))
                }
              />

              <CommonTextInput
                label="Percentage"
                placeholder="%"
                value={form.percentage}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    percentage: value,
                  }))
                }
                isPercentage
              />

              <CommonTextInput
                label="From"
                type="date"
                value={form.from}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    from: value,
                  }))
                }
              />

              <CommonTextInput
                label="To"
                type="date"
                value={form.to}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    to: value,
                  }))
                }
              />
            </div>

            {/* Footer */}
            <div className="border-t border-[#E5E7EB] mt-8 pt-5 flex gap-4 flex-wrap justify-center">
              <CommonButton
                size="md"
                variant="primary"
                className="sm:flex-1"
                icon={!isEdit ? <Plus size={18} /> : undefined}
                onClick={handleSubmit}
              >
                {isEdit ? "Save" : "Create FSC"}
              </CommonButton>

              <CommonButton
                size="md"
                variant="secondary"
                className="sm:flex-1"
                onClick={handleClose}
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

export default CreateFscModal;
