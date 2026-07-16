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
  poCustomerOptions,
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

// ---------- PO-wise data map ----------
// Har PO code ke liye uska apna customer, materials (1/2/3), pickup,
// deliver, rates, time aur comment. Jab bhi PO select hoga,
// yahi se poora data pull hoga.
interface PODataEntry {
  customer: string;
  materials: string[];
  loads: string;
  pickup: string;
  deliver: string;
  invoiceRate: string;
  contractorRate: string;
  startTime: string;
  endTime: string;
  comment: string;
}

const PO_DATA_MAP: Record<string, PODataEntry> = {
  "5552389933": {
    customer: "Amrize",
    loads: "2",
    materials: ["1' Rock"],
    pickup: "115 Ambrose Street Bells, TX 75414",
    deliver: "789 Riverview Drive, Riverview, TX 75014",
    invoiceRate: "$10.00",
    contractorRate: "$10.00",
    startTime: "10:00",
    endTime: "18:00",
    comment: "Existing dispatch note...",
  },

  "1234567890": {
    customer: "Heidelberg Materials",
    loads: "1",
    materials: ["Sturdy Cedar Titan", "Bold Trailblazer X"],
    pickup: "Lake Bridgeport, TX 76426",
    deliver: "Tom Harpool WTP Expansion PH2",
    invoiceRate: "$12.00",
    contractorRate: "$11.00",
    startTime: "08:00",
    endTime: "16:00",
    comment: "Two-material dispatch for this PO.",
  },

  "0987654321": {
    customer: "Martin Marietta",
    loads: "2",
    materials: [
      "Wilderness Warrior 4x4",
      "Innovative Freightliner Explorer",
      "789 Granite Way, Stonehaven",
    ],
    pickup: "Ravenna - Resolve Aggregates, TX 75476",
    deliver: "365340 - Tiseo Paving CO JOB 27",
    invoiceRate: "$15.00",
    contractorRate: "$13.00",
    startTime: "09:00",
    endTime: "17:00",
    comment: "Three-material dispatch for this PO.",
  },

  "1122334455": {
    customer: "Resolve Aggregates",
    loads: "3",
    materials: ["1' Rock"],
    pickup: "54501 North Bridgeport Quarry, TX 76426",
    deliver: "321 Oakridge Blvd, Oakridge, TX 75015",
    invoiceRate: "$9.50",
    contractorRate: "$9.00",
    startTime: "07:30",
    endTime: "15:30",
    comment: "",
  },

  "2233445566": {
    customer: "RPM xConstruction",
    loads: "2",
    materials: ["Sturdy Cedar Titan", "Wilderness Warrior 4x4"],
    pickup: "654 Pine Valley Rd, Pine Valley, TX 75001",
    deliver: "654 Pine Valley Rd, Pine Valley, TX 75016",
    invoiceRate: "$11.00",
    contractorRate: "$10.50",
    startTime: "11:00",
    endTime: "19:00",
    comment: "",
  },

  "3344556677": {
    customer: "Amrize",
    loads: "2",
    materials: [
      "Bold Trailblazer X",
      "Innovative Freightliner Explorer",
      "789 Granite Way, Stonehaven",
    ],
    pickup: "115 Ambrose Street Bells, TX 75414",
    deliver: "789 Riverview Drive, Riverview, TX 75014",
    invoiceRate: "$14.00",
    contractorRate: "$12.50",
    startTime: "06:00",
    endTime: "14:00",
    comment: "",
  },
};

const defaultEditPoCode = "5552389933";

// isEdit mount ke time PO_DATA_MAP se poora data resolve kar deta hai,
// taaki edit mode khulte hi sab kuch (time, comment sab) fill ho.
const buildEditFormData = () => {
  const poData = PO_DATA_MAP[defaultEditPoCode];
  return {
    dispatchDate: "2024-06-13",
    customer: poData.customer,
    poCode: defaultEditPoCode,
    material: poData.materials[0],
    loads: poData.loads,
    invoiceRate: poData.invoiceRate,
    contractorRate: poData.contractorRate,
    pickup: poData.pickup,
    deliver: poData.deliver,
    startTime: poData.startTime,
    endTime: poData.endTime,
    comment: poData.comment,
  };
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
    isEdit ? buildEditFormData() : initialFormData,
  );
  const [openPickupModal, setOpenPickupModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!open) return;

    if (isEdit) {
      setFormData(buildEditFormData());
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

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    if (field === "poCode") {
      const poData = PO_DATA_MAP[value];

      if (poData) {
        // PO select hua aur uska data mila -> sab kuch (customer, pickup,
        // deliver, material, rates, time, comment) auto-fill karo.
       setFormData((prev) => ({
  ...prev,
  poCode: value,
  customer: poData.customer,
  pickup: poData.pickup,
  deliver: poData.deliver,
  material: poData.materials[0] || "",
  loads: poData.loads,
  invoiceRate: poData.invoiceRate,
  contractorRate: poData.contractorRate,
  startTime: poData.startTime,
  endTime: poData.endTime,
  comment: poData.comment,
}));
      } else {
        // PO code cleared ya unknown -> sirf poCode set karo,
        // material list wapas full list dikhayegi (neeche computed value se)
        setFormData((prev) => ({
          ...prev,
          poCode: value,
        }));
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // PO select hai to sirf usi PO ke materials, warna poori list
  const materialOptionsForSelectedPO = formData.poCode && PO_DATA_MAP[formData.poCode]
    ? PO_DATA_MAP[formData.poCode].materials.map((m) => ({
        label: m,
        value: m,
      }))
    : materialOptions;

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

            {/* Form Grid */}
            {columns.map((_, index) => (
              <div key={index}>
                <h3 className="text-sm xl:text-base font-semibold mb-4 mt-5">
                  Column {index + 1}
                </h3>
                <div
                  // key={index}
                  className="sm:grid-cols-2 grid-cols-1 mt-6 flex sm:grid flex-col gap-4"
                >
                  <CommonSelectInput
                    label="Customer"
                    value={formData.customer}
                    onChange={handleChange("customer")}
                    options={poCustomerOptions}
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
                    options={materialOptionsForSelectedPO}
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
                     addNewLabel="Add New"
                    onAddNew={onOpenPickupModal}
                    addNewMode="modal"
                  />

                  <CommonSelectInput
                    label="Deliver"
                    value={formData.deliver}
                    onChange={handleChange("deliver")}
                    options={deliveryOptions}
                    addNewLabel="Add New"
                    onAddNew={onOpenPickupModal}
                    addNewMode="modal"
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

                  {columns.length > 0 && (
                    <div className="mt-6 col-span-2">
                      <label className="block text-sm xl:text-base mb-2">
                        Comment
                      </label>

                      <textarea
                        placeholder="Enter..."
                        value={formData.comment}
                        onChange={(e) =>
                          handleChange("comment")(e.target.value)
                        }
                        className="w-full h-[120px] border-[0.85px] border-[#E5E7EB] rounded-[8px] p-2 md:p-4 resize-none outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

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

              {isEdit || formData.poCode && (
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