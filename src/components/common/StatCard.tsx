import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
}

const StatsCard = ({ icon, title, value }: StatsCardProps) => {
  return (
<div className="w-full min-w-0 bg-white border border-[#E5E7EB] rounded-[5px] sm:px-5 px-3 py-2 flex items-center gap-2 shadow-sm">
      {/* Icon */}
      <div className="w-[40px] h-[40px] border border-[#1D3461] bg-[#B9D1FF73] rounded-[14px] flex items-center justify-center shrink-0">
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <p className="text-[11px] font-medium text-[#6B7280] leading-[20px]">
          {title}
        </p>
        <h3 className="text-sm sm:text-base 2xl:text-lg font-semibold text-[#111827] leading-[40px]">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default StatsCard;