import React from "react";
import CommonButton from "./CommonButton";

interface PageHeaderProps {
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const PageHeader = ({
  title,
  description,
  buttonText,
  onButtonClick,
  buttonIcon,
  children,
}: PageHeaderProps) => {
  return (
    // <div className="flex gap-[0.3vw] lg:items-center justify-between">
    //   <div>
    //     <h1 className="text-xl font-bold text-black">{title}</h1>

    //     {description && (
    //       <p className="text-[#707070] text-sm font-normal mt-1">
    //         {description}
    //       </p>
    //     )}
    //   </div>

    //   {children
    //     ? children
    //     : buttonText && (
    //         <CommonButton
    //           onClick={onButtonClick}
    //           variant={"primary"}
    //           size={"md"}
    //           icon={buttonIcon}
    //         >
    //           {buttonText}
    //         </CommonButton>
    //       )}
    // </div>
    <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
  <div className="shrink-0">
    <h1 className="text-base xl:text-xl font-bold text-black">{title}</h1>

    {description && (
      <p className="text-[#707070] text-xs xl:text-sm font-normal mt-1">
        {description}
      </p>
    )}
  </div>

  <div className="3xl:flex-1 md:min-w-0 ml-auto">
    {children
      ? children
      : buttonText && (
          <CommonButton
            onClick={onButtonClick}
            variant="primary"
            size="md"
            icon={buttonIcon}
          >
            {buttonText}
          </CommonButton>
        )}
  </div>
</div>
  );
};

export default PageHeader;

