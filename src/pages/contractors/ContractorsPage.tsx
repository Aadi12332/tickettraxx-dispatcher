import { useMemo, useState } from "react";
import { Calendar1, Funnel, Plus, RefreshCcw } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import CommonButton from "../../components/common/CommonButton";
import StatsCard from "../../components/common/StatCard";
import userGroup from "../../assets/icons/usersGroup.svg";
import activeUsers from "../../assets/icons/userShare.svg";
import activeDrivers from "../../assets/icons/userPlus.svg";
import inActiveUsers from "../../assets/icons/userPause.svg";
import { useNavigate } from "react-router-dom";
import CalendarModal from "../../components/common/modal/CalendorModal";
import ContractorModal from "../../components/contractor/ContractorModal";
import CommonFilterDropdown from "../../components/common/CommonFilterDropdown";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import CommonSearchInput from "../../components/common/CommonSearchInput";
import ExportButton from "../../components/common/ExportButton";
import LoadUpdateSuccessModal from "../../components/common/modal/LoadUpdateSuccessModal";

const statsData = [
  {
    title: "Total Contractors",
    value: 300,
    icon: <img src={userGroup} alt="userGroup" className="" />,
  },
  {
    title: "Active Contractors",
    value: 270,
    icon: <img src={activeUsers} alt="activeUsers" className="" />,
  },
  {
    title: "Inactive Contractors",
    value: 30,
    icon: <img src={inActiveUsers} alt="inActiveUsers" className="" />,
  },
  {
    title: "Active Drivers",
    value: 30,
    icon: <img src={activeDrivers} alt="activeDrivers" className="" />,
  },
  {
    title: "Inactive Drivers",
    value: 30,
    icon: <img src={inActiveUsers} alt="inActiveDrivers" className="" />,
  },
];
export const columns = [
  { label: "Driver Name", key: "driverName" },
  { label: "Contractor", key: "contractor" },
  { label: "Parking Location", key: "parkingLocation" },
  { label: "Unit Number", key: "unitNumber" },
  { label: "Phone", key: "phone" },
  { label: "Email", key: "email" },
  { label: "Status", key: "status" },
];

export const data = [
  {
    id: "1",
    driverName: "Marley Levin",
    contractor: "Skyline Contractors",
    parkingLocation: "Sunnyvale",
    unitNumber: "124",
    phone: "(555) 012-3456",
    email: "alice@example.com",
    status: "Active",
    createdAt: "2026-07-01",
  },
  {
    id: "2",
    driverName: "Lydia Culhane",
    contractor: "Golden State Builders",
    parkingLocation: "Emerald City",
    unitNumber: "017",
    phone: "(555) 987-6543",
    email: "bob@example.com",
    status: "Inactive",
    createdAt: "2026-06-01",
  },
  {
    id: "3",
    driverName: "Zaire Stanton",
    contractor: "Lone Star Renovations",
    parkingLocation: "Capitol Heights",
    unitNumber: "124",
    phone: "(555) 234-5678",
    email: "charlie@example.com",
    status: "Active",
    createdAt: "2026-07-02",
  },
  {
    id: "4",
    driverName: "Wilson Ekstrom Bothman",
    contractor: "Peach State Construction",
    parkingLocation: "Silver Lake",
    unitNumber: "17",
    phone: "(555) 876-5432",
    email: "dave@example.com",
    status: "Active",
    createdAt: "2026-06-11",
  },
  {
    id: "5",
    driverName: "Jaydon Geidt",
    contractor: "Pacific Coast Contractors",
    parkingLocation: "Maplewood",
    unitNumber: "36",
    phone: "(555) 345-6789",
    email: "eve@example.com",
    status: "Active",
    createdAt: "2026-05-01",
  },
  {
    id: "6",
    driverName: "Ruben Ekstrom Bothman",
    contractor: "Sunshine State Services",
    parkingLocation: "Golden State",
    unitNumber: "369",
    phone: "(555) 654-3210",
    email: "frank@example.com",
    status: "Inactive",
    createdAt: "2026-07-3",
  },
];
const ContractorsPage = () => {
  const [search, setSearch] = useState("");
  const [entries] = useState(10);
  const [openCalendarModal, setOpenCalendarModal] = useState(false);
  const [openCreateContractorModal, setOpenCreateContractorModal] =
    useState(false);
  const [filter, setFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);

  const [contractors, setContractors] = useState(data);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleUpdate = () => {
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const formatDateRange = () => {
    const [start, end] = selectedDate;

    if (!start && !end) return "Select Date Range";

    if (start && !end) return start.format("DD/MM/YYYY");

    if (start && end) {
      return `${start.format("DD/MM/YYYY")} - ${end.format("DD/MM/YYYY")}`;
    }

    return "Select Date Range";
  };

  const handleStatusToggle = (item: any) => {
    console.log("clicked", item);
    setContractors((prev) =>
      prev.map((row) =>
        row.id === item.id
          ? {
              ...row,
              status: row.status === "Active" ? "Inactive" : "Active",
            }
          : row,
      ),
    );
  };
  const navigate = useNavigate();
  const filteredData = useMemo(() => {
    let filtered = [...contractors];

    // Search
    if (search.trim()) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }

    // Date Range Filter
    const [start, end] = selectedDate;

    if (start || end) {
      filtered = filtered.filter((item) => {
        const itemDate = dayjs(item.createdAt);

        if (start && !end) {
          return itemDate.isSame(start, "day");
        }

        if (start && end) {
          return (
            itemDate.isSame(start, "day") ||
            itemDate.isSame(end, "day") ||
            (itemDate.isAfter(start, "day") && itemDate.isBefore(end, "day"))
          );
        }

        return true;
      });
    }

    // Existing dropdown filter
    if (filter) {
      filtered = filtered.filter((item) => {
        const days = Number(filter);
        return Number(item.id) <= days / 30;
      });
    }

    return filtered.slice(0, entries);
  }, [contractors, search, entries, filter, selectedDate]);

  const handleDelete = (item: any) => {
    setContractors((prev) =>
      prev.filter((contractor) => contractor.id !== item.id),
    );
  };
  return (
    <div className="space-y-6">
      <PageHeader
        title="Contractors"
        description="Create, edit and deactivate subcontractors"
      >
        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 ml-auto">
          <CommonSearchInput
            placeholder="Search"
            size="md"
            value={search}
            onChange={setSearch}
          />
          <button
            onClick={() => setOpenCalendarModal(true)}
            className="bg-white border border-(--border-gray-2) rounded-[5px] px-2 xl:px-4 py-1 xl:py-2 flex items-center gap-3 cursor-pointer w-fit"
          >
            <Calendar1 size={16} />
            <span className="text-sm font-normal">{formatDateRange()}</span>
          </button>
          <CommonButton
            variant="primary"
            size="xs"
            icon={<Plus size={18} />}
            onClick={() => setOpenCreateContractorModal(true)}
          >
            Add Contractor
          </CommonButton>
          {/* Export */}
          <ExportButton
            onClick={() => {
              console.log("Export started...");
            }}
          />

          {/* Refresh */}
          <CommonButton
            size="sm"
            variant="secondary"
            iconOnly
            icon={<RefreshCcw className="xl:size-4 size-3 shrink-0" />}
            onClick={handleUpdate}
          />
        </div>
      </PageHeader>
      <div className="">
        <div className="py-4 pb-0 space-y-4 ">
          <div className=" bg-white p-1.5">
            <CommonFilterDropdown
              size="130px"
              title="Filter"
              value={filter}
              onChange={setFilter}
              icon={<Funnel size={15} />}
              options={[
                { label: "30 Days", value: "30" },
                { label: "90 Days", value: "90" },
                { label: "180 Days", value: "180" },
                { label: "365 Days", value: "365" },
              ]}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 xl:gap-4 mt-4">
              {statsData.map((item, index) => (
                <StatsCard
                  key={index}
                  title={item.title}
                  value={item.value}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
          <Table
            columns={columns}
            data={filteredData}
            onEdit={(item) => console.log("Edit Material:", item)}
            onDelete={handleDelete}
            onStatusToggle={handleStatusToggle}
            onRowClick={(item) => navigate(`/contractors/view/${item.id}`)}
          />
        </div>
      </div>
      <CalendarModal
        isOpen={openCalendarModal}
        onClose={() => setOpenCalendarModal(false)}
        onApply={setSelectedDate}
      />

      <ContractorModal
        open={openCreateContractorModal}
        onClose={() => setOpenCreateContractorModal(false)}
      />

      <LoadUpdateSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="You have successfully loaded the contractors."
      />
    </div>
  );
};

export default ContractorsPage;
