import { useState } from "react";
import type { AttendanceCorrectionRequest } from "@/services/query/time-attendance/time-attendance.types";
import type { CorrectionFormValues } from "@/validations/correction.schema";
import { INITIAL_REQUESTS } from "./constants";
import { CorrectionsHeader } from "./components/corrections-header";
import { CorrectionsTable } from "./components/corrections-table";

export default function CorrectionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] =
    useState<AttendanceCorrectionRequest[]>(INITIAL_REQUESTS);

  const handleSubmitRequest = (data: CorrectionFormValues) => {
    const newRequest: AttendanceCorrectionRequest = {
      id: `corr_${requests.length + 1}`,
      employeeId: "emp_1",
      employeeName: "Anuroop TM",
      date: data.date,
      originalClockIn: data.origIn || "—",
      originalClockOut: data.origOut || "—",
      requestedClockIn: data.reqIn,
      requestedClockOut: data.reqOut,
      reason: data.reason,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setRequests([newRequest, ...requests]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <CorrectionsHeader
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onRequestSubmit={handleSubmitRequest}
      />

      <CorrectionsTable requests={requests} />
    </div>
  );
}
