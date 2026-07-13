import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../common/Table";
import CommonButton from "../common/CommonButton";

export const truckDetailsData = [
  {
    id: 1,
    truckId: "#280099",
    driver: "Andrew Brooks",
    truckType: "Paver",
    licensePlate: "ABC1234",
    capacity: "30 Tons",
  },
  {
    id: 2,
    truckId: "#280099",
    driver: "Andrew Brooks",
    truckType: "Dump Truck",
    licensePlate: "XYZ5678",
    capacity: "20 Tons",
  },
  {
    id: 3,
    truckId: "#280099",
    driver: "John Drake",
    truckType: "Paver",
    licensePlate: "LMN9101",
    capacity: "20 Tons",
  },
  {
    id: 4,
    truckId: "#280798",
    driver: "Andrew Brooks",
    truckType: "Dump Truck",
    licensePlate: "QRS2345",
    capacity: "20 Tons",
  },
  {
    id: 5,
    truckId: "#280798",
    driver: "Mathew Arnold",
    truckType: "Paver",
    licensePlate: "TUV6789",
    capacity: "20 Tons",
  },
  {
    id: 6,
    truckId: "#280798",
    driver: "Mathew Arnold",
    truckType: "Dump Truck",
    licensePlate: "WXY3456",
    capacity: "20 Tons",
  },
  {
    id: 7,
    truckId: "#280798",
    driver: "Mark Lucas",
    truckType: "Paver",
    licensePlate: "JKL7890",
    capacity: "20 Tons",
  },
  {
    id: 8,
    truckId: "#280692",
    driver: "Mark Lucas",
    truckType: "Paver",
    licensePlate: "NOP1234",
    capacity: "20 Tons",
  },
  {
    id: 9,
    truckId: "#280692",
    driver: "Mark Lucas",
    truckType: "Dump Truck",
    licensePlate: "DEF5678",
    capacity: "40 Tons",
  },
];

export const truckDetailsColumns = [
  {
    label: "Truck ID",
    key: "truckId",
  },
  {
    label: "Driver",
    key: "driver",
  },
  {
    label: "Truck Type",
    key: "truckType",
  },
  {
    label: "License Plate",
    key: "licensePlate",
  },
  {
    label: "Capacity",
    key: "capacity",
  },
];
const TruckDetailsTab = () => {
const [search, setSearch] = useState("");

const filteredData = useMemo(() => {
  const value = search.toLowerCase().trim();

  if (!value) return truckDetailsData;

  return truckDetailsData.filter((item) =>
    Object.values(item).some((field) =>
      String(field).toLowerCase().includes(value)
    )
  );
}, [search]);
  const navigate = useNavigate();
  return (
    <div className="border border-[#E5E7EB]">
      <div className="flex items-center justify-between gap-3 p-2 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-[#1B2D6B]">
          Truck Details
        </h3>

        <CommonButton size="sm" variant="primary" onClick={() => navigate("/contractors/add-truck")}>
          Add Truck
        </CommonButton>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 border-t border-[#E5E7EB] pt-5 px-2 sm:px-4">
        <p className="text-sm sm:text-base font-medium text-[#1B2D6B]">
          Total Amount Paid : $32000.00
        </p>
        <div className="relative w-full sm:w-auto">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-56 pl-9 pr-4 h-9 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#233B73] bg-white"
          />
        </div>
      </div>

      <Table
        data={filteredData}
        columns={truckDetailsColumns}
        isCheckbox={false}
        minWidth="600px"
      />
    </div>
  );
};

export default TruckDetailsTab;
