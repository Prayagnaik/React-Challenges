import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "./TaskList";

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  let tasks: Task[] = [];

  try {
    const storedTasks = localStorage.getItem("task-app-tasks");

    if (storedTasks) {
      const parsed = JSON.parse(storedTasks);

      if (Array.isArray(parsed)) {
        tasks = parsed;
      }
    }
  } catch {
    tasks = [];
  }

  const task = tasks.find((item) => String(item.id) === String(id));

  return (
    <div id="task-detail-page">
      {task ? (
        <>
          <h1>{task.title}</h1>

          <p>{task.description}</p>

          <p>Priority: {task.priority}</p>

          <p>Category: {task.category}</p>

          <p>
            Status: {task.completed ? "Completed" : "Not Completed"}
          </p>

          <button
            id="task-detail-back"
            type="button"
            onClick={() => navigate("/challenge/21-react-router")}
          >
            Back to list
          </button>
        </>
      ) : (
        <>
          <h1>Task not found</h1>

          <button
            id="task-detail-back"
            type="button"
            onClick={() => navigate("/challenge/21-react-router")}
          >
            Back to list
          </button>
        </>
      )}
    </div>
  );
}