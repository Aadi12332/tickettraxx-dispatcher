import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface CommonDateInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const CommonDateInput = ({
  label,
  value,
  onChange,
//   placeholder = "MM/DD/YYYY",
}: CommonDateInputProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm xl:text-base font-normal text-black mb-2.5">
        {label}
      </label>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 

          format="MM/DD/YYYY"
          value={value ? dayjs(value, "MM/DD/YYYY") : null}
          onChange={(newValue: Dayjs | null) =>
            onChange?.(newValue ? newValue.format("MM/DD/YYYY") : "")
          }
          slotProps={{
            field: {},
            textField: {
              fullWidth: true,

            },
          }}
          sx={{
            width: "100%",
padding:0,
            "& .MuiOutlinedInput-root": {
              height: "37px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
              backgroundColor: "#fff",
              padding:0
            },

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D1D5DB",
              borderWidth: "0.85px",
            },

            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D1D5DB",
              borderWidth: "0.85px",
            },

            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#D1D5DB",
                borderWidth: "0.85px",
              },

            "& input": {
              padding: "8.5px 4px",
            },

            "& .MuiInputBase-input::placeholder": {
              opacity: 1,
              color: "#9CA3AF",
            },
            "& .MuiPickersSectionList-root-MuiPickersInputBase-sectionsContainer-MuiPickersOutlinedInput-sectionsContainer":{
                padding:"0"
            }
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CommonDateInput;
