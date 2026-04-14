import { MOCK_WORKFORCE } from "../../constants";
import { Users, Trophy, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";
import { useState, useCallback } from "react";
import { StatsCard } from "@/pages/rewards/components/stats-card";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { OrgChart } from "./components/org-chart";
import { OrgControls } from "./components/org-controls";

export default function WorkforceOrganizationPage() {
  const [translate, setTranslate] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState<number>(1);

  const totalPoints = MOCK_WORKFORCE.reduce((acc, u) => acc + u.points, 0);
  const avgPoints = Math.round(totalPoints / MOCK_WORKFORCE.length);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.2));

  const handleRecenter = useCallback(() => {
    setTranslate({ x: 0, y: 0 });
    setZoom(1);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Workforce Organization
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Visualize your team hierarchy, reporting lines, and organizational
            structure in real-time.
          </p>
        </div>
        <Link to={PATHS.WORKFORCE.ROOT}>
          <Button className="cursor-pointer">
            <Users />
            Directory
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatsCard
          label="Total Members"
          value={MOCK_WORKFORCE.length.toString()}
          description="Integrated platform workforce"
          icon={<Users className="size-4 text-primary" />}
        />
        <StatsCard
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
        />
      </div>

      {/* Organization Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle>Team Hierarchy</CardTitle>
          <CardDescription>
            Reporting structure and department distribution
          </CardDescription>
          <CardAction>
            <OrgControls
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onRecenter={handleRecenter}
            />
          </CardAction>
        </CardHeader>
        <CardContent>
          <OrgChart
            zoom={zoom}
            translate={translate}
            onTranslateChange={setTranslate}
            onZoomChange={setZoom}
          />
        </CardContent>
      </Card>
    </div>
  );
}
