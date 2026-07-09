import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import SectionTitle from "../common/SectionTitle";
import { useState } from "react";
import ToggleButtonGroup from "../common/ToggleButtonGroup";
import { Calendar1 } from "lucide-react";
import CalendarModal from "../common/modal/CalendorModal";

const ytdData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 33000 },
  { month: "Mar", revenue: 44000 },
  { month: "Apr", revenue: 29000 },
  { month: "May", revenue: 65000 },
  { month: "Jun", revenue: 72000 },
  { month: "Jul", revenue: 65000 },
  { month: "Aug", revenue: 76000 },
  { month: "Sep", revenue: 76000 },
  { month: "Oct", revenue: 79000 },
  { month: "Nov", revenue: 22000 },
  { month: "Dec", revenue: 79000 },
];

const last12MonthsData = [
  { month: "Feb", revenue: 35000 },
  { month: "Mar", revenue: 28000 },
  { month: "Apr", revenue: 47000 },
  { month: "May", revenue: 39000 },
  { month: "Jun", revenue: 68000 },
  { month: "Jul", revenue: 74000 },
  { month: "Aug", revenue: 62000 },
  { month: "Sep", revenue: 71000 },
  { month: "Oct", revenue: 69000 },
  { month: "Nov", revenue: 25000 },
  { month: "Dec", revenue: 82000 },
  { month: "Jan", revenue: 77000 },
];

export default function RevenueChart() {
  const [period, setPeriod] = useState("ytd");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const chartData = period === "ytd" ? ytdData : last12MonthsData;
  return (
    <div className="bg-white rounded-[5px] border border-(--border-gray-2) shadow-sm">
      <div className="flex items-center flex-wrap justify-between border-b border-(--border-gray-2) p-4 gap-2">
        <SectionTitle title="Dispatch Dashboard Quick View" />
        <div className="flex items-center gap-2 ml-auto">
          <ToggleButtonGroup
            value={period}
            onChange={setPeriod}
            options={[
              {
                label: "Year to date",
                value: "ytd",
              },
              {
                label: "Last 12 months",
                value: "12months",
              },
            ]}
          />

          <button
            onClick={() => setIsCalendarOpen(true)}
            className="bg-white border border-(--border-gray-2) rounded-[5px] px-4 py-2 flex items-center gap-3 cursor-pointer w-fit ml-auto"
          >
            <Calendar1 size={15} />
            <span className="text-xs font-normal">2026</span>
          </button>
        </div>
      </div>

      <div className="mt-6 px-4">
        <h2 className="text-base font-bold font-archivo">
          $
          {chartData
            .reduce((acc, item) => acc + item.revenue, 0)
            .toLocaleString()}
        </h2>

        <p className="font-medium text-xs font-archivo">
          <span className="text-green font-medium text-xs">+40%</span>
          <span className="text-(--color-gray-text)! font-normal ml-1">
            increased from last year
          </span>
        </p>
      </div>

      <div className="flex justify-end mt-2 px-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[linear-gradient(90deg,#FF6F28_0%,#FF5325_100%)] text-xs " />
          Revenue
        </div>
      </div>

      <div className="h-[280px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#395FA6" />
                <stop offset="100%" stopColor="#122F68" />
              </linearGradient>
            </defs>

            <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" style={{fontSize:'12px'}} />

            <YAxis
              tickFormatter={(value) => `${value / 1000}K`}
              axisLine={false}
              tickLine={false}
              style={{fontSize:'12px'}}
            />

            <Tooltip />

            <Bar
              dataKey="revenue"
              fill="url(#revenueGradient)"
              radius={[6, 6, 0, 0]}
              barSize={21}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </div>
  );
}
