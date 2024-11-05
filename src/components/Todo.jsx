import { useEffect, useRef } from "react";
import TodoItems from "./TodoItems";
import { useState } from "react";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) return { ...todo, isComplete: !todo.isComplete };
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded">
      {/* ------------ title ------------ */}

      <div className="flex items-center mt7 gap-2">
        <img className="w-8" src="/images/checklist.png" alt="" />
        <h1 className="text-3xl font-semibold text-orange-600">
          Genghis Todo App
        </h1>
      </div>

      {/* --------input box --------- */}

      <div className="flex items-center my-7 bg-gray-200 rounded-full ">
        <input
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          name="task"
          id="task"
          placeholder="Add your task"
          autoComplete="off"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* ----------------- todo list ---------------- */}

      <div>
        {todoList &&
          todoList.map((item, index) => {
            return (
              <TodoItems
                key={index}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                toggle={toggle}
              />
            );
          })}
      </div>

      {/*----------- end of project --------- */}
    </div>
  );
};

export default Todo;
