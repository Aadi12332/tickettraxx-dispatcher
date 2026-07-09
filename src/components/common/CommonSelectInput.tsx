// import { FormControl, MenuItem, Select } from "@mui/material";
// import { ChevronDown } from "lucide-react";

// interface Option {
//   label: string;
//   value: string;
// }

// interface CommonSelectInputProps {
//   label: string;
//   value?: string;
//   onChange?: (value: string) => void;
//   options: Option[];
//   placeholder?: string;
//   addNewLabel?: string;
//   onAddNew?: () => void;
// }

// const CommonSelectInput = ({
//   label,
//   value,
//   onChange,
//   options,
//   placeholder,
//   addNewLabel,
//   onAddNew,
// }: CommonSelectInputProps) => {
//   return (
//     <div className="w-full">
//       <label className="block text-sm xl:text-base font-normal text-black mb-2.5">
//         {label}
//       </label>

//       <FormControl fullWidth>
//         <Select
//           value={value}
//           displayEmpty
//           onChange={(e) => onChange && onChange(e.target.value)}
//           IconComponent={(props) => (
//             <ChevronDown
//               {...props}
//               size={18}
//               className={`${props.className} transition-transform duration-200`}
//               color="black"
//             />
//           )}
//           renderValue={(selected) => {
//             if (!selected) {
//               return (
//                 <span className="text-black font-normal">
//                   {placeholder || "Select one..."}
//                 </span>
//               );
//             }

//             const option = options.find((item) => item.value === selected);
//             return option?.label ?? "";
//           }}
//           sx={{
//             height: "40px",
//             borderRadius: "8px",
//             fontSize: "14px",
//             fontWeight: 500,
//             backgroundColor: "#fff",
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#E5E7EB",
//               borderWidth: "0.85px",
//             },
//             "&:hover .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#E5E7EB",
//               borderWidth: "0.85px",
//             },
//             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#E5E7EB",
//               borderWidth: "0.85px",
//             },
//             "& .MuiSelect-icon": {
//               right: "12px",
//               color: "#6B7280",
//               width: "18px",
//               height: "18px",
//               top: "50%",
//               transform: "translateY(-50%)",
//             },

//             "& .MuiSelect-iconOpen": {
//               transform: "translateY(-50%) rotate(180deg)",
//             },
//           }}
//     MenuProps={{
//   disablePortal: false,
//   keepMounted: true,
//   disableScrollLock: true,

//   anchorOrigin: {
//     vertical: "bottom",
//     horizontal: "left",
//   },

//   transformOrigin: {
//     vertical: "top",
//     horizontal: "left",
//   },

//   slotProps: {
//     paper: {
//       elevation: 6,
//       sx: {
//         mt: 0.5,
//         borderRadius: "10px",
//         maxHeight: 270,
//         zIndex: 1700,
//       },
//     },
//   },
// }}
//         >
//           {placeholder && (
//             <MenuItem
//               sx={{ fontWeight: "normal", fontSize: "12px" }}
//               value=""
//               disabled
//             >
//               {placeholder}
//             </MenuItem>
//           )}

//           {addNewLabel && (
//             <MenuItem
//               disableRipple
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 onAddNew?.();
//               }}
//               sx={{
//                 position: "sticky",
//                 top: 0,
//                 zIndex: 9,
//                 backgroundColor: "#fff",
//                 fontWeight: 600,
//                 fontSize: "13px",
//                 paddingLeft: "6px",
//                 paddingRight: "0px",
//                 "&:hover": {
//                   backgroundColor: "#fff",
//                 },
//               }}
//             >
//               {addNewLabel}
//             </MenuItem>
//           )}
//           {options.map((option) => (
//             <MenuItem
//               sx={{
//                 fontWeight: "normal",
//                 fontSize: "12px",
//                 paddingLeft: "6px",
//                 paddingRight: "0px",
//                 textWrap: "wrap",
//               }}
//               key={option.value}
//               value={option.value}
//             >
//               {option.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default CommonSelectInput;


import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface CommonSelectInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Option[];
  placeholder?: string;
  addNewLabel?: string;
  onAddNew?: () => void;
}

const CommonSelectInput = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select one...",
  addNewLabel,
  onAddNew,
}: CommonSelectInputProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((item) => item.value === value)?.label || "";

  return (
    <div className="w-full" ref={wrapperRef}>
      <label className="block text-sm xl:text-base font-normal text-black mb-2.5">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`
          w-full
          h-[40px]
          border
          border-[#E5E7EB]
          rounded-[8px]
          bg-white
          px-4
          flex
          items-center
          justify-between
          transition-all
        `}
      >
        <span
          className={`text-sm ${
            value ? "text-black" : "text-[#6B7280]"
          }`}
        >
          {value ? selectedLabel : placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            mt-1
            border
            border-[#E5E7EB]
            rounded-[10px]
            bg-white
            overflow-hidden
          "
        >
          {addNewLabel && (
            <>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onAddNew?.();
                }}
                className="
                  sticky
                  top-0
                  z-10
                  bg-white
                  w-full
                  text-left
                  px-3
                  py-3
                  text-[13px]
                  font-semibold
                  border-b
                  border-[#E5E7EB]
                "
              >
                {addNewLabel}
              </button>
            </>
          )}

          <div className="max-h-[240px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
                className={`
                  w-full
                  text-left
                  px-3
                  py-2.5
                  text-sm
                  hover:bg-gray-50
                  transition-colors
                  ${
                    value === option.value
                      ? "bg-gray-100 font-medium"
                      : ""
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonSelectInput;