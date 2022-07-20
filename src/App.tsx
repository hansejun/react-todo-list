import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";
import Board from "./components/Board";
import { AnimatePresence } from "framer-motion";
const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px 0px;
`;
const AddForm = styled.form`
  width: 40vw;
  height: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
`;
const BoardInput = styled.input`
  width: 300px;
  height: 40px;
  background-color: white;
  border: none;
  padding: 0 15px;
  border-radius: 7px 0px 0px 7px;
  &:focus {
    outline: none;
  }
  font-size: 14px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const AddBtn = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  background-color: #5352ed;
  color: white;
  border-radius: 0px 7px 7px 0px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  cursor: pointer;
`;
const Boards = styled.div<{ len: number }>`
  width: 1000px;
  display: grid;
  grid-template-columns: ${(props) =>
    props.len < 3 ? `repeat(${props.len},1fr)` : "repeat(3,1fr)"};
  gap: 30px;
  align-content: center;
  align-items: center;
`;
export interface IForm {
  board: string;
}
function App() {
  const [todos, setTodos] = useRecoilState(todoState);
  const [boardLen, setBoardLen] = useState(0);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ board }: IForm) => {
    setTodos((allBoards) => {
      return {
        ...allBoards,
        [board]: [],
      };
    });
    setValue("board", "");
    setBoardLen((num) => num + 1);
  };
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setTodos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setTodos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const targetBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };
      });
    }
  };
  useEffect(() => {
    let getLocalTodos = JSON.parse(localStorage.getItem("todos") as string);
    setTodos((allBoards) => {
      return { ...allBoards, ...getLocalTodos };
    });
    setBoardLen(Object.keys(todos).length);
  }, []);

  useEffect(() => {
    const localTodos = { ...todos };
    localStorage.setItem("todos", JSON.stringify(localTodos));
    setBoardLen(Object.keys(localTodos).length);
  }, [todos]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <AddForm onSubmit={handleSubmit(onValid)}>
          <BoardInput
            {...register("board", { required: true })}
            placeholder="Create a list"
          />
          <AddBtn>Create</AddBtn>
        </AddForm>
        <Boards len={boardLen}>
          <AnimatePresence>
            {todos
              ? Object.keys(todos).map((boardId) => (
                  <Board
                    key={boardId}
                    todos={todos[boardId]}
                    boardId={boardId}
                  />
                ))
              : null}
          </AnimatePresence>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
