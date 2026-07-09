import {
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ChevronDown } from "lucide-react";

const countryCodes = [
  { label: "🇺🇸 +1", value: "+1" },
];

interface CommonPhoneInputProps {
  label: string;
  countryCode?: string;
  phone?: string;
  onCountryChange?: (value: string) => void;
  onPhoneChange?: (value: string) => void;
  placeholder?: string;
}

const CommonPhoneInput = ({
  label,
  countryCode = "+1",
  phone = "",
  onCountryChange,
  onPhoneChange,
  placeholder = "Enter phone number",
}: CommonPhoneInputProps) => {
  const handlePhoneChange = (value: string) => {
    const numeric = value.replace(/\D/g, "");
    onPhoneChange?.(numeric);
  };

  return (
    <div className="w-full">
      <label className="block text-sm xl:text-base font-normal text-black mb-2.5">
        {label}
      </label>

      <div className="flex gap-1">
        <FormControl sx={{ width: 100 }}>
          <Select
            value={countryCode}
            onChange={(e) => onCountryChange?.(e.target.value)}
            IconComponent={(props) => (
              <ChevronDown
                {...props}
                size={14}
                className={props.className}
              />
            )}
            sx={{
              height: 40,
              width:70,
              borderRadius: "8px",
              fontSize: 12,
              paddingX:0,
              outline:0,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E5E7EB",
                borderWidth: "0.85px",
                padding:"0px"
              },
            }}
            
          >
            {countryCodes.map((country) => (
              <MenuItem key={country.label} value={country.value}>
                {country.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          value={phone}
          placeholder={placeholder}
          onChange={(e) => handlePhoneChange(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 40,
              borderRadius: "8px",
              fontSize: 14,
              background: "#fff",
            },
            "& .MuiOutlinedInput-notchedOutline": {
             borderColor: "#E5E7EB",
                borderWidth: "0.85px",
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
              {
               borderColor: "#E5E7EB",
                borderWidth: "0.85px",
              },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
               borderColor: "#E5E7EB",
                borderWidth: "0.85px",
              },
          }}
        />
      </div>
    </div>
  );
};

export default CommonPhoneInput;