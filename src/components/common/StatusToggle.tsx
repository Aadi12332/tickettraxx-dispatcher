interface StatusToggleProps {
  active: boolean;
  onToggle?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const StatusToggle = ({ active, onToggle }: StatusToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={`relative w-[70px] h-[22px] rounded-full transition-all duration-300 cursor-pointer ${
        active ? "bg-[#34C759]" : "bg-[#E2B93B]"
      }`}
    >
      {/* Thumb */}
      <div
        className={`absolute top-[3px] left-[2px] w-[16px] h-[16px] bg-white rounded-full shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          active ? "translate-x-[50px]" : "translate-x-0"
        }`}
      />

      {/* Label */}
      <span
        className={`absolute inset-0 flex items-center text-[12px] font-medium text-white transition-all duration-300 ${
          active ? "justify-start pl-2" : "justify-end pr-1"
        }`}
      >
        {active ? "Active" : "Inactive"}
      </span>
    </button>
  );
};

export default StatusToggle;
