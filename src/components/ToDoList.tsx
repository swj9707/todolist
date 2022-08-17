import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const addCategory = () => {
    const newCategory = prompt("Insert Name of New Category", "");

    if (newCategory) {
      if (categories.includes(newCategory)) {
        alert("Error ! The same name exist");
        return;
      }
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
    }
  };

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <div>
        <select value={category} onInput={onInput}>
          {categories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
        <button onClick={addCategory}>Add Category</button>
      </div>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
