const secondHand = document.querySelector(".second-hand");
const minsHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const time = document.querySelector(".time");
const routineContainer = document.querySelector(".routine");

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

setInterval(setDate, 1000);

setDate();

// initialize routine

const routine = [
  { startTime: 22, endTime: 7, color: "#40487E", sleep: true },
  { startTime: 7, endTime: 7.5, color: "#D1584F" },
  { startTime: 7.5, endTime: 13, color: "#FBCB85" },
  { startTime: 13, endTime: 13.5, color: "#D1584F" },
  { startTime: 13.5, endTime: 14, color: "#F7B6CC" },
  { startTime: 14, endTime: 17, color: "#81C784" },
  { startTime: 17, endTime: 18, color: "#EFE05C" },
  { startTime: 18, endTime: 21, color: "#6AB26D" },
  { startTime: 21, endTime: 22, color: "#FBCB85" },
];
window.localStorage.setItem("routine", JSON.stringify(routine));

const getTimeAngle = (startTime) => {
  return startTime * 15 + 90;
};
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

// DISPLAY ROUTINE PARTS
routine.forEach(({ startTime, endTime, color, sleep }) => {
  // start
  const startDiv = document.createElement("div");
  startDiv.classList.add("routine-part");
  startDiv.style.setProperty("--rotation", getTimeAngle(startTime));
  startDiv.style.backgroundColor = color;
  if (sleep) startDiv.style.zIndex = 7;
  routineContainer.append(startDiv);
  if (needManyDiv(endTime, startTime)) {
    const longDiv = document.createElement("div");
    longDiv.classList.add("routine-part");
    longDiv.style.setProperty("--rotation", getTimeAngle(startTime + 6));
    longDiv.style.backgroundColor = color;
    routineContainer.append(longDiv);
  }
  // end
  const endDiv = document.createElement("div");
  endDiv.classList.add("routine-part");
  endDiv.style.setProperty("--rotation", getTimeAngle(endTime));
  endDiv.style.backgroundColor = "#282828";
  endDiv.style.zIndex = 5;
  routineContainer.append(endDiv);
});

const h1 = document.querySelector("h1");
if (window.localStorage.getItem("routine")) {
  document.querySelector(".routine-container").style.display = "flex";
  h1.innerText = "Ma routine";
} else {
  document.querySelector(".routine-creation").style.display = "flex";
  h1.innerText = "Créez votre routine";
}

const allInput = document.querySelectorAll("form input");

const inputBlur = (e) => {
  const inputValue = parseInt(e.target.value);
  console.log(inputValue);
};
allInput.forEach((input) => input.addEventListener("blur", inputBlur));

const formSubmit = () => {
  console.log(allInput);
};
