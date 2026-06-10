export type TaskStatus = "Todo" | "In Progress" | "In Review" | "Done";
export type TaskPriority = "Low" | "Medium" | "High" | "Critical";

export interface TaskAssignee {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: TaskAssignee;
  dueDate: string;
  createdAt: string;
  jiraKey?: string;
  jiraUrl?: string;
}

export interface JiraConnectionDetails {
  baseUrl: string;
  projectKey: string;
  email: string;
  apiToken: string;
  isConnected: boolean;
}
