import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export const toDoAtom = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoAtom);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
