"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCLI = void 0;
const commander_1 = require("commander");
const file_js_1 = require("../storage/file.js");
const notes_js_1 = require("../core/notes.js");
const runCLI = () => {
    const program = new commander_1.Command();
    program.name("note").description("simple notes cli").version("0.1.0");
    program
        .command("add")
        .argument("<text>")
        .action((text) => {
        const notes = (0, file_js_1.loadNotes)();
        (0, file_js_1.saveNotes)((0, notes_js_1.addNote)(notes, text));
        console.log("added");
    });
    program
        .command("list")
        .action(() => {
        const notes = (0, file_js_1.loadNotes)();
        for (const n of notes) {
            console.log(`${n.id}: ${n.text}`);
        }
        ;
    });
    program
        .command("search")
        .argument("<keyword>")
        .action((keyword) => {
        const notes = (0, notes_js_1.searchNotes)((0, file_js_1.loadNotes)(), keyword);
        for (const n of notes) {
            console.log(`${n.id}: ${n.text}`);
        }
    });
    program
        .command("remove")
        .argument("<id>")
        .action((id) => {
        (0, file_js_1.saveNotes)((0, notes_js_1.removeNote)((0, file_js_1.loadNotes)(), Number(id)));
        console.log("removed");
    });
    program.parse();
};
exports.runCLI = runCLI;
