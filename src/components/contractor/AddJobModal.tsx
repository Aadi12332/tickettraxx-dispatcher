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
  { label: "Sturdy Cedar Titan", value: "Sturdy Cedar Titan" },
  { label: "Bold Trailblazer X", value: "Bold Trailblazer X" },
  { label: "Wilderness Warrior 4x4", value: "Wilderness Warrior 4x4" },
  {
    label: "Innovative Freightliner Explorer",
    value: "Innovative Freightliner Explorer",
  },
  {
    label: "789 Granite Way, Stonehaven",
    value: "789 Granite Way, Stonehaven",
  },
  {
    label: "246 Riverbend Rd, Summit City",
    value: "246 Riverbend Rd, Summit City",
  },
  {
    label: "512 Mountain View Dr, Timber Falls",
    value: "512 Mountain View Dr, Timber Falls",
  },
  {
    label: "478 Pebble Path, Brookstone",
    value: "478 Pebble Path, Brookstone",
  },
  {
    label: "963 Crystal Lake Rd, Jewel Valley",
    value: "963 Crystal Lake Rd, Jewel Valley",
  },
  {
    label: "321 Hillcrest Blvd, Boulder Heights",
    value: "321 Hillcrest Blvd, Boulder Heights",
  },
  {
    label: "654 Cliffside St, Vista Point",
    value: "654 Cliffside St, Vista Point",
  },
  {
    label: "789 Flint Ridge Dr, Crestwood",
    value: "789 Flint Ridge Dr, Crestwood",
  },
  {
    label: "852 Granite Way, Spring Valley",
    value: "852 Granite Way, Spring Valley",
  },
  {
    label: "963 Brookstone Ln, Meadowview",
    value: "963 Brookstone Ln, Meadowview",
  },
  { label: "147 Summit Rd, Hilltop", value: "147 Summit Rd, Hilltop" },
  {
    label: "258 Stonebridge Ave, Eastwood",
    value: "258 Stonebridge Ave, Eastwood",
  },
  {
    label: "741 Canyon Ridge Rd, Pine Grove",
    value: "741 Canyon Ridge Rd, Pine Grove",
  },
  {
    label: "884 Oak Valley Blvd, Maple Creek",
    value: "884 Oak Valley Blvd, Maple Creek",
  },
  {
    label: "519 Riverstone Dr, Cedar Hills",
    value: "519 Riverstone Dr, Cedar Hills",
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
          <div className="px-8 pt-8 pb-4 flex items-start justify-between">
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
          <div className="px-8 pb-8">
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
