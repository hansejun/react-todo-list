import { atom } from "recoil";

export const toDoAtom = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}
