"use client";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodos } from "./todosContext";

export default function ReactContextTodoList() {
 const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodos()!;

 return (
   <div id="wd-todo-list-context">
     <h2>Todo List</h2>
     <ListGroup>
      <ListGroupItem>
        <Button onClick={addTodo} className="btn btn-success float-end ms-2">Add</Button>
        <Button onClick={updateTodo} className="btn btn-warning float-end">Update</Button>
        <FormControl className="float-left fs-5 w-50" value = {todo.title}
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
