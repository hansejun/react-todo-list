import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoAtom } from "../atoms";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
  }
  button {
    width: 100%;
    background-color: #22c08c;
    border: none;
    border-radius: 5px;
    color: white;
    height: 35px;
    cursor: pointer;
    text-transform: uppercase;
  }
`;
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoAtom);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDos((oldTodos) => [
      { text: toDo, id: Date.now(), category },
      ...oldTodos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", { required: true })}
        placeholder="Write a to do"
      />
      <button>Create</button>
    </Form>
  );
}

export default CreateToDo;
