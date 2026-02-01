import { Command } from "commander";
import { loadNotes, saveNotes } from "../storage/file.js";
import { addNote, removeNote, searchNotes } from "../core/notes.js";

export const runCLI = () => {
  const program = new Command();

  program.name("note").description("simple notes cli").version("0.1.0");

  program
  .command("add")
  .argument("<text>")
  .action((text) => {
    const notes = loadNotes();
    saveNotes(addNote(notes, text));
    console.log("added");
  });

  program
  .command("list")
  .action(() => {
    const notes = loadNotes();
    for (const n of notes) {
      console.log(`${n.id}: ${n.text}`);
    };
  });

  program
  .command("search")
  .argument("<keyword>")
  .action((keyword) => {
    const notes = searchNotes(loadNotes(), keyword);
    for (const n of notes) {
      console.log(`${n.id}: ${n.text}`);
    }
  });

  program
  .command("remove")
  .argument("<id>")
  .action((id) => {
    saveNotes(removeNote(loadNotes(), Number(id)));
    console.log("removed");
  });

  program.parse();
};
