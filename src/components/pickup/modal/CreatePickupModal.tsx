import { Modal } from "@mui/material";
import { X, Plus } from "lucide-react";
import CommonSelectInput from "../../common/CommonSelectInput";
import CommonTextInput from "../../common/CommonTextInput";
import CommonButton from "../../common/CommonButton";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { thirdPartyCustomerOptions } from "../../../utils/data";

function MapClickHandler({ onMapClick }: { onMapClick: (e: any) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e);
    },
  });

  return null;
}

interface CreatePickupModalProps {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
}

const defaultMarkerPos: [number, number] = [49.102, -122.658];

const initialFormData = {
  type: "",
  location: "",
  customer: "",
  contractorRate: "",
  thirdPartyCustomer: "",
};

const editFormData = {
  type: "Pickup",
  location: "115 Ambrose Street Bells, TX 75414",
  customer: "HEIDELBERG MATERIALS",
  contractorRate: "10.00",
  thirdPartyCustomer: "Third Party 1",
};

const CreatePickupModal = ({
  open,
  onClose,
  isEdit = false,
}: CreatePickupModalProps) => {
  const [formData, setFormData] = useState(
    isEdit ? editFormData : initialFormData
  );

  const [markerPos, setMarkerPos] =
    useState<[number, number]>(defaultMarkerPos);

  useEffect(() => {
    if (!open) return;

    setFormData(isEdit ? editFormData : initialFormData);
    setMarkerPos(defaultMarkerPos);
  }, [open, isEdit]);

  const handleChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleClose = () => {
    onClose();
  };

  const isFormValid = useMemo(() => {
    return Object.values(formData).every(
      (value) => String(value).trim() !== ""
    );
  }, [formData]);

  const handleSubmit = () => {
    if (!isFormValid) return;

    console.log(formData);

    handleClose();
  };

  const handleMapClick = async (e: any) => {
    const { lat, lng } = e.latlng;

    setMarkerPos([lat, lng]);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const data = await response.json();

      if (data?.display_name) {
        setFormData((prev) => ({
          ...prev,
          location: data.display_name,
        }));
      }
    } catch {
      setFormData((prev) => ({
        ...prev,
        location: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      }));
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[9999]">
        <div className="w-full max-w-[600px] bg-white rounded-[8px] shadow-sm overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="px-3 pt-4 pb-4 flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-normal text-black">
                {isEdit ? "Edit Pickup/Deliver" : "Create Pickup/Deliver"}
              </h2>

              <p className="mt-3 text-sm text-[#717182]">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
            </div>

            <button onClick={handleClose} className="cursor-pointer">
              <X className="size-6 text-black" />
            </button>
          </div>

          {/* Form */}
          <div className="px-3 pb-4 mt-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 gap-y-4">
              <CommonSelectInput
                label="Type"
                value={formData.type}
                placeholder="Select one..."
                onChange={handleChange("type")}
                options={[
                  {
                    label: "Pickup",
                    value: "Pickup",
                  },
                  {
                    label: "Deliver",
                    value: "Deliver",
                  },
                ]}
              />

              <CommonTextInput
                label={`${formData.type || "Location"} Location`}
                value={formData.location}
                placeholder="Enter"
                onChange={handleChange("location")}
              />

              {formData.type && (
                <>
                  <div>
                    <label className="block text-base font-normal text-black mb-3">
                      GPS Location
                    </label>

                    <div className="border border-[#E5E7EB] rounded-[12px] overflow-hidden">
                      <div className="h-[150px]">
                        <MapContainer
                          center={markerPos}
                          zoom={13}
                          scrollWheelZoom={false}
                          className="w-full h-full"
                          zoomControl={false}
                        >
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                          <Marker position={markerPos} />

                          <MapClickHandler
                            onMapClick={handleMapClick}
                          />
                        </MapContainer>
                      </div>

                      <input
                        value={formData.location}
                        readOnly
                        className="w-full h-[44px] px-4 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <CommonTextInput
                    label="Customer's Name"
                    value={formData.customer}
                    placeholder="Enter"
                    onChange={handleChange("customer")}
                  />

                  <CommonTextInput
                    label="Contractor Rate"
                    placeholder="$0.00"
                    value={formData.contractorRate}
                    onChange={handleChange("contractorRate")}
                    isAmount
                  />

                  <CommonSelectInput
                    label="Third Party Customer (if any)"
                    value={formData.thirdPartyCustomer}
                    placeholder="Select one..."
                    onChange={handleChange("thirdPartyCustomer")}
                    options={thirdPartyCustomerOptions}
                    addNewLabel="Add New"
                    onAddNew={()=>{}}
                  />
                </>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-[#E5E7EB] mt-8 pt-5 flex justify-center flex-wrap gap-4">
              <CommonButton
                size="md"
                variant="primary"
                icon={!isEdit ? <Plus size={18} /> : undefined}
                onClick={handleSubmit}
                // disabled={!isFormValid}
                className={`sm:flex-1 ${
                  !isFormValid
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isEdit ? "Save" : "Create Pickup/Deliver"}
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

export default CreatePickupModal;