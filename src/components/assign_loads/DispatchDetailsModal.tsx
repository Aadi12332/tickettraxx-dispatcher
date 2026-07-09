import { Modal } from "@mui/material";
import AssignLoadCard from "../assign_loads/AssignLoadCard";
import collapsed from "../../assets/Icons/collapsed.svg";
import { useAppSelector } from "../../store";
import { useMemo } from "react";
import { selectLoadCards, type AssignLoadCardData } from "../../store/dispatchSlice";

interface Props {
  open: boolean;
  onClose: () => void;
  loadCards?: any[];
  onCancelReroute: () => void;
  selectedDay?: string;
}

const DispatchDetailsModal = ({
  open,
  onClose,
  onCancelReroute,
  selectedDay,
}: Props) => {
  const selectedDayRedux = useAppSelector((state) => state.dispatch.selectedDay);
  const loadCardsRedux = useAppSelector(selectLoadCards);

  const activeDay = selectedDay || selectedDayRedux;

  const currentLoadCards = useMemo(() => {
    const offset = activeDay.charCodeAt(activeDay.length - 1) % 5;

    return loadCardsRedux.map((card: AssignLoadCardData) => ({
      ...card,
      driverName: `${card.driverName}`,
      loads: card.loads + offset * 5,
    }));
  }, [loadCardsRedux, activeDay]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 bg-black/5 flex items-start justify-center pt-[12dvh]  p-4">
        <div className="w-[96vw] max-w-[1800px] bg-[#F4F5F8] rounded-xl shadow-xl">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 h-[45px] px-6 flex items-center justify-between rounded-t-xl">
            <h2 className="text-lg font-semibold">
              Dispatch Details for {activeDay || "2024-06-03"}
            </h2>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center cursor-pointer"
            >
              <img src={collapsed} alt="" className="h-[18px] w-[18px]" />
            </button>
          </div>

          {/* Cards Section Only */}
          <div className="p-2">
            <div className="flex gap-4 overflow-x-scroll pb-4"   style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#1D3461 #D9D9D9",
            }}>
              {currentLoadCards.map((card: AssignLoadCardData, index: number) => (
                <AssignLoadCard
                  key={index}
                  {...card}
                  expandOnHover={false}
                  onCancelReroute={onCancelReroute}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DispatchDetailsModal;
