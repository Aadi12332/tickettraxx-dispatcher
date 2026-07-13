import { useNavigate } from "react-router-dom";
import { MoveLeft, Plus, Minus } from "lucide-react";
import placeholderIcon from "../../assets/icons/placeholderImg.svg";
import backgroundImg from "../../assets/images/Rectangle.jpg";
import CommonFileUpload from "../../components/common/CommonFileUpload";
import CommonButton from "../../components/common/CommonButton";
import ToastModal from "../../components/common/modal/ToastModal";
import { useState } from "react";

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

const QuantityInput = ({ label, value, onIncrease, onDecrease }: any) => (
  <div className="relative w-full h-[65px] border border-[#E5E7EB] rounded-[5px] bg-white px-4 pt-2 flex flex-col justify-center">
    <label className="block text-xs font-medium text-[#6B7280] absolute top-2">{label}</label>
    <div className="flex items-center justify-between mt-3">
      <button className="text-[#1B2D6B] outline-none cursor-pointer" onClick={onDecrease}>
        <Minus size={18} />
      </button>
      <span className="text-sm text-[#1B2D6B] font-medium">{value}</span>
      <button className="text-[#1B2D6B] outline-none cursor-pointer" onClick={onIncrease}>
        <Plus size={18} />
      </button>
    </div>
  </div>
);

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

const AddTruckPage = () => {
  const [open, setOpen] = useState(false);
  const [aliasValue, setAliasValue] = useState(1);
  const navigate = useNavigate();

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
            Add Truck
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <LightInput label="Unit Number" />
        <QuantityInput 
          label="Alias" 
          value={aliasValue} 
          onIncrease={() => setAliasValue(prev => prev + 1)}
          onDecrease={() => setAliasValue(prev => prev > 0 ? prev - 1 : 0)}
        />
        <LightInput label="Alias 1" />
      </div>

      {/* Truck Details */}
      <div className="mb-4">
        <h3 className="text-[#1B2D6B] text-lg font-bold mb-3">Truck details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <LightInput label="Model & Brand" />
          <LightInput label="Year" />
          <LightInput label="Truck VIN Number" />
        </div>
      </div>

      {/* Document Upload Sections */}
      <DocumentUpload title="Truck DOT Inspection Picture" previewImg={backgroundImg} />

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
          Add Truck
        </CommonButton>
      </div>
      <ToastModal
        open={open}
        onClose={() => setOpen(false)}
        type="success"
        title="A New Truck Has Been Added"
      />
    </div>
  );
};

export default AddTruckPage;
