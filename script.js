// SELECTORS
const secondHand = document.querySelector(".second-hand");
const minsHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const time = document.querySelector(".clock__face__time");
const routineSchema = document.querySelector(".routine__schema__parts");
const allInput = document.querySelectorAll("form input");

//  FUNCTIONS
// initialize clock
const setDate = () => {
  const now = new Date();
  const seconds = now.getSeconds();
  const mins = now.getMinutes();
  const hour = now.getHours();
  const hourDegrees = (hour / 24) * 360 + (mins / 60) * 15 - 90;
  time.innerText = `${hour} : ${mins} : ${seconds}`;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
};

const getTimeAngle = (startTime) => {
  return startTime * 15 + 90;
};
// Return boolean if we need it more div for display all time slots
const needManyDiv = (endTime, startTime) => {
  if (endTime - startTime < 0) {
    return true;
  } else {
    if (endTime - startTime > 6) {
      return true;
    }
  }
  return false;
};
//
const inputBlur = (e) => {
  const inputValue = parseInt(e.target.value);
  console.log(inputValue);
};

const formSubmit = () => {
  console.log(allInput);
};
//  DISPLAYING ROUTINE FUNCTIONS
const displayStartDiv = (startTime, name, sleep, color, endTime) => {
  // start
  const startDiv = document.createElement("div");
  startDiv.classList.add("part");
  startDiv.style.setProperty("--rotation", getTimeAngle(startTime));
  startDiv.style.backgroundColor = color;
  if (sleep) startDiv.style.zIndex = 7;

  // label span
  const span = document.createElement("span");
  span.classList.add(
    "part__label",
    startTime < 12 ? "part__label--rotate" : undefined
  );
  span.innerText = name;
  if (sleep) span.style.color = "white";
  startDiv.append(span);

  routineSchema.append(startDiv);

  // If more than 6 hours display another div for complete
  if (needManyDiv(endTime, startTime)) {
    const longDiv = document.createElement("div");
    longDiv.classList.add("part");
    longDiv.style.setProperty("--rotation", getTimeAngle(startTime + 6));
    longDiv.style.backgroundColor = color;
    routineSchema.append(longDiv);
  }
};
const displayEndDiv = (endTime) => {
  // end
  const endDiv = document.createElement("div");
  endDiv.classList.add("part");
  endDiv.style.setProperty("--rotation", getTimeAngle(endTime));
  endDiv.style.backgroundColor = "#282828";
  endDiv.style.zIndex = 5;
  routineSchema.append(endDiv);
};

// initialize routine TODELETE : FORMULAIRE REMPLACE THIS
const routine = [
  { startTime: 22, endTime: 7, color: "#40487E", sleep: true, name: "Sommeil" },
  { startTime: 7, endTime: 7.5, color: "#D1584F", name: "Petit-déjeuner" },
  { startTime: 7.5, endTime: 13, color: "#FBCB85", name: "Travail" },
  { startTime: 13, endTime: 13.5, color: "#D1584F", name: "Déjeuner" },
  { startTime: 13.5, endTime: 14, color: "#F7B6CC", name: "Ménage" },
  { startTime: 14, endTime: 17, color: "#81C784", name: "Jeux" },
  { startTime: 17, endTime: 18, color: "#fbff8c", name: "Sport - Sortie" },
  { startTime: 18, endTime: 21, color: "#6AB26D", name: "Loisir" },
  { startTime: 21, endTime: 22, color: "#FBCB85", name: "Lecture" },
];

// DISPLAY ROUTINE PARTS
routine.forEach(({ startTime, endTime, color, sleep, name }) => {
  displayStartDiv(startTime, name, sleep, color, endTime);
  displayEndDiv(endTime);
});

allInput.forEach((input) => input.addEventListener("blur", inputBlur));

setInterval(setDate, 1000);

setDate();
