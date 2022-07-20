import { atom } from "recoil";

export interface ITodoState {
  [key: string]: ITodo[];
}
export interface ITodo {
  id: number;
  text: string;
}

export const todoState = atom<ITodoState>({
  key: "todos",
  default: {},
});
