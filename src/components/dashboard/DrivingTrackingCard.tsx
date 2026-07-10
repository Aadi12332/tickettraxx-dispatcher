import {
  Mail,
  PhoneCall,
  MapPinned,
  Map,
  Star,
  MessageSquareText,
} from "lucide-react";

interface DriverTrackingCardProps {
  data: {
    name: string;
    truckId: string;
    avatar: string;
    subcontractor: string;
    status: string;
    eta: string;
    location: string;
    rating: number;
  };
}

const DriverTrackingCard = ({ data }: DriverTrackingCardProps) => {
  return (
    <div className="bg-white border border-(--border-gray-2) rounded-lg p-2 md:p-[1.2vw] h-full">
      {/* Avatar */}

      <div className="flex flex-col items-center">
        <div className="rounded-full border-2 border-orange">
          <img
            src={data.avatar}
            alt={data.name}
            className="xl:w-[58px] xl:h-[58px] object-cover rounded-full border-6 border-white"
          />
        </div>

        <h3 className="mt-4 text-base xl:text-lg font-semibold font-archivo">
          {data.name}
        </h3>

        <span className="px-4 py-1 rounded-md bg-pink-100 text-pink-500 text-xs xl:text-sm">
          Truck ID: {data.truckId}
        </span>
      </div>

      <div className="xl:mt-7 mt-4 space-y-1">
        <InfoRow
          icon={<Mail className="xl:size-5 size-4"/>}
          label="Subcontractor"
          value={data.subcontractor}
        />

        <InfoRow
          icon={<PhoneCall className="xl:size-5 size-4"/>}
          label="Status"
          value={data.status}
        />

        <InfoRow icon={<Map className="xl:size-5 size-4"/>} label="ETA" value={data.eta} />

        <InfoRow
          icon={<MapPinned className="xl:size-5 size-4"/>}
          label="Current Location"
          value={data.location}
        />
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4 flex items-center justify-between">
        <div className="flex gap-4">
          <ActionIcon icon={<Mail className="cursor-pointer size-3" />} active />
          <ActionIcon icon={<PhoneCall className="cursor-pointer size-3" />} />
          <ActionIcon icon={<MessageSquareText className="cursor-pointer size-3" />} />
        </div>

        <div className="flex items-center gap-2">
          <Star size={20} fill="#FFC107" color="#FFC107" />
          <span className="text-sm font-archivo text-gray-500">
            {data.rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DriverTrackingCard;

const InfoRow = ({ icon, label, value }: any) => (
  <div className="flex items-start gap-2    ">
    <div className="text-gray-500 mt-1  ">{icon}</div>

    <div className="text-sm">
      <span className="font-semibold">{label}: </span>
      {value}
    </div>
  </div>
);

const ActionIcon = ({ icon, active }: any) => (
  <button
    className={`
      w-7 h-7 rounded-full flex items-center justify-center
      ${active ? "bg-[#FAE7E7] text-orange" : "text-green bg-[#dcf5e3]"}
    `}
  >
    {icon}
  </button>
);
