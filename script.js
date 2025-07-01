const button = document.getElementById('startBtn');
const audio = document.getElementById('audio');
let visualizer, presetList;

button.addEventListener('click', async () => {
  button.style.display = 'none';

  // Start audio
  await audio.play();

  // Set up audio context
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaElementSource(audio);
  const analyser = audioCtx.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  // Create canvas
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  // Init visualizer
  visualizer = butterchurn.createVisualizer(audioCtx, canvas, {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1
  });

  // Resize on window resize
  window.addEventListener('resize', () => {
    visualizer.setRendererSize(window.innerWidth, window.innerHeight);
  });

  // Load presets
  presetList = await butterchurnPresets.getPresets();
  const presetKeys = Object.keys(presetList);
  const randomPreset = presetList[presetKeys[Math.floor(Math.random() * presetKeys.length)]];

  visualizer.connectAudio(analyser);
  visualizer.loadPreset(randomPreset, 0.0); // 0.0 = no blend transition
});
