const hands = ["ぐー", "ちょき", "ぱー"];

export const getRandomHand = (): string => {
  const index = Math.floor(Math.random() * hands.length);
  return hands[index]!;
};

export const judge = (player: string, cpu: string): string => {
  if (player === cpu) {
    return "あいこ"
  }
  if ( (player === "ぐー" && cpu === "ちょき") || (player === "ぱー” && cpu === "ぐー") || (player === "ちょき" && cpu === "ぱー") )
   {
    return "勝ち"
  } else {
    return "負け"
  }
}
