const tasksNumber = 6;
const mistakesNumber = 3;

const words = [
    "apple",
    "function",
    "timeout",
    "task",
    "application",
    "data",
    "tragedy",
    "sun",
    "symbol",
    "button",
    "software"
];

const getRandomWords = (quantity) => {
    const tasks = [];
    console.log(16);
    for (let i = 0; i < quantity; i++) {
        tasks.push(words[Math.floor(Math.random() * words.length)]);
    }

    return tasks;
};

const getRandomLetters = (word) =>
    word.split("").sort(() => (Math.random() > .5) ? 1 : -1);

const createButton = (title, className = "btn-primary") => {
    const btn = document.createElement("div");
    btn.className = "btn " + className;
    btn.innerHTML = title;
    btn.id = title;

    return btn;
};

const checkAnswer = (answer, word, count, target, done, feld) => {
    if (answer === word[count]) {
        document.querySelector("#answer").appendChild(createButton(answer, "btn-success"));
        target.remove();
        done();
    } else {
        target?.classList.add("btn-danger");
        setTimeout(() => {
            target?.classList.remove("btn-danger");
        }, 250);
        feld();
    }
};

const nextTask = (word) => {
    const rendomLetters = getRandomLetters(word);
    const letters = document.getElementById("letters");

    rendomLetters.forEach(element => {
        letters.appendChild(createButton(element));
    });
}

const getStart = () => {
    const letters = document.getElementById("letters");
    const randomWords = getRandomWords(tasksNumber);

    document.querySelector('#total_questions').innerHTML = tasksNumber;

    let countWord = 0;
    let countAnswer = 0;
    let countMistakes = 0;

    const callbackDone = () => {
        countAnswer++;
        if (countAnswer === randomWords[countWord].length) {
            countAnswer = 0;
            countWord++;
            document.getElementById("answer").innerHTML = "";
            document.querySelector('#current_question').innerHTML = countWord + 1;
            nextTask(randomWords[countWord]);
        }
    };

    const callbackFaled = () => {
        countMistakes++;
        if (countMistakes === mistakesNumber) {
            let answer = document.getElementById("answer");
            answer.innerHTML = "";
            letters.innerHTML = "";
            randomWords[countWord].split("").forEach(element => {
                answer.appendChild(createButton(element, "btn-danger"));
            });
            setTimeout(() => {
                countMistakes = 0;
                countAnswer = 0;
                countWord++;
                document.getElementById("answer").innerHTML = "";
                document.querySelector('#current_question').innerHTML = countWord + 1;
                nextTask(randomWords[countWord]);
            }, 2500);
        }
    };

    console.log(randomWords[countWord]);

    nextTask(randomWords[countWord]);
    document.querySelector('#current_question').innerHTML = countWord + 1;

    letters.addEventListener("click", (event) => {
        checkAnswer(event.target.innerHTML, randomWords[countWord], countAnswer, event.target, callbackDone, callbackFaled);
    });

    document.addEventListener("keypress", (event) => {
        if (event.key === "Meta") return void 0;
        let el = document.querySelector("#letters > #" + event.key);
        el?.classList.add("active");
    });

    document.addEventListener("keyup", (event) => {
        if (event.key === "Meta") return void 0;
        let el = document.querySelector("#letters > #" + event.key);
        el?.classList.remove("active");

        checkAnswer(event.key, randomWords[countWord], countAnswer, el, callbackDone, callbackFaled);
    });
};

getStart();
