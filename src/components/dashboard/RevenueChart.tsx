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

type RevenueItem = {
  month: string;
  revenue: number;
};

type RevenueData = {
  ytd: RevenueItem[];
  months12: RevenueItem[];
};

const ytdData: RevenueItem[] = [
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

const last12MonthsData: RevenueItem[] = [
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

const revenueData: Record<number, RevenueData> = {
  2024: {
    ytd: [
      { month: "Jan", revenue: 28000 },
      { month: "Feb", revenue: 32000 },
      { month: "Mar", revenue: 41000 },
      { month: "Apr", revenue: 38000 },
      { month: "May", revenue: 45000 },
      { month: "Jun", revenue: 52000 },
      { month: "Jul", revenue: 61000 },
      { month: "Aug", revenue: 59000 },
      { month: "Sep", revenue: 65000 },
      { month: "Oct", revenue: 70000 },
      { month: "Nov", revenue: 62000 },
      { month: "Dec", revenue: 75000 },
    ],
    months12: [
      { month: "Feb", revenue: 31000 },
      { month: "Mar", revenue: 34000 },
      { month: "Apr", revenue: 39000 },
      { month: "May", revenue: 46000 },
      { month: "Jun", revenue: 51000 },
      { month: "Jul", revenue: 60000 },
      { month: "Aug", revenue: 58000 },
      { month: "Sep", revenue: 63000 },
      { month: "Oct", revenue: 67000 },
      { month: "Nov", revenue: 69000 },
      { month: "Dec", revenue: 72000 },
      { month: "Jan", revenue: 76000 },
    ],
  },

  2025: {
    ytd: ytdData,
    months12: last12MonthsData,
  },

  2026: {
    ytd: [
      { month: "Jan", revenue: 52000 },
      { month: "Feb", revenue: 48000 },
      { month: "Mar", revenue: 59000 },
      { month: "Apr", revenue: 63000 },
      { month: "May", revenue: 71000 },
      { month: "Jun", revenue: 76000 },
      { month: "Jul", revenue: 80000 },
      { month: "Aug", revenue: 83000 },
      { month: "Sep", revenue: 78000 },
      { month: "Oct", revenue: 85000 },
      { month: "Nov", revenue: 79000 },
      { month: "Dec", revenue: 91000 },
    ],
    months12: [
      { month: "Feb", revenue: 50000 },
      { month: "Mar", revenue: 54000 },
      { month: "Apr", revenue: 60000 },
      { month: "May", revenue: 65000 },
      { month: "Jun", revenue: 73000 },
      { month: "Jul", revenue: 77000 },
      { month: "Aug", revenue: 82000 },
      { month: "Sep", revenue: 86000 },
      { month: "Oct", revenue: 81000 },
      { month: "Nov", revenue: 88000 },
      { month: "Dec", revenue: 90000 },
      { month: "Jan", revenue: 94000 },
    ],
  },
};

export default function RevenueChart() {
  const [period, setPeriod] = useState("ytd");
  // const [isCalendarOpen, setIsCalendarOpen] = useState(false);

const [selectedYear, setSelectedYear] = useState<number>(2026);

const currentData = revenueData[selectedYear] ?? revenueData[2026];
const years = Object.keys(revenueData)
  .map(Number)
  .sort((a, b) => b - a);
const chartData =
  period === "ytd"
    ? currentData.ytd
    : currentData.months12;

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

     <select
  value={selectedYear}
  onChange={(e) => setSelectedYear(Number(e.target.value))}
  className="rounded px-3 py-1.5 outline-none border border-(--border-gray-2) text-sm"
>
  {years.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ))}
</select>
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
    </div>
  );
}
