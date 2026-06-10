import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import type { JiraConnectionDetails } from "../../types/tasks";
import { ShieldCheck, Loader2 } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";

interface JiraLinkFormProps {
  formId: string;
  loading: boolean;
  baseUrl: string;
  setBaseUrl: (val: string) => void;
  projectKey: string;
  setProjectKey: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  apiToken: string;
  setApiToken: (val: string) => void;
  connectionDetails: JiraConnectionDetails | null;
  onDisconnect: () => void;
  onCancel: () => void;
}

export function JiraLinkForm({
  formId,
  loading,
  baseUrl,
  setBaseUrl,
  projectKey,
  setProjectKey,
  email,
  setEmail,
  apiToken,
  setApiToken,
  connectionDetails,
  onDisconnect,
  onCancel,
}: JiraLinkFormProps) {
  if (connectionDetails?.isConnected) {
    return (
      <div className="space-y-4 py-2">
        <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-primary">
          <ShieldCheck className="size-5 shrink-0" />
          <div>
            <p className="font-semibold">Simulated connection active</p>
            <p className="text-xs opacity-80">
              Project Key: {connectionDetails.projectKey} (
              {connectionDetails.baseUrl})
            </p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          All workspace tasks are now mock-synced with Jira tickets. Newly
          created tasks will contain reference links.
        </div>

        <div className="-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="destructive"
            className="cursor-pointer"
            onClick={onDisconnect}
          >
            Disconnect Jira
          </Button>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={onCancel}
          >
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FieldGroup className="gap-4 py-2">
        <Field className="gap-2!">
          <Label htmlFor="jiraBaseUrl">Jira Cloud Base URL</Label>
          <Input
            id="jiraBaseUrl"
            placeholder="https://company.atlassian.net"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            disabled={loading}
          />
        </Field>

        <Field className="gap-2!">
          <Label htmlFor="jiraProjectKey">Project Key</Label>
          <Input
            id="jiraProjectKey"
            placeholder="e.g. TP"
            value={projectKey}
            onChange={(e) => setProjectKey(e.target.value)}
            disabled={loading}
          />
        </Field>

        <Field className="gap-2!">
          <Label htmlFor="jiraEmail">Atlassian Account Email</Label>
          <Input
            id="jiraEmail"
            type="email"
            placeholder="user@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </Field>

        <Field className="gap-2!">
          <Label htmlFor="jiraToken">Atlassian API Token</Label>
          <Input
            id="jiraToken"
            type="password"
            placeholder="••••••••••••••••••••"
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
            disabled={loading}
          />
        </Field>
      </FieldGroup>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          form={formId}
          type="submit"
          className="cursor-pointer gap-2"
          disabled={loading || !baseUrl || !projectKey || !email || !apiToken}
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          Test & Connect
        </Button>
      </DialogFooter>
    </div>
  );
}
