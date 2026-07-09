import { useState } from "react";
import { PlusCircle } from "lucide-react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import PageHeader from "../../components/common/PageHeader";
import TableFilters from "../../components/common/TableFilters";
import Table from "../../components/common/Table";
import CreatePickupModal from "../../components/pickup/modal/CreatePickupModal";
import CalendarModal from "../../components/common/modal/CalendorModal";
import CommonButton from "../../components/common/CommonButton";

const columns = [
  { label: "#", key: "id", width: "70px" },
  { label: "Customer", key: "customer" },
  { label: "Type", key: "type" },
  { label: "Pickup/Deliver", key: "pickupDeliver" },
  { label: "Contractor Rate", key: "contractorRate" },
  { label: "Invoice Rate", key: "invoiceRate" },
  { label: "Details", key: "actions" },
];

const data = [
  {
    id: 1,
    customer: "AMRIZE",
    type: "Pickup",
    pickupDeliver: "115 Ambrose Street Bells, TX 75414",
    contractorRate: "$12.00",
    invoiceRate: "$14.00",
    date: "2026-07-01",
  },
  {
    id: 2,
    customer: "HEIDELBERG MATERIALS",
    type: "Pickup",
    pickupDeliver: "Lake Bridgeport, TX 76426",
    contractorRate: "$12.00",
    invoiceRate: "$14.00",
    date: "2026-07-02",
  },
  {
    id: 3,
    customer: "RAVENNA-1",
    type: "Pickup",
    pickupDeliver: "Ravenna - Resolve Aggregates, TX 75476",
    contractorRate: "$12.00",
    invoiceRate: "$14.00",
    date: "2026-07-03",
  },
  {
    id: 4,
    customer: "RAVENNA-2",
    type: "Pickup",
    pickupDeliver: "Ravenna - Resolve Aggregates, TX 75476",
    contractorRate: "$12.00",
    invoiceRate: "$14.00",
    date: "2026-07-04",
  },
  {
    id: 5,
    customer: "HEIDELBERG MATERIALS",
    type: "Deliver",
    pickupDeliver: "Tom Harpool WTP Expansion PH2 1150...",
    contractorRate: "$12.00",
    invoiceRate: "$14.00",
    date: "2026-07-05",
  },
];

const PickupPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [openCalendarModal, setOpenCalendarModal] = useState(false);
  const [openEditPickup, setOpenEditPickup] = useState(false);

  const [selectedDate, setSelectedDate] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);

  const formatDateRange = () => {
    const [start, end] = selectedDate;

    if (!start && !end) return "";

    if (start && !end) return start.format("DD/MM/YYYY");

    if (start && end) {
      return `${start.format("DD/MM/YYYY")} - ${end.format("DD/MM/YYYY")}`;
    }

    return "";
  };

  const filteredData = data
    .filter((item) => {
      if (!search) return true;

      return (
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase()) ||
        item.pickupDeliver.toLowerCase().includes(search.toLowerCase())
      );
    })
    .filter((item) => {
      const [start, end] = selectedDate;

      if (!start && !end) return true;

      const itemDate = dayjs(item.date);

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
    .slice(0, entries);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pickup/Deliver"
        description="Enables you to track the status of the loads"
      >
        <div className="flex flex-wrap items-center gap-4 ml-auto">
          <CommonButton
            size="md"
            variant="primary"
            onClick={() => setOpenModal(true)}
          >
            <PlusCircle size={18} />
            Create Pickup/Deliver
          </CommonButton>
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

        <Table
          columns={columns}
          data={filteredData}
          onEdit={() => setOpenEditPickup(true)}
        />
      </div>

      <CreatePickupModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <CreatePickupModal
        open={openEditPickup}
        onClose={() => setOpenEditPickup(false)}
        isEdit
      />

      <CalendarModal
        isOpen={openCalendarModal}
        onClose={() => setOpenCalendarModal(false)}
        onApply={setSelectedDate}
      />
    </div>
  );
};

export default PickupPage;