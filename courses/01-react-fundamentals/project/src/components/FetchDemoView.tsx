import { useEffect, useState } from "react";

interface TodoItem {
  id: string | number;
  title: string;
}

export default function FetchDemoView() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/todos.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = (await response.json()) as TodoItem[];

        if (!controller.signal.aborted) {
          setItems(data);
          setLoading(false);
        }
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          err instanceof Error ? err.message : "Failed to fetch data"
        );
        setLoading(false);
      }
    };

    fetchItems();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <p id="fetch-loading">Loading...</p>;
  }

  if (error) {
    return <p id="fetch-error">{error}</p>;
  }

  return (
    <ul id="fetch-list">
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}