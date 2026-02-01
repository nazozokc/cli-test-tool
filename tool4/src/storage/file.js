"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveNotes = exports.loadNotes = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const dir = path_1.default.join(process.env.HOME, ".config/notes-cli");
const file = path_1.default.join(dir, "notes.json");
const loadNotes = () => {
    if (!fs_1.default.existsSync(file)) {
        return [];
    }
    return JSON.parse(fs_1.default.readFileSync(file, "utf-8"));
};
exports.loadNotes = loadNotes;
const saveNotes = (notes) => {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    fs_1.default.writeFileSync(file, JSON.stringify(notes, null, 2));
};
exports.saveNotes = saveNotes;
