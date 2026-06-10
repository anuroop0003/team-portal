import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { MOCK_TASKS } from "./constants";
import type { Task, JiraConnectionDetails } from "../types/tasks";
import { TasksHeader } from "./tasks-header";
import { TasksStats } from "./tasks-stats";
import { DataTableToolbar } from "./tasks-table/data-table-toolbar";
import { TasksKanban } from "./tasks-kanban/tasks-kanban";
import { TasksList } from "./tasks-table/tasks-list";
import { TaskModal } from "./task-modal/task-modal";
import { DeleteTaskDialog } from "./delete-task-dialog/delete-task-dialog";
import { JiraLinkModal } from "./jira-link-modal/jira-link-modal";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getColumns } from "./tasks-table/columns";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isJiraModalOpen, setIsJiraModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [jiraConnection, setJiraConnection] =
    useState<JiraConnectionDetails | null>(null);

  const activeTab = searchParams.get("tab") || "kanban";
  const setActiveTab = (tab: string) => {
    setSearchParams((prev) => {
      prev.set("tab", tab);
      return prev;
    });
  };

  // Stats calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Done").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "In Progress" || t.status === "In Review",
  ).length;

  const overdueTasks = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return tasks.filter((t) => t.status !== "Done" && t.dueDate < today).length;
  }, [tasks]);

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  };

  // Columns & React Table setup for unified filtering
  const columns = useMemo(
    () => getColumns(handleEditClick, handleDeleteClick),
    [],
  );

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // Extract filtered tasks from table row model so Kanban and List views stay perfectly synced
  const filteredTasks = useMemo(() => {
    return table.getFilteredRowModel().rows.map((row) => row.original);
  }, [table, tasks, table.getState().columnFilters]);

  // Add/Edit Task
  const handleSaveTask = (taskData: Task) => {
    setTasks((prevTasks) => {
      const exists = prevTasks.some((t) => t.id === taskData.id);
      if (exists) {
        toast.success("Task updated successfully.");
        return prevTasks.map((t) =>
          t.id === taskData.id ? { ...t, ...taskData } : t,
        );
      } else {
        // If Jira connection is active, simulate auto Jira-linking for new tasks
        if (jiraConnection?.isConnected) {
          const randomNum = Math.floor(Math.random() * 900) + 100;
          taskData.jiraKey = `${jiraConnection.projectKey}-${randomNum}`;
          taskData.jiraUrl = `${jiraConnection.baseUrl}/browse/${taskData.jiraKey}`;
          toast.success(
            `Task created and synced to Jira ticket ${taskData.jiraKey}`,
          );
        } else {
          toast.success("Task created successfully.");
        }
        return [...prevTasks, taskData];
      }
    });
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  // Delete Task
  const handleDeleteTask = () => {
    if (!selectedTask) return;
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== selectedTask.id));
    toast.success("Task deleted successfully.");
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  // Save Jira details
  const handleSaveJiraConnection = (details: JiraConnectionDetails) => {
    setJiraConnection(details);

    // Auto-fill keys for all unlinked tasks as a simulation helper!
    setTasks((prevTasks) =>
      prevTasks.map((task, idx) => {
        if (!task.jiraKey) {
          const num = 100 + idx;
          return {
            ...task,
            jiraKey: `${details.projectKey}-${num}`,
            jiraUrl: `${details.baseUrl}/browse/${details.projectKey}-${num}`,
          };
        }
        return task;
      }),
    );
  };

  const handleDisconnectJira = () => {
    setJiraConnection(null);
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        const { jiraKey, jiraUrl, ...rest } = t;
        return rest;
      }),
    );
  };

  // Export to Excel CSV utility
  const handleExportToExcel = () => {
    if (filteredTasks.length === 0) {
      toast.error("No tasks available to export.");
      return;
    }

    const headers = [
      "Task ID",
      "Title",
      "Description",
      "Status",
      "Priority",
      "Assignee",
      "Due Date",
      "Created Date",
      "Jira Key",
      "Jira Link",
    ];

    const escapeCsv = (str: string) => {
      if (!str) return '""';
      return `"${str.replace(/"/g, '""')}"`;
    };

    const csvContent = [
      headers.join(","),
      ...filteredTasks.map((task) =>
        [
          escapeCsv(task.id),
          escapeCsv(task.title),
          escapeCsv(task.description),
          escapeCsv(task.status),
          escapeCsv(task.priority),
          escapeCsv(task.assignee?.name || "Unassigned"),
          escapeCsv(task.dueDate),
          escapeCsv(task.createdAt),
          escapeCsv(task.jiraKey || ""),
          escapeCsv(task.jiraUrl || ""),
        ].join(","),
      ),
    ].join("\n");

    // Add BOM marker to make Excel load UTF-8 correctly
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `company_tasks_export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(
      "Tasks exported to Excel compatible CSV format successfully!",
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header */}
      <TasksHeader
        jiraConnected={!!jiraConnection?.isConnected}
        onJiraClick={() => setIsJiraModalOpen(true)}
        onExportClick={handleExportToExcel}
        onCreateClick={handleCreateClick}
      />

      {/* Stats Cards */}
      <TasksStats
        totalTasks={totalTasks}
        inProgressTasks={inProgressTasks}
        overdueTasks={overdueTasks}
        completedTasks={completedTasks}
      />

      {/* Tabs / Filters & List View Toggle */}
      <Tabs
        defaultValue="kanban"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <DataTableToolbar table={table} onTabChange={setActiveTab} />

        <TabsContent value="kanban">
          <TasksKanban
            tasks={filteredTasks}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onTasksReorder={setTasks}
          />
        </TabsContent>

        <TabsContent value="list">
          <TasksList table={table} />
        </TabsContent>
      </Tabs>

      {/* Task Modal (Create & Edit) */}
      <TaskModal
        open={isTaskModalOpen}
        onOpenChange={setIsTaskModalOpen}
        onSave={handleSaveTask}
        initialTask={selectedTask}
      />

      {/* Delete Confirmation Modal */}
      {selectedTask && (
        <DeleteTaskDialog
          task={selectedTask}
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onConfirm={handleDeleteTask}
        />
      )}

      {/* Jira Config Dialog */}
      <JiraLinkModal
        open={isJiraModalOpen}
        onOpenChange={setIsJiraModalOpen}
        connectionDetails={jiraConnection}
        onSaveConnection={handleSaveJiraConnection}
        onDisconnect={handleDisconnectJira}
      />
    </div>
  );
}
