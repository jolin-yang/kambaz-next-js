// import { useState } from "react";

// export default function ArrayStateVariable() {
//  const [array, setArray] = useState([1, 2, 3, 4, 5]);
//  const addElement = () => {
//    setArray([...array, Math.floor(Math.random() * 100)]);
//  };
// const deleteElement = (index: number) => {
//    setArray(array.filter((item, i) => i !== index));
//  };
//  return (
//   <div id="wd-array-state-variables">
//    <h2>Array State Variable</h2>
//    <button onClick={addElement} className="btn btn-success mb-2">Add Element</button>
//    <ul className="list-group col-9">
//     {array.map((item, index) => (
//      <li key={index} className="list-group-item"> 
//      <span className="fs-4 fw-semibold"> {item} </span>
//       <button onClick={() => deleteElement(index)} className="btn btn-danger float-end">
//        Delete</button>
//      </li>))}
//    </ul>
//    <hr/>
//   </div>
// );}


"use client";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo } from "./redux/todos/todosReducer";
import { RootState } from "./store";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function ArrayStateVariable() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button onClick={() => dispatch(addTodo({ title: "New Todo" }))} 
              className="btn btn-success mb-2">Add Element</button>
      <ListGroup className="list-group col-9">
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id} className="list-group-item">
            <span className="fs-5"> {todo.title} </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))} 
                    className="btn btn-danger float-end">
              Delete</button>
          </ListGroupItem>))}
      </ListGroup>
      <hr/>
    </div>
  );
}
  