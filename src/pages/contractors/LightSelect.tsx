import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface LightSelectProps {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
}

const LightSelect = ({
  label,
  options,
  value = "",
  onChange,
}: LightSelectProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    onChange?.(option);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="h-[65px] border border-[#E5E7EB] rounded-[5px] bg-white px-4 pt-2 cursor-pointer"
      >
        <label className="block text-xs font-medium text-[#6B7280]">
          {label}
        </label>

        <div className="flex items-center justify-between mt-1">
          <span
            className={`text-sm font-medium ${
              selected ? "text-[#1B2D6B]" : "text-[#9CA3AF]"
            }`}
          >
            {selected || "Select one"}
          </span>

          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#E5E7EB] rounded-[5px] shadow-lg z-50 max-h-[300px] overflow-y-auto">
         {options.map((option) => (
  <div
    key={option.value}
    onClick={() => handleSelect(option.value)}
    className={`px-4 py-2 text-sm cursor-pointer ${
      selected === option.value
        ? "bg-[#E4EEFF] text-[#1D3461] font-medium"
        : "hover:bg-gray-100"
    }`}
  >
    {option.label}
  </div>
))}
        </div>
      )}
    </div>
  );
};

export default LightSelect;