import { Filter, FileText, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AvailableReport {
  id: string;
  title: string;
  description: string;
  type: "attendance" | "leave" | "overtime";
  lastGenerated: string;
  format: "PDF" | "XLSX" | "CSV";
}

interface ReportsListProps {
  filteredReports: AvailableReport[];
  reportType: string;
  setReportType: (type: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
}

export function ReportsList({
  filteredReports,
  reportType,
  setReportType,
  dateRange,
  setDateRange,
}: ReportsListProps) {
  return (
    <div className="space-y-5">
      {/* Filters Bar */}
      <div className="flex flex-wrap gap-4 items-center justify-between p-3.5 border border-border rounded-lg bg-slate-500/5">
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select
            value={reportType}
            onValueChange={(val) => val && setReportType(val)}
          >
            <SelectTrigger className="w-[160px] cursor-pointer">
              <SelectValue placeholder="Report Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">
                All Categories
              </SelectItem>
              <SelectItem value="attendance" className="cursor-pointer">
                Attendance Logs
              </SelectItem>
              <SelectItem value="leave" className="cursor-pointer">
                Leave Balances
              </SelectItem>
              <SelectItem value="overtime" className="cursor-pointer">
                Overtime Audits
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={dateRange}
            onValueChange={(val) => val && setDateRange(val)}
          >
            <SelectTrigger className="w-[160px] cursor-pointer">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month" className="cursor-pointer">
                This Month
              </SelectItem>
              <SelectItem value="last-month" className="cursor-pointer">
                Last Month
              </SelectItem>
              <SelectItem value="this-quarter" className="cursor-pointer">
                This Quarter
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="cursor-pointer bg-primary text-primary-foreground font-semibold text-xs py-1.5 h-auto">
          Generate Custom Audit Report
        </Button>
      </div>

      {/* Ledger of reports */}
      <div className="grid gap-4">
        {filteredReports.map((rep) => (
          <div
            key={rep.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-slate-500/5 transition-colors gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-lg shrink-0 mt-0.5">
                <FileText className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold leading-tight">{rep.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[500px]">
                  {rep.description}
                </p>
                <div className="flex items-center gap-3 pt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <span>Format: {rep.format}</span>
                  <span>•</span>
                  <span>
                    Last Generated:{" "}
                    {new Date(rep.lastGenerated).toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer gap-1.5 font-semibold text-xs border-border shrink-0 self-end sm:self-auto"
            >
              <Download className="h-3.5 w-3.5" /> Download Report
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
