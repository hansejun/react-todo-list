import CreateToDo from "./components/CreateToDo";
import ToDoList from "./components/ToDoList";
import { useRecoilValue } from "recoil";
import { toDoAtom } from "./atoms";
function Todo() {
  const toDos = useRecoilValue(toDoAtom);
  return (
    <div>
      <h1>To Do</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos?.map((toDo) => (
          <ToDoList key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default Todo;
