export function HolidaysHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Holidays Calendar</h2>
        <p className="text-sm text-muted-foreground">
          Stay up to date with national, regional, and company-designated paid
          holidays.
        </p>
      </div>
    </div>
  );
}
