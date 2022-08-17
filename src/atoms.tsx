import { atom, selector } from "recoil";

export let categories: string[] = ["TO DO", "DOING", "DONE"];

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<string>({
  key: "category",
  default: categories[0],
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: JSON.parse(localStorage.getItem("categories") ?? JSON.stringify(categories)),
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem("toDo") ?? "[]"),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
