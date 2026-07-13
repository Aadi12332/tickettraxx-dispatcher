interface ToggleOption {
  label: string;
  value: string;
}

interface ToggleButtonGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
}

const ToggleButtonGroup = ({
  options,
  value,
  onChange,
}: ToggleButtonGroupProps) => {
  return (
    <div className="border border-(--border-gray-2) rounded-[5px] flex gap-2 py-1 sm:px-2 px-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            sm:px-4 px-2
            py-0.5
            rounded-[5px]
            text-sm
            transition-all
            cursor-pointer
            ${
              value === option.value
                ? "bg-primary text-white"
                : "text-text-gray"
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleButtonGroup;
