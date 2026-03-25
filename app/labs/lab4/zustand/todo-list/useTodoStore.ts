import { create } from "zustand";


// Define the Todo state
interface TodoState {
    nextID: number;
    todos: { id: string; title: string } [];
    todo: { id: string, title: string };
    setTodo: (todo: { id: string, title: string }) => void;
    addTodo: () => void;
    updateTodo: () => void;
    deleteTodo: (id: string) => void;
}


// Use create function to create a hook giving us access to the state
export const useTodoStore = create<TodoState>((set) => ({
    nextID: 2,

    todos: [
        { id: "0", title: "Learn React" },
        { id: "1", title: "Learn Node" },
    ],
    todo: { id: "-1", title: "Learn Mongo" },
  
    setTodo: (todo) => set({ todo }),
  
    addTodo: () => set((state) => ({
        todos: [...state.todos, { ...state.todo, id: state.nextID.toString() }],
        nextID: state.nextID + 1,
        todo: { id: "-1", title: "" },
    })),

    updateTodo: () => set((state) => ({
        todos: state.todos.map((t) => (t.id === state.todo.id ? state.todo : t)),
        todo: { id: "-1", title: "" },
    })),
  
    deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
    })),
  }));
