import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: {
    todo: { id: string; title: string };
    deleteTodo: (id: string) => void;
    setTodo: (todo: { id: string; title: string }) => void;
  }) {
    const dispatch = useDispatch();

    return (
      <ListGroupItem key={todo.id}>
        <Button onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click" className="btn btn-danger float-end  ms-2"> Delete </Button>
        <Button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click" className="float-end"> Edit </Button>
        <span className="fs-5"> {todo.title} </span>
    </ListGroupItem>);}
    