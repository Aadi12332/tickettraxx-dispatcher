import React, { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  position?: "center" | "top";
  topOffset?: string | number;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "max-w-lg",
  showCloseButton = true,
  position = "center",
  topOffset = "80px",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const positionClasses =
    position === "center"
      ? "flex items-center justify-center"
      : "flex justify-center items-start";

  const modalStyle = position === "top" ? { marginTop: topOffset } : {};

  return (
    <div
      className={`fixed inset-0 z-9999 bg-black/40 transition-opacity duration-300 ${positionClasses}`}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        style={modalStyle}
        className={`bg-white rounded-xl relative w-[90%] md:w-full transform transition-all duration-300 scale-100 opacity-100 ${className}`}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute md:top-4 top-2 right-2 md:p-2 p-1 cursor-pointer rounded-sm transition-colors z-10"
          >
            <X size={20} className="text-gray-500" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default BaseModal;
