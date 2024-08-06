import "./TodoInput.css";

type TodoInputProps = {
  todoText: string;
  setTodoText: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
};

const TodoInput = (props: TodoInputProps) => {
  return (
    <div className="todo_input">
      <input
        type="text"
        value={props.todoText}
        onChange={(e) => props.setTodoText(e.target.value)}
      />
      <button onClick={props.addTodo}>追加</button>
      <select
        defaultValue={props.selectedStatus}
        onChange={(e) => props.setSelectedStatus(e.target.value)}
      >
        <option value="all">すべて</option>
        <option value="notstarted">未着手</option>
        <option value="progress">進行中</option>
        <option value="done">完了</option>
      </select>
    </div>
  );
};

export default TodoInput;
