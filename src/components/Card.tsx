import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "../atoms";
import { motion, AnimatePresence } from "framer-motion";
interface ICard {
  todoId: number;
  todoText: string;
  index: number;
  boardId: string;
}
interface ICardDrag {
  isDragging: boolean;
}
const MotionCard = styled(motion.div)``;
const Card1 = styled.div<ICardDrag>`
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding: 10px 15px;
  background-color: white;
  color: ${(props) => props.theme.fontColor};
  box-shadow: ${(props) =>
    props.isDragging
      ? "0px 2px 5px rgba(0,0,0,0.1)"
      : "2px 3px 3px rgba(83, 82, 236, 0.2), 0 10px 20px rgba(83, 82, 236, 0.06)"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 10px;
  &:hover {
    span {
      opacity: 1;
    }
  }
  span {
    opacity: 0;
    font-size: 9px;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
`;
function Card({ todoText, todoId, index, boardId }: ICard) {
  const setTodos = useSetRecoilState(todoState);
  const motionVar = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const onClickDelete = () => {
    setTodos((allBoards) => {
      const targetBoard = [...allBoards[boardId]];
      const newBoard = [
        ...targetBoard.slice(0, index),
        ...targetBoard.slice(index + 1),
      ];
      return { ...allBoards, [boardId]: newBoard };
    });
  };
  return (
    <MotionCard
      variants={motionVar}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Draggable key={todoId} draggableId={todoId + ""} index={index}>
        {(magic, snapshot) => (
          <Card1
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.draggableProps}
            {...magic.dragHandleProps}
          >
            <p>{todoText}</p>
            <span onClick={onClickDelete}>❌</span>
          </Card1>
        )}
      </Draggable>
    </MotionCard>
  );
}
export default Card;
