import { createSlice, createSelector, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";

// ─── Unified model ────────────────────────────────────────────────────────────
// A single DispatchEntry drives BOTH the top card row AND a grid column.
// • Card fields  → driverName, delivery, loads, rate, pickup, material, time, headerColor
// • Grid field   → poCode  (used as the job-header / column ID in the grid)
// ──────────────────────────────────────────────────────────────────────────────
export interface DispatchEntry {
  id: string;                        // unique key (stable even when poCode repeats)
  poCode: string;                    // grid column / job ID
  driverName: string;                // card header label
  delivery: string;
  loads: number;
  rate: number;
  pickup: string;
  material: string;
  time: string;
  headerColor: "yellow" | "orange";
}

// Legacy shape kept for backward-compat with AssignLoadCard props
export interface AssignLoadCardData {
  driverName: string;
  delivery: string;
  loads: number;
  rate: number;
  pickup: string;
  material: string;
  time: string;
  headerColor: "yellow" | "orange";
}

export interface JobData {
  id: string;
  loads: number;
  isManual?: boolean;
}

export interface RowData {
  driver: string;
  truckId: string;
  jobs: JobData[];
  tonnage: string;
  total: string;
  weCall: boolean;
  status: string;
}

interface DispatchState {
  dispatches: DispatchEntry[];   // single source of truth (replaces loadCards + jobHeaders)
  rowData: RowData[];
  originalRowData: RowData[];
  selectedDay: string;
}

// ─── Initial dispatches (cards + grid columns combined) ───────────────────────
const INITIAL_DISPATCHES: DispatchEntry[] = [
  {
    id: "6014",
    poCode: "6014",
    driverName: "AMRIZE",
    delivery: "LitLacy - Job#6014 - North Sky PH3",
    loads: 40,
    rate: 6.75,
    pickup: "54501 North Bridgeport Quarry",
    material: "MAN SAND",
    time: "10:00 AM - 05:00 PM",
    headerColor: "yellow",
  },
  {
    id: "1143",
    poCode: "1143",
    driverName: "HEIDELBERG MATERIALS",
    delivery: "GM Const-Creekend - Job#25-1143 -1143-Prosper",
    loads: 30,
    rate: 6.75,
    pickup: "54501 North Bridgeport Quarry",
    material: "MAN SAND",
    time: "10:00 AM - 05:00 PM",
    headerColor: "orange",
  },
  {
    id: "1143B",
    poCode: "1143B",
    driverName: "RAVENNA-1",
    delivery: "O'Paving-135 W - Job#21143 -20 S Fort Worth",
    loads: 3,
    rate: 6.75,
    pickup: "54501 North Bridgeport Quarry",
    material: "MAN SAND",
    time: "10:00 AM - 05:00 PM",
    headerColor: "yellow",
  },
  {
    id: "6543",
    poCode: "6543",
    driverName: "RAVENNA-2",
    delivery: "GM Const-Creekend - Job#20143 -North Sky PH3",
    loads: 30,
    rate: 6.75,
    pickup: "54501 North Bridgeport Quarry",
    material: "MAN SAND",
    time: "10:00 AM - 05:00 PM",
    headerColor: "orange",
  },
  {
    id: "1143_2",      // second occurrence of job 1143 — unique id, same poCode
    poCode: "1143",
    driverName: "MARTIN MARETTA",
    delivery: "GM Const-Creekend - Job#25143 -1143-Prosper",
    loads: 25,
    rate: 6.75,
    pickup: "54501 North Bridgeport Quarry",
    material: "MAN SAND",
    time: "10:00 AM - 05:00 PM",
    headerColor: "yellow",
  },
  {
    id: "1143C",
    poCode: "1143C",
    driverName: "Eric Henry",
    delivery: "Jstevens - Job#25143 Arlington Plant 8",
    loads: 25,
    rate: 6.75,
    pickup: "Sunnyvale Park",
    material: "MAN SAND",
    time: "10:00 AM - 05:00 PM",
    headerColor: "orange",
  },
  {
    id: "1142",
    poCode: "1142",
    driverName: "Clara Jim",
    delivery: "GM Const-Creekend - Job#25143 -North Sky PH3",
    loads: 3,
    rate: 6.75,
    pickup: "Sunnyvale Park",
    material: "Concrete",
    time: "10:00 AM - 05:00 PM",
    headerColor: "yellow",
  },
  {
    id: "1142B",
    poCode: "1142B",
    driverName: "Eric Henry",
    delivery: "Jstevens - Job#25143 Arlington Plant 8",
    loads: 25,
    rate: 6.75,
    pickup: "Sunnyvale Park",
    material: "MAN SAND",
    time: "10:00 AM - 05:00 PM",
    headerColor: "orange",
  },
];

const INITIAL_BASE_GRID_DATA: RowData[] = [
  {
    driver: "Carter Westervelt",
    truckId: "452 to 457",
    jobs: [
      { id: "6014", loads: 3 },
      { id: "1143", loads: 1 },
      { id: "1143B", loads: 1 },
    ],
    tonnage: "$52.50",
    total: "$1,391.25",
    weCall: false,
    status: "RED",
  },
  {
    driver: "Hanna Saris",
    truckId: "453 to 457",
    jobs: [
      { id: "6014", loads: 3 },
      { id: "1143", loads: 1 },
      { id: "1143B", loads: 1 },
      { id: "6543", loads: 1 },
    ],
    tonnage: "$52.00",
    total: "$1,378.00",
    weCall: false,
    status: "YELLOW",
  },
  {
    driver: "Kianna Rosser",
    truckId: "454 to 455",
    jobs: [
      { id: "1143", loads: 1 },
      { id: "1143B", loads: 1 },
      { id: "1142", loads: 1 },
      { id: "1142", loads: 1 },
      { id: "1142", loads: 1 },
    ],
    tonnage: "$17.25",
    total: "$457.12",
    weCall: false,
    status: "RED",
  },
  {
    driver: "Kierra Mango",
    truckId: "456 to 457",
    jobs: [
      { id: "1143", loads: 1 },
      { id: "1143", loads: 1 },
      { id: "1142", loads: 1 },
      { id: "1142", loads: 1 },
      { id: "1142", loads: 1 },
    ],
    tonnage: "$10.50",
    total: "$278.25",
    weCall: false,
    status: "YELLOW",
  },
  {
    driver: "Alfredo Rhiel Madsen",
    truckId: "845",
    jobs: [
      { id: "1143", loads: 1 },
      { id: "1142", loads: 1 },
    ],
    tonnage: "$10.50",
    total: "$278.25",
    weCall: false,
    status: "GREEN",
  },
  {
    driver: "Nolan Culhane",
    truckId: "833",
    jobs: [{ id: "6014", loads: 1 }],
    tonnage: "$6.75",
    total: "$178.87",
    weCall: false,
    status: "RED",
  },
  {
    driver: "Jaydon Donin",
    truckId: "857 to 859",
    jobs: [
      { id: "1143", loads: 1 },
      { id: "1143", loads: 1 },
      { id: "1143", loads: 1 },
      { id: "1142", loads: 1 },
      { id: "1142", loads: 1 },
    ],
    tonnage: "$36.00",
    total: "$954.00",
    weCall: false,
    status: "GREEN",
  },
  {
    driver: "Cheyenne Vaccaro",
    truckId: "209",
    jobs: [{ id: "6014", loads: 1 }],
    tonnage: "$6.75",
    total: "$178.87",
    weCall: false,
    status: "RED",
  },
  {
    driver: "Adison Gouse",
    truckId: "857",
    jobs: [
      { id: "1143", loads: 1 },
      { id: "1142", loads: 1 },
    ],
    tonnage: "$13.00",
    total: "$344.50",
    weCall: false,
    status: "YELLOW",
  },
  {
    driver: "Carla Philips",
    truckId: "845",
    jobs: [
      { id: "1143", loads: 1 },
      { id: "1142", loads: 1 },
      { id: "1142", loads: 1 },
      { id: "1142", loads: 1 },
    ],
    tonnage: "$21.00",
    total: "$556.50",
    weCall: false,
    status: "GREEN",
  },
  {
    driver: "Lindsey Siphron",
    truckId: "844",
    jobs: [{ id: "6543", loads: 1 }],
    tonnage: "$13.00",
    total: "$344.50",
    weCall: false,
    status: "RED",
  },
  {
    driver: "Leo Press",
    truckId: "845",
    jobs: [
      { id: "1143", loads: 1 },
      { id: "1142", loads: 1 },
      { id: "1142", loads: 1 },
      { id: "1142", loads: 1 },
    ],
    tonnage: "$10.50",
    total: "$278.25",
    weCall: false,
    status: "YELLOW",
  },
  {
    driver: "Nolan Vetrovs",
    truckId: "846",
    jobs: [
      { id: "1143", loads: 1 },
      { id: "1142", loads: 1 },
      { id: "1142B", loads: 1 },
      { id: "1143C", loads: 1 },
    ],
    tonnage: "$10.50",
    total: "$278.25",
    weCall: false,
    status: "GREEN",
  },
    {
    driver: "Ethan Brooks",
    truckId: "847",
    jobs: [
      { id: "1145", loads: 2 },
      { id: "6014", loads: 1 },
    ],
    tonnage: "$19.50",
    total: "$516.75",
    weCall: false,
    status: "GREEN",
  },
  {
    driver: "Sophia Turner",
    truckId: "848",
    jobs: [
      { id: "1142", loads: 2 },
      { id: "6543", loads: 1 },
      { id: "1143", loads: 1 },
    ],
    tonnage: "$26.00",
    total: "$689.00",
    weCall: false,
    status: "YELLOW",
  },
  {
    driver: "Mason Clark",
    truckId: "860",
    jobs: [
      { id: "6014", loads: 2 },
      { id: "1142B", loads: 2 },
    ],
    tonnage: "$27.00",
    total: "$715.50",
    weCall: false,
    status: "RED",
  },
  {
    driver: "Olivia Bennett",
    truckId: "861",
    jobs: [
      { id: "1143", loads: 1 },
      { id: "1142", loads: 2 },
      { id: "6543", loads: 1 },
    ],
    tonnage: "$23.75",
    total: "$629.37",
    weCall: false,
    status: "GREEN",
  },
  {
    driver: "Logan Harris",
    truckId: "862 to 864",
    jobs: [
      { id: "6014", loads: 3 },
      { id: "1143", loads: 2 },
    ],
    tonnage: "$39.00",
    total: "$1,033.50",
    weCall: false,
    status: "YELLOW",
  },
  {
    driver: "Ava Mitchell",
    truckId: "865",
    jobs: [
      { id: "1142", loads: 1 },
      { id: "1143B", loads: 1 },
      { id: "6014", loads: 1 },
    ],
    tonnage: "$16.25",
    total: "$430.62",
    weCall: false,
    status: "RED",
  },
  {
    driver: "Benjamin Scott",
    truckId: "866",
    jobs: [
      { id: "1143", loads: 2 },
      { id: "1142", loads: 2 },
      { id: "6543", loads: 1 },
    ],
    tonnage: "$32.50",
    total: "$861.25",
    weCall: false,
    status: "GREEN",
  },
  {
    driver: "Grace Walker",
    truckId: "867",
    jobs: [
      { id: "1143", loads: 1 },
      { id: "1142B", loads: 1 },
      { id: "1143C", loads: 2 },
    ],
    tonnage: "$20.00",
    total: "$530.00",
    weCall: false,
    status: "YELLOW",
  },
  {
    driver: "Jacob Cooper",
    truckId: "868",
    jobs: [
      { id: "6014", loads: 2 },
      { id: "6543", loads: 2 },
    ],
    tonnage: "$27.50",
    total: "$728.75",
    weCall: false,
    status: "GREEN",
  },
  {
    driver: "Emily Parker",
    truckId: "869",
    jobs: [
      { id: "1143", loads: 1 },
      { id: "1142", loads: 1 },
      { id: "1143B", loads: 1 },
      { id: "6543", loads: 1 },
    ],
    tonnage: "$22.50",
    total: "$596.25",
    weCall: false,
    status: "RED",
  },
];

const initialState: DispatchState = {
  dispatches: INITIAL_DISPATCHES,
  rowData: INITIAL_BASE_GRID_DATA,
  originalRowData: JSON.parse(JSON.stringify(INITIAL_BASE_GRID_DATA)),
  selectedDay: "MON 4/4",
};

const dispatchSlice = createSlice({
  name: "dispatch",
  initialState,
  reducers: {
    addDispatch: (state, action: PayloadAction<any>) => {
      const {
        customer,
        poCode,
        material,
        loads,
        invoiceRate,
        pickup,
        deliver,
        startTime,
        endTime,
      } = action.payload;

      const po = poCode || "9999";
      const cardLoads = Number(loads) || 0;
      const rateVal = Number(String(invoiceRate).replace(/[^0-9.]/g, "")) || 6.75;
      const startT = startTime || "10:00 AM";
      const endT = endTime || "05:00 PM";

      // Build ONE unified entry that drives both the card and the grid column
      const newEntry: DispatchEntry = {
        id: `${po}_${Date.now()}`,   // unique key even if poCode repeats
        poCode: po,
        driverName: customer || "NEW CUSTOMER",
        delivery: `${customer || "Customer"} - Job#${po} - ${deliver || "Tom Harpool WTP Expansion PH..."}`,
        loads: cardLoads,
        rate: rateVal,
        pickup: pickup || "115 Ambrose Street Bells, TX 75414",
        material: material || "Material",
        time: `${startT} - ${endT}`,
        headerColor: state.dispatches.length % 2 === 0 ? "yellow" : "orange",
      };

      state.dispatches.push(newEntry);

      // Add a placeholder job column in every grid row for this new poCode
      state.rowData.forEach((row) => {
        if (!row.jobs) row.jobs = [];
        row.jobs.push({ id: po, loads: 0 });
      });
      state.originalRowData.forEach((row) => {
        if (!row.jobs) row.jobs = [];
        row.jobs.push({ id: po, loads: 0 });
      });
    },

    setRowData: (state, action: PayloadAction<RowData[]>) => {
      state.rowData = action.payload;
    },
    setOriginalRowData: (state, action: PayloadAction<RowData[]>) => {
      state.originalRowData = action.payload;
    },
    setSelectedDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;
    },
    confirmSaveGridData: (state) => {
      state.originalRowData = JSON.parse(JSON.stringify(state.rowData));
    },
  },
});

export const {
  addDispatch,
  setRowData,
  setOriginalRowData,
  setSelectedDay,
  confirmSaveGridData,
} = dispatchSlice.actions;

export default dispatchSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────────────────────

const selectDispatches = (state: RootState) => state.dispatch.dispatches;

/** All job/PO codes in order — consumed by DispatchAssignmentGrid as column headers */
export const selectJobHeaders = createSelector(
  selectDispatches,
  (dispatches) => dispatches.map((d) => d.poCode),
);

/** Card-shaped data — consumed by AssignLoadCard renderer */
export const selectLoadCards = createSelector(
  selectDispatches,
  (dispatches): AssignLoadCardData[] =>
    dispatches.map(({ driverName, delivery, loads, rate, pickup, material, time, headerColor }) => ({
      driverName,
      delivery,
      loads,
      rate,
      pickup,
      material,
      time,
      headerColor,
    })),
);





