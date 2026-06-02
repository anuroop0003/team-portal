import { useState } from "react";
import { ApprovalsHeader } from "./components/approvals-header";
import { ApprovalsTabs } from "./components/approvals-tabs";
import { RejectModal } from "./components/reject-modal";

interface PendingLeave {
  id: string;
  employeeName: string;
  leaveType: string;
  duration: string;
  dates: string;
  reason: string;
}

interface PendingCorrection {
  id: string;
  employeeName: string;
  date: string;
  original: string;
  requested: string;
  reason: string;
}

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState("leaves");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [rejectionComment, setRejectionComment] = useState("");

  const [leaves, setLeaves] = useState<PendingLeave[]>([
    {
      id: "l_1",
      employeeName: "Anuroop TM",
      leaveType: "Annual Leave",
      duration: "4 Days",
      dates: "2026-06-15 to 2026-06-18",
      reason: "Family vacation trip",
    },
    {
      id: "l_2",
      employeeName: "Michael Chen",
      leaveType: "Casual Leave",
      duration: "1 Day",
      dates: "2026-06-19",
      reason: "Personal urgent matters",
    },
  ]);

  const [corrections, setCorrections] = useState<PendingCorrection[]>([
    {
      id: "c_1",
      employeeName: "Elena Rostova",
      date: "2026-05-29",
      original: "09:30 AM – 06:00 PM",
      requested: "09:00 AM – 06:00 PM",
      reason:
        "Entry card failed to register at security checkpoint. Checked in at desk by 9:00 AM.",
    },
  ]);

  const handleApproveLeave = (id: string) => {
    setLeaves((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApproveCorrection = (id: string) => {
    setCorrections((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenReject = (id: string) => {
    setSelectedItemId(id);
    setIsRejectModalOpen(true);
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemId) return;

    if (activeTab === "leaves") {
      setLeaves((prev) => prev.filter((item) => item.id !== selectedItemId));
    } else {
      setCorrections((prev) =>
        prev.filter((item) => item.id !== selectedItemId),
      );
    }

    setIsRejectModalOpen(false);
    setSelectedItemId(null);
    setRejectionComment("");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Top action header */}
      <ApprovalsHeader />

      <ApprovalsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        leaves={leaves}
        corrections={corrections}
        handleApproveLeave={handleApproveLeave}
        handleApproveCorrection={handleApproveCorrection}
        handleOpenReject={handleOpenReject}
      />

      {/* Reject Comment Dialog */}
      <RejectModal
        isRejectModalOpen={isRejectModalOpen}
        setIsRejectModalOpen={setIsRejectModalOpen}
        rejectionComment={rejectionComment}
        setRejectionComment={setRejectionComment}
        handleRejectSubmit={handleRejectSubmit}
      />
    </div>
  );
}
