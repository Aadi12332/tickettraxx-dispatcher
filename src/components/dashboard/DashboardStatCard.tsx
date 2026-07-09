interface DashboardStatCardProps {
  title: string;
  value: number;
  change: string;
  positive: boolean;
  icon: string;
  chartBars: number[];
  onClick?: () => void;
}

const DashboardStatCard = ({
  title,
  value,
  change,
  positive,
  icon,
  chartBars,
  onClick,
}: DashboardStatCardProps) => {
  return (
    <div
      onClick={onClick}
      className=" bg-white rounded-[5px] border border-(--border-gray-2) shadow-xs py-2 sm:py-4 px-3 xl:px-6 min-h-[130px] flex flex-col justify-between gap-2 sm:gap-4 w-full cursor-pointer hover:shadow-none"
    >
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div
          className="
            w-9
            h-9
            rounded-[5px]
            bg-primary
            flex
            items-center
            justify-center
          "
        >
          <img src={icon} alt={title} className="w-[18px] h-[18px]" />
        </div>

        <span
          className={`
            px-2
            py-1
            rounded-[5px]
            text-xs
            font-normal
            text-white
            ${positive ? "bg-green-500" : "bg-red-500"}
          `}
        >
          {change}
        </span>
      </div>

      {/* Bottom Section */}
      <div className="flex items-end justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="font-archivo text-xl 2xl:text-2xl leading-none font-bold text-(--text-black)">
            {value}
          </h2>

          <p className="mt-1 text-[#6B7280] font-normal text-[10px] sm:text-xs 2xl:text-sm leading-5 max-w-[180px]">
            {title}
          </p>
        </div>

        <div className="flex items-end gap-1 shrink-0 ml-auto">
          {chartBars.map((height, index) => (
            <div
              key={index}
              className="w-[4px] sm:w-[6px] rounded-t-full bg-[#0088FF]"
              style={{
                height: `${height}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCard;
