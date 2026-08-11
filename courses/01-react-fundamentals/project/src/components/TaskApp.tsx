import { useState, useEffect, useMemo, type Dispatch, useCallback } from "react";
import type { Task } from "./TaskList";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import FilterBar from "./FilterBar";
import StatsPanel from "./StatsPanel";
import { useTheme } from "../contexts/ThemeContext";
import {
  ADD_TASK,
  UPDATE_TASK,
  TOGGLE_TASK,
  type TaskAction,
} from "../reducers/taskReducer";
import ErrorBoundary from "./ErrorBoundary";

interface TaskAppProps {
  tasks?: Task[];
  dispatch?: Dispatch<TaskAction>;
  showForm?: boolean;
  countFormat?: string;
  showFilterBar?: boolean;
  showStatsPanel?: boolean;
  onDelete?: (id: string | number) => void;
  linkToTaskDetail?: boolean;
}

export default function TaskApp(props: TaskAppProps) {
  const { theme, toggleTheme } = useTheme();
  const { tasks = [], dispatch, showForm } = props;
  function calculateTaskStats(tasks: Task[]) {
    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.completed
    ).length;

    const active = tasks.filter(
      (task) => !task.completed
    ).length;

    const overdue = tasks.filter((task) => {
      if (task.completed || !task.dueDate) {
        return false;
      }

      const dueDate = new Date(task.dueDate);
      const today = new Date();

      dueDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      return dueDate.getTime() < today.getTime();
    }).length;

    const completedPercentage =
      total === 0
        ? 0
        : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      completedPercentage,
      active,
      overdue,
    };
  }
  const stats = useMemo(
    () => calculateTaskStats(tasks),
    [tasks]
  );
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [categoryFilter, setCategoryFilter] = useState("")
  const [sortOrder, setSortOrder] = useState("recent");
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);
  const handleAddTask = useCallback((task: Task) => {
    dispatch?.({
      type: ADD_TASK,
      payload: task,
    });
  }, [dispatch]);

  const handleToggle = useCallback((id: string | number) => {
    dispatch?.({
      type: TOGGLE_TASK,
      payload: id,
    });
  }, [dispatch]);

  const handleUpdateTask = useCallback((
    id: string | number,
    updates: Partial<Task>
  ) => {
    dispatch?.({
      type: UPDATE_TASK,
      payload: {
        id,
        ...updates,
      },
    });
  }, [dispatch]);

  const categories = useMemo(() => [
    ...new Set(
      tasks
        .map((task) => task.category)
        .filter(Boolean),
    ),
  ], [tasks]);
  function filterAndSortTasks(
    tasks: Task[],
    filter: "all" | "active" | "completed",
    categoryFilter: string,
    searchText: string,
    sortOrder: string
  ): Task[] {
    let result =
      filter === "active"
        ? tasks.filter((task) => !task.completed)
        : filter === "completed"
          ? tasks.filter((task) => task.completed)
          : tasks;

    if (categoryFilter) {
      result = result.filter(
        (task) => task.category === categoryFilter
      );
    }

    if (searchText.trim()) {
      const search = searchText.toLowerCase();

      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
      );
    }

    const priorityValue = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    result = [...result];

    switch (sortOrder) {
      case "high":
        result.sort(
          (a, b) =>
            priorityValue[b.priority] -
            priorityValue[a.priority]
        );
        break;

      case "low":
        result.sort(
          (a, b) =>
            priorityValue[a.priority] -
            priorityValue[b.priority]
        );
        break;

      case "alpha":
        result.sort((a, b) =>
          a.title.localeCompare(b.title, undefined, {
            sensitivity: "base",
          })
        );
        break;

      case "due":
        result.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;

          return (
            new Date(a.dueDate).getTime() -
            new Date(b.dueDate).getTime()
          );
        });
        break;
    }

    return result;
  }
  const sortedTasks = useMemo(
    () =>
      filterAndSortTasks(
        tasks,
        filter,
        categoryFilter,
        debouncedSearch,
        sortOrder
      ),
    [
      tasks,
      filter,
      categoryFilter,
      debouncedSearch,
      sortOrder,
    ]
  );

  return (
    <>
      <div data-theme={theme}>
        <button
          id="theme-toggle"
          type="button"
          onClick={toggleTheme}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
        {showForm && <TaskForm onAddTask={handleAddTask} categories={categories} />}
        {props.showStatsPanel && (
          <StatsPanel
            total={stats.total}
            completed={stats.completed}
            active={stats.active}
            overdue={stats.overdue}

          />
        )}

        {props.showFilterBar && (
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            categories={categories}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        )}

        {isSearching && searchText !== debouncedSearch && (
          <p id="searching-indicator">Searching...</p>
        )}

        {sortedTasks.length === 0 ? (
          <p id="filter-empty-message">No tasks found</p>
        ) : (
          <ErrorBoundary>
            <TaskList
              tasks={sortedTasks}
              onToggle={handleToggle}
              onDelete={props.onDelete}
              countText={
                props.countFormat === "tasks"
                  ? `${tasks.length} Tasks`
                  : `${tasks.filter((t) => t.completed).length} Completed`
              }
              onUpdateTask={handleUpdateTask}
              editingId={editingId}
              setEditingId={setEditingId}
            />
          </ErrorBoundary>
        )}
      </div>
    </>
  );
}