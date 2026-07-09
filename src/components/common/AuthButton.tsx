import type { ButtonHTMLAttributes, ReactNode } from "react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

const AuthButton = ({
  children,
  isLoading = false,
  className = "",
  disabled,
  ...props
}: AuthButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`
        w-full
        h-12
        rounded-lg
        bg-primary
        text-white
        font-medium
        cursor-pointer
        transition-all
        hover:opacity-90
        active:opacity-80
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default AuthButton;
