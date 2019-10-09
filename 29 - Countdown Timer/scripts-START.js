const controlButtons = document.querySelectorAll("[data-time]");
const timeLeft = document.querySelector(".display__time-left");
const timeToBeBack = document.querySelector(".display__end-time");
let countdown;

controlButtons.forEach(button => button.addEventListener('click', (e) => {
  const time = e.target.dataset.time;
  timer(time);
}));

function timer(time) {
  clearInterval(countdown);
  const then = Date.now() + time * 1000;
  displayTimeLeft(time);
  displayEndtime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function humanReadabletime(seconds) {
  hour = Math.floor(seconds / (60 * 60));
  seconds = seconds % (60 * 60);
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let finalTime = `${hour < 10 ? "0" : ""}${hour}:
                  ${minutes < 10 ? "0" : ""}${minutes}:
                  ${seconds < 10 ? "0" : ""}${seconds}`;
  return finalTime;
}

function displayTimeLeft(time) {
  time = humanReadabletime(time);
  timeLeft.textContent = time;
  document.title = time;
}

function displayEndtime(timestamps) {
  let date = new Date(timestamps);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  timeToBeBack.textContent = `
    Be back at
    ${hour < 10 ? "0" : ""}${hour > 12 ? hour - 12 : hour}:
    ${minutes < 10 ? "0" : ""}${minutes}:
    ${seconds < 10 ? "0" : ""}${seconds}
  `;
}

//Getting the input minutes from the form

document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  this.reset();
  timer(mins*60);
});
