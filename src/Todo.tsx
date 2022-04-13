import CreateToDo from "./components/CreateToDo";
import ToDoList from "./components/ToDoList";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoAtom, toDoSelector } from "./atoms";
import React from "react";
import styled from "styled-components";
const Container = styled.div`
  width: 400px;
  min-height: 250px;
  padding: 20px;
  background-color: rgba(235, 236, 240, 0.95);
  box-shadow: 0px 0px 10px #babecc;
  margin: 0 auto;
  border-radius: 8px;
  margin-top: 60px;
`;
const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 600;
  margin-bottom: 20px;
`;
const SelectBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 400px;
  margin-top: 40px;
`;
function Todo() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <>
      <Container>
        <Title>To Do</Title>
        <SelectBox>
          <select onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
          </select>
        </SelectBox>
        <CreateToDo />
      </Container>
      <List>
        {toDos?.map((toDo) => (
          <ToDoList key={toDo.id} {...toDo}></ToDoList>
        ))}
      </List>
    </>
  );
}

export default Todo;
