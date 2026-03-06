"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNotes = exports.removeNote = exports.addNote = void 0;
const addNote = (notes, text) => {
    const last = notes.at(-1);
    const nextId = last === undefined ? 1 : last.id + 1;
    return [
        ...notes,
        {
            id: nextId,
            text,
            createAt: new Date().toISOString(),
        },
    ];
};
exports.addNote = addNote;
const removeNote = (notes, id) => {
    return notes.filter((n) => n.id !== id);
};
exports.removeNote = removeNote;
const searchNotes = (notes, keyword) => {
    return notes.filter((n) => n.text.includes(keyword));
};
exports.searchNotes = searchNotes;
