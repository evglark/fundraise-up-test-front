export const renderElemtns = (
  perrent: HTMLDivElement,
  elements: HTMLDivElement[],
): void => {
  elements.forEach((element) => {
    perrent.appendChild(element);
  });
};

export const createButton = (
  title: string,
  className: string = "btn-primary",
): HTMLDivElement => {
  const btn = document.createElement("div");
  btn.className = "btn " + className;
  btn.innerHTML = title;
  btn.id = title;

  return btn;
};

export const addEventListenerOnClick = (
  elements: HTMLDivElement,
  action: (event: Event) => void,
) => {
  elements.addEventListener("click", (event: Event) => {
    action(event);
  });
};

export const addEventListenerOnKeyUpLetters = (
  action: (event: KeyboardEvent) => void,
) => {
  document.addEventListener("keypress", (event) => {
    if (event.key === "Meta") return void 0;
    let el = document.querySelector("#letters > #" + event.key);
    el?.classList.add("active");
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "Meta") return void 0;
    let el = document.querySelector("#letters > #" + event.key);
    el?.classList.remove("active");
    action(event);
  });
};
