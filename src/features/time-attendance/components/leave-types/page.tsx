import { useState } from "react";
import { LeaveTypesHeader } from "./components/leave-types-header";
import { LeaveTypeCard } from "./components/leave-type-card";

interface LeaveType {
  id: string;
  name: string;
  allowance: number;
  isPaid: boolean;
  requiresCertificate: boolean;
  halfDayAllowed: boolean;
  isActive: boolean;
}

export default function LeaveTypesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    {
      id: "lt_1",
      name: "Annual Leave",
      allowance: 15,
      isPaid: true,
      requiresCertificate: false,
      halfDayAllowed: true,
      isActive: true,
    },
    {
      id: "lt_2",
      name: "Sick Leave",
      allowance: 10,
      isPaid: true,
      requiresCertificate: true,
      halfDayAllowed: true,
      isActive: true,
    },
    {
      id: "lt_3",
      name: "Casual Leave",
      allowance: 7,
      isPaid: true,
      requiresCertificate: false,
      halfDayAllowed: true,
      isActive: true,
    },
    {
      id: "lt_4",
      name: "Maternity Leave",
      allowance: 84,
      isPaid: true,
      requiresCertificate: true,
      halfDayAllowed: false,
      isActive: true,
    },
    {
      id: "lt_5",
      name: "Unpaid Sabbatical",
      allowance: 30,
      isPaid: false,
      requiresCertificate: false,
      halfDayAllowed: false,
      isActive: false,
    },
  ]);

  // Form states
  const [name, setName] = useState("");
  const [allowance, setAllowance] = useState("");
  const [isPaid, setIsPaid] = useState(true);
  const [requiresCertificate, setRequiresCertificate] = useState(false);
  const [halfDayAllowed, setHalfDayAllowed] = useState(true);

  const handleToggleActive = (id: string) => {
    setLeaveTypes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t)),
    );
  };

  const handleDeleteLeaveType = (id: string) => {
    setLeaveTypes((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCreateLeaveType = (e: React.FormEvent) => {
    e.preventDefault();
    const newType: LeaveType = {
      id: `lt_${leaveTypes.length + 1}`,
      name,
      allowance: parseInt(allowance) || 0,
      isPaid,
      requiresCertificate,
      halfDayAllowed,
      isActive: true,
    };

    setLeaveTypes([...leaveTypes, newType]);
    setIsAddModalOpen(false);

    // Reset Form
    setName("");
    setAllowance("");
    setIsPaid(true);
    setRequiresCertificate(false);
    setHalfDayAllowed(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Top action header */}
      <LeaveTypesHeader
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        name={name}
        setName={setName}
        allowance={allowance}
        setAllowance={setAllowance}
        isPaid={isPaid}
        setIsPaid={setIsPaid}
        requiresCertificate={requiresCertificate}
        setRequiresCertificate={setRequiresCertificate}
        halfDayAllowed={halfDayAllowed}
        setHalfDayAllowed={setHalfDayAllowed}
        handleCreateLeaveType={handleCreateLeaveType}
      />

      {/* Grid of leave categories */}
      <div className="grid gap-6 md:grid-cols-3">
        {leaveTypes.map((type) => (
          <LeaveTypeCard
            key={type.id}
            type={type}
            onToggleActive={handleToggleActive}
            onDeleteLeaveType={handleDeleteLeaveType}
          />
        ))}
      </div>
    </div>
  );
}
