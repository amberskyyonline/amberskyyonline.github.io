const button = document.getElementById('startBtn');
const audio = document.getElementById('audio');
let visualizer;

button.addEventListener('click', async () => {
  button.style.display = 'none';

  // Start audio
  await audio.play();

  // Audio context
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaElementSource(audio);
  const analyser = audioCtx.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  // Create canvas and fade in
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  setTimeout(() => (canvas.style.opacity = 1), 100);

  // Init visualizer
  visualizer = butterchurn.default.createVisualizer(audioCtx, canvas, {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1
  });

  window.addEventListener('resize', () => {
    visualizer.setRendererSize(window.innerWidth, window.innerHeight);
  });

  // Load presets
  const presets = await butterchurnPresets.default.getPresets();
  const keys = Object.keys(presets);
  const random = presets[keys[Math.floor(Math.random() * keys.length)]];

  visualizer.connectAudio(analyser);
  visualizer.loadPreset(random, 0.0);

  // Optional: switch every 30 seconds
  setInterval(() => {
    const next = presets[keys[Math.floor(Math.random() * keys.length)]];
    visualizer.loadPreset(next, 2.0);
  }, 30000);
});
