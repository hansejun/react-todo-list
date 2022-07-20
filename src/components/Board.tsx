import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { IForm } from "../App";
import { ITodo, todoState } from "../atoms";
import { useRecoilState } from "recoil";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";
const Board1 = styled(motion.div)`
  width: 300px;
  min-height: 400px;
  display: grid;
  grid-template-rows: 40px 1fr 60px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 12px;
  justify-self: center;
  box-shadow: 2px 3px 3px rgba(83, 82, 236, 0.2),
    0 10px 20px rgba(83, 82, 236, 0.06);
`;
const BoardFlex = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-top: 40px;
`;
const Title = styled.div`
  width: 100%;
  height: 100%;
  font-size: 20px;
  border-radius: 12px 12px 0px 0px;
  color: ${(props) => props.theme.fontColor};
  font-weight: 600;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  p {
    grid-column: 2;
    color: white;
  }
  div {
    grid-column: 3;
    justify-self: end;
    background-color: white;
    color: rgba(83, 82, 236, 1);
    cursor: pointer;
    &:hover {
      background-color: rgb(179, 179, 252);
      color: white;
    }
  }
  background-color: rgba(83, 82, 236, 1);
`;
const BoardBtn = styled.div`
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
  margin-right: 10px;
`;
const CardForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: end;
  justify-content: center;
  padding: 20px;
`;
const CardInput = styled.input`
  width: 75%;
  height: 30px;
  border: none;
  &:focus {
    outline: none;
  }
  border-radius: 7px 0px 0px 7px;
  padding: 0 10px;
  box-shadow: 0 2px 3px rgba(83, 82, 236, 0.1),
    0 10px 20px rgba(83, 82, 236, 0.06);
`;
const CardAddBtn = styled.button`
  width: 25%;
  height: 30px;
  border: none;
  border-radius: 0px 7px 7px 0px;
  box-shadow: 0 2px 3px rgba(83, 82, 236, 0.1),
    0 10px 20px rgba(83, 82, 236, 0.06);
  background-color: rgb(83, 82, 236);
  color: white;
  cursor: pointer;
`;
const Area = styled.div<IArea>`
  width: 100%;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "rgba(83, 82, 236,0.5)"
      : props.isDraggingFromThis
      ? "rgba(247, 200, 200,0.7)"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  border-radius: 10px;
`;
interface IBoard {
  todos: ITodo[];
  boardId: string;
}
interface IArea {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
interface IForm2 {
  todo: string;
}
function Board({ todos, boardId }: IBoard) {
  const { register, setValue, handleSubmit } = useForm<IForm2>();
  const [todos2, setTodos2] = useRecoilState(todoState);
  const boardVar = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const onClick = () => {
    setTodos2((allBoards) => {
      let newBoards = { ...allBoards };
      console.log(allBoards);
      delete newBoards[boardId];
      return newBoards;
    });
  };
  const onValid = ({ todo }: IForm2) => {
    const newTodo = {
      id: Date.now(),
      text: todo,
    };
    setTodos2((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newTodo, ...allBoards[boardId]],
      };
    });
    setValue("todo", "");
  };
  return (
    <Board1
      layout
      variants={boardVar}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Title>
        <p>{boardId}</p>
        <BoardBtn onClick={onClick}>x</BoardBtn>
      </Title>
      <BoardFlex>
        <Droppable droppableId={boardId}>
          {(magic, snapshot) => (
            <Area
              isDraggingOver={snapshot.isDraggingOver}
              isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              <AnimatePresence>
                {todos
                  ? todos?.map((todo, index) => (
                      <Card
                        key={todo.id}
                        todoText={todo.text}
                        todoId={todo.id}
                        index={index}
                        boardId={boardId}
                      />
                    ))
                  : null}
              </AnimatePresence>
              {magic.placeholder}
            </Area>
          )}
        </Droppable>
      </BoardFlex>
      <CardForm onSubmit={handleSubmit(onValid)}>
        <CardInput
          {...register("todo", { required: true })}
          placeholder="Write a item"
        />
        <CardAddBtn>Add</CardAddBtn>
      </CardForm>
    </Board1>
  );
}
export default Board;
