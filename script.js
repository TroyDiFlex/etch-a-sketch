// Основные элементы на странице

const sheet = document.querySelector(".sheet");
const solidColoringBtn = document.querySelector("#solid-coloring");
const eraserBtn = document.querySelector("#eraser");
const rainbowBtn = document.querySelector("#rainbow");
const clearBtn = document.querySelector("#clear");
const inputRange = document.querySelector("#input-range");
const inputDisplay = document.querySelector("#input-display");

// Параметры по умолчанию

let selectedColor = "lightpink";
let pixelsQuantity = 30;
let isHoldMouse = false;
let currentMode = "solidColoring";
let pixels;

// Логика создания и перезаписи пикселей в зависимости от значения ползунка

const createPixels = (pixelsQuantity) => {
  sheet.style.setProperty("--pixels-quantity", pixelsQuantity);
  let pixel;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pixelsQuantity * pixelsQuantity; i++) {
    pixel = document.createElement("div");
    pixel.classList.add("pixel");
    fragment.append(pixel);
  }
  sheet.append(fragment);
  pixels = document.querySelectorAll(".pixel");
};
createPixels(pixelsQuantity);

const reCreatePixels = (pixelsQuantity) => {
  sheet.innerHTML = "";
  createPixels(pixelsQuantity);
};

// Слушатели

// Количество пикселей

inputRange.addEventListener("input", () => {
  pixelsQuantity = inputRange.value;
  inputDisplay.textContent = `${pixelsQuantity} x ${pixelsQuantity}`;
});

inputRange.addEventListener("change", () => {
  reCreatePixels(pixelsQuantity);
});

// Переключение режимов

solidColoringBtn.addEventListener("click", (event) => {
  currentMode = "solidColoring";
});

eraserBtn.addEventListener("click", (event) => {
  currentMode = "eraser";
});

rainbowBtn.addEventListener("click", (event) => {
  currentMode = "rainbow";
});

clearBtn.addEventListener("click", (event) => {
  pixels.forEach((pixel) => pixel.style.removeProperty("background-color"));
});

// Логика зажатой лкм

window.addEventListener("mousedown", () => {
  isHoldMouse = true;
});
window.addEventListener("mouseup", () => {
  isHoldMouse = false;
});

// Логика рисования

sheet.addEventListener("mousedown", (event) => {
  if (event.target === sheet) return;
  coloring(event);
});

sheet.addEventListener("mouseover", (event) => {
  if (!isHoldMouse || event.target === sheet) return;
  coloring(event);
});

const coloring = (event) => {
  switch (currentMode) {
    case "solidColoring":
      event.target.style.backgroundColor = selectedColor;
      break;
    case "eraser":
      event.target.style.removeProperty("background-color");
      break;
    case "rainbow":
      event.target.style.backgroundColor = getRandomRainbowColor();
      break;
  }
};

// Логика получения ярких цветов для радужного режима

const getRandomRainbowColor = () => {
  let hue = Math.floor(Math.random() * 360);
  let saturation = Math.floor(Math.random() * 11 + 90);
  let lightness = Math.floor(Math.random() * 11) + 40;
  let currentColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return currentColor;
};
