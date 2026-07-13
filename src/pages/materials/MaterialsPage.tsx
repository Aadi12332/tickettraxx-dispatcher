import { useState } from "react";
import {PlusCircle, RefreshCcw } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import TableFilters from "../../components/common/TableFilters";
import Table from "../../components/common/Table";
import CommonButton from "../../components/common/CommonButton";
import CreateMaterialModal from "../../components/materials/modal/CreateMaterialModal";
import LoadUpdateSuccessModal from "../../components/common/modal/LoadUpdateSuccessModal";
import ExportButton from "../../components/common/ExportButton";
const materialColumns = [
  { label: "#", key: "id" },
  { label: "Materials", key: "material" },
  { label: "Details", key: "actions" },
];

const materialData = [
  { id: 1, material: "Non Blend Sand" },
  { id: 2, material: '1" Rock' },
  { id: 3, material: "Concrete Sand" },
  { id: 4, material: '3/4" Rock' },
  { id: 5, material: '1 - 1/2" Rock' },
  { id: 6, material: "ManSand" },
  { id: 7, material: "P-Gravel" },
  { id: 8, material: "TX-180" },
  { id: 9, material: "C-33" },
];
const MaterialsPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditMaterial, setOpenEditMaterial] = useState(false);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleUpdate = () => {
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };
  const filteredMaterials = materialData
    .filter((item) => {
      if (!search) return true;

      return (
        item.material.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toString().includes(search)
      );
    })
    .slice(0, entries);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Materials"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      >
        <div className="flex flex-wrap items-center lg:gap-3 gap-1 ml-auto">
          <CommonButton
            variant="primary"
            size="md"
            icon={<PlusCircle size={18} />}
            onClick={() => setOpenModal(true)}
          >
            Create Materials
          </CommonButton>
          {/* Export */}
          <ExportButton
            onClick={() => {
              console.log("Export started...");
            }}
          />

          {/* Refresh */}
          <CommonButton
            size="md"
            variant="secondary"
            iconOnly
            icon={<RefreshCcw size={18} />}
            onClick={handleUpdate}
          />
        </div>
      </PageHeader>
      <div className=" bg-white">
        <TableFilters
          searchValue={search}
          onSearchChange={setSearch}
          entries={entries}
          onEntriesChange={setEntries}
        />
        <Table
          columns={materialColumns}
          data={filteredMaterials}
          onEdit={() => setOpenEditMaterial(true)}
          onDelete={(item) => console.log("Delete Material:", item)}
          minWidth="500px"
        />
      </div>

      <CreateMaterialModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
      <CreateMaterialModal
        open={openEditMaterial}
        onClose={() => setOpenEditMaterial(false)}
        isEdit
      />
      <LoadUpdateSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="You have successfully loaded the materials."
      />
    </div>
  );
};

export default MaterialsPage;
