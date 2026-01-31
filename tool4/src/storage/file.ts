import fs from "fs";
import path from "path";

export type Note = {
  id: number;
  text: string;
  createAt: string;
};

const dir = path.join(process.env.HOME!, ".config/notes-cli");
const file = path.join(dir, "notes.json");

export const loadNotes = (): Note[] => {
  if (!fs.existsSync(file)) {
    return [];
  }
};
