const button = document.getElementById('startBtn');
const audio = document.getElementById('audio');
let visualizer, presetList;

button.addEventListener('click', async () => {
  button.style.display = 'none';

  await audio.play();

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaElementSource(audio);
  const analyser = audioCtx.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  // Canvas
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  // Create Butterchurn visualizer (NOTE: .default)
  visualizer = butterchurn.default.createVisualizer(audioCtx, canvas, {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1
  });

  // Resize support
  window.addEventListener('resize', () => {
    visualizer.setRendererSize(window.innerWidth, window.innerHeight);
  });

  // Load and start preset
  presetList = await butterchurnPresets.getPresets();
  const presetKeys = Object.keys(presetList);
  const preset = presetList[presetKeys[Math.floor(Math.random() * presetKeys.length)]];
  visualizer.connectAudio(analyser);
  visualizer.loadPreset(preset, 0.0);
});
