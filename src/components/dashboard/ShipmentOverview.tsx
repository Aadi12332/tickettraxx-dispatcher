import { useState } from "react";
import { Calendar1 } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import CalendarModal from "../common/modal/CalendorModal";
import CommonFilterDropdown from "../common/CommonFilterDropdown";
import CommonButton from "../common/CommonButton";
import { customerOptions } from "../fsc/modal/CreateFscModal";

const shipmentData = [
  { day: "M", value: 55 },
  { day: "T", value: 90 },
  { day: "W", value: 35 },
  { day: "T", value: 110 },
  { day: "F", value: 85, active: true },
  { day: "S", value: 80 },
  { day: "S", value: 80 },
];

export default function ShipmentOverview() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(customerOptions[0].value);

  return (
    <div className="bg-white rounded-[5px] border shadow-sm border-(--border-gray-2) pb-2">
      <div className="flex flex-wrap lg:flex-nowrap gap-1 items-center justify-between border-b  border-(--border-gray-2) px-2.5 py-4">
        <SectionTitle title="Shipment Overview" />

        <div className="flex items-center xl:gap-2 gap-[0.2vw] ml-auto">
          <CommonFilterDropdown
            value={selectedCustomer}
            onChange={setSelectedCustomer}
            options={customerOptions}
            size="140px"
          />

          <CommonButton
            onClick={() => setIsCalendarOpen(true)}
            variant="secondary"
            size="md"
          >
            <Calendar1 size={15} />
            <span className="text-xs font-normal">Today</span>
          </CommonButton>
        </div>
      </div>

      <div className="flex items-end justify-between h-[250px] mt-10 px-4">
        {shipmentData.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div
              className={`
                w-3.5 rounded-full
                ${item.active ? "bg-primary" : "bg-text-gray"}
              `}
              style={{
                height: `${item.value * 1.2}px`,
              }}
            />

            <span className="text-gray-500 text-xs">{item.day}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-4 px-4 font-archivo">
        <span className="bg-green text-white px-2 py-1 rounded-lg text-xs 2xl:text-sm">
          +6%
        </span>

        <span className="text-xs 2xl:text-sm text-(--text-gray)">
          98% of completion
        </span>
      </div>

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </div>
  );
}
