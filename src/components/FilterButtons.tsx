import React from "react";
import styles from "../styles/FilterButtons.module.css";

type Props = {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
  remainingTodosCount: number;
  clearCompleted: () => void;
  completedTodosCount: number;
};

const FilterButtons: React.FC<Props> = ({
  filter,
  setFilter,
  remainingTodosCount,
  clearCompleted,
  completedTodosCount,
}) => {
  return (
    <div className={styles.filterButtons}>
      {remainingTodosCount > 0 && <span>{remainingTodosCount} items left</span>}
      <div>
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? styles.active : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? styles.active : ""}
          disabled={remainingTodosCount === 0}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? styles.active : ""}
          disabled={completedTodosCount === 0}
        >
          Completed
        </button>
      </div>
      <button
        onClick={clearCompleted}
        className={styles.clearButton}
        disabled={completedTodosCount === 0}
      >
        Clear completed
      </button>
    </div>
  );
};

export default FilterButtons;
