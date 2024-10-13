import React, { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import { Todo } from "./types";
import styles from "./styles/App.module.css";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const remainingTodosCount = todos.filter((todo) => !todo.completed).length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    return filter === "completed" ? todo.completed : !todo.completed;
  });

  return (
    <div className={styles.app}>
      <h1>Todo List</h1>
      <TodoInput addTodo={addTodo} />
      {todos.length === 0 ? (
        <h2 className={styles.emptyMessage}>
          No tasks available. Please add a task!
        </h2>
      ) : (
        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      )}
      <FilterButtons
        filter={filter}
        setFilter={setFilter}
        remainingTodosCount={remainingTodosCount}
        clearCompleted={clearCompleted}
        completedTodosCount={completedTodosCount}
      />
    </div>
  );
};

export default App;
