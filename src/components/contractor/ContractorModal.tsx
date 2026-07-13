import { Modal } from "@mui/material";
import { X } from "lucide-react";
import CommonTextInput from "../common/CommonTextInput";
import CommonSelectInput from "../common/CommonSelectInput";
import { IOSSwitch } from "../common/Switch";
import CommonFileUpload from "../common/CommonFileUpload";
import CommonButton from "../common/CommonButton";
import { useEffect, useState } from "react";
import { parkingLocationOptions, truckOptions } from "../../utils/data";
import CommonPhoneInput from "../common/CommonPhoneInput";

interface ContractorModalProps {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
}

const stateOptions = [
  "California",
  "Texas",
  "Florida",
  "New York",
  "Pennsylvania",
  "Illinois",
  "Ohio",
  "Georgia",
  "North Carolina",
  "Michigan",
].map((item) => ({
  label: item,
  value: item,
}));

const cityOptions = [
  { label: "Granite City", value: "Granite City" },
  { label: "Slate Town", value: "Slate Town" },
  { label: "Quartz Valley", value: "Quartz Valley" },
  { label: "Shale Springs", value: "Shale Springs" },
  { label: "Gravel Creek", value: "Gravel Creek" },
  { label: "Stoneport", value: "Stoneport" },
  { label: "Cobblestone Bay", value: "Cobblestone Bay" },
  { label: "Gemstone Valley", value: "Gemstone Valley" },
  { label: "Rockfield City", value: "Rockfield City" },
  { label: "Sandstone Harbor", value: "Sandstone Harbor" },
  { label: "Flintwood", value: "Flintwood" },
  { label: "Basalt Hills", value: "Basalt Hills" },
  { label: "Riverstone", value: "Riverstone" },
  { label: "Rocktop", value: "Rocktop" },
  { label: "Stonewood", value: "Stonewood" },
  { label: "Eaststone", value: "Eaststone" },
];

const idTypeOptions = [
  { label: "Driver License", value: "Driver License" },
  { label: "Passport", value: "Passport" },
  { label: "State ID", value: "State ID" },
  { label: "Tax ID", value: "Tax ID" },
];
const initialForm = {
  zipCode: "",
  state: "",
  city: "",
  parkingLocation: "",

  usdot: "",
  txdot: "",

  signatureDate: "",
  expirationDate: "",
  address: "",

  idType: "",
  id: "",
  ownerOperatorFleet: "",
  phoneCode: "+1",
  companyTelephone: "",
  email: "",
  payPercentage: "",
  contactName: "",
  unit: "",
  trucks: "",
  autoRenewal: true,
  truckCount: "",
  contractFile: null as File | null,
  coiFile: null as File | null,
};
const ContractorModal = ({
  open,
  onClose,
  isEdit = false,
}: ContractorModalProps) => {
  const [form, setForm] = useState(initialForm);
  const [cityOptionsState, setCityOptionsState] = useState(cityOptions);
  const handleClose = () => {
    setForm(initialForm);
    onClose();
  };

  const handleSubmit = () => {
    handleClose();
  };
  useEffect(() => {
    if (!open) return;

    if (isEdit) {
      setForm({
        ...initialForm,
        zipCode: "10008",
        state: "California",
        city: "Granite City",
        parkingLocation: "Granite Ridge",
        usdot: "1234567",
        txdot: "TX-98765",
        signatureDate: "2026-01-01",
        expirationDate: "2026-12-31",
        address: "1861 Bayonne Ave, Manchester, NJ",
        idType: "License",
        id: "A12345678",
        ownerOperatorFleet: "Hudson Freight",
        companyTelephone: "+1 458 7877 879",
        email: "perralt12@example.com",
        payPercentage: "8",
        trucks: "1-5",
        contactName: "John Mason",
        unit: "12",
        autoRenewal: true,
      });
    } else {
      setForm(initialForm);
    }
  }, [open, isEdit]);
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[9999]">
        <div className="w-full max-w-[600px] bg-white rounded-[8px] shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-3 pt-4 pb-4 flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-normal text-black">
                {isEdit ? "Edit Contractor" : "Add Contractor"}
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
          <div className=" pb-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 max-h-[55dvh] overflow-y-auto md:px-5 px-3">
              {/* Name */}
              <div className="md:col-span-2">
                <CommonTextInput
                  label="Zip Code"
                  value={form.zipCode}
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      zipCode: value,
                    }))
                  }
                  placeholder="Enter zip code..."
                />
              </div>

              {/* State + City */}
              <CommonSelectInput
                label="State"
                value={form.state}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    state: value,
                  }))
                }
                placeholder="Select one..."
                options={stateOptions}
              />

              <CommonSelectInput
                label="City"
                value={form.city}
                options={cityOptionsState}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    city: value,
                  }))
                }
                addNewLabel="+ Add New City"
                onAddNew={(cityName) => {
                  const newCity = {
                    label: cityName,
                    value: cityName,
                  };

                  setCityOptionsState((prev) => [...prev, newCity]);

                  setForm((prev) => ({
                    ...prev,
                    city: cityName,
                  }));
                }}
              />

              <div className="md:col-span-2">
                <CommonSelectInput
                  label="Parking Location"
                  value={form.parkingLocation}
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      parkingLocation: value,
                    }))
                  }
                  placeholder="Select one..."
                  options={parkingLocationOptions}
                />
              </div>
              {/* Upload */}
              <CommonFileUpload
                label="Upload Contract"
                onChange={(file) => console.log(file)}
              />
              <CommonFileUpload
                label="Upload COI"
                onChange={(file) => console.log(file)}
              />

              {/* USDOT + TxDOT */}
              <CommonTextInput
                label="USDOT"
                value={form.usdot}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    usdot: value,
                  }))
                }
                placeholder="Enter"
              />

              <CommonTextInput
                label="TxDOT"
                value={form.txdot}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    txdot: value,
                  }))
                }
                placeholder="Enter"
              />

              {/* Dates */}
              <CommonTextInput
                label="Signature Date"
                placeholder="mm/dd/yyyy"
                type="date"
                value={form.signatureDate}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    signatureDate: value,
                  }))
                }
              />

              <CommonTextInput
                label="Expiration Date"
                placeholder="mm/dd/yyyy"
                type="date"
                value={form.expirationDate}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    expirationDate: value,
                  }))
                }
              />

              {/* Address */}
              {/* <div className="md:col-span-2">
                <CommonTextInput
                  label="Address"
                  value={form.address}
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      address: value,
                    }))
                  }
                  placeholder="Enter address..."
                />
              </div> */}
              <div className="md:col-span-2">
                <label className="block text-sm xl:text-base mb-2">
                  Address
                </label>
                <textarea
                  placeholder="Add Full Address"
                  value={form.address}
                  onChange={(e: any) =>
                    setForm((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="w-full h-[100px] border-[0.85px] text-sm border-[#E5E7EB] rounded-[8px] p-2 md:p-4 resize-none outline-none"
                />
              </div>

              {/* Zip + Template */}
              {/* <CommonTextInput
                label="ZIP Code"
                value={isEdit ? "08759" : ""}
                placeholder="Enter zip..."
              /> */}

              {/* <CommonTextInput label="Template" placeholder="Enter..." /> */}

              {/* ID Type + ID */}
              <CommonSelectInput
                label="ID Type"
                placeholder="Select one.."
                value={form.idType}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    idType: value,
                  }))
                }
                options={idTypeOptions}
              />

              <CommonTextInput
                label="ID"
                placeholder="Enter id..."
                value={form.id}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    id: value,
                  }))
                }
              />

              {/* Company */}
              <CommonTextInput
                value={form.ownerOperatorFleet}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    ownerOperatorFleet: value,
                  }))
                }
                label="Owner Operator or Fleet"
                placeholder="Enter owner operator or fleet..."
              />
              <CommonPhoneInput
                label="Company Telephone"
                countryCode={form.phoneCode}
                phone={form.companyTelephone}
                onCountryChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    phoneCode: value,
                  }))
                }
                onPhoneChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    companyTelephone: value,
                  }))
                }
              />

              {/* Email + Percentage */}
              <CommonTextInput
                label="Email"
                value={form.email}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    email: value,
                  }))
                }
                placeholder="Enter email..."
              />

              <CommonTextInput
                label="Pay Percentage of Load"
                value={form.payPercentage}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    payPercentage: value,
                  }))
                }
                placeholder="Enter percentage..."
                isPercentage
              />

              <CommonTextInput
                label="Contact Name"
                value={form.contactName}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    contactName: value,
                  }))
                }
                placeholder="Enter"
              />
              <CommonTextInput
                label="#Unit"
                value={form.unit}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    unit: value,
                  }))
                }
                placeholder="Enter"
              />
              {/* Trucks */}
              <CommonSelectInput
                label="How Many Trucks Do You Have?"
                value={form.trucks}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    trucks: value,
                  }))
                }
                options={truckOptions}
              />

              {form.trucks === "multiple" && (
                <CommonTextInput
                  label="Enter Truck Number"
                  value={form.truckCount}
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      truckCount: value,
                    }))
                  }
                  placeholder="e.g., 3"
                />
              )}

              {/* Auto Renewal */}
              <div className="md:col-span-2 flex items-center justify-between mt-2 mb-4">
                <label className="text-[16px] font-normal">
                  Auto Send Renewal Reminders
                </label>

                <IOSSwitch
                  checked={form.autoRenewal}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      autoRenewal: e.target.checked,
                    }))
                  }
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t px-5 border-[#E5E7EB] mt-2 pt-3 flex justify-end flex-wrap gap-1 md:gap-2 xl:gap-4">
              <CommonButton
                variant="primary"
                size="md"
                className="sm:flex-1"
                onClick={handleSubmit}
              >
                {isEdit ? "Save" : "Add Contractor"}
              </CommonButton>

              <CommonButton
                onClick={handleClose}
                variant="secondary"
                size="md"
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

export default ContractorModal;
