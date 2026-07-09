import { Modal } from "@mui/material";
import { X, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CommonTextInput from "../../common/CommonTextInput";
import CommonSelectInput from "../../common/CommonSelectInput";

import {
  deliveryOptions,
  pickupOptions,
  poCustomerOptions,
  thirdPartyCustomerOptions2,
} from "../../../utils/data";

const materialOptions = [
  {
    label: "Silica Sand",
    value: "Silica Sand",
  },
  {
    label: "Crushed Granite",
    value: "Crushed Granite",
  },
  {
    label: "Quartz Sand",
    value: "Quartz Sand",
  },
  {
    label: "Limestone Gravel",
    value: "Limestone Gravel",
  },
  {
    label: "Pea Gravel",
    value: "Pea Gravel",
  },
  {
    label: "Crushed Stone",
    value: "Crushed Stone",
  },
  {
    label: "River Sand",
    value: "River Sand",
  },
];
interface CreatePOCodeModalProps {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  onOpenPickupModal?: () => void;
}

const initialFormData = {
  poCode: "",
  material: "",
  customer: "",
  thirdPartyCustomer: "",
  invoiceRate: "",
  contractorRate: "",
  pickup: "",
  deliver: "",
};

const editFormData = {
  poCode: "5552389933",
  material: "1' Rock",
  customer: "HEIDELBERG MATERIALS",
  thirdPartyCustomer: "Third Party 1",
  invoiceRate: "10.00",
  contractorRate: "8.50",
  pickup: "115 Ambrose Street Bells, TX 75414",
  deliver: "Tom Harpool WTP Expansion PH...",
};

const CreatePOCodeModal = ({
  open,
  onClose,
  isEdit = false,
  onOpenPickupModal,
}: CreatePOCodeModalProps) => {
  const [formData, setFormData] = useState(
    isEdit ? editFormData : initialFormData
  );

  useEffect(() => {
    if (!open) return;

    setFormData(isEdit ? editFormData : initialFormData);
  }, [open, isEdit]);

  const handleChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const isFormValid = useMemo(() => {
    return Object.values(formData).every(
      (value) => String(value).trim() !== ""
    );
  }, [formData]);

  const handleSubmit = () => {
    if (!isFormValid) return;

    console.log("PO Code Data:", formData);

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[9999]">
        <div className="w-full max-w-[570px] bg-white rounded-[8px] shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-4 pt-4 pb-4 flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-normal text-black">
                {isEdit ? "Edit PO Code" : "Create PO Code"}
              </h2>

              <p className="mt-3 text-sm text-[#717182]">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
            </div>

            <button onClick={onClose} className="cursor-pointer">
              <X className="size-6 text-black" />
            </button>
          </div>

          {/* Form */}
          <div className="px-4 pb-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 max-h-[70dvh] overflow-y-auto">
              <CommonTextInput
                label="Enter New PO Code / JobID#"
                placeholder="Enter..."
                value={formData.poCode}
                onChange={handleChange("poCode")}
              />

              <CommonSelectInput
                label="Material"
                value={formData.material}
                placeholder="Select one..."
                onChange={handleChange("material")}
                options={materialOptions}
              />

              <CommonSelectInput
                label="Select Customer"
                value={formData.customer}
                placeholder="Select one..."
                onChange={handleChange("customer")}
                options={poCustomerOptions}
              />

              <CommonSelectInput
                label="Third Party Customer (if any)"
                value={formData.thirdPartyCustomer}
                placeholder="Select one..."
                onChange={handleChange("thirdPartyCustomer")}
                options={thirdPartyCustomerOptions2}
                addNewLabel="Add New"
              />

              <CommonTextInput
                label="Invoice Rate"
                placeholder="$0.00"
                value={formData.invoiceRate}
                onChange={handleChange("invoiceRate")}
                isAmount
              />

              <CommonTextInput
                label="Contractor Rate"
                placeholder="$0.00"
                value={formData.contractorRate}
                onChange={handleChange("contractorRate")}
                isAmount
              />

              <CommonSelectInput
                label="Pickup"
                value={formData.pickup}
                placeholder="Select one..."
                onChange={handleChange("pickup")}
                options={pickupOptions}
                addNewLabel="Add New"
              />

              <CommonSelectInput
                label="Deliver"
                value={formData.deliver}
                placeholder="Select one..."
                onChange={handleChange("deliver")}
                options={deliveryOptions}
                addNewLabel="Add New"
                addNewMode="modal"  
                onAddNew={onOpenPickupModal}
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-4 mt-10">
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`flex-1 min-w-[200px] h-[40px] rounded-[8px] text-sm font-normal flex items-center justify-center gap-1 transition-all
                  ${
                    isFormValid
                      ? "bg-primary text-white cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {!isEdit && <Plus size={18} />}
                {isEdit ? "Save" : "Create PO Code"}
              </button>

              <button
                onClick={onClose}
                className="flex-1 h-[40px] border border-primary text-primary rounded-[8px] text-sm font-normal cursor-pointer"
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

export default CreatePOCodeModal;