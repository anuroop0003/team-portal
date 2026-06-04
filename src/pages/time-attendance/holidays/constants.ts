export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: "public" | "restricted" | "company-specific";
  locationScope: string;
  isPaid: boolean;
}

export const INITIAL_HOLIDAYS: Holiday[] = [
  {
    id: "h_1",
    name: "New Year's Day",
    date: "2026-01-01",
    type: "public",
    locationScope: "National",
    isPaid: true,
  },
  {
    id: "h_2",
    name: "Martin Luther King Jr. Day",
    date: "2026-01-19",
    type: "public",
    locationScope: "National",
    isPaid: true,
  },
  {
    id: "h_3",
    name: "Presidents' Day",
    date: "2026-02-16",
    type: "public",
    locationScope: "National",
    isPaid: true,
  },
  {
    id: "h_4",
    name: "Memorial Day",
    date: "2026-05-25",
    type: "public",
    locationScope: "National",
    isPaid: true,
  },
  {
    id: "h_5",
    name: "Juneteenth",
    date: "2026-06-19",
    type: "public",
    locationScope: "National",
    isPaid: true,
  },
  {
    id: "h_6",
    name: "Independence Day",
    date: "2026-07-04",
    type: "public",
    locationScope: "National",
    isPaid: true,
  },
  {
    id: "h_7",
    name: "Labor Day",
    date: "2026-09-07",
    type: "public",
    locationScope: "National",
    isPaid: true,
  },
  {
    id: "h_8",
    name: "Columbus Day",
    date: "2026-10-12",
    type: "restricted",
    locationScope: "Regional",
    isPaid: true,
  },
  {
    id: "h_9",
    name: "Veterans Day",
    date: "2026-11-11",
    type: "public",
    locationScope: "National",
    isPaid: true,
  },
  {
    id: "h_10",
    name: "Thanksgiving Day",
    date: "2026-11-26",
    type: "public",
    locationScope: "National",
    isPaid: true,
  },
  {
    id: "h_11",
    name: "Christmas Day",
    date: "2026-12-25",
    type: "public",
    locationScope: "National",
    isPaid: true,
  },
];
