import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import placeholderIcon from "../../assets/icons/placeholderImg.svg";
import backgroundImg from "../../assets/images/Rectangle.jpg";
import CommonFileUpload from "../../components/common/CommonFileUpload";
import CommonButton from "../../components/common/CommonButton";
import ToastModal from "../../components/common/modal/ToastModal";
import { useState } from "react";
import LightSelect from "./LightSelect";
const LightInput = ({ label, type = "text", ...props }: any) => (
  <div className="relative w-full h-[65px] border border-[#E5E7EB] rounded-[5px] bg-white px-4 pt-2 ">
    <label className="block text-xs font-medium text-[#6B7280]">{label}</label>
    <input
      type={type}
      className="w-full bg-transparent text-sm text-[#1B2D6B] font-medium outline-none mt-1"
      {...props}
    />
  </div>
);

export const stateOptions = [
  { label: "New York", value: "New York" },
  { label: "California", value: "California" },
  { label: "Texas", value: "Texas" },
  { label: "Florida", value: "Florida" },
  { label: "Illinois", value: "Illinois" },
  { label: "Ohio", value: "Ohio" },
  { label: "Michigan", value: "Michigan" },
  { label: "Oregon", value: "Oregon" },
  { label: "New Jersey", value: "New Jersey" },
  { label: "Colorado", value: "Colorado" },
  { label: "Wisconsin", value: "Wisconsin" },
  { label: "Arkansas", value: "Arkansas" },
  { label: "Kentucky", value: "Kentucky" },
  { label: "Nevada", value: "Nevada" },
  { label: "Virginia", value: "Virginia" },
  { label: "South Carolina", value: "South Carolina" },
  { label: "Maryland", value: "Maryland" },
  { label: "Arizona", value: "Arizona" },
  { label: "Pennsylvania", value: "Pennsylvania" },
  { label: "Washington", value: "Washington" },
];

export const cityOptions = [
  { label: "Brooklyn Heights", value: "Brooklyn Heights" },
  { label: "Astoria", value: "Astoria" },
  { label: "Greenwich Village", value: "Greenwich Village" },
  { label: "Upper West Side", value: "Upper West Side" },
  { label: "Harlem", value: "Harlem" },
  { label: "SoHo", value: "SoHo" },
  { label: "Battery Park City", value: "Battery Park City" },
  { label: "East Village", value: "East Village" },
  { label: "Chelsea", value: "Chelsea" },
  { label: "Williamsburg", value: "Williamsburg" },
  { label: "Morningside Heights", value: "Morningside Heights" },
  { label: "DUMBO", value: "DUMBO" },
  { label: "Little Italy", value: "Little Italy" },
  { label: "Flatiron District", value: "Flatiron District" },
  { label: "NoMad", value: "NoMad" },
  { label: "Hell's Kitchen", value: "Hell's Kitchen" },
  { label: "Long Island City", value: "Long Island City" },
  { label: "Tribeca", value: "Tribeca" },
  { label: "Midtown", value: "Midtown" },
  { label: "Financial District", value: "Financial District" },
];

export const parkingLocationOptions = [
  { label: "Granite Ridge", value: "Granite Ridge" },
  { label: "Marble Falls", value: "Marble Falls" },
  { label: "Slate Harbor", value: "Slate Harbor" },
  { label: "Quartz Springs", value: "Quartz Springs" },
  { label: "Shale Valley", value: "Shale Valley" },
  { label: "Gravel Ridge", value: "Gravel Ridge" },
  { label: "Stone Harbor", value: "Stone Harbor" },
  { label: "Cobblestone Creek", value: "Cobblestone Creek" },
  { label: "Gemstone Ridge", value: "Gemstone Ridge" },
  { label: "Rockfield Springs", value: "Rockfield Springs" },
  { label: "Sandstone Valley", value: "Sandstone Valley" },
  { label: "Flintwood Springs", value: "Flintwood Springs" },
  { label: "Basalt Valley", value: "Basalt Valley" },
  { label: "Riverstone Bay", value: "Riverstone Bay" },
  { label: "Rocktop Springs", value: "Rocktop Springs" },
  { label: "Stonewood Heights", value: "Stonewood Heights" },
  { label: "Eaststone Valley", value: "Eaststone Valley" },
  { label: "Canyon Point", value: "Canyon Point" },
  { label: "Blue Rock Yard", value: "Blue Rock Yard" },
  { label: "Ironwood Depot", value: "Ironwood Depot" },
];

// const LightSelect = ({ label, options }: any) => (
//   <div className="relative w-full h-[65px] border border-[#E5E7EB] rounded-[5px] bg-white px-4 pt-2 ">
//     <label className="block text-xs font-medium text-[#6B7280]">{label}</label>
//     <div className="flex items-center justify-between mt-1">
//       <select className="w-full bg-transparent max-h-[200px] text-sm text-[#1B2D6B] font-medium outline-none appearance-none cursor-pointer">
//         <option value="" disabled selected>
//           Select one
//         </option>
//         {options.map((opt: string) => (
//           <option key={opt} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//       <ChevronDown size={16} className="text-[#6B7280] pointer-events-none" />
//     </div>
//   </div>
// );

const DocumentUpload = ({
  title,
  previewImg,
}: {
  title: string;
  previewImg: string;
}) => (
  <div className="mb-8">
    <div className="flex flex-col md:flex-row gap-6 justify-between">
      {/* Upload Area */}
      <div className="flex-2 flex flex-col">
        <h3 className="text-[#1B2D6B] text-base font-semibold mb-3">{title}</h3>
        <div className="flex-1 border-2 border-dashed border-[#d1d5db] rounded-lg bg-[#F2F2F7] flex flex-col items-center justify-center min-h-[220px]">
          <div className="border-10 border-white w-full h-full flex justify-center items-center flex-col rounded-lg">
            <img src={placeholderIcon} alt="" className="" />
            <p className="text-[#6B7280] text-sm  font-medium">
              Drag the picture
            </p>
            <p className="text-[#9CA3AF] text-sm  ">or</p>
            <div className="flex items-center gap-2 transition-colors mb-2">
              <CommonFileUpload label="Upload Image" />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex flex-col">
        <h4 className="text-[#1B2D6B] text-base font-semibold mb-3">
          Preview {title.replace(" Picture", "")}
        </h4>
        <div className="border border-[#E8E8E8] rounded-lg overflow-hidden h-[259px] w-[272px] bg-white flex items-center justify-center  relative">
          <img
            src={previewImg}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  </div>
);

const AddDriverPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [parking, setParking] = useState("");

  return (
    <div className="pb-10">
      {/* Header section */}
      <div className="flex items-start gap-4 mb-8 flex-wrap">
        <CommonButton
          onClick={() => navigate(-1)}
          size="sm"
          icon={<MoveLeft size={18} />}
        >
          Back
        </CommonButton>
        <div>
          <h1 className="text-xl font-bold text-[#1B2D6B] leading-tight">
            Add Driver
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <LightInput label="Name" />

<LightSelect
  label="State"
  value={state}
  options={stateOptions}
  onChange={setState}
/>

<LightSelect
  label="City"
  value={city}
  options={cityOptions}
  onChange={setCity}
/>

<LightSelect
  label="Parking Location"
  value={parking}
  options={parkingLocationOptions}
  onChange={setParking}
/>

        <LightInput label="Address" />
        <LightInput label="Email" type="email" />
        <LightInput label="Phone" type="tel" />
      </div>

      {/* Document Upload Sections */}
      <DocumentUpload title="CDL Picture" previewImg={backgroundImg} />

      <DocumentUpload title="Medical Card Picture" previewImg={backgroundImg} />

      {/* Submit Action */}
      <div className="flex justify-end mt-10">
        <CommonButton
          variant="primary"
          size="lg"
          onClick={() => {
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
            }, 2000);
          }}
        >
          Add Driver
        </CommonButton>
      </div>
      <ToastModal
        open={open}
        onClose={() => setOpen(false)}
        type="success"
        title="A New Driver Has Been Added"
      />
    </div>
  );
};

export default AddDriverPage;
