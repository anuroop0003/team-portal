import type { TaskPriority, TaskStatus } from "../types/tasks";

export const getPriorityBadgeVariant = (priority: TaskPriority) => {
  switch (priority) {
    case "Critical":
      return "destructive";
    case "High":
      return "warning";
    case "Medium":
      return "secondary";
    case "Low":
    default:
      return "outline";
  }
};

export const getStatusBadgeVariant = (status: TaskStatus) => {
  switch (status) {
    case "Done":
      return "success";
    case "In Review":
      return "warning";
    case "In Progress":
      return "default";
    case "Todo":
    default:
      return "secondary";
  }
};
