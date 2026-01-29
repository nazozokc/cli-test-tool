import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".todo-cli");
const DATA_FILE = path.join(DATA_DIR, "todos.json");

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export const loadTodos = (): Todo[] => {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
};

export const saveTodos = (todos: Todo[]): void => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
};
