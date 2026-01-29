export const countlines = (text: string): number => {
  return text.split("\n").length;
};

export const countWords = (text: string): number => {
  if (text.trim() === "") {
    return 0;
  }
  return text.split(/\s+/).length;
};

export const countChars = (text: string): number => {
  return text.length;
};
