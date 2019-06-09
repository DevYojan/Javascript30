let media = document.querySelector("video");
media.pause();
let skipForward = document.querySelector(".player__button[data-skip='25']");
let rewindBack = document.querySelector(".player__button[data-skip='-10']");
let playButton = document.querySelector(".toggle");
let volumeRange = document.querySelector("input[name='volume']");
let playBack = document.querySelector("input[name='playbackRate']");
let progress = document.querySelector(".progress");
let progressSection = document.querySelector(".progress__filled");
let fullScreen = document.querySelector("#fullscreen");

// Forward to 25 seconds
function forward() {
  media.currentTime += 25;
}

//Rewind backwards by 10 seconds
function rewind() {
  media.currentTime -= 10;
}

//Play or Pause according to mouse click.
function playOrPause() {
  if (media.paused) {
    media.play();
    playButton.textContent = "►";
  } else {
    media.pause();
    playButton.textContent = "⏸";
  }
}

//Controls volume
function volumeControl() {
  media.volume = this.value;
}

//Controls playBackRate
function playBackControl() {
  media.playbackRate = this.value;
}

// Handle Progress
function handleProgress() {
  let flexPercentage = (media.currentTime / media.duration) * 100;
  progressSection.style.flexBasis = `${flexPercentage}%`;
}

document.onkeypress = function(e) {
  if (e.keyCode != 32) {
    return;
  }

  playOrPause();
};

//Move video duration by dragging the scrub
function scrub(e) {
  let percent = (e.offsetX / progress.offsetWidth) * 100;
  let mediaTime = (percent / 100) * media.duration;
  media.currentTime = mediaTime;
  progressSection.style.flexBasis = `${percent}%`;
}

function toggleFullScreen() {
  if (!isFullScreen) {
    media.requestFullscreen();
  }
}

skipForward.addEventListener("click", forward);
rewindBack.addEventListener("click", rewind);
media.addEventListener("click", playOrPause);
media.addEventListener("timeupdate", handleProgress);
media.addEventListener("onkeypress", playOrPause);
playButton.addEventListener("click", playOrPause);
volumeRange.addEventListener("input", volumeControl);
playBack.addEventListener("input", playBackControl);
let isMouseDown = false;
progress.addEventListener("mousedown", () => (isMouseDown = true));
progress.addEventListener("mouseup", () => (isMouseDown = false));
progress.addEventListener("mousemove", e => {
  if (isMouseDown) {
    scrub(e);
  }
});

let isFullScreen = false;

fullScreen.addEventListener("click", toggleFullScreen);
