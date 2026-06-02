import { useState } from "react";
import { Check, X, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CorrectionsHeader } from "./components/corrections-header";
import { CorrectionsTable } from "./components/corrections-table";

interface CorrectionRequest {
  id: string;
  date: string;
  originalClockIn: string;
  originalClockOut: string;
  requestedClockIn: string;
  requestedClockOut: string;
  reason: string;
  status: "approved" | "pending" | "rejected";
  approvedByName?: string;
}

export default function CorrectionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState<CorrectionRequest[]>([
    {
      id: "corr_1",
      date: "2026-05-27",
      originalClockIn: "09:35 AM",
      originalClockOut: "06:00 PM",
      requestedClockIn: "09:05 AM",
      requestedClockOut: "06:00 PM",
      reason:
        "Swipe card didn't register at main entry gate. Arrived at desk by 9:05 AM.",
      status: "pending",
    },
    {
      id: "corr_2",
      date: "2026-05-20",
      originalClockIn: "09:00 AM",
      originalClockOut: "04:30 PM",
      requestedClockIn: "09:00 AM",
      requestedClockOut: "06:00 PM",
      reason:
        "Power outage at branch, signed out manually with supervisor approval.",
      status: "approved",
      approvedByName: "Supervisor Jane",
    },
  ]);

  // Form states
  const [date, setDate] = useState("");
  const [origIn, setOrigIn] = useState("");
  const [origOut, setOrigOut] = useState("");
  const [reqIn, setReqIn] = useState("");
  const [reqOut, setReqOut] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: CorrectionRequest = {
      id: `corr_${requests.length + 1}`,
      date,
      originalClockIn: origIn || "—",
      originalClockOut: origOut || "—",
      requestedClockIn: reqIn,
      requestedClockOut: reqOut,
      reason,
      status: "pending",
    };

    setRequests([newRequest, ...requests]);
    setIsModalOpen(false);

    // Reset Form
    setDate("");
    setOrigIn("");
    setOrigOut("");
    setReqIn("");
    setReqOut("");
    setReason("");
  };

  const getStatusBadge = (status: CorrectionRequest["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge
            variant="outline"
            className="border-emerald-500 text-emerald-500 bg-emerald-500/5 font-semibold gap-1"
          >
            <Check className="h-3.5 w-3.5" /> Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="border-red-500 text-red-500 bg-red-500/5 font-semibold gap-1"
          >
            <X className="h-3.5 w-3.5" /> Rejected
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="border-amber-500 text-amber-500 bg-amber-500/5 font-semibold gap-1"
          >
            <Clock className="h-3.5 w-3.5" /> Pending Review
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Top Header Card */}
      <CorrectionsHeader
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        date={date}
        setDate={setDate}
        origIn={origIn}
        setOrigIn={setOrigIn}
        origOut={origOut}
        setOrigOut={setOrigOut}
        reqIn={reqIn}
        setReqIn={setReqIn}
        reqOut={reqOut}
        setReqOut={setReqOut}
        reason={reason}
        setReason={setReason}
        handleSubmitRequest={handleSubmitRequest}
      />

      {/* History Card of correction requests */}
      <Card className="shadow-sm border border-border">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Adjustment History Ledger
          </CardTitle>
          <CardDescription className="text-sm">
            List of your retroactive clock correction applications and current
            status metrics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CorrectionsTable
            requests={requests}
            getStatusBadge={getStatusBadge}
          />
        </CardContent>
      </Card>
    </div>
  );
}
