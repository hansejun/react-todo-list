import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
interface IForm {
  toDo: string;
}

function TodoList() {
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => console.log("Valid", data.toDo);
  return (
    <div>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          placeholder="Write a to do"
        />
        <button>Create</button>
      </Form>
    </div>
  );
}

export default TodoList;
