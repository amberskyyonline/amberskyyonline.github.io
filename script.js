const button = document.getElementById('startBtn');
const audio = document.getElementById('audio');
let visualizer;

button.addEventListener('click', async () => {
  button.style.display = 'none';

  await audio.play();

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaElementSource(audio);
  const analyser = audioCtx.createAnalyser();

  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  // ✅ Use butterchurn.default
  visualizer = butterchurn.default.createVisualizer(audioCtx, canvas, {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1
  });

  window.addEventListener('resize', () => {
    visualizer.setRendererSize(window.innerWidth, window.innerHeight);
  });

  // ✅ FIXED: presets via .default
  const presets = await butterchurnPresets.default.getPresets();
  const keys = Object.keys(presets);
  const random = presets[keys[Math.floor(Math.random() * keys.length)]];

  visualizer.connectAudio(analyser);
  visualizer.loadPreset(random, 0.0);
});
