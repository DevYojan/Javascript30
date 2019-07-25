const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      alert("can't do anything without web cam");
    });
}

function paintToCanvas(){
  let width = video.videoWidth;
  let height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;
  
  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = redEffect(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto(){
  snap.currentTime = 0;
  snap.play();

  let img = canvas.toDataURL("image/jpeg");
  let a = document.createElement("a");
  a.href = img;
  a.setAttribute('download', 'handsome');
  a.innerHTML = `<img src=${img} alt="Wow" />`
  strip.insertBefore(a, strip.firstChild);
}

function redEffect(pixels){
  for (let i=0; i < pixels.data.length; i+=4){
    pixels.data[i + 0] = pixels.data[i + 0] + 100;
    pixels.data[i + 1] = pixels.data[i + 1] - 50;
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
  }

  return pixels;
}

video.addEventListener('canplay', paintToCanvas);

getVideo();

