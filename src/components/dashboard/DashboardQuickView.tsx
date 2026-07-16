import { SlidersHorizontal } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import { useState } from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import LiveShipmentTrackingModal from "./modal/LiveShipmentTrackingModal";
import CommonFilterDropdown from "../common/CommonFilterDropdown";

interface Driver {
  id: number;
  name: string;
  image: string;
  trips: number;
  remainingLoads: string;
  onTime: string;
  revenue: string;
  rating: number;
  date: string;
}

interface DashboardQuickViewProps {
  selectedDate?: [Dayjs | null, Dayjs | null];
}

const drivers: Driver[] = [
  {
    id: 1,
    name: "Anthony Lewis",
    image: "https://i.pravatar.cc/150?img=11",
    trips: 38,
    remainingLoads: "2 of 10",
    onTime: "96%",
    revenue: "$4,50,000",
    rating: 4.7,
    date: "2026-07-05",
  },
  {
    id: 2,
    name: "Brian Villalobos",
    image: "https://i.pravatar.cc/150?img=12",
    trips: 29,
    remainingLoads: "3 of 10",
    onTime: "91%",
    revenue: "$3,15,000",
    rating: 4.5,
    date: "2026-07-08",
  },
  {
    id: 3,
    name: "Harvey Smith",
    image: "https://i.pravatar.cc/150?img=13",
    trips: 29,
    remainingLoads: "1 of 10",
    onTime: "98%",
    revenue: "$8,40,000",
    rating: 4.5,
    date: "2026-06-28",
  },
  {
    id: 4,
    name: "Stephan Peralt",
    image: "https://i.pravatar.cc/150?img=14",
    trips: 41,
    remainingLoads: "2 of 10",
    onTime: "98%",
    revenue: "$8,40,000",
    rating: 4.2,
    date: "2026-07-11",
  },
  {
    id: 5,
    name: "Mike Hawkins",
    image: "https://i.pravatar.cc/150?img=15",
    trips: 20,
    remainingLoads: "3 of 10",
    onTime: "96%",
    revenue: "$6,10,000",
    rating: 4.0,
    date: "2026-07-12",
  },
  {
    id: 6,
    name: "Robert Downy",
    image: "https://i.pravatar.cc/150?img=16",
    trips: 38,
    remainingLoads: "4 of 10",
    onTime: "96%",
    revenue: "$5,55,000",
    rating: 4.0,
    date: "2026-07-16",
  },
];

const DriverRow = ({
  driver,
  onDriverClick,
}: {
  driver: Driver;
  onDriverClick: () => void;
}) => {
  return (
    <tr className="border-b border-gray-100 last:border-none font-archivo">
      <td className="py-2 px-3 font-archivo">
        <div className="flex items-center gap-3">
          <img
            src={driver.image}
            alt={driver.name}
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
            onClick={onDriverClick}
          />
          <span
            className="text-sm font-medium text-black font-archivo cursor-pointer hover:underline"
            onClick={onDriverClick}
          >
            {driver.name}
          </span>
        </div>
      </td>

      <td className="py-5 text-sm text-black  font-archivo">{driver.trips}</td>

      <td className="py-5 text-sm text-black  font-archivo">
        {driver.remainingLoads}
      </td>

      <td className="py-5 text-sm text-text-secondary  font-archivo">
        {driver.onTime}
      </td>

      <td className="py-5 text-sm text-text-secondary  font-archivo">
        {driver.revenue}
      </td>

      <td className="py-5">
        <div className="flex items-center gap-2 text-text-secondary  font-archivo text-sm">
          ⭐ {driver.rating}
        </div>
      </td>
    </tr>
  );
};

const DashboardQuickView = ({ selectedDate = [null, null] }: DashboardQuickViewProps) => {
  const [isLiveTrackingModalOpen, setIsLiveTrackingModalOpen] = useState(false);
  const [completionSort, setCompletionSort] = useState("");
  const [ratingSort, setRatingSort] = useState("");

  // const formatDateRange = () => {
  //   const [start, end] = selectedDate;

  //   if (!start && !end) return "";

  //   if (start && !end) return start.format("DD/MM/YYYY");

  //   if (start && end) {
  //     return `${start.format("DD/MM/YYYY")} - ${end.format("DD/MM/YYYY")}`;
  //   }

  //   return "";
  // };

  const filteredDrivers = [...drivers].filter((driver) => {
    const [start, end] = selectedDate;

    if (!start && !end) return true;

    const driverDate = dayjs(driver.date);

    if (start && !end) {
      return driverDate.isSame(start, "day");
    }

    if (start && end) {
      return (
        driverDate.isSame(start, "day") ||
        driverDate.isSame(end, "day") ||
        (driverDate.isAfter(start, "day") && driverDate.isBefore(end, "day"))
      );
    }

    return true;
  });

  const sortedDrivers = [...filteredDrivers].sort((a, b) => {
    if (ratingSort) {
      if (ratingSort === "rating_high_to_low") {
        return b.rating - a.rating;
      }

      if (ratingSort === "rating_low_to_high") {
        return a.rating - b.rating;
      }
    }

    const aOnTime = parseInt(a.onTime.replace("%", ""));
    const bOnTime = parseInt(b.onTime.replace("%", ""));

    if (completionSort === "low_to_high") {
      return aOnTime - bOnTime;
    }

    if (completionSort === "high_to_low") {
      return bOnTime - aOnTime;
    }

    return 0;
  });
  return (
    <div className="bg-white rounded-[5px] border border-(--border-gray-2) overflow-hidden shadow-sm">
      {/* Header */}

      <div className="px-5 py-2 sm:py-3 flex-wrap gap-3 flex items-center justify-between border-b border-(--border-gray-2)">
        <SectionTitle
          title={"Dispatch Dashboard Quick View"}
          className="text-sm sm:text-[18px]"
        />

        <div className="flex items-center gap-1 sm:gap-4">
          <CommonFilterDropdown
            value={completionSort}
            onChange={(value) => {
              setCompletionSort(value);
              setRatingSort("");
            }}
            icon={!completionSort ? <SlidersHorizontal size={18} /> : null}
            options={[
              { label: "Default", value: "" },
              { label: "Low to High Completion %", value: "low_to_high" },
              { label: "High to Low Completion %", value: "high_to_low" },
            ]}
            size="auto"
          />

        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-(--border-gray-2) h-[36px]">
              <th className="text-left px-2 xl:px-5 text-xs sm:text-sm font-semibold text-black font-archivo">
                Drivers Name
              </th>

              <th className="text-left text-xs sm:text-sm font-semibold text-black font-archivo">
                Completed Trips
              </th>

              <th className="text-left text-xs sm:text-sm font-semibold text-black font-archivo">
                Remaining Loads
              </th>

              <th className="text-left text-xs sm:text-sm font-semibold text-black font-archivo">
                On-Time %
              </th>

              <th className="text-left text-xs sm:text-sm font-semibold text-black font-archivo">
                Revenue
              </th>

              <th
                onClick={() =>
                  setRatingSort(
                    ratingSort === "rating_high_to_low"
                      ? "rating_low_to_high"
                      : "rating_high_to_low",
                  )
                }
                className="text-left text-xs sm:text-sm font-semibold text-black font-archivo cursor-pointer"
              >
                Rating{" "}
                <span className="text-[8px]">
                  {" "}
                  {ratingSort === "rating_high_to_low"
                    ? "▼"
                    : ratingSort === "rating_low_to_high"
                      ? "▲"
                      : "▼"}
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedDrivers.length > 0 ? (
              sortedDrivers.map((driver) => (
                <DriverRow
                  key={driver.id}
                  driver={driver}
                  onDriverClick={() => setIsLiveTrackingModalOpen(true)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-text-secondary">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <LiveShipmentTrackingModal
        isOpen={isLiveTrackingModalOpen}
        onClose={() => setIsLiveTrackingModalOpen(false)}
      />
    </div>
  );
};

export default DashboardQuickView;
