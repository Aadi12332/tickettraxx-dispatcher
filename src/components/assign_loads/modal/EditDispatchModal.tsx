import { Modal } from "@mui/material";
import { X, Plus, Minus } from "lucide-react";
import CommonTextInput from "../../common/CommonTextInput";
import CommonSelectInput from "../../common/CommonSelectInput";
import { useEffect, useState } from "react";
import { materialOptions } from "../../contractor/AddJobModal";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { addDispatch } from "../../../store/dispatchSlice";
import {
  customerOptions,
  deliveryOptions,
  pickupOptions,
  poCodeOptions,
} from "../../../utils/data";
import CreatePickupModal from "../../pickup/modal/CreatePickupModal";

interface EditDispatchModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  isEdit?: boolean;
  onOpenPickupModal?: () => void;
}

const initialFormData = {
  dispatchDate: "",
  customer: "",
  poCode: "",
  material: "",
  loads: "",
  invoiceRate: "",
  contractorRate: "",
  pickup: "",
  deliver: "",
  startTime: "",
  endTime: "",
  comment: "",
};

const editFormData = {
  dispatchDate: "2024-06-13",
  customer: "HEIDELBERG MATERIALS",
  poCode: "5552389933",
  material: "1' Rock",
  loads: "2",
  invoiceRate: "$10.00",
  contractorRate: "$10.00",
  pickup: "115 Ambrose Street Bells, TX 75414",
  deliver: "Tom Harpool WTP Expansion PH...",
  startTime: "10:00 AM",
  endTime: "06:00 PM",
  comment: "Existing dispatch note...",
};
const EditDispatchModal = ({
  open,
  onClose,
  title,
  description,
  isEdit,
  onOpenPickupModal,
}: EditDispatchModalProps) => {
  const [columns, setColumns] = useState<number[]>(isEdit ? [1] : []);
  const [formData, setFormData] = useState(
    isEdit ? editFormData : initialFormData,
  );
  const [openPickupModal, setOpenPickupModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!open) return;

    if (isEdit) {
      setFormData(editFormData);
      setColumns([1]);
    } else {
      setFormData(initialFormData);
      setColumns([]);
    }
  }, [open, isEdit]);

  const handleClose = () => {
    onClose();
  };

  const handleDispatchDateChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      dispatchDate: value,
    }));

    if (columns.length === 0 && value) {
      setColumns([1]);
    }
  };

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!isEdit) {
      dispatch(addDispatch(formData));
    }
    handleClose();
  };

  const handleAddColumn = () => {
    setColumns((prev) => [...prev, prev.length + 1]);
  };
  const handleRemoveColumn = () => {
    if (columns.length > 0) {
      setColumns((prev) => prev.slice(0, -1));
    }
  };

  const isFormValid =
    formData.dispatchDate.trim() !== "" &&
    formData.customer.trim() !== "" &&
    formData.poCode.trim() !== "" &&
    formData.material.trim() !== "" &&
    formData.loads.trim() !== "" &&
    formData.invoiceRate.trim() !== "" &&
    formData.contractorRate.trim() !== "" &&
    formData.pickup.trim() !== "" &&
    formData.deliver.trim() !== "" &&
    formData.startTime.trim() !== "" &&
    formData.endTime.trim() !== "" &&
    formData.comment.trim() !== "" &&
    columns.length > 0;

  const disableActions = !isEdit && !isFormValid;
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[9999]">
        <div className="w-full max-w-[600px] bg-white rounded-[8px] shadow-sm max-h-[90dvh] flex flex-col overflow-hidden">
          <div className="shrink-0 px-3 py-3 xl:px-4 xl:py-3 flex items-start justify-between">
            <div>
              <h2 className="text-lg xl:text-xl font-normal text-black">
                {isEdit
                  ? (title ?? "Edit Dispatch")
                  : (title ?? "Create Dispatch")}
              </h2>
              <p className="mt-1 text-xs md:text-sm md:mt-2 text-[#717182]">
                {description ??
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-black hover:opacity-70 cursor-pointer"
            >
              <X className="size-5 md:size-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 xl:px-4 pb-3">
            {/* Dispatch Date */}
            <div className="mt-6">
              <CommonTextInput
                label="Dispatch Date"
                placeholder="mm/dd/yyyy"
                value={formData.dispatchDate}
                onChange={handleDispatchDateChange}
                type="date"
              />
            </div>

            {/* Columns */}
            <div className="mt-4 flex items-center gap-4">
              <span className="text-sm xl:text-base font-semibold">
                Columns:
              </span>

              <button
                // disabled={!formData.dispatchDate}
                onClick={handleAddColumn}
                className={`w-7 h-7 rounded flex items-center justify-center text-white bg-[#22C55E] cursor-pointer`}
              >
                <Plus size={18} />
              </button>
              {/* {columns.length} */}
              <button
                disabled={columns.length === 0}
                onClick={handleRemoveColumn}
                className={`w-7 h-7 rounded flex items-center justify-center text-white
    ${
      columns.length
        ? "bg-[#FF0000] cursor-pointer"
        : "bg-[#FF0000] cursor-not-allowed"
    }`}
              >
                <Minus size={18} />
              </button>
            </div>

            {/* Form Grid */}
            {columns.map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 md:gap-y-4 mt-6"
              >
                <CommonSelectInput
                  label="Customer"
                  value={formData.customer}
                  onChange={handleChange("customer")}
                  options={customerOptions}
                />

                <CommonSelectInput
                  label="Job ID# / PO Code"
                  value={formData.poCode}
                  onChange={handleChange("poCode")}
                  options={poCodeOptions}
                />
                <CommonSelectInput
                  label="Material"
                  value={formData.material}
                  onChange={handleChange("material")}
                  options={materialOptions}
                />

                <CommonTextInput
                  label="Number of Loads"
                  value={formData.loads}
                  onChange={handleChange("loads")}
                  placeholder="Enter"
                />

                <CommonTextInput
                  label="Invoice Rate"
                  value={formData.invoiceRate}
                  onChange={handleChange("invoiceRate")}
                  placeholder="$0.00"
                  isAmount
                />

                <CommonTextInput
                  label="Contractor Rate"
                  value={formData.contractorRate}
                  onChange={handleChange("contractorRate")}
                  placeholder="$0.00"
                  isAmount
                />

                <CommonSelectInput
                  label="Pickup"
                  value={formData.pickup}
                  onChange={handleChange("pickup")}
                  options={pickupOptions}
                />

                <CommonSelectInput
                  label="Deliver"
                  value={formData.deliver}
                  onChange={handleChange("deliver")}
                  options={deliveryOptions}
                  addNewLabel="Add New"
                  onAddNew={onOpenPickupModal}
                />

                <CommonTextInput
                  label="Start Time"
                  value={formData.startTime}
                  onChange={handleChange("startTime")}
                  type="time"
                />

                <CommonTextInput
                  label="End Time"
                  value={formData.endTime}
                  onChange={handleChange("endTime")}
                  type="time"
                />
              </div>
            ))}
            {columns.length > 0 && (
              <div className="mt-6">
                <label className="block text-sm xl:text-base mb-2">
                  Comment
                </label>

                <textarea
                  placeholder="Enter..."
                  value={formData.comment}
                  onChange={(e) => handleChange("comment")(e.target.value)}
                  className="w-full h-[120px] border-[0.85px] border-[#E5E7EB] rounded-[8px] p-2 md:p-4 resize-none outline-none"
                />
              </div>
            )}
          </div>
          <div className="shrink-0 border-t border-[#E5E7EB] px-4 xl:px-8 py-4">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleSubmit}
                disabled={disableActions}
                className="flex-1 min-w-[200px] h-[40px] bg-primary text-white rounded-[8px] text-sm flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-default"
              >
                {!isEdit && <Plus size={18} />}
                {!isEdit ? "Add Dispatch" : "Save"}
              </button>

              <button
                onClick={handleAddColumn}
                disabled={disableActions}
                className="flex-1 min-w-[200px] h-[40px] border border-primary text-primary rounded-[8px] text-sm cursor-pointer disabled:opacity-50 disabled:cursor-default"
              >
                Add Another Column
              </button>

              {isEdit && (
                <button
                  onClick={() => navigate("/assign-loads")}
                  disabled={disableActions}
                  className="flex-1 h-[40px] border border-primary text-primary rounded-[8px] text-sm contain-paint cursor-pointer disabled:opacity-50 disabled:cursor-default"
                >
                  Assign Loads
                </button>
              )}
            </div>
          </div>
        </div>
        <CreatePickupModal
          open={openPickupModal}
          onClose={() => setOpenPickupModal(false)}
        />
      </div>
    </Modal>
  );
};

export default EditDispatchModal;
