import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoAtom } from "../atoms";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoAtom);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDos((oldTodos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
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
