import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

export default function TodoForm() {
    const { todo } = useSelector((state: RootState) => state.todosReducer);
    const dispatch = useDispatch();

    return (
      <ListGroupItem>
        <Button onClick={() => dispatch(addTodo(todo))}
                id="wd-add-todo-click" className="btn btn-success float-end ms-2"> Add </Button>
        <Button onClick={() => dispatch(updateTodo(todo))}
                id="wd-update-todo-click" className="btn btn-warning float-end"> Update </Button>
        <FormControl value={todo.title} className="float-left fs-5 w-50"
          onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value })) }/>
      </ListGroupItem>
  );}
  
  