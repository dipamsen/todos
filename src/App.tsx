import { useEffect, useState } from "react";
import deleteIcon from "./icons/delete.svg";

interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

const LS_KEY = "todos-ds_todos";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    setTodos(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <h1>Todos</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newTodo.trim()) return;
          setTodos((todos) => [
            ...todos,
            { id: Date.now(), text: newTodo.trim(), checked: false },
          ]);
          setNewTodo("");
        }}
      >
        <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.checked ? "checked" : ""}`}
            onClick={() => {
              setTodos((todos) =>
                todos.map((t) =>
                  t.id === todo.id ? { ...t, checked: !t.checked } : t
                )
              );
            }}
          >
            <div className="checkbox"></div>
            <div className="body">{todo.text}</div>
            <div
              className="delete"
              onClick={(e) => {
                e.stopPropagation();
                setTodos((todos) => todos.filter((t) => t.id !== todo.id));
              }}
            >
              <img src={deleteIcon} alt="Delete" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
