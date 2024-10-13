import React from "react";
import { Todo } from "../types";
import styles from "../styles/TodoItem.module.css";

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const TodoItem: React.FC<Props> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <div
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.text}</span>
      {!todo.completed && (
        <button
          className={styles.deleteButton}
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default TodoItem;
