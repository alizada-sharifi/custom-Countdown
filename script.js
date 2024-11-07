const inputContainer = document.querySelector("#input-container");
const form = document.querySelector("form");
const countdowndateEl = document.querySelector("#date-picker");
const today = new Date().toISOString().split("T")[0];
const countdownContainer = document.querySelector("#countdown");
const Title = document.querySelector("#countdown-title");
const timer = document.querySelectorAll("span");
const countdownBtn = document.querySelector("#countdown-button");
const completeConatiner = document.querySelector("#complete");
const completeInfo = document.querySelector("#complete-info");
const completeBtn = document.querySelector("#complete-button");
let countdownDate = "";
let countdownTitle = "";
let saveCountdown;
let countdownValue = Date;
let sec = 1000;
let min = sec * 60;
let hour = min * 60;
let day = hour * 24;
let countdownActive;
countdowndateEl.setAttribute("min", today);

function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / min);
    const seconds = Math.floor((distance % min) / sec);
    inputContainer.hidden = true;
    saveCountdown = {
      Title: countdownTitle,
      date: countdownDate,
    };
    localStorage.setItem("countdown", JSON.stringify(saveCountdown));
    if (distance < 0) {
      countdownContainer.hidden = true;
      clearInterval(countdownActive);
      completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeConatiner.hidden = false;
    } else {
      timer[0].textContent = `${days}`;
      timer[1].textContent = `${hours}`;
      timer[2].textContent = `${minutes}`;
      timer[3].textContent = `${seconds}`;
      Title.textContent = `${countdownTitle}`;
      inputContainer.hidden = true;
      countdownContainer.hidden = false;
    }
  }, sec);
}
function updatecountDown(e) {
  e.preventDefault();
  countdownTitle = e.target[0].value;
  countdownDate = e.target[1].value;

  if (countdownDate === "") {
    alert("Please select a date for the countdown!!");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

function reset() {
  countdownContainer.hidden = true;
  inputContainer.hidden = false;
  completeConatiner.hidden = true;
  countdownTitle = "";
  countdownDate = "";
  clearInterval(countdownActive);
  localStorage.removeItem("countdown");
}
function restoreCountdown() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    saveCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = saveCountdown.Title;
    countdownDate = saveCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}
// ========= eventListner section ================
form.addEventListener("submit", updatecountDown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);
restoreCountdown();
