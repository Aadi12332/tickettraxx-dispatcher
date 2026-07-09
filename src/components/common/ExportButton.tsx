import { useEffect, useState } from "react";
import { Box, ChevronDown, CircleCheck, LoaderCircle } from "lucide-react";
import CommonButton from "./CommonButton";

interface ExportButtonProps {
  onClick?: () => Promise<void> | void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

const ExportButton = ({
  onClick,
  size = "md",
  variant = "secondary",
}: ExportButtonProps) => {
  const [status, setStatus] = useState<
    "idle" | "exporting" | "exported"
  >("idle");

  const handleClick = async () => {
    if (status !== "idle") return;

    setStatus("exporting");

    if (onClick) {
      await Promise.resolve(onClick());
    } else {
      // Dummy delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    setStatus("exported");
  };

  useEffect(() => {
    if (status !== "exported") return;

    const timer = setTimeout(() => {
      setStatus("idle");
    }, 2000);

    return () => clearTimeout(timer);
  }, [status]);

  return (
    <CommonButton
      size={size}
      variant={variant}
      onClick={handleClick}
    //   disabled={status === "exporting"}
    >
      {status === "idle" && (
        <>
          <Box size={18} />
          <span className="font-normal">Export</span>
          <ChevronDown size={18} />
        </>
      )}

      {status === "exporting" && (
        <>
          <Box size={18} />
          <LoaderCircle
            size={18}
            className="animate-spin"
          />
          <span className="font-normal">Exporting...</span>
        </>
      )}

      {status === "exported" && (
        <>
          <CircleCheck size={18} className="text-green-600" />
          <span className="font-normal text-green-600 mr-2.5">
            Exported
          </span>
        </>
      )}
    </CommonButton>
  );
};

export default ExportButton;