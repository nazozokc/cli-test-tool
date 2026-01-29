import { Todo } from "../storage/file.js";

export const addTodo = (todos: Todo[], text: string): Todo[] => {
  const nextId =
    todos.length === 0 ? 1 : Math.max(...todos.map((t) => t.id)) + 1;

  const newTodo: Todo = {
    id: nextId,
    text,
    done: false,
  };

  return [...todos, newTodo];
};

export const doneTodo = (todos: Todo[], id: number): Todo[] => {
  return todos.map((todo) => (todo.id === id ? { ...todo, done: true } : todo));
};

export const removeTodo = (todos: Todo[], id: number): Todo[] => {
  return todos.filter((todo) => todo.id !== id);
};
