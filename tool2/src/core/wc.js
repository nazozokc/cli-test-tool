export const countlines = (text) => {
    return text.split("\n").length;
};
export const countWords = (text) => {
    if (text.trim() === "") {
        return 0;
    }
    return text.split(/\s+/).length;
};
export const countChars = (text) => {
    return text.length;
};
//# sourceMappingURL=wc.js.map