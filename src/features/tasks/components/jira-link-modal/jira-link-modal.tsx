import { useState, useId } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { JiraConnectionDetails } from "../../types/tasks";
import { JiraLinkForm } from "./jira-link-form";
import { toast } from "sonner";

interface JiraLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  connectionDetails: JiraConnectionDetails | null;
  onSaveConnection: (details: JiraConnectionDetails) => void;
  onDisconnect: () => void;
}

export function JiraLinkModal({
  open,
  onOpenChange,
  connectionDetails,
  onSaveConnection,
  onDisconnect,
}: JiraLinkModalProps) {
  const formId = useId();
  const [loading, setLoading] = useState(false);
  const [baseUrl, setBaseUrl] = useState(connectionDetails?.baseUrl || "");
  const [projectKey, setProjectKey] = useState(
    connectionDetails?.projectKey || "",
  );
  const [email, setEmail] = useState(connectionDetails?.email || "");
  const [apiToken, setApiToken] = useState(connectionDetails?.apiToken || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baseUrl || !projectKey || !email || !apiToken) {
      toast.error("Please fill in all Jira credentials fields.");
      return;
    }

    setLoading(true);
    // Simulate API connection verification delay
    setTimeout(() => {
      setLoading(false);
      onSaveConnection({
        baseUrl,
        projectKey,
        email,
        apiToken,
        isConnected: true,
      });
      toast.success(`Connected to Jira project: ${projectKey}`);
      onOpenChange(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    onDisconnect();
    setBaseUrl("");
    setProjectKey("");
    setEmail("");
    setApiToken("");
    toast.success("Disconnected from Jira.");
    onOpenChange(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <form id={formId} onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Jira Integration Settings</DialogTitle>
            <DialogDescription>
              {connectionDetails?.isConnected
                ? "Manage your existing Jira project connection configuration."
                : "Simulate linking your team portal workspace tasks directly to Jira Cloud."}
            </DialogDescription>
          </DialogHeader>

          <JiraLinkForm
            formId={formId}
            loading={loading}
            baseUrl={baseUrl}
            setBaseUrl={setBaseUrl}
            projectKey={projectKey}
            setProjectKey={setProjectKey}
            email={email}
            setEmail={setEmail}
            apiToken={apiToken}
            setApiToken={setApiToken}
            connectionDetails={connectionDetails}
            onDisconnect={handleDisconnect}
            onCancel={() => handleOpenChange(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
