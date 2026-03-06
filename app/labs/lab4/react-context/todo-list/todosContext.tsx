"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";


// Define the context state
interface TodosContextState {
  todos: { id: string; title: string } [];
  todo: { id: string, title: string };
  setTodo: (todo: { id: string, title: string }) => void;
  addTodo: () => void;
  deleteTodo: (id: string) => void;
  updateTodo: () => void;
}


// Create the context
const TodosContext = createContext<TodosContextState | undefined>(
 undefined,
);


// Create the provider component
export const TodosProvider = ({ children }: { children: ReactNode }) => {
 const [todos, setTodos] = useState([
  { id: "0", title: "Learn React" },
  { id: "1", title: "Learn Node" }
 ]);

 const [todo, setTodo] = useState( { id: "-1", title: "Learn Mongo" });
 const [nextID, setNextID] = useState(2);

 const addTodo = () => {
  setTodos([ ...todos, { ...todo, id: nextID.toString()}]);
  setNextID(nextID + 1);
  setTodo({ id: "-1", title: "" });
 }

 const updateTodo = () => {
  setTodos(todos.map((t) => (t.id == todo.id ? todo : t)));
  setTodo({ id: "-1", title: "" });
 }

 const deleteTodo = (id: string) => {
  setTodos(todos.filter((t) => t.id !== id));
 }

 return (
  <TodosContext.Provider value= {{ todos, todo, setTodo, addTodo, updateTodo, deleteTodo }}>
    {children}
  </TodosContext.Provider>
 );
};


// Create a custom hook to use the Todo context
export const useTodos = () => {
 const context = useContext(TodosContext);
 return context;
};

