import { Todo } from "../App";
import "./TodoList.css";

type TodoListProps = {
  todos: Todo[];
  handleDelete: (id: string) => void;
  openEdit: (todo: Todo) => void;
};

const TodoList = (props: TodoListProps) => {
  return (
    <div className="todo-list">
      {props.todos.map((todo) => (
        <div key={todo.id} className="todo">
          <p className="status">{todo.status.name}</p>
          <p className="title">{todo.text}</p>
          <button onClick={() => props.openEdit(todo)}>編集</button>
          <button onClick={() => props.handleDelete(todo.id)}>削除</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
