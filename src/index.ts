import { words, tasksNumber, mistakesNumber } from "./config";
import { getUniqRandomWords, getRandomLetters } from "./utils";
import {
  addEventListenerOnClick,
  addEventListenerOnKeyUpLetters,
} from "./htmlHelprs";
import { App } from "./app";

(() => {
  const answerBlock = document.getElementById("answer") as HTMLDivElement;
  const lettersBlock = document.getElementById("letters") as HTMLDivElement;
  const wordsForGame = getUniqRandomWords(words, tasksNumber);

  let countMistakes = 0;
  let countAnswer = 0;
  let countWord = 0;

  const statistics: number[] = [...new Array(tasksNumber)].map(() => 0);

  const getStatistics = () => {
    App.cleanBlock(answerBlock);
    App.cleanBlock(lettersBlock);
    App.renderLetters(answerBlock, "You_Finished!".split(""));

    setTimeout(() => {
      statistics.forEach((item, index) => {
        const statisticsBlock = document.createElement("div");
        statisticsBlock.id = "statistics-" + index;
        statisticsBlock.className = "d-flex px-1 pt-1";
        statisticsBlock.style.cssText += "gap: 0.25rem";
        answerBlock.parentElement.appendChild(statisticsBlock);

        App.renderLetters(
          statisticsBlock,
          [...wordsForGame[index].split(""), "   mistakes number - " + item],
          item == 0 ? "btn-success" : "btn-danger",
        );
      });
    }, 1000);
  };

  const nextTask = () => {
    if (countWord === tasksNumber) {
      getStatistics();
    } else {
      App.cleanBlock(answerBlock);
      App.setCurrentQuestion(countWord);
      App.renderLetters(
        lettersBlock,
        getRandomLetters(wordsForGame[countWord]),
      );
    }
  };

  const rightAnswer = (): void => {
    countAnswer++;
    if (countAnswer === wordsForGame[countWord].length) {
      countAnswer = 0;
      countWord++;
      setTimeout(() => {
        nextTask();
      }, 500);
    }
  };

  const wrongAnswer = (): void => {
    statistics[countWord] = statistics[countWord] + 1;
    countMistakes++;
    if (countMistakes === mistakesNumber) {
      App.cleanBlock(lettersBlock);
      App.cleanBlock(answerBlock);
      App.renderLetters(
        answerBlock,
        wordsForGame[countWord].split(""),
        "btn-danger",
      );
      setTimeout(() => {
        countMistakes = 0;
        countAnswer = 0;
        countWord++;
        App.cleanBlock(answerBlock);
        nextTask();
      }, 2500);
    }
  };

  App.setTotalQuestions(tasksNumber);
  App.setCurrentQuestion(countWord);
  App.renderLetters(lettersBlock, getRandomLetters(wordsForGame[countWord]));

  addEventListenerOnClick(lettersBlock, (event: Event) => {
    App.checkAnswer({
      target: event.target as HTMLElement,
      rightAnswer: wordsForGame[countWord][countAnswer],
      rightCallback: rightAnswer,
      wrongCallback: wrongAnswer,
    });
  });

  addEventListenerOnKeyUpLetters((event) => {
    App.checkAnswer({
      target: document.querySelector("#letters > #" + event.key),
      rightAnswer: wordsForGame[countWord][countAnswer],
      rightCallback: rightAnswer,
      wrongCallback: wrongAnswer,
    });
  });
})();
