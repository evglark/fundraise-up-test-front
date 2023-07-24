export const getUniqRandomWords = (
  words: string[],
  quantity: number,
): string[] => {
  const uniqWords: string[] = [];

  while (uniqWords.length < quantity) {
    const word: string = words[Math.floor(Math.random() * words.length)];
    if (!uniqWords.includes(word)) uniqWords.push(word);
  }

  return uniqWords;
};

export const getRandomLetters = (word: string = ""): string[] =>
  word.split("").sort(() => (Math.random() > 0.5 ? 1 : -1));
