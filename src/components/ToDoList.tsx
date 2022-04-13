import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoAtom } from "../atoms";

const Li = styled.li`
  padding: 15px 15px;
  background-color: rgba(235, 236, 240, 0.95);
  box-shadow: 0px 0px 10px #babecc;
  border-radius: 5px;
  margin-bottom: 10px;
  list-style: none;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 1;
  div {
    button {
      border: none;
      background-color: inherit;
      margin-left: 5px;
      font-size: 12px;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.5);
      &:hover {
        color: rgba(0, 0, 0, 1);
        font-weight: 500;
      }
    }
    button:last-child {
      color: #e74c3c;
      &:hover {
        font-weight: 600;
      }
    }
  }
`;

function ToDoList({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoAtom);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    console.log(event.currentTarget.parentElement)
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

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((preTodo) => {
      const newTodos = [...preTodo].filter((item) => item.id !== id);
      return [...newTodos];
    });
  };
  return (
    <Li>
      <h3>{text}</h3>
      <div>
        {category !== Categories.TO_DO && (
          <button name={Categories.TO_DO} onClick={onClick}>
            TO DO
          </button>
        )}
        {category !== Categories.DOING && (
          <button name={Categories.DOING} onClick={onClick}>
            DOING
          </button>
        )}
        {category !== Categories.DONE && (
          <button name={Categories.DONE} onClick={onClick}>
            DONE
          </button>
        )}
        <button onClick={handleDelete}>DELETE</button>
      </div>
    </Li>
  );
}

export default ToDoList;
