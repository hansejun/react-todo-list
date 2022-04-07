import { IToDo } from "../atoms";

function ToDoList({ text }: IToDo) {
  return (
    <li>
      <span>{text}</span>
      <button>To Do</button>
      <button>DOING</button>
      <button>DONE</button>
    </li>
  );
}

export default ToDoList;
