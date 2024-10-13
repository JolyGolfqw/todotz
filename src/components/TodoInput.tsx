import React, { useState } from "react";
import styles from "../styles/TodoInput.module.css";

type Props = {
  addTodo: (text: string) => void;
};

const TodoInput: React.FC<Props> = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.todoInputForm}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className={styles.inputField}
      />
      <button disabled={!text} type="submit" className={styles.addButton}>
        Add
      </button>
    </form>
  );
};

export default TodoInput;
