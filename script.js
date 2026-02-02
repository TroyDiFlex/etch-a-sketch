const sheet = document.querySelector(".sheet");
let selectColor = "lightpink";

let counter = 30;
let color;
let isHoldMouse = false;

let currentMode = "coloring";

// Создание пикселей и добавление их на лист
const createPixels = (counter) => {
  let pixel;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < counter * counter; i++) {
    pixel = document.createElement("div");
    pixel.classList.add("pixel");
    // pixel.setAttribute("draggable", "false");
    fragment.append(pixel);
  }
  sheet.append(fragment);
};
createPixels(counter);

// Логика зажатой лкм
window.addEventListener("mousedown", () => {
  isHoldMouse = true;
});
window.addEventListener("mouseup", () => {
  isHoldMouse = false;
});

// Окрашивание пикселей в выбранный цвет при зажатой лкм

sheet.addEventListener("mousedown", (event) => {
  if (event.target === sheet) return;
  coloring(event);
});

sheet.addEventListener("mouseover", (event) => {
  if (!isHoldMouse || event.target === sheet) return;
  coloring(event);
});

const coloring = (event) => {
  if (currentMode === "coloring") {
    event.target.style.backgroundColor = selectColor;
  } else if (currentMode === "eraser") {
    event.target.style.removeProperty("background-color");
  }
};
