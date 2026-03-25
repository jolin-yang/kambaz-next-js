"use client";

import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoList() {
 const { todos, todo, setTodo, addTodo, updateTodo, deleteTodo } = useTodoStore(
   (state) => state,
 );  

  return (
    <div id="wd-zustand-todo">
      <h2>Zustand Todo</h2>
      <ListGroup>
        <ListGroupItem>
          <Button onClick={addTodo} className="btn btn-success float-end ms-2">Add</Button>
          <Button onClick={updateTodo} className="btn btn-warning float-end">Update</Button>
          <FormControl className="w-50 fs-5" value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
        </ListGroupItem>
        {todos.map((t: any) => (
          <ListGroupItem key={t.id}>
            <span className="fs-5"> {t.title} </span>
            <Button onClick={() => deleteTodo(t.id)} className="btn btn-danger float-end ms-2">Delete</Button>
            <Button onClick={() => setTodo(t)} className="btn btn-primary float-end">Edit</Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}