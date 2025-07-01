// TEXT FADE LOGIC
const words = ["rebirth", "reintroduced", "recycled", "reemerged", "rediscovered", "dogma", "i'm just waking up inside my own life"];
let index = 0;
const textElem = document.getElementById('floatingText');

function changeText() {
  textElem.style.opacity = 0;
  setTimeout(() => {
    textElem.textContent = words[index];
    textElem.style.opacity = 1;
    index = (index + 1) % words.length;
  }, 2000);
}
setInterval(changeText, 8000);

// DOM ELEMENTS
const enterBtn = document.getElementById('enterButton');
const landing = document.getElementById('landingScreen');
const slideshow = document.getElementById('slideshow');
const navbar = document.getElementById('navbar');
const audioPlayer = document.getElementById('audioPlayer');

// MUSIC
const playlist = [
  "https://od.lk/s/OTBfNDQ2MzI2OTRf/Sly%20%26%20The%20Family%20Stone%20-%20Que%20Sera%2C%20Sera%20%28Whatever%20Will%20Be%2C%20Will%20Be%29.mp3"
];

function playRandomSong() {
  const randomIndex = Math.floor(Math.random() * playlist.length);
  audioPlayer.src = playlist[randomIndex];
  audioPlayer.play().catch(err => console.error('Playback failed:', err));
}

// THREE.JS SETUP
let scene, camera, renderer, group;
initThree();

function initThree() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 100;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  group = new THREE.Group();
  scene.add(group);

  const loader = new THREE.FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new THREE.TextGeometry('amberskyy', {
      font: font,
      size: 12,
      height: 2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 5
    });

    const material = new THREE.MeshNormalMaterial();
    const textMesh = new THREE.Mesh(textGeometry, material);
    textGeometry.center();
    group.add(textMesh);
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (group) group.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// ENTER BUTTON LOGIC
enterBtn.addEventListener('click', () => {
  landing.style.opacity = 0;
  setTimeout(() => landing.style.display = 'none', 1000);
  slideshow.style.opacity = 1;
  textElem.style.opacity = 1;
  navbar.style.opacity = 1;
  playRandomSong();
});
