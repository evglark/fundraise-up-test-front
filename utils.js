export const getRandomWords = (quantity) => {
    const tasks = [];

    for (let i = 0; i < quantity; i++) {
        tasks.push(words[Math.floor(Math.random() * words.length)]);
    }

    return tasks;
};

export const getRandomLetters = (word) =>
    word.split("").sort(() => (Math.random() > .5) ? 1 : -1);
