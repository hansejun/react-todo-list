import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
interface IForm {
  email: string;
  password: string;
  password2: string;
  name: string;
  extraError?: string;
}

function TodoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();

  const onValid = (data: IForm) => {
    if (data.password === data.password2) {
      setError("password2", { message: "Passwords are not same" });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: "Check your name",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com",
            },
          })}
          type="text"
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("password", { required: "Check your password" })}
          type="password"
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password2", { required: "Check your password" })}
          type="password"
          placeholder="Check your password"
        />
        <span>{errors?.password2?.message}</span>
        <input
          {...register("name", { required: "Check your name" })}
          type="text"
          placeholder="Name"
        />
        <span>{errors?.name?.message}</span>
        <button>Create</button>
      </Form>
    </div>
  );
}

export default TodoList;
