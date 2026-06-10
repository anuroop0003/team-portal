import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { PoliciesHeader } from "./components/policies-header";
import { PolicyCard } from "./components/policy-card";

interface AccrualPolicy {
  id: string;
  name: string;
  leaveType: string;
  accrualRate: number;
  frequency: "monthly" | "yearly" | "biweekly" | "accrued-front";
  carryoverLimit: number;
  probationDays: number;
  isActive: boolean;
  description: string;
}

export default function PoliciesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [policies, setPolicies] = useState<AccrualPolicy[]>([
    {
      id: "pol_1",
      name: "Standard Annual Accrual",
      leaveType: "Annual Leave",
      accrualRate: 1.25,
      frequency: "monthly",
      carryoverLimit: 5,
      probationDays: 90,
      isActive: true,
      description:
        "Applies to standard permanent employees. Accrues monthly at 1.25 days.",
    },
    {
      id: "pol_2",
      name: "Casual Leave Frontload",
      leaveType: "Casual Leave",
      accrualRate: 7,
      frequency: "accrued-front",
      carryoverLimit: 0,
      probationDays: 0,
      isActive: true,
      description:
        "Frontloaded at the start of calendar year. No rollover allowed.",
    },
    {
      id: "pol_3",
      name: "Sick Leave Monthly Provision",
      leaveType: "Sick Leave",
      accrualRate: 0.83,
      frequency: "monthly",
      carryoverLimit: 12,
      probationDays: 30,
      isActive: true,
      description:
        "Accrues monthly. Carryover capped at a maximum of 12 days total.",
    },
  ]);

  // Form states
  const [name, setName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [accrualRate, setAccrualRate] = useState("");
  const [frequency, setFrequency] =
    useState<AccrualPolicy["frequency"]>("monthly");
  const [carryoverLimit, setCarryoverLimit] = useState("");
  const [probationDays, setProbationDays] = useState("");
  const [description, setDescription] = useState("");

  const handleToggleActive = (id: string) => {
    setPolicies((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)),
    );
  };

  const handleDeletePolicy = (id: string) => {
    setPolicies((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreatePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    const newPolicy: AccrualPolicy = {
      id: `pol_${policies.length + 1}`,
      name,
      leaveType,
      accrualRate: parseFloat(accrualRate) || 0,
      frequency,
      carryoverLimit: parseInt(carryoverLimit) || 0,
      probationDays: parseInt(probationDays) || 0,
      isActive: true,
      description,
    };

    setPolicies([newPolicy, ...policies]);
    setIsAddModalOpen(false);

    // Reset fields
    setName("");
    setLeaveType("");
    setAccrualRate("");
    setFrequency("monthly");
    setCarryoverLimit("");
    setProbationDays("");
    setDescription("");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Top Action Header */}
      <PoliciesHeader
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        name={name}
        setName={setName}
        leaveType={leaveType}
        setLeaveType={setLeaveType}
        accrualRate={accrualRate}
        setAccrualRate={setAccrualRate}
        frequency={frequency}
        setFrequency={setFrequency}
        carryoverLimit={carryoverLimit}
        setCarryoverLimit={setCarryoverLimit}
        probationDays={probationDays}
        setProbationDays={setProbationDays}
        description={description}
        setDescription={setDescription}
        handleCreatePolicy={handleCreatePolicy}
      />

      {/* Info notice bar */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-medium">
        <HelpCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
        <span>
          <strong>System Accrual Engine is Active:</strong> All active policies
          execute at 12:00 AM UTC according to their intervals. Employee
          balances automatically recalculate based on their probation date.
        </span>
      </div>

      {/* Policies grid list */}
      <div className="grid gap-6 md:grid-cols-3">
        {policies.map((policy) => (
          <PolicyCard
            key={policy.id}
            policy={policy}
            onToggleActive={handleToggleActive}
            onDeletePolicy={handleDeletePolicy}
          />
        ))}
      </div>
    </div>
  );
}
