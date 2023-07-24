import { renderElemtns, createButton } from './htmlHelprs';

interface checkAnswerProps {
  target: HTMLElement,
  rightAnswer: string,
  rightCallback: () => void,
  wrongCallback: () => void,
};

export class App {
  static setCurrentQuestion = (number: number) => {
    document.querySelector("#current_question").innerHTML = (number + 1).toString();
  }

  static setTotalQuestions = (number: number) => {
    document.querySelector("#total_questions").innerHTML = number.toString();
  }

  static renderLetters = (block: HTMLDivElement, tytles: string[], className: string = "btn-primary") => {
    renderElemtns(block, tytles.map(word => createButton(word, className)));
  }

  static addLetterToAnswer = (target: HTMLElement) => {
    document.querySelector("#answer").appendChild(createButton(target.innerHTML, "btn-success"));
    target.remove();
  }

  static toggleErrorClassFromButton = (target: HTMLElement) => {
    target?.classList.add("btn-danger");
    setTimeout(() => {
      target?.classList.remove("btn-danger");
    }, 250);
  }

  static checkAnswer = ({ target, rightAnswer, rightCallback, wrongCallback }: checkAnswerProps) => {
    if (target?.innerHTML === rightAnswer) {
      this.addLetterToAnswer(target);
      rightCallback();
    } else {
      this.toggleErrorClassFromButton(target);
      wrongCallback();
    }
  };

  static cleanBlock = (block: HTMLDivElement) => {
    block.innerHTML = "";
  }
}
