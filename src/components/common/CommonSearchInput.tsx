import { Search } from "lucide-react";

interface CommonSearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  width?: string;
  className?: string;
}

const sizeStyles = {
  sm: {
    height: "h-[32px]",
    icon: "top-2 left-2.5",
    iconSize: 16,
    input: "pl-9 pr-3 text-sm max-w-xs",
  },
  md: {
    height: "h-[34px]",
    icon: "top-2.5 left-3",
    iconSize: 18,
    input: "pl-11 pr-4 text-xs lg:text-sm w-full max-w-[290px]",
  },
  lg: {
    height: "h-[42px]",
    icon: "top-3 left-3",
    iconSize: 20,
    input: "pl-11 pr-4 text-base",
  },
};

const CommonSearchInput = ({
  value = "",
  onChange,
  placeholder = "Search",
  size = "md",
  width = "xl:w-[260px]",
  className = "",
}: CommonSearchInputProps) => {
  const styles = sizeStyles[size];

  return (
    <div className={`relative ${width} ${className}`}>
      <Search
        size={styles.iconSize}
        className={`absolute ${styles.icon} text-text-gray pointer-events-none`}
      />

      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`
          ${styles.height}
          ${styles.input}
          border border-(--border-gray-2)
          rounded-[4px]
          outline-none
          bg-white
          transition-colors
          focus:border-primary
        `}
      />
    </div>
  );
};

export default CommonSearchInput;