interface StatsPanelProps {
  total?: number;
  completed?: number;
  active?: number;
  overdue?: number;
}

export default function StatsPanel(props: StatsPanelProps) {
  const total = props.total ?? 0;
  const completed = props.completed ?? 0;
  const active = props.active ?? 0;
  const overdue = props.overdue ?? 0;

  const completedPercentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section id="stats-panel">
      <h2>Task Statistics</h2>

      <div>
        <strong>Total: {total}</strong>
      </div>

      <div>
        <strong>
          Completed: {completed} ({completedPercentage}%)
        </strong>
      </div>

      <div>
        <strong>Active: {active}</strong>
      </div>

      <div>
        <strong>Overdue: {overdue}</strong>
      </div>

      <div>
        <p>Completion Progress</p>

        <div
          role="progressbar"
          aria-valuenow={completedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: "#ddd",
          }}
        >
          <div
            style={{
              width: `${completedPercentage}%`,
              height: "100%",
              backgroundColor: "#4caf50",
            }}
          />
        </div>
      </div>
    </section>
  );
}