import { Note } from "../storage/file.js";

export const addNote = (notes: Note[], text: string): Note[] => {
  const nextId = notes.length === 0 ? 1 : notes[notes.length - 1].id + 1;

  return [
    ...notes,
    {
      id: nextId,
      text,
      createAt: new Date().toISOString(),
    },
  ];
};

export const removeNote = (notes: Note[], id: number): Note[] => {
  return notes.filter((n) => n.id !== id);
};

export const searchNotes = (notes: Note[], keyword: string): Note[] => {
  return notes.filter((n) => n.text.includes(keyword));
};
