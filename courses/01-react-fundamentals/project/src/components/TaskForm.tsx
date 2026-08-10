import { useState } from "react";
import type { Task } from "./TaskList";
import Button from "./Button";
import FormInput from "./FormInput";

interface TaskFormProps {
  onAddTask?: (task: Task) => void;
  categories?: string[];
}

export default function TaskForm({
  onAddTask,
  categories: existingCategories = [],
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] =
    useState<"Low" | "Medium" | "High">("Low");
  const [error, setError] = useState("");
  const [category, setCategory] = useState("General");
  const [tagsInput, setTagsInput] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
      category: category.trim() || "General",
      tags,
      dueDate: dueDate || undefined,
    };

    onAddTask?.(newTask);

    setTitle("");
    setDescription("");
    setPriority("Low");
    setCategory("General");
    setTagsInput("");
    setDueDate("");
  };

  const categories = [
    "General",
    "Work",
    "Personal",
    ...existingCategories.filter(
      (existingCategory) =>
        existingCategory !== "General" &&
        existingCategory !== "Work" &&
        existingCategory !== "Personal",
    ),
  ];

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        id="task-title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={error}
      />

      <FormInput
        id="task-description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
      />

      <div>
        <label htmlFor="task-priority">
          Priority
        </label>

        <select
          id="task-priority"
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
      </div>

      <div>
        <label htmlFor="task-category">
          category
        </label>

        <select
          id="task-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((existingCategory) => (
            <option
              key={existingCategory}
              value={existingCategory}
            >
              {existingCategory}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="task-tags">
          Tags
        </label>

        <input
          id="task-tags"
          type="text"
          placeholder="e.g. urgent, frontend, college"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="task-due-date">
          Due Date
        </label>

        <input
          id="task-due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <p id="task-form-error">{error}</p>

      <Button type="submit">
        Add Task
      </Button>
    </form>
  );
}