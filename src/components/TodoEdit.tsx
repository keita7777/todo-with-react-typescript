import "./TodoEdit.css";

type TodoEditProps = {
  editingTodoText: string;
  setEditingTodoText: React.Dispatch<React.SetStateAction<string>>;
  editingTodoStatus: string;
  setEditingTodoStatus: React.Dispatch<React.SetStateAction<string>>;
  updateTodos: () => void;
};

const TodoEdit = (props: TodoEditProps) => {
  return (
    <div className="edit-todo ">
      <select
        defaultValue={props.editingTodoStatus}
        onChange={(e) => props.setEditingTodoStatus(e.target.value)}
      >
        <option value="notstarted">未着手</option>
        <option value="progress">進行中</option>
        <option value="done">完了</option>
      </select>
      <input
        type="text"
        value={props.editingTodoText}
        onChange={(e) => props.setEditingTodoText(e.target.value)}
      />
      <button onClick={props.updateTodos}>更新</button>
      <button>キャンセル</button>
    </div>
  );
};

export default TodoEdit;
