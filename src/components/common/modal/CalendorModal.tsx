import React from "react";
import BaseModal from "./BaseModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickerDay } from "@mui/x-date-pickers";
import type { PickerDayProps } from "@mui/x-date-pickers";
import type { PickersCalendarHeaderProps } from "@mui/x-date-pickers/PickersCalendarHeader";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { ChevronLeft, ChevronRight } from "lucide-react";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (dateRange: [Dayjs | null, Dayjs | null]) => void;
}

const CustomCalendarHeader = (props: PickersCalendarHeaderProps) => {
  const { currentMonth, onMonthChange } = props;

  return (
    <div className="flex items-center justify-between px-2 pt-2 pb-4">
      <button
        type="button"
        onClick={() => onMonthChange(dayjs(currentMonth).subtract(1, "month"))}
        className="p-2.5 border border-[#E5E7EB] rounded-[10px]"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex gap-4 text-[18px] md:text-[24px] font-bold">
        <span>{dayjs(currentMonth).format("MMMM")}</span>
        <span>{dayjs(currentMonth).format("YYYY")}</span>
      </div>

      <button
        type="button"
        onClick={() => onMonthChange(dayjs(currentMonth).add(1, "month"))}
        className="p-2.5 border border-[#E5E7EB] rounded-[10px]"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs());

  const handleDateSelect = (newDate: Dayjs | null) => {
    if (!newDate) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(newDate);
      setEndDate(null);
      return;
    }

    if (newDate.isBefore(startDate)) {
      setEndDate(startDate);
      setStartDate(newDate);
    } else {
      setEndDate(newDate);
    }
  };

  const isInRange = (date: Dayjs) => {
    if (!startDate || !endDate) return false;
    return date.isAfter(startDate, "day") && date.isBefore(endDate, "day");
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      position="center"
      className="max-w-[450px]"
      showCloseButton={false}
    >
      <div className="p-3 md:p-6">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={endDate || startDate}
            onChange={handleDateSelect}
            showDaysOutsideCurrentMonth
            slots={{
              calendarHeader: CustomCalendarHeader,
              day: (props: PickerDayProps) => {
                const isStart =
                  !!startDate && props.day.isSame(startDate, "day");

                const isEnd = !!endDate && props.day.isSame(endDate, "day");

                const isMiddle = isInRange(props.day);

                return (
                  <PickerDay
                    {...props}
                    sx={{
                      borderRadius: "12px !important",
                      ...(isStart || isEnd
                        ? {
                            backgroundColor: "#1D3461 !important",
                            color: "#fff !important",
                          }
                        : {}),
                      ...(isMiddle
                        ? {
                            backgroundColor: "#E8EEF9 !important",
                          }
                        : {}),
                    }}
                  />
                );
              },
            }}
            sx={{
              width: "100%",
              "& .MuiPickersDay-root": {
                width: "56px",
                height: "56px",
                borderRadius: "12px",
              },
              "& .MuiPickersCalendarHeader-labelContainer": {
                display: "none",
              },
              "& .MuiPickersArrowSwitcher-root": {
                display: "none",
              },
              "& .MuiDayCalendar-header": {
                justifyContent: "space-between",
                px: "10px",
              },
              "& .MuiDayCalendar-weekContainer": {
                justifyContent: "space-between",
                px: "10px",
              },
              "& .MuiDayCalendar-weekdayLabel": {
                color: "#9CA3AF",
                fontSize: "14px",
                fontWeight: 500,
              },
            }}
          />
        </LocalizationProvider>

        <div className="w-full h-px bg-[#E5E7EB] mb-8" />

        <div className="flex flex-wrap gap-3 justify-between mb-8 px-1">
          <button
            onClick={() => {
              setStartDate(dayjs());
              setEndDate(dayjs());
            }}
            className="flex-1 py-3 bg-[#F3F4F6] rounded-[8px] text-xs xl:text-sm px-2 xl:px-3"
          >
            Today
          </button>

          <button
            onClick={() => {
              setStartDate(dayjs().startOf("week"));
              setEndDate(dayjs().endOf("week"));
            }}
            className="flex-1 py-3 bg-[#F3F4F6] rounded-[8px] text-xs xl:text-sm px-2 xl:px-3"
          >
            This Week
          </button>

          <button
            onClick={() => {
              setStartDate(dayjs().startOf("month"));
              setEndDate(dayjs().endOf("month"));
            }}
            className="flex-1 py-3 bg-[#F3F4F6] rounded-[8px] text-xs xl:text-sm px-2 xl:px-3"
          >
            This Month
          </button>
        </div>

        <div className="flex justify-end gap-4 px-1">
          <button
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
              onApply?.([null, null]);
              onClose();
            }}
            className="text-xs xl:text-sm px-2 xl:px-3 py-2 bg-white border border-[#E5E7EB] rounded-[8px] cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onApply?.([startDate, endDate]);
              onClose();
            }}
            className="px-2 text-xs xl:text-sm xl:px-3 py-2 bg-primary text-white rounded-[5px] cursor-pointer"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default CalendarModal;
