import * as THREE from 'three';

const canvas = document.querySelector('#scene');
const playPauseButton = document.querySelector('#playPause');
const resetButton = document.querySelector('#reset');
const shotSelect = document.querySelector('#shot');
const speedInput = document.querySelector('#speed');

const params = new URLSearchParams(window.location.search);
const captureMode = params.get('capture') === '1';
const CAPTURE_FPS = 30;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x071014);
scene.fog = new THREE.FogExp2(0x071014, 0.012);

const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 500);
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  preserveDrawingBuffer: captureMode,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const hemi = new THREE.HemisphereLight(0xb9d6dc, 0x182210, 1.35);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xfff1c8, 3.5);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 140;
sun.shadow.camera.left = -45;
sun.shadow.camera.right = 45;
sun.shadow.camera.top = 45;
sun.shadow.camera.bottom = -45;
scene.add(sun);
scene.add(sun.target);

const sunOrb = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 24, 16),
  new THREE.MeshBasicMaterial({ color: 0xffd166 })
);
scene.add(sunOrb);

const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x2e3d26,
  roughness: 0.96,
  metalness: 0.0,
});
const ground = new THREE.Mesh(new THREE.PlaneGeometry(110, 110), groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const grid = new THREE.GridHelper(90, 36, 0x28423d, 0x172c29);
grid.position.y = 0.015;
scene.add(grid);

const cropGroup = new THREE.Group();
scene.add(cropGroup);
const cropMaterial = new THREE.MeshStandardMaterial({ color: 0x486b37, roughness: 1 });
for (let z = -28; z <= 28; z += 2.1) {
  const row = new THREE.Mesh(new THREE.BoxGeometry(62, 0.12, 0.34), cropMaterial);
  row.position.set(0, 0.07, z);
  row.receiveShadow = true;
  cropGroup.add(row);
}

const structureMaterial = new THREE.MeshStandardMaterial({
  color: 0xa9b4b6,
  metalness: 0.72,
  roughness: 0.36,
});
const railMaterial = new THREE.MeshStandardMaterial({
  color: 0x778588,
  metalness: 0.88,
  roughness: 0.28,
});
const pvMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x0c4652,
  metalness: 0.15,
  roughness: 0.25,
  clearcoat: 0.72,
  clearcoatRoughness: 0.22,
  side: THREE.DoubleSide,
});

function triangleGeometry(a, b, c) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array([
    a.x, a.y, a.z,
    b.x, b.y, b.z,
    c.x, c.y, c.z,
  ]);
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function cylinderBetween(a, b, radius, material) {
  const direction = new THREE.Vector3().subVectors(b, a);
  const length = direction.length();
  const geometry = new THREE.CylinderGeometry(radius, radius, length, 10);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createSolarTree({ hero = false } = {}) {
  const group = new THREE.Group();
  const edgeHeight = 5;
  const apexHeight = 8;
  const canopyRadius = 5.5;

  const column = new THREE.Mesh(
    new THREE.CylinderGeometry(0.30, 0.38, edgeHeight, 20),
    structureMaterial
  );
  column.position.y = edgeHeight / 2;
  column.castShadow = true;
  column.receiveShadow = true;
  group.add(column);

  const collar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.78, 0.78, 0.22, 20),
    structureMaterial
  );
  collar.position.y = edgeHeight - 0.08;
  collar.castShadow = true;
  group.add(collar);

  const apex = new THREE.Vector3(0, apexHeight, 0);
  const rim = [];
  for (let i = 0; i < 6; i += 1) {
    const angle = Math.PI / 6 + i * Math.PI / 3;
    rim.push(new THREE.Vector3(
      canopyRadius * Math.cos(angle),
      edgeHeight,
      canopyRadius * Math.sin(angle)
    ));
  }

  for (let i = 0; i < 6; i += 1) {
    const a = rim[i];
    const b = rim[(i + 1) % 6];
    const panel = new THREE.Mesh(triangleGeometry(apex, a, b), pvMaterial);
    panel.castShadow = true;
    panel.receiveShadow = true;
    group.add(panel);

    group.add(cylinderBetween(apex, a, 0.055, railMaterial));
    group.add(cylinderBetween(a, b, 0.055, railMaterial));

    if (hero) {
      const center = new THREE.Vector3().addVectors(apex, a).add(b).multiplyScalar(1 / 3);
      const ribStart = center.clone().lerp(a, 0.36);
      const ribEnd = center.clone().lerp(b, 0.36);
      group.add(cylinderBetween(ribStart, ribEnd, 0.025, railMaterial));
    }
  }

  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), structureMaterial);
  cap.position.copy(apex);
  group.add(cap);

  return group;
}

const solarField = new THREE.Group();
scene.add(solarField);

const heroTree = createSolarTree({ hero: true });
solarField.add(heroTree);

const CELL_RADIUS = 12;
for (let i = 0; i < 6; i += 1) {
  const angle = i * Math.PI / 3;
  const tree = createSolarTree();
  tree.position.set(CELL_RADIUS * Math.cos(angle), 0, CELL_RADIUS * Math.sin(angle));
  tree.scale.setScalar(0.94);
  solarField.add(tree);
}

const hexLinePoints = [];
for (let i = 0; i <= 6; i += 1) {
  const angle = Math.PI / 6 + (i % 6) * Math.PI / 3;
  hexLinePoints.push(new THREE.Vector3(CELL_RADIUS * Math.cos(angle), 0.035, CELL_RADIUS * Math.sin(angle)));
}
const hexGeometry = new THREE.BufferGeometry().setFromPoints(hexLinePoints);
const hexLine = new THREE.Line(
  hexGeometry,
  new THREE.LineBasicMaterial({ color: 0x5fc7bd, transparent: true, opacity: 0.36 })
);
scene.add(hexLine);

const centerMark = new THREE.Mesh(
  new THREE.RingGeometry(1.0, 1.18, 40),
  new THREE.MeshBasicMaterial({ color: 0x80ddd2, side: THREE.DoubleSide, transparent: true, opacity: 0.55 })
);
centerMark.rotation.x = -Math.PI / 2;
centerMark.position.y = 0.03;
scene.add(centerMark);

function createSunPath() {
  const curvePoints = [];
  for (let i = 0; i <= 64; i += 1) {
    const u = i / 64;
    const az = THREE.MathUtils.lerp(-Math.PI * 0.62, Math.PI * 0.62, u);
    const elevation = 10 + 44 * Math.sin(Math.PI * u);
    const radius = 46;
    curvePoints.push(new THREE.Vector3(
      radius * Math.sin(az),
      elevation,
      radius * Math.cos(az)
    ));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
  const material = new THREE.LineBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.24 });
  const line = new THREE.Line(geometry, material);
  scene.add(line);
}
createSunPath();

const target = new THREE.Vector3(0, 3.2, 0);

const shots = {
  orbit: {
    duration: 18,
    position(t) {
      const a = t * Math.PI * 2;
      const radius = 30;
      return new THREE.Vector3(Math.cos(a) * radius, 13 + Math.sin(a * 0.5) * 2.4, Math.sin(a) * radius);
    },
    lookAt: target,
  },
  hero: {
    duration: 12,
    position(t) {
      const a = THREE.MathUtils.lerp(-0.95, 0.68, t);
      const radius = THREE.MathUtils.lerp(20, 14.5, Math.sin(Math.PI * t));
      return new THREE.Vector3(Math.cos(a) * radius, THREE.MathUtils.lerp(7.5, 10.5, t), Math.sin(a) * radius);
    },
    lookAt: new THREE.Vector3(0, 4.2, 0),
  },
  network: {
    duration: 14,
    position(t) {
      const a = THREE.MathUtils.lerp(-0.35, 0.8, t);
      return new THREE.Vector3(Math.cos(a) * 38, 24, Math.sin(a) * 38);
    },
    lookAt: new THREE.Vector3(0, 2.7, 0),
  },
  top: {
    duration: 10,
    position(t) {
      const a = t * Math.PI * 0.28;
      return new THREE.Vector3(Math.sin(a) * 2.4, 49, Math.cos(a) * 2.4);
    },
    lookAt: new THREE.Vector3(0, 0, 0),
  },
};

let currentShot = shotSelect.value;
let running = true;
let elapsed = 0;
let lastTime = performance.now();
let captureFrame = 0;
let speed = Number(speedInput.value);

function setShot(name, reset = true) {
  currentShot = shots[name] ? name : 'orbit';
  shotSelect.value = currentShot;
  if (reset) elapsed = 0;
}

function animateSun(t) {
  const phase = 0.5 + 0.5 * Math.sin(t * 0.26 - 0.6);
  const az = THREE.MathUtils.lerp(-Math.PI * 0.62, Math.PI * 0.62, phase);
  const elevation = 12 + 43 * Math.sin(Math.PI * phase);
  const radius = 44;

  sun.position.set(
    radius * Math.sin(az),
    elevation,
    radius * Math.cos(az)
  );
  sun.target.position.set(0, 0, 0);
  sunOrb.position.copy(sun.position);
  sun.intensity = THREE.MathUtils.lerp(2.5, 4.2, Math.sin(Math.PI * phase));
}

function animateCamera(t) {
  const shot = shots[currentShot];
  const local = ((t % shot.duration) + shot.duration) % shot.duration / shot.duration;
  const desired = shot.position(local);
  if (captureMode) {
    camera.position.copy(desired);
  } else {
    camera.position.lerp(desired, 0.065);
  }
  camera.lookAt(shot.lookAt);
}

function resizeRenderer() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== Math.floor(width * renderer.getPixelRatio()) ||
    canvas.height !== Math.floor(height * renderer.getPixelRatio());
  if (needResize) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

function renderFrame(now) {
  resizeRenderer();

  let delta;
  if (captureMode) {
    delta = 1 / CAPTURE_FPS;
    captureFrame += 1;
  } else {
    delta = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
  }

  if (running) elapsed += delta * speed;

  animateCamera(elapsed);
  animateSun(elapsed);
  centerMark.rotation.z = elapsed * 0.18;

  renderer.render(scene, camera);
  requestAnimationFrame(renderFrame);
}

playPauseButton.addEventListener('click', () => {
  running = !running;
  playPauseButton.textContent = running ? 'Pause' : 'Play';
});

resetButton.addEventListener('click', () => {
  elapsed = 0;
  captureFrame = 0;
});

shotSelect.addEventListener('change', () => setShot(shotSelect.value));
speedInput.addEventListener('input', () => { speed = Number(speedInput.value); });

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    playPauseButton.click();
  }
  if (event.key === '1') setShot('hero');
  if (event.key === '2') setShot('network');
  if (event.key === '3') setShot('top');
  if (event.key === '4') setShot('orbit');
});

if (captureMode) {
  document.body.dataset.capture = 'true';
  speed = 1;
  speedInput.value = '1';
}

setShot(currentShot);
requestAnimationFrame(renderFrame);
