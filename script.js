// Основные элементы на странице

const sheet = document.querySelector(".sheet");
const solidColoringBtn = document.querySelector("#solid-coloring");
const eraserBtn = document.querySelector("#eraser");
const rainbowBtn = document.querySelector("#rainbow");
const smoothBtn = document.querySelector("#smooth");
const clearBtn = document.querySelector("#clear");
const inputRange = document.querySelector("#input-range");
const inputDisplay = document.querySelector("#input-display");
const colorPicker = document.querySelector("#color-picker");
const allBtns = document.querySelectorAll("button");
const header = document.querySelector("header");

// Параметры по умолчанию

const defaultColor = "lightpink";
let selectedColor = defaultColor;
let pixelsQuantity = 30;
let isHoldMouse = false;
let currentMode = "solidColoring";
let pixels;

// Логика создания и перезаписи пикселей в зависимости от значения ползунка

const createPixels = (pixelsQuantity) => {
  sheet.style.setProperty("--pixels-quantity", pixelsQuantity);

  let fragment = document.createDocumentFragment();

  for (let i = 0; i < pixelsQuantity * pixelsQuantity; i++) {
    let pixel = document.createElement("div");
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

solidColoringBtn.addEventListener("click", () => {
  currentMode = "solidColoring";
  resetBtnsColor();
  solidColoringBtn.style.backgroundColor = selectedColor;
});

eraserBtn.addEventListener("click", () => {
  currentMode = "eraser";
  resetBtnsColor();
  eraser.style.backgroundColor = defaultColor;
});

rainbowBtn.addEventListener("click", () => {
  currentMode = "rainbow";
  resetBtnsColor();
  rainbowBtn.style.backgroundColor = selectedColor;
  rainbowСheatСounter++;
  if (rainbowСheatСounter === 8) {
    createRainbow();
    rainbowСheatСounter = 0;
  }
});

smoothBtn.addEventListener("click", () => {
  currentMode = "smooth";
  resetBtnsColor();
  smoothBtn.style.backgroundColor = selectedColor;
});

clearBtn.addEventListener("click", () => {
  pixels.forEach((pixel) => {
    pixel.style.removeProperty("background-color");
    pixel.style.removeProperty("opacity");
  });
});

const resetBtnsColor = () =>
  allBtns.forEach((btn) => btn.style.removeProperty("background-color"));

// Логика зажатой лкм

window.addEventListener("mousedown", () => {
  isHoldMouse = true;
});
window.addEventListener("mouseup", () => {
  isHoldMouse = false;
});

// Логика изменения цвета
colorPicker.addEventListener("change", () => {
  selectedColor = colorPicker.value;
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
      event.target.style.opacity = 1;
      event.target.style.backgroundColor = selectedColor;

      break;
    case "eraser":
      event.target.style.removeProperty("background-color");
      event.target.style.removeProperty("opacity");

      break;
    case "rainbow":
      let currentRainbowColor = getRainbowColor();
      event.target.style.opacity = 1;
      event.target.style.backgroundColor = currentRainbowColor;
      rainbowBtn.style.backgroundColor = currentRainbowColor;

      break;
    case "smooth":
      let currentOpacity = Number(event.target.style.opacity) + 0.1;
      event.target.style.opacity = currentOpacity;
      event.target.style.backgroundColor = selectedColor;

      break;
  }
};

// Логика получения ярких цветов для радужного режима

let hue = 0;
const getRainbowColor = () => {
  let SATURATION_MAX = 85;
  let SATURATION_MIN = 75;
  let LIGHTNESS_MAX = 85;
  let LIGHTNESS_MIN = 80;

  hue = hue + 10;
  let saturation = Math.floor(
    Math.random() * (SATURATION_MAX - SATURATION_MIN + 1) + SATURATION_MIN,
  );
  let lightness = Math.floor(
    Math.random() * (LIGHTNESS_MAX - LIGHTNESS_MIN + 1) + LIGHTNESS_MIN,
  );
  let currentColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return currentColor;
};

// ======== Копипаста из нейронок для парочки фичей ========

// 1. CSS через JS (на всякий случай)
sheet.style.touchAction = "none";
sheet.style.userSelect = "none";

// 2. Touch события
sheet.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    isHoldMouse = true;
    handleTouch(e);
  },
  { passive: false },
);

sheet.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    handleTouch(e);
  },
  { passive: false },
);

window.addEventListener("touchend", () => {
  isHoldMouse = false;
});

function handleTouch(e) {
  const touch = e.touches[0];
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);

  if (elem && elem.classList.contains("pixel")) {
    if (e.type === "touchstart") {
      // Первое касание
      coloring({ target: elem });
    } else if (e.type === "touchmove" && isHoldMouse) {
      // Движение пальцем
      coloring({ target: elem });
    }
  }
}

let rainbowСheatСounter = 0;
let cheatCode = 8;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const createRainbow = async (p) => {
  // Добавили async
  let pixelsQuantityForRainbow = 36;
  reCreatePixels(pixelsQuantityForRainbow);

  // Используем for...of вместо forEach для поддержки await
  for (const pixel of pixels) {
    let currentRainbowColor = getRainbowColor();

    pixel.style.opacity = 1;
    pixel.style.backgroundColor = currentRainbowColor;
    rainbowBtn.style.backgroundColor = currentRainbowColor;

    await delay(0);
  }

  currentMode = "solidColoring";
};
