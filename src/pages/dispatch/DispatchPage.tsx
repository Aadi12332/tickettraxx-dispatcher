import { Plus } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import DispatchTable from "../../components/dispatch/DispatchTable";
import EditDispatchModal from "../../components/assign_loads/modal/EditDispatchModal";
import { useState } from "react";
import CalendarModal from "../../components/common/modal/CalendorModal";
import TableFilters from "../../components/common/TableFilters";
import AssignLoadsExpandModal from "../../components/assign_loads/modal/AssignLoadsExpandModal";
import CommonButton from "../../components/common/CommonButton";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import CreatePickupModal from "../../components/pickup/modal/CreatePickupModal";

interface DispatchItem {
  date: string;
  total: string;
  status: "Active" | "Closed";
}
const dispatchData: DispatchItem[] = [
  {
    date: "2026-07-01",
    total: "$2210.00",
    status: "Active",
  },
  {
    date: "2026-06-25",
    total: "$220.00",
    status: "Closed",
  },
  {
    date: "2026-06-21",
    total: "$10.00",
    status: "Active",
  },
  {
    date: "2026-06-19",
    total: "$220.00",
    status: "Active",
  },
  {
    date: "2026-06-10",
    total: "$320.00",
    status: "Active",
  },
  {
    date: "2026-06-11",
    total: "$120.00",
    status: "Closed",
  },
  {
    date: "2026-06-02",
    total: "$550.00",
    status: "Active",
  },
];

const Dispatch = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDispatchDetails, setShowDispatchDetails] = useState(false);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openPickupModal, setOpenPickupModal] = useState(false);
  const [_, setIsEditDispatch] = useState(false);
  const [openCalendarModal, setOpenCalendarModal] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [entries, setEntries] = useState(10);
  const [period, setPeriod] = useState("All");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);

  const handleOpenPickupModal = () => {
    setShowEditModal(false);
    setOpenModal(false);

    setOpenPickupModal(true);
  };

  const handleClosePickupModal = () => {
    setOpenPickupModal(false);
    // if (isEditDispatch) {
    //   setShowEditModal(true);
    // } else {
    //   setOpenModal(true);
    // }
  };
  const handleOnView = (item: DispatchItem) => {
    setIsCanceled(item.status !== "Active");
    setShowDispatchDetails(true);
  };

  const filteredData = dispatchData
    .filter((item) => item.date.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => {
      if (!statusFilter) return true;
      if (statusFilter === "active") return item.status === "Active";
      if (statusFilter === "close") return item.status === "Closed";
      return true;
    })
    .filter((item) => {
      const [start, end] = selectedDate;

      if (!start || !end) return true;

      const itemDate = dayjs(item.date);

      return (
        itemDate.isSame(start, "day") ||
        itemDate.isSame(end, "day") ||
        (itemDate.isAfter(start, "day") && itemDate.isBefore(end, "day"))
      );
    })
    .filter((item) => {
      if (period === "All") return true;
      const itemDate = new Date(item.date);
      const today = new Date();

      if (period === "this_week") {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 7);
        return itemDate >= weekStart;
      }

      if (period === "this_month") {
        return (
          itemDate.getMonth() === today.getMonth() &&
          itemDate.getFullYear() === today.getFullYear()
        );
      }

      if (period === "this_year") {
        return itemDate.getFullYear() === today.getFullYear();
      }

      return true;
    })
    .slice(0, entries);
  const formatDateRange = () => {
    const [start, end] = selectedDate;

    if (!start && !end) return "";

    if (start && !end) {
      return start.format("DD/MM/YYYY");
    }

    if (start && end) {
      return `${start.format("DD/MM/YYYY")} - ${end.format("DD/MM/YYYY")}`;
    }

    return "";
  };
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dispatch"
        description="Enables you to track the status of the loads"
      >
        <div className="flex gap-3 ml-auto">
          <CommonButton
            variant="primary"
            size="md"
            onClick={() => {
              setIsEditDispatch(false);
              setShowDispatchDetails(false);
              setOpenModal(true);
            }}
          >
            <Plus size={18} />
            Create Dispatch
          </CommonButton>
        </div>
      </PageHeader>
      <div className="bg-white border border-(--border-gray-2) rounded-xl overflow-hidden">
        <TableFilters
          period={period}
          onPeriodChange={setPeriod}
          searchValue={search}
          onSearchChange={setSearch}
          dateRange={formatDateRange()}
          onDateClick={() => setOpenCalendarModal(true)}
          // entries={entries}
          onEntriesChange={setEntries}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          isSettingFilter={true}
        />

        <DispatchTable
          data={filteredData}
          onView={(item) => handleOnView(item)}
          // Edit
          onEdit={() => {
            setIsEditDispatch(true);
            setShowEditModal(true);
          }}
          onCopy={() => {}}
          onDownload={() => {}}
        />
        <div className="lg:hidden divide-y divide-(--border-gray-2)">
          {/* {dispatchData.map((item: any, index: number) => (
            <DispatchMobileCard
              key={index}
              date={item.date}
              total={item.total}
              status={item.status}
              onView={(item) => handleOnView(item)}
              onEdit={() => setShowEditModal(true)}
              onCopy={() => console.log("copy", item)}
              onDownload={() => console.log("download", item)}
            />
          ))} */}
        </div>
      </div>
      <EditDispatchModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        isEdit
        onOpenPickupModal={handleOpenPickupModal}
      />

      <EditDispatchModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Create Dispatch"
        onOpenPickupModal={handleOpenPickupModal}
      />
      <CreatePickupModal
        open={openPickupModal}
        onClose={handleClosePickupModal}
      />
      <CalendarModal
        isOpen={openCalendarModal}
        onClose={() => setOpenCalendarModal(false)}
        onApply={setSelectedDate}
      />

      <AssignLoadsExpandModal
        open={showDispatchDetails}
        onClose={() => setShowDispatchDetails(false)}
        isCanceled={isCanceled}
      />
    </div>
  );
};

export default Dispatch;
