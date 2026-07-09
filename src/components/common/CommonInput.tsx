import React from "react";

interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  type?: "text" | "password" | "email" | "number" | "tel";
}

const CommonInput = ({
  label,
  rightIcon,
  onRightIconClick,
  className = "",
  type = "text",
  ...props
}: CommonInputProps) => {
  return (
    <div
      className="
        relative
        w-full
h-[65px]
        border
        rounded-[10px]
        border-(--border-gray)
        bg-(--bg-black)
        px-2
         pt-1
      "
    >
      <label
        className="
          block
          text-sm
          font-light
          text-(--color-text-gray)
        "
      >
        {label}
      </label>

      <div className="flex items-center justify-between">
        <input
          {...props}
          type={type}
          className={`
            w-full
            bg-transparent
            text-base
            text-white
            outline-none
            placeholder:opacity-50 mt-1 h-5
            ${className}
          `}
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="ml-4 mb-2 shrink-0 cursor-pointer"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default CommonInput;
