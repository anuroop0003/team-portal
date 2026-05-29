import { MemberCard } from "../../components/member-card";
import { AddMemberModal } from "../../components/add-member-modal";
import { MOCK_WORKFORCE } from "../../constants";
import { Search, Users, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";
import { StatsCard } from "@/pages/rewards/components/stats-card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function WorkforceDirectoryPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Workforce Directory
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Orchestrate your global workforce, monitor performance metrics, and
            manage professional profiles.
          </p>
        </div>
        <Link to={PATHS.WORKFORCE.ORGANIZATION}>
          <Button variant="outline" className="cursor-pointer">
            <Network />
            Organization
          </Button>
        </Link>
        <AddMemberModal />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatsCard
          label="Total Members"
          value={MOCK_WORKFORCE.length.toString()}
          description="Integrated platform workforce"
          icon={<Users className="size-6 text-primary" />}
        />
        {/* <StatsCard
          label="Global Team Points"
          value={totalPoints.toLocaleString()}
          description="Cumulative points earned"
          icon={<Trophy className="size-4 text-amber-500" />}
        />
        <StatsCard
          label="Avg. Performance"
          value={avgPoints.toLocaleString()}
          description="Average points per member"
          icon={<TrendingUp className="size-4 text-emerald-500" />}
        /> */}
      </div>

      {/* Search Filter */}
      <InputGroup className="max-w-md">
        <InputGroupInput placeholder="Search by name, email or department..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      {/* Member Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_WORKFORCE.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
