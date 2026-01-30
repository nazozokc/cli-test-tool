import { Command } from "commander";
import { loadTodos, saveTodos } from "../storage/file.js";
import { addTodo, doneTodo, removeTodo } from "../core/todo.js";

export const runCLI = () => {
  const program = new Command();

  program.name("todo").description("simple todo CLI").version("0.1.0");

  program
    .command("add")
    .argument("<text>")
    .action((text: string) => {
      const todos = loadTodos();
      const updated = addTodo(todos, text);
      saveTodos(updated);
      console.log("追加しました", text);
    });

  program
  .command("list")
  .action(() => {
    const todos = loadTodos();
    if(todos.length === 0) {
      console.log("TODOはありません")
      return;
    }

    for(const todo of todos) {
      const mark = todo.done ? "x" : " ";
      console.log(`[${mark}] ${todo.id}: ${todo.text}`);
    }
  });

  program
  .command("done")
  .argument("<id>")
  .action((id: string) => {
    const todos = loadTodos();
    const updated = doneTodo(todos, Number(id));
    saveTodos(updated);
    console.log("完了", id);
  });

  program
  .command("remove")
  .argument("<id>")
  .action((id: string) => {
    const todos = loadTodos();
    const updated = removeTodo(todos, Number(id));
    saveTodos(updated);
    console.log("削除", id);
  });

  program.parse();
};
