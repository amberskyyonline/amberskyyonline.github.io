/* main.js — slideshow + text + audio */

// text rotation
const words = [
  "rebirth","reintroduced","recycled","reemerged",
  "rediscovered","dogma","i'm just waking up inside my own life"
];
let wordIndex = 0;
const textElem = document.getElementById("floatingText");

function changeText(){
  if(!textElem) return;
  textElem.style.opacity = 0;
  setTimeout(()=>{
    textElem.textContent = words[wordIndex];
    textElem.style.opacity = 1;
    wordIndex = (wordIndex+1)%words.length;
  },1000);
}

// slideshow fade cycle
const slides = document.querySelectorAll(".slideshow img");
let slideIndex = 0;
function showSlide(){
  slides.forEach((img,i)=> img.style.opacity = i===slideIndex?1:0);
  slideIndex = (slideIndex+1)%slides.length;
}
setInterval(showSlide,4000);

// audio playlist
const playlist = [
  "https://od.lk/s/OTBfNDUwMzA3NzNf/Can%27t%20Breathe.mp3"
];
const audioPlayer = document.getElementById("audioPlayer");
function playRandomSong(){
  const i = Math.floor(Math.random()*playlist.length);
  audioPlayer.src = playlist[i];
  audioPlayer.volume = 0.6;
  audioPlayer.play().catch(err=>{
    console.warn("Autoplay blocked until user gesture",err);
  });
}

// entry sequence
const enterBtn = document.getElementById("enterButton");
const landing  = document.getElementById("landingScreen");
const slideshow= document.getElementById("slideshow");
const navbar   = document.getElementById("navbar");

enterBtn?.addEventListener("click",()=>{
  landing.style.opacity=0;
  setTimeout(()=>landing.style.display="none",1000);
  slideshow.style.opacity=1;
  textElem.style.opacity=1;
  navbar.style.opacity=1;
  playRandomSong();
  showSlide();
  changeText();
  setInterval(changeText,8000);
});
