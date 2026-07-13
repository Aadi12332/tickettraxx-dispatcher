import { useState } from "react";
import { Funnel, PlusCircle, RefreshCcw } from "lucide-react";
import dayjs, { type Dayjs } from "dayjs";

import PageHeader from "../../components/common/PageHeader";
import TableFilters from "../../components/common/TableFilters";
import Table from "../../components/common/Table";
import CommonButton from "../../components/common/CommonButton";
import CreateFscModal from "../../components/fsc/modal/CreateFscModal";
import CalendarModal from "../../components/common/modal/CalendorModal";
import CommonFilterDropdown from "../../components/common/CommonFilterDropdown";
import LoadUpdateSuccessModal from "../../components/common/modal/LoadUpdateSuccessModal";
import ExportButton from "../../components/common/ExportButton";

export const fscColumns = [
  { label: "Customer", key: "customer" },
  { label: "From", key: "from" },
  { label: "To", key: "to" },
  { label: "Percentage", key: "percentage" },
  { label: "Details", key: "actions" },
];

export const data = [
  {
    customer: "AMRIZE",
    from: "01/01/2026",
    to: "12/30/2026",
    percentage: "15.00%",
  },
  {
    customer: "HEIDELBERG MATERIALS",
    from: "01/04/2026",
    to: "02/07/2026",
    percentage: "5.00%",
  },
  {
    customer: "RAVENNA-1",
    from: "01/06/2026",
    to: "01/12/2025",
    percentage: "12.00%",
  },
  {
    customer: "RAVENNA-2",
    from: "01/08/2026",
    to: "02/04/2026",
    percentage: "25.00%",
  },
  {
    customer: "MARTIN MARETTA",
    from: "01/09/2026",
    to: "01/12/2025",
    percentage: "5.00%",
  },
  {
    customer: "MARTIN MARETTA",
    from: "01/13/2026",
    to: "01/12/2025",
    percentage: "5.00%",
  },
  {
    customer: "RAVENNA-2",
    from: "01/15/2026",
    to: "01/12/2025",
    percentage: "5.00%",
  },
  {
    customer: "RAVENNA-1",
    from: "01/20/2026",
    to: "01/12/2025",
    percentage: "5.00%",
  },
];

const FscPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [openCalendarModal, setOpenCalendarModal] = useState(false);
  const [filter, setFilter] = useState("");

  const [selectedDate, setSelectedDate] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedFsc, setSelectedFsc] = useState<(typeof data)[0] | null>(null);

  const handleUpdate = () => {
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

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

  const filteredData = data
    .filter((item) =>
      item.customer.toLowerCase().includes(search.toLowerCase()),
    )

    .filter((item) => {
      const [start, end] = selectedDate;

      if (!start && !end) return true;

      const itemDate = dayjs(item.from, "MM/DD/YYYY");

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
    })

    .filter((item) => {
      if (!filter) return true;

      const days = Number(filter);

      const itemDate = dayjs(item.from, "MM/DD/YYYY");

      return itemDate.isAfter(dayjs().subtract(days, "day"));
    })

    .slice(0, entries);

  return (
    <div className="space-y-6">
      <PageHeader
        title="FSC"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      >
        <div className="flex flex-wrap items-center gap-4 ml-auto">
          <CommonButton
            variant="primary"
            size="md"
            icon={<PlusCircle size={18} />}
            onClick={() => setOpenModal(true)}
          >
            Create New
          </CommonButton>
          <ExportButton
            onClick={() => {
              console.log("Export started...");
            }}
          />

          <CommonButton
            size="md"
            variant="secondary"
            iconOnly
            icon={<RefreshCcw size={18} />}
            onClick={handleUpdate}
          />
        </div>
      </PageHeader>

      <div className="bg-white">
        <TableFilters
          searchValue={search}
          onSearchChange={setSearch}
          dateRange={formatDateRange()}
          onDateClick={() => setOpenCalendarModal(true)}
          entries={entries}
          onEntriesChange={setEntries}
        />

        <div className="p-4 pb-0 space-y-4">
          <CommonFilterDropdown
            title="Filter"
            value={filter}
            onChange={setFilter}
            icon={<Funnel size={18} />}
            options={[
              { label: "All", value: "" },
              { label: "30 Days", value: "30" },
              { label: "90 Days", value: "90" },
              { label: "180 Days", value: "180" },
              { label: "365 Days", value: "365" },
            ]}
          />

          <Table
            columns={fscColumns}
            data={filteredData}
            onEdit={(item) => {
              setSelectedFsc(item);
              setEditModalOpen(true);
            }}
            onDelete={(item) => console.log(item)}
            minWidth="min-w-[900px]"
          />
        </div>
      </div>

      <CreateFscModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedFsc(null);
        }}
        isEdit
        editData={selectedFsc}
      />

      <CreateFscModal open={openModal} onClose={() => setOpenModal(false)} />

      <CalendarModal
        isOpen={openCalendarModal}
        onClose={() => setOpenCalendarModal(false)}
        onApply={setSelectedDate}
      />
      <LoadUpdateSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={"You have successfully loaded the FSC."}
      />
    </div>
  );
};

export default FscPage;
