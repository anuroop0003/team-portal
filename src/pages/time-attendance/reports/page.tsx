import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReportsHeader } from "./components/reports-header";
import { ReportsStats } from "./components/reports-stats";
import { ReportsList } from "./components/reports-list";

interface AvailableReport {
  id: string;
  title: string;
  description: string;
  type: "attendance" | "leave" | "overtime";
  lastGenerated: string;
  format: "PDF" | "XLSX" | "CSV";
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState("all");
  const [dateRange, setDateRange] = useState("this-month");

  const [reports, setReports] = useState<AvailableReport[]>([
    {
      id: "rep_1",
      title: "Monthly Attendance Summary",
      description:
        "Consolidated register of team worked hours, leaves taken, and deviations for payroll input.",
      type: "attendance",
      lastGenerated: "2026-06-01",
      format: "XLSX",
    },
    {
      id: "rep_2",
      title: "Absence & Sick Leave Audit",
      description:
        "Detailed listing of sick leaves, attachment validation audits, and patterns.",
      type: "leave",
      lastGenerated: "2026-05-31",
      format: "PDF",
    },
    {
      id: "rep_3",
      title: "Overtime & Night Premium Logs",
      description:
        "Audit ledger of cumulative overtime minutes and eligible shift allowance counts.",
      type: "overtime",
      lastGenerated: "2026-05-28",
      format: "CSV",
    },
    {
      id: "rep_4",
      title: "Daily Deviation Exception Audit",
      description:
        "Tracking late arrivals, early departures, and missing check-out entries.",
      type: "attendance",
      lastGenerated: "2026-06-01",
      format: "PDF",
    },
  ]);

  const filteredReports = reports.filter(
    (rep) => reportType === "all" || rep.type === reportType,
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Top Header */}
      <ReportsHeader />

      {/* Overview Analytics Widgets */}
      <ReportsStats />

      {/* Main Reports Hub */}
      <Card className="shadow-sm border border-border">
        <CardContent className="pt-6">
          <ReportsList
            filteredReports={filteredReports}
            reportType={reportType}
            setReportType={setReportType}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
