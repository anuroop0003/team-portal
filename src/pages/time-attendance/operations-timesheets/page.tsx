import { useState } from "react";
import { CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TimesheetsHeader } from "./components/timesheets-header";
import { TimesheetsStats } from "./components/timesheets-stats";
import { TimesheetsTable } from "./components/timesheets-table";
import { CorrectionModal } from "./components/correction-modal";

interface TimesheetRecord {
  id: string;
  name: string;
  department: string;
  date: string;
  clockIn: string;
  clockOut: string;
  workHours: number; // in hours
  overtime: number; // in hours
  status: "approved" | "pending" | "correction-requested";
}

export default function OperationsTimesheetsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [correctionNote, setCorrectionNote] = useState("");

  const [records, setRecords] = useState<TimesheetRecord[]>([
    {
      id: "tr_1",
      name: "Anuroop TM",
      department: "Engineering",
      date: "2026-06-01",
      clockIn: "09:02 AM",
      clockOut: "06:05 PM",
      workHours: 8.25,
      overtime: 0.25,
      status: "pending",
    },
    {
      id: "tr_2",
      name: "Sarah Jenkins",
      department: "Product",
      date: "2026-06-01",
      clockIn: "08:55 AM",
      clockOut: "05:30 PM",
      workHours: 7.75,
      overtime: 0,
      status: "approved",
    },
    {
      id: "tr_3",
      name: "Michael Chen",
      department: "Engineering",
      date: "2026-06-01",
      clockIn: "10:15 AM",
      clockOut: "07:15 PM",
      workHours: 8,
      overtime: 0,
      status: "correction-requested",
    },
    {
      id: "tr_4",
      name: "Elena Rostova",
      department: "Operations",
      date: "2026-06-01",
      clockIn: "09:00 AM",
      clockOut: "06:30 PM",
      workHours: 8.5,
      overtime: 0.5,
      status: "pending",
    },
  ]);

  const handleApprove = (id: string) => {
    setRecords((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, status: "approved" as const } : rec,
      ),
    );
  };

  const handleOpenCorrection = (id: string) => {
    setSelectedRecordId(id);
    setIsCorrectionModalOpen(true);
  };

  const handleRequestCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecordId) return;

    setRecords((prev) =>
      prev.map((rec) =>
        rec.id === selectedRecordId
          ? { ...rec, status: "correction-requested" as const }
          : rec,
      ),
    );

    setIsCorrectionModalOpen(false);
    setSelectedRecordId(null);
    setCorrectionNote("");
  };

  const getStatusBadge = (status: TimesheetRecord["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge
            variant="outline"
            className="border-emerald-500 text-emerald-500 bg-emerald-500/5 font-semibold gap-1"
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Approved
          </Badge>
        );
      case "correction-requested":
        return (
          <Badge
            variant="outline"
            className="border-red-500 text-red-500 bg-red-500/5 font-semibold gap-1"
          >
            <AlertTriangle className="h-3.5 w-3.5" /> Correction Req.
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="border-amber-500 text-amber-500 bg-amber-500/5 font-semibold gap-1 animate-pulse"
          >
            <HelpCircle className="h-3.5 w-3.5" /> Pending Review
          </Badge>
        );
    }
  };

  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || rec.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Top Header */}
      <TimesheetsHeader />

      {/* Top statistics overview row */}
      <TimesheetsStats />

      {/* Main timesheet catalog */}
      <Card className="shadow-sm border border-border">
        <CardContent className="pt-6">
          <TimesheetsTable
            filteredRecords={filteredRecords}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            handleApprove={handleApprove}
            handleOpenCorrection={handleOpenCorrection}
            getStatusBadge={getStatusBadge}
          />
        </CardContent>
      </Card>

      {/* Reject & Request Correction Dialog */}
      <CorrectionModal
        isCorrectionModalOpen={isCorrectionModalOpen}
        setIsCorrectionModalOpen={setIsCorrectionModalOpen}
        correctionNote={correctionNote}
        setCorrectionNote={setCorrectionNote}
        handleRequestCorrection={handleRequestCorrection}
      />
    </div>
  );
}
