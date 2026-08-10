import {
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Task } from "./TaskList";
import Button from "./Button";
import Badge from "./Badge";
import StatusIndicator from "./StatusIndicator";

/**
 * Props required to render a task card.
 */
interface TaskCardProps {
  id: string | number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  category?: string;
  tags?: string[];
  completed?: boolean;
  onToggle?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  onUpdateTask?: (id: string | number, updates: Partial<Task>) => void;
  editingId?: string | number | null;
  setEditingId?: Dispatch<SetStateAction<string | number | null>>;
  dueDate?: string | number;
}

/**
 * Displays the details of a single task.
 */
export default function TaskCard(props: TaskCardProps) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [priority, setPriority] = useState(props.priority);
  const [category, setCategory] = useState(props.category);
  const [tagsInput, setTagsInput] = useState(
    (props.tags ?? []).join(", "),);
  const [dueDate, setDueDate] = useState(
    props.dueDate ? String(props.dueDate) : "",
  );


  const [localEditing, setLocalEditing] = useState(false);

  const isCompleted = props.completed ?? false;

  const isEditing =
    props.editingId !== undefined ? props.editingId === props.id : localEditing;

  const getDateOnly = (date: Date) => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
  };

  const getDueDate = () => {
    if (!props.dueDate) return null;

    const value = String(props.dueDate);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const parsed = new Date(value);
      return Number.isNaN(parsed.getTime())
        ? null
        : getDateOnly(parsed);
    }

    const [year, month, day] = value.split("-").map(Number);

    return new Date(year, month - 1, day);
  };

  const dueDateValue = getDueDate();
  const today = getDateOnly(new Date());

  const daysUntilDue = dueDateValue
    ? Math.round(
      (dueDateValue.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24),
    )
    : null;

  const isOverdue =
    dueDateValue !== null &&
    daysUntilDue !== null &&
    daysUntilDue < 0 &&
    !isCompleted;

  const isDueToday =
    dueDateValue !== null &&
    daysUntilDue === 0;

  const isDueSoon =
    dueDateValue !== null &&
    daysUntilDue !== null &&
    daysUntilDue > 0 &&
    daysUntilDue <= 3;

  const startEditing = () => {
    setTitle(props.title);
    setDescription(props.description);
    setPriority(props.priority);
    setCategory(props.category ?? "General");
    setTagsInput((props.tags ?? []).join(", "));
    setDueDate(props.dueDate ? String(props.dueDate) : "");


    if (props.setEditingId) {
      props.setEditingId(props.id);
    } else {
      setLocalEditing(true);
    }
  };

  const stopEditing = () => {
    if (props.setEditingId) {
      props.setEditingId(null);
    } else {
      setLocalEditing(false);
    }
  };

  const handleSave = () => {
  if (!title.trim()) return;

  const tags = tagsInput
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  props.onUpdateTask?.(props.id, {
    title,
    description,
    priority,
    category: category?.trim() || "General",
    tags,
    dueDate: dueDate || undefined,
  });

  stopEditing();
};

  const handleCancel = () => {
    setTitle(props.title);
    setDescription(props.description);
    setPriority(props.priority);
    setCategory(props.category ?? "General");
    setTagsInput((props.tags ?? []).join(", "));
    setDueDate(props.dueDate ? String(props.dueDate) : "");


    stopEditing();
  };

  return (
  <article>
    {props.onToggle && (
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => props.onToggle?.(props.id)}
      />
    )}

    {isEditing ? (
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    ) : (
      <h2
        style={{
          textDecoration: isCompleted ? "line-through" : "none",
        }}
      >
        {props.title}
      </h2>
    )}

    {isEditing ? (
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    ) : (
      <p
        style={{
          textDecoration: isCompleted ? "line-through" : "none",
        }}
      >
        {props.description}
      </p>
    )}

    {isEditing ? (
      <select
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value as "Low" | "Medium" | "High",
          )
        }
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    ) : (
      <p>
        Priority:{" "}
        <Badge variant={props.priority}>
          {props.priority}
        </Badge>
      </p>
    )}

    {isEditing ? (
      <div>
        <label htmlFor={`category-${props.id}`}>
          Category
        </label>

        <input
          id={`category-${props.id}`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
    ) : (
      <p id="task-category">
        Category:{" "}
        <Badge variant="category">
          {props.category ?? "General"}
        </Badge>
      </p>
    )}

    {isEditing ? (
      <div>
        <label htmlFor={`tags-${props.id}`}>
          Tags
        </label>

        <input
          id={`tags-${props.id}`}
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
      </div>
    ) : (
      <div id="task-tags">
        {(props.tags ?? []).map((tag) => (
          <Badge key={tag} variant="tag">
            <span data-tag={tag}>{tag}</span>
          </Badge>
        ))}
      </div>
    )}

    {isEditing ? (
      <div>
        <label htmlFor={`due-date-${props.id}`}>
          Due Date
        </label>

        <input
          id={`due-date-${props.id}`}
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
    ) : (
      <div
        id="task-due-date"
        data-overdue={isOverdue ? "true" : "false"}
      >
        {dueDateValue ? (
          <>
            <p>
              Due Date:{" "}
              {dueDateValue.toLocaleDateString()}
            </p>

            {isOverdue && (
              <StatusIndicator status="overdue" />
            )}

            {isDueToday && (
              <StatusIndicator status="due-today" />
            )}

            {isDueSoon && (
              <StatusIndicator status="due-soon" />
            )}
          </>
        ) : (
          <p>No due date</p>
        )}
      </div>
    )}

    {isCompleted ? (
      <StatusIndicator status="completed" />
    ) : (
      <p>Not Completed</p>
    )}

    {isEditing ? (
      <>
        <Button onClick={handleSave}>
          Save
        </Button>

        <Button
          onClick={handleCancel}
          variant="secondary"
        >
          Cancel
        </Button>
      </>
    ) : (
      <>
        <Button onClick={startEditing}>
          Edit
        </Button>

        {props.onDelete && (
          <Button
            variant="danger"
            onClick={() => {
              if (window.confirm("Are you sure?")) {
                props.onDelete?.(props.id);
              }
            }}
          >
            Delete
          </Button>
        )}
      </>
    )}
  </article>
);
}