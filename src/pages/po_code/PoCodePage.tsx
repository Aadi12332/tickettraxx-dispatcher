import { useState } from "react";
import { Search, PlusCircle, RefreshCcw } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import CreatePOCodeModal from "../../components/po_code/modal/CreatePoModal";
import Table from "../../components/common/Table";
import CommonButton from "../../components/common/CommonButton";
import LoadUpdateSuccessModal from "../../components/common/modal/LoadUpdateSuccessModal";
import CreatePickupModal from "../../components/pickup/modal/CreatePickupModal";
import ExportButton from "../../components/common/ExportButton";

const poCodeData = [
  {
    code: "5500016751",
    date: "22/04/2025",
    pickup: "AMRIZE-Melissa",
    deliver: "Plano-4950",
    material: "Rock",
    customer: "AMRIZE",
    thirdPartyCustomer: "GILCO CIVIL",
    rate: "$14.00",
  },
  {
    code: "5500016751",
    date: "22/04/2025",
    pickup: "HBERG-Bridgeport",
    deliver: "Plano-4951",
    material: "Sand",
    customer: "AMRIZE",
    thirdPartyCustomer: "GILCO CIVIL",
    rate: "$5.25",
  },
  {
    code: "5500016751",
    date: "22/04/2025",
    pickup: "HBERG-LakeBP",
    deliver: "Plano-4952",
    material: "Concrete",
    customer: "AMRIZE",
    thirdPartyCustomer: "GILCO CIVIL",
    rate: "$10.25",
  },
  {
    code: "5500016752",
    date: "22/04/2025",
    pickup: "AMRIZE-Ambrose",
    deliver: "4954 Blue Mound",
    material: "Limestone",
    customer: "HEIDELBERG MATERIALS",
    thirdPartyCustomer: "MCCARTHY VAUGHN PARTNERSHIP",
    rate: "$14.00",
  },
  {
    code: "5500016753",
    date: "22/04/2025",
    pickup: "HBERG-Bridgeport",
    deliver: "4955 Dallas Bickham",
    material: "Limestone",
    customer: "HEIDELBERG MATERIALS",
    thirdPartyCustomer: "MCCARTHY VAUGHN PARTNERSHIP",
    rate: "$14.00",
  },
  {
    code: "5500016754",
    date: "22/04/2025",
    pickup: "AMRIZE-Ambrose",
    deliver: "4958 McKinney",
    material: "River Gravel",
    customer: "RAVENNA-1",
    thirdPartyCustomer: "RPM xConstruction, LLC",
    rate: "$14.00",
  },
  {
    code: "5500016755",
    date: "22/04/2025",
    pickup: "Ravenna - Resolve Aggregates",
    deliver: "4955 Dallas Bickham",
    material: "Clay Soil",
    customer: "RAVENNA-2",
    thirdPartyCustomer: "RPM xConstruction, LLC",
    rate: "$14.00",
  },
  {
    code: "5500016756",
    date: "22/04/2025",
    pickup: "Ravenna - Resolve Aggregates",
    deliver: "4252 Hemphill",
    material: "Pea Gravel",
    customer: "MARTIN MARIETTA",
    thirdPartyCustomer: "----",
    rate: "$14.00",
  },
  {
    code: "5500016757",
    date: "22/04/2025",
    pickup: "AMRIZE-Melissa",
    deliver: "4954 Blue Mound",
    material: "Sandstone",
    customer: "RPM xConstruction",
    thirdPartyCustomer: "Jordyn Baptista",
    rate: "$14.00",
  },
  {
    code: "5500016758",
    date: "22/04/2025",
    pickup: "AMRIZE-Melissa",
    deliver: "4951 Denton",
    material: "Basalt Rock",
    customer: "RPM xConstruction",
    thirdPartyCustomer: "Nolan Septimus",
    rate: "$14.00",
  },
];

const columns = [
  { label: "Code", key: "code" },
  { label: "Date", key: "date" },
  { label: "Pickup", key: "pickup", width: "130px", },
  { label: "Deliver", key: "deliver", width: "130px", },
  { label: "Material", key: "material" },
  { label: "Customer", key: "customer", width: "120px", },
  {
    label: "Third Party Customer",
    key: "thirdPartyCustomer",
    width: "200px",
  },
  {
    label: "Rate",
    key: "rate",
    width: "90px",
  },
  { label: "Details", key: "actions" },
];

const POCode = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [openPickupModal, setOpenPickupModal] = useState(false);
  const [search, setSearch] = useState("");
  const [hidePoModal, setHidePoModal] = useState(false);

  const filteredData = poCodeData.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.code.toLowerCase().includes(value) ||
      item.date.toLowerCase().includes(value) ||
      item.pickup.toLowerCase().includes(value) ||
      item.deliver.toLowerCase().includes(value) ||
      item.material.toLowerCase().includes(value) ||
      item.customer.toLowerCase().includes(value) ||
      item.thirdPartyCustomer.toLowerCase().includes(value) ||
      item.rate.toLowerCase().includes(value)
    );
  });

const handleOpenPickupModal = () => {
  setHidePoModal(true);
  setOpenPickupModal(true);
};

const handleClosePickupModal = () => {
  setOpenPickupModal(false);
  setHidePoModal(false);
};

  const handleUpdate = () => {
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };
  return (
    <div className="space-y-6">
      <PageHeader
        title="PO Code"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      >
        {" "}
        <div className="flex flex-wrap items-center gap-[0.6vw] ml-auto">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="max-w-xs 2xl:max-w-none 2xl:w-[230px] h-[36px] border border-[#E4E7EC] rounded-[5px] bg-white pl-8 pr-4 outline-none text-xs 2xl:text-sm"
            />
          </div>

          {/* Create Button */}
          <CommonButton
            onClick={() => setOpenModal(true)}
            variant="primary"
            size="xs"
            icon={<PlusCircle size={18} />}
          >
            Create PO Code
          </CommonButton>

          {/* Export */}
          <ExportButton
            onClick={() => {
              console.log("Export started...");
            }}
          />

          {/* Refresh */}
          <CommonButton
            size="xs"
            variant="secondary"
            iconOnly
            icon={<RefreshCcw size={14} />}
            onClick={handleUpdate}
          />
        </div>
      </PageHeader>

      <Table
        columns={columns}
        data={filteredData}
        onEdit={() => setEditModal(true)}
        onDelete={(item) => console.log(item)}
        minWidth="min-w-[1100px]"
      />

      <CreatePOCodeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onOpenPickupModal={handleOpenPickupModal}
      />

  <CreatePOCodeModal
  open={editModal && !hidePoModal}
  onClose={() => {
    setEditModal(false);
    setHidePoModal(false);
  }}
  isEdit
  onOpenPickupModal={handleOpenPickupModal}
/>

      <CreatePickupModal
        open={openPickupModal}
        onClose={handleClosePickupModal}
      />
      
      <LoadUpdateSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default POCode;
