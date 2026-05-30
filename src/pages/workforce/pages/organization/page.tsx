import { OrgHeader } from "./components/org-header";
import { OrgChart } from "./components/org-chart";

export default function WorkforceOrganizationPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Page Header */}
      <OrgHeader />

      {/* Organization Chart Canvas */}
      <div className="relative">
        <OrgChart />
      </div>
    </div>
  );
}
