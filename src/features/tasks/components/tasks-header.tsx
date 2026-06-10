import { Button } from "@/components/ui/button";
import { Plus, Download, Link2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";

interface TasksHeaderProps {
  jiraConnected: boolean;
  onJiraClick: () => void;
  onExportClick: () => void;
  onCreateClick: () => void;
}

export function TasksHeader({
  jiraConnected,
  onJiraClick,
  onExportClick,
  onCreateClick,
}: TasksHeaderProps) {
  return (
    <PageHeader
      title="Task Workspace"
      description="Manage engineering sprint items, monitor assignments, and connect directly with Jira."
    >
      <Button
        variant="outline"
        onClick={onJiraClick}
        className="cursor-pointer gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-all duration-300"
      >
        <Link2 className="size-4" />
        {jiraConnected ? "Manage Jira Connection" : "Connect to Jira"}
      </Button>

      <Button
        variant="outline"
        onClick={onExportClick}
        className="cursor-pointer gap-2 hover:bg-success/5 hover:text-success hover:border-success/20 transition-all duration-300"
      >
        <Download className="size-4" />
        Export to Excel
      </Button>

      <Button
        onClick={onCreateClick}
        className="cursor-pointer gap-2 shadow-sm"
      >
        <Plus className="size-4" />
        Create Task
      </Button>
    </PageHeader>
  );
}
