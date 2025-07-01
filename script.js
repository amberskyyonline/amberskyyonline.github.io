let scene, camera, renderer;
let sphere, plane;
let clock = new THREE.Clock();

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 5, 12);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // Lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);

  // Floor plane with animated "caustics"
  const planeMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec2 vUv;

      void main() {
        float wave = sin((vUv.x + time) * 10.0) * cos((vUv.y + time) * 10.0);
        float intensity = 0.4 + 0.6 * wave;
        gl_FragColor = vec4(vec3(intensity), 1.0);
      }
    `,
    side: THREE.DoubleSide
  });

  plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  // Glass-like sphere
  const sphereMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0,
    transmission: 1.0, // full glass
    thickness: 1.5,
    ior: 1.4,
    reflectivity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 64, 64), sphereMaterial);
  sphere.position.y = 2;
  scene.add(sphere);
}

function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  // Animate shader
  plane.material.uniforms.time.value = elapsed;

  // Rotate glass object for sparkle
  sphere.rotation.y += 0.005;
  renderer.render(scene, camera);
}

