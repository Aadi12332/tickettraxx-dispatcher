import { Modal } from "@mui/material";
import { X, Plus } from "lucide-react";
import CommonTextInput from "../common/CommonTextInput";
import CommonSelectInput from "../common/CommonSelectInput";
import { useEffect, useState } from "react";

interface AddJobModalProps {
  open: boolean;
  onClose: () => void;
}

export const materialOptions = [
  { label: "1' Rock", value: "1' Rock" },
  {
    label: "Manufactured Sand (Man Sand)",
    value: "Manufactured Sand (Man Sand)",
  },
  { label: "Concrete Sand", value: "Concrete Sand" },
  {
    label: "TX126 – 1” to #4 Crushed Stone",
    value: "TX126 – 1” to #4 Crushed Stone",
  },
  {
    label: "TX197 – TXDOT Type A Grade 1-2",
    value: "TX197 – TXDOT Type A Grade 1-2",
  },
  {
    label: "TX157 – ¾” to #4 Crushed Stone",
    value: "TX157 – ¾” to #4 Crushed Stone",
  },
  {
    label: "TX373-Washed Concrete Sand",
    value: "TX373-Washed Concrete Sand",
  },
  { label: "Flex Base", value: "Flex Base" },
  {
    label: "TX121 – 1-1/2” Crushed Stone",
    value: "TX121 – 1-1/2” Crushed Stone",
  },
];

const initialForm = {
  jobName: "",
  material: "",
  weight: "",
  truckId: "",
};

const AddJobModal = ({ open, onClose }: AddJobModalProps) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) {
      setForm(initialForm);
    }
  }, [open]);

  const handleChange = (key: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClose = () => {
    setForm(initialForm);
    onClose();
  };

  const handleSubmit = () => {
    console.log(form);

    // validation here

    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[9999]">
        <div className="w-full max-w-[570px] bg-white rounded-[8px] shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-4 md:px-2 md:pt-6 pt-3 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-medium text-black">Add Job</h2>

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
          <div className="px-4 md:px-2 pt-5 pb-4 ">
            <div className="space-y-6">
              <CommonTextInput
                label="Job Name"
                placeholder="Enter name..."
                value={form.jobName}
                onChange={(value) => handleChange("jobName", value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CommonSelectInput
                  label="Material"
                  value={form.material}
                  placeholder="Select one..."
                  onChange={(value) => handleChange("material", value)}
                  options={materialOptions}
                />

                <CommonTextInput
                  label="Weight (tones)"
                  placeholder="e.g., 29.00"
                  value={form.weight}
                  onChange={(value) => handleChange("weight", value)}
                />
              </div>

              <div className="w-full md:w-1/2">
                <CommonTextInput
                  label="Truck ID"
                  placeholder="Enter..."
                  value={form.truckId}
                  onChange={(value) => handleChange("truckId", value)}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-4 mt-10">
              <button
                onClick={handleSubmit}
                className="flex-1 min-w-[200px] h-[40px] bg-primary text-white rounded-[8px] text-sm font-normal flex items-center justify-center gap-1"
              >
                <Plus size={18} />
                Add Job
              </button>

              <button
                onClick={handleClose}
                className="flex-1 h-[40px] border border-primary text-primary rounded-[8px] text-sm font-normal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddJobModal;
