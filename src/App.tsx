import { useEffect, useState } from "react";
import "./App.css";
import TodoEdit from "./components/TodoEdit";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { nanoid } from "nanoid";

export type Todo = {
  id: string;
  text: string;
  status: {
    id: string;
    name: string;
  };
};

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]") as Todo[]
  );
  const [todoText, setTodoText] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editingTodoText, setEditingTodoText] = useState("");
  const [editingTodoStatus, setEditingTodoStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortedTodos, setSortedTodos] = useState<Todo[]>(todos);

  const addTodo = () => {
    if (!todoText) return;
    setTodos([
      ...todos,
      {
        id: nanoid(),
        text: todoText,
        status: {
          id: "notstarted",
          name: "未着手",
        },
      },
    ]);
    setTodoText("");
  };

  const handleDelete = (id: string) => {
    const newTodos: Todo[] = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const openEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditingTodoText(todo.text);
    setEditingTodoStatus(todo.status.id);
    setIsEditing(true);
  };

  const updateTodos = () => {
    if (!editingTodo) return;
    const newTodos: Todo[] = todos.map((todo) => {
      if (todo.id === editingTodo.id) {
        return {
          ...todo,
          text: editingTodoText,
          status: {
            id: editingTodoStatus,
            name: getStatusName(editingTodoStatus) || "",
          },
        };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
    setEditingTodo(null);
    setEditingTodoText("");
    setEditingTodoStatus("");
    setIsEditing(false);
  };

  const getStatusName = (editingTodoStatus: string): string | undefined => {
    switch (editingTodoStatus) {
      case "notstarted":
        return "未着手";
      case "progress":
        return "進行中";
      case "done":
        return "完了";
      default:
        return undefined;
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const sortTodos = () => {
      switch (selectedStatus) {
        case "notstarted":
          setSortedTodos(
            todos.filter((todo) => todo.status.id === "notstarted")
          );
          break;
        case "progress":
          setSortedTodos(todos.filter((todo) => todo.status.id === "progress"));
          break;
        case "done":
          setSortedTodos(todos.filter((todo) => todo.status.id === "done"));
          break;

        default:
          setSortedTodos(todos);
          break;
      }
    };
    sortTodos();
  }, [selectedStatus, todos]);

  return (
    <>
      {isEditing && editingTodo ? (
        <TodoEdit
          editingTodoText={editingTodoText}
          setEditingTodoText={setEditingTodoText}
          editingTodoStatus={editingTodoStatus}
          setEditingTodoStatus={setEditingTodoStatus}
          updateTodos={updateTodos}
        />
      ) : (
        <>
          <TodoInput
            todoText={todoText}
            setTodoText={setTodoText}
            addTodo={addTodo}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <TodoList
            todos={sortedTodos}
            handleDelete={handleDelete}
            openEdit={openEdit}
          />
        </>
      )}
    </>
  );
}

export default App;
