import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";
import Board from "./components/Board";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px 0px;
  position: relative;
`;
const AddForm = styled(motion.form)<{ visible: boolean }>`
  width: 40vw;
  height: 10vw;
  display: ${(props) => (props.visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
  position: relative;
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
const HideBtn = styled.span`
  color: rgba(0, 0, 0, 0.5);
  margin-left: 10px;
  font-size: 13px;
  cursor: pointer;
`;
const Boards = styled(motion.div)<{ len: number }>`
  width: 1000px;
  display: grid;
  grid-template-columns: ${(props) =>
    props.len < 3 ? `repeat(${props.len},1fr)` : "repeat(3,1fr)"};
  gap: 30px;
  align-content: center;
  align-items: center;
`;
const MotionBox = styled(motion.div)`
  width: 40px;
  height: 40px;
  background-color: rgba(83, 82, 236, 1);
  margin-bottom: 40px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 20px;
    color: white;
  }
`;
export interface IForm {
  board: string;
}
function App() {
  const formVar = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const boxVar = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      scale: 1,
      backgroundColor: "rgba(83, 82, 236, 1)",
      transition: { duration: 0.5 },
      y: 0,
    },
    exit: { opacity: 0 },
  };
  const [todos, setTodos] = useRecoilState(todoState);
  const [boardLen, setBoardLen] = useState(0);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [visible, setVisible] = useState(true);
  const hideForm = () => {
    setVisible((prev) => !prev);
  };
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
      <AnimatePresence>
        <Wrapper>
          {visible ? null : (
            <MotionBox
              layout
              variants={boxVar}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={hideForm}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="currentColor"
                  d="M288 256C288 273.7 273.7 288 256 288C238.3 288 224 273.7 224 256V32C224 14.33 238.3 0 256 0C273.7 0 288 14.33 288 32V256zM80 256C80 353.2 158.8 432 256 432C353.2 432 432 353.2 432 256C432 201.6 407.3 152.9 368.5 120.6C354.9 109.3 353 89.13 364.3 75.54C375.6 61.95 395.8 60.1 409.4 71.4C462.2 115.4 496 181.8 496 255.1C496 388.5 388.5 496 256 496C123.5 496 16 388.5 16 255.1C16 181.8 49.75 115.4 102.6 71.4C116.2 60.1 136.4 61.95 147.7 75.54C158.1 89.13 157.1 109.3 143.5 120.6C104.7 152.9 80 201.6 80 256z"
                />
              </svg>
            </MotionBox>
          )}
          {visible ? (
            <AddForm
              layout
              variants={formVar}
              initial="initial"
              animate="animate"
              exit="exit"
              visible={visible}
              onSubmit={handleSubmit(onValid)}
            >
              <BoardInput
                {...register("board", { required: true })}
                placeholder="Create a list"
              />
              <AddBtn>Create</AddBtn>
              <HideBtn onClick={hideForm}>hide</HideBtn>
            </AddForm>
          ) : null}

          <Boards layout len={boardLen}>
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
      </AnimatePresence>
    </DragDropContext>
  );
}

export default App;
