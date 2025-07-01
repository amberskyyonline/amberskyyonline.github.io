let scene, camera, renderer, mesh, analyser, dataArray;
const audio = document.getElementById('audio');
const fftSize = 128;

initAudio();
initThree();
animate();

function initAudio() {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const src = context.createMediaElementSource(audio);
  analyser = context.createAnalyser();
  analyser.fftSize = fftSize;
  dataArray = new Uint8Array(analyser.frequencyBinCount);

  src.connect(analyser);
  analyser.connect(context.destination);
}

function initThree() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(1.5, 128, 128);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 },
      uData: { value: new THREE.DataTexture(dataArray, fftSize / 2, 1, THREE.LuminanceFormat) }
    },
    vertexShader: `
      uniform float uTime;
      uniform sampler2D uData;
      varying vec3 vNormal;

      void main() {
        vNormal = normal;
        float freq = texture2D(uData, vec2((position.y + 1.0) / 2.0, 0.0)).r;
        float amp = freq * 2.0;
        vec3 newPosition = position + normal * amp;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 2.0);
        gl_FragColor = vec4(intensity, intensity * 0.5, intensity * 1.5, 1.0);
      }
    `,
    wireframe: false
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);

  analyser.getByteFrequencyData(dataArray);
  mesh.material.uniforms.uTime.value = performance.now() / 1000;
  mesh.material.uniforms.uData.value.needsUpdate = true;

  mesh.rotation.y += 0.005;
  mesh.rotation.x += 0.002;
  renderer.render(scene, camera);
}
