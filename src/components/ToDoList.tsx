import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoAtom } from "../atoms";

function ToDoList({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoAtom);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((preTodo) => {
      const targetIndex = preTodo.findIndex((todo) => todo.id === id);
      const newTodo = { text, id, category: name as any };
      return [
        ...preTodo.slice(0, targetIndex),
        newTodo,
        ...preTodo.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          TO DO
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          DOING
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          DONE
        </button>
      )}
    </li>
  );
}

export default ToDoList;
