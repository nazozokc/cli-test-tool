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

  return JSON.parse(fs.readFileSync(file, "utf-8"));
};

export const saveNotes = (notes: Note[]) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(file, JSON.stringify(notes, null, 2));
};
