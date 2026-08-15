import * as THREE from 'three';

const canvas = document.querySelector('#scene');
const playPauseButton = document.querySelector('#playPause');
const restartButton = document.querySelector('#restart');
const recordButton = document.querySelector('#record');
const progressFill = document.querySelector('#progressFill');
const titleCard = document.querySelector('#titleCard');
const titleAr = document.querySelector('#titleAr');
const titleEn = document.querySelector('#titleEn');
const lowerThird = document.querySelector('#lowerThird');
const cardAr = document.querySelector('#cardAr');
const cardEn = document.querySelector('#cardEn');
const sceneLabel = document.querySelector('#sceneLabel');

const params = new URLSearchParams(window.location.search);
const captureMode = params.get('capture') === '1';
const CAPTURE_FPS = 30;
const LOOP_DURATION = 96;

if (captureMode) document.body.dataset.capture = 'true';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaed7ef);
scene.fog = new THREE.Fog(0xc6d9c8, 120, 520);

const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1200);
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  preserveDrawingBuffer: captureMode,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.22;

const hemi = new THREE.HemisphereLight(0xe9f6ff, 0x6c5b35, 1.75);
scene.add(hemi);

const fill = new THREE.DirectionalLight(0xffffff, 0.65);
fill.position.set(-80, 50, -60);
scene.add(fill);

const sun = new THREE.DirectionalLight(0xfff2cf, 4.9);
sun.position.set(-90, 125, 70);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 420;
sun.shadow.camera.left = -150;
sun.shadow.camera.right = 150;
sun.shadow.camera.top = 150;
sun.shadow.camera.bottom = -150;
sun.shadow.bias = -0.00018;
scene.add(sun);
scene.add(sun.target);

const sunOrb = new THREE.Mesh(
  new THREE.SphereGeometry(5.5, 24, 16),
  new THREE.MeshBasicMaterial({ color: 0xffd98d })
);
sunOrb.position.set(-110, 135, 110);
scene.add(sunOrb);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(720, 720),
  new THREE.MeshStandardMaterial({ color: 0x8a7a48, roughness: 1 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const soilPatch = new THREE.Mesh(
  new THREE.CircleGeometry(235, 64),
  new THREE.MeshStandardMaterial({ color: 0x536f39, roughness: 1 })
);
soilPatch.rotation.x = -Math.PI / 2;
soilPatch.position.y = 0.012;
scene.add(soilPatch);

const cropGroup = new THREE.Group();
scene.add(cropGroup);
const cropMaterial = new THREE.MeshStandardMaterial({ color: 0x5f8f45, roughness: 1 });
for (let z = -170; z <= 170; z += 4.4) {
  const row = new THREE.Mesh(new THREE.BoxGeometry(360, 0.18, 0.55), cropMaterial);
  row.position.set(0, 0.11, z);
  row.receiveShadow = true;
  cropGroup.add(row);
}

const structureMaterial = new THREE.MeshStandardMaterial({
  color: 0xb4bec2,
  metalness: 0.65,
  roughness: 0.34,
});
const railMaterial = new THREE.MeshStandardMaterial({
  color: 0x66757c,
  metalness: 0.85,
  roughness: 0.24,
});
const pvMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x12566d,
  metalness: 0.12,
  roughness: 0.2,
  clearcoat: 0.9,
  clearcoatRoughness: 0.15,
  side: THREE.DoubleSide,
});

function triangleGeometry(a, b, c) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
    a.x, a.y, a.z,
    b.x, b.y, b.z,
    c.x, c.y, c.z,
  ]), 3));
  geometry.computeVertexNormals();
  return geometry;
}

function cylinderBetween(a, b, radius, material) {
  const direction = new THREE.Vector3().subVectors(b, a);
  const length = direction.length();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 10), material);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
  mesh.castShadow = true;
  return mesh;
}

function createSolarTree() {
  const group = new THREE.Group();
  const edgeHeight = 5;
  const apexHeight = 8;
  const canopyRadius = 5.5;

  const column = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.38, edgeHeight, 18),
    structureMaterial
  );
  column.position.y = edgeHeight / 2;
  column.castShadow = true;
  column.receiveShadow = true;
  group.add(column);

  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.2, 18), structureMaterial);
  collar.position.y = 4.92;
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
    group.add(cylinderBetween(apex, a, 0.052, railMaterial));
    group.add(cylinderBetween(a, b, 0.052, railMaterial));
  }

  return group;
}

const treePrototype = createSolarTree();
const solarField = new THREE.Group();
scene.add(solarField);

const SPACING = 12;
const rowStep = Math.sqrt(3) * SPACING;
const positions = [];

for (let row = -9; row <= 9; row += 1) {
  for (let col = -11; col <= 11; col += 1) {
    const x = col * 18 + (row % 2) * 9;
    const z = row * rowStep * 0.92;
    if (Math.hypot(x, z) > 230) continue;
    positions.push([x, z]);
  }
}

positions.forEach(([x, z], index) => {
  const tree = index === 0 ? treePrototype : treePrototype.clone(true);
  tree.position.set(x, 0, z);
  solarField.add(tree);
});

const hexGroup = new THREE.Group();
scene.add(hexGroup);
const hexPoints = [];
for (let i = 0; i <= 6; i += 1) {
  const a = i * Math.PI / 3;
  hexPoints.push(new THREE.Vector3(12 * Math.cos(a), 0.06, 12 * Math.sin(a)));
}
const hexLine = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(hexPoints),
  new THREE.LineBasicMaterial({ color: 0x79d7cf, transparent: true, opacity: 0.0 })
);
hexGroup.add(hexLine);

const waterMaterial = new THREE.MeshStandardMaterial({
  color: 0x2ea9e9,
  emissive: 0x0a3552,
  emissiveIntensity: 0.65,
  metalness: 0.25,
  roughness: 0.3,
});
const energyMaterial = new THREE.MeshStandardMaterial({
  color: 0xffc84a,
  emissive: 0x6a4300,
  emissiveIntensity: 0.8,
  roughness: 0.35,
});

function addPipe(a, b, radius, material) {
  const pipe = cylinderBetween(a, b, radius, material);
  pipe.castShadow = false;
  scene.add(pipe);
  return pipe;
}

const utilityGroup = new THREE.Group();
utilityGroup.visible = false;
scene.add(utilityGroup);

const tank = new THREE.Mesh(
  new THREE.CylinderGeometry(7, 7, 8, 32),
  new THREE.MeshStandardMaterial({ color: 0x88aebf, metalness: 0.25, roughness: 0.45 })
);
tank.position.set(48, 4, -20);
tank.castShadow = true;
utilityGroup.add(tank);

const pump = new THREE.Mesh(
  new THREE.BoxGeometry(4, 3, 4),
  new THREE.MeshStandardMaterial({ color: 0x38586d, roughness: 0.45 })
);
pump.position.set(30, 1.5, -20);
pump.castShadow = true;
utilityGroup.add(pump);

const station = new THREE.Mesh(
  new THREE.BoxGeometry(10, 5, 8),
  new THREE.MeshStandardMaterial({ color: 0x59636a, metalness: 0.3, roughness: 0.4 })
);
station.position.set(-44, 2.5, -20);
station.castShadow = true;
utilityGroup.add(station);

function utilityPipe(a, b, radius, material) {
  const direction = new THREE.Vector3().subVectors(b, a);
  const length = direction.length();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 10), material);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
  utilityGroup.add(mesh);
  return mesh;
}

utilityPipe(new THREE.Vector3(-35, 0.5, -20), new THREE.Vector3(28, 0.5, -20), 0.18, energyMaterial);
utilityPipe(new THREE.Vector3(32, 0.45, -20), new THREE.Vector3(48, 0.45, -20), 0.22, waterMaterial);
utilityPipe(new THREE.Vector3(48, 0.4, -20), new THREE.Vector3(86, 0.4, -20), 0.18, waterMaterial);

const waterDroplets = [];
for (let i = 0; i < 18; i += 1) {
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), new THREE.MeshBasicMaterial({ color: 0x7ad9ff }));
  utilityGroup.add(dot);
  waterDroplets.push(dot);
}

const timeline = [
  {
    start: 0, end: 8, label: '01 · THE CHALLENGE',
    ar: 'الأرض القاحلة ليست بلا مورد',
    en: 'Arid land has one resource in abundance: sunlight.',
    camera(t) { return new THREE.Vector3(-110 + 32 * t, 5.2 + 1.8 * t, 118 - 18 * t); },
    target: new THREE.Vector3(0, 2.5, 0),
  },
  {
    start: 8, end: 24, label: '02 · GROUND LEVEL',
    ar: 'الزراعة تبقى على الأرض… والطاقة ترتفع فوقها',
    en: 'The camera moves between crops and columns at working height.',
    camera(t) { return new THREE.Vector3(-78 + 152 * t, 2.4 + 0.7 * Math.sin(Math.PI * t), 18 * Math.sin(t * Math.PI * 1.7)); },
    lookAhead(t) { return new THREE.Vector3(-48 + 152 * t, 3.5, 4 * Math.sin(t * Math.PI * 1.7)); },
  },
  {
    start: 24, end: 36, label: '03 · THE TREE',
    ar: 'شجرة D11: عمود واحد ومظلة سداسية بقطر 11 مترًا',
    en: 'A hollow mast carries six photovoltaic faces 5–8 m above grade.',
    camera(t) {
      const a = -0.9 + t * 1.65;
      return new THREE.Vector3(Math.cos(a) * 19, 7.2 + 3.5 * t, Math.sin(a) * 19);
    },
    target: new THREE.Vector3(0, 4.3, 0),
  },
  {
    start: 36, end: 48, label: '04 · THE HEXAGON',
    ar: 'شجرة في المركز وست على الرؤوس… ثم تتشارك الخلايا حدودها',
    en: 'The D11/S12 cell becomes a repeatable honeycomb geometry.',
    camera(t) { return new THREE.Vector3(8 - 13 * t, 24 + 14 * t, 30 - 13 * t); },
    target: new THREE.Vector3(0, 1.2, 0),
    hex: true,
  },
  {
    start: 48, end: 62, label: '05 · SCALE',
    ar: 'الخلية الواحدة تتكرر حتى تصبح بنية تحتية على مساحة 1 كم²',
    en: 'The modular geometry scales from a pilot to thousands of trees.',
    camera(t) { return new THREE.Vector3(-55 + 35 * t, 62 + 78 * t, 88 + 80 * t); },
    target: new THREE.Vector3(0, 0, 0),
  },
  {
    start: 62, end: 76, label: '06 · WATER + ENERGY',
    ar: 'الكهرباء تشغّل الضخ… والماء يُخزن ثم يصل إلى الجذور',
    en: 'Solar generation powers pumping, storage and precision irrigation.',
    camera(t) { return new THREE.Vector3(-72 + 118 * t, 15, -62 + 34 * t); },
    target: new THREE.Vector3(12, 3, -20),
    utilities: true,
  },
  {
    start: 76, end: 88, label: '07 · AGRICULTURE',
    ar: 'الهدف ليس محطة شمسية… بل مناخ زراعي قابل للإدارة',
    en: 'Shade, energy, water and crops operate as one system.',
    camera(t) { return new THREE.Vector3(70 - 142 * t, 3.0, -12 + 30 * Math.sin(Math.PI * t)); },
    lookAhead(t) { return new THREE.Vector3(42 - 142 * t, 3.2, -6 + 20 * Math.sin(Math.PI * t)); },
  },
  {
    start: 88, end: 96, label: '08 · THE SYSTEM',
    ar: 'Solar Agro Tree — استصلاح الأرض بالطاقة والظل والماء',
    en: 'A modular infrastructure concept for productive arid land.',
    camera(t) { return new THREE.Vector3(120 - 55 * t, 95 + 25 * t, 155 - 35 * t); },
    target: new THREE.Vector3(0, 0, 0),
  },
];

function clamp01(v) { return Math.max(0, Math.min(1, v)); }
function smooth(v) { const t = clamp01(v); return t * t * (3 - 2 * t); }

function activeSegment(time) {
  return timeline.find((segment) => time >= segment.start && time < segment.end) || timeline[timeline.length - 1];
}

let lastSegment = null;
function updateOverlay(time, segment) {
  if (segment !== lastSegment) {
    sceneLabel.textContent = segment.label;
    cardAr.textContent = segment.ar;
    cardEn.textContent = segment.en;
    lowerThird.classList.add('lower-third--active');
    lastSegment = segment;
  }

  const local = (time - segment.start) / (segment.end - segment.start);
  const fade = Math.min(local / 0.08, (1 - local) / 0.08, 1);
  lowerThird.style.opacity = String(clamp01(fade));
  titleCard.classList.toggle('title-card--active', time < 6.2 || time > 90.5);

  if (time > 90.5) {
    titleAr.textContent = 'Solar Agro Tree';
    titleEn.textContent = 'Shade · Energy · Water · Agriculture';
  } else {
    titleAr.textContent = 'بنية زراعية كهروضوئية للأراضي القاحلة';
    titleEn.textContent = 'Modular Agrivoltaic Infrastructure for Arid Land';
  }
}

function updateCamera(time) {
  const segment = activeSegment(time);
  const local = smooth((time - segment.start) / (segment.end - segment.start));
  const desired = segment.camera(local);
  camera.position.copy(desired);
  const lookAt = segment.lookAhead ? segment.lookAhead(local) : segment.target;
  camera.lookAt(lookAt);

  hexLine.material.opacity = segment.hex ? 0.82 : Math.max(0, hexLine.material.opacity - 0.04);
  utilityGroup.visible = Boolean(segment.utilities);

  updateOverlay(time, segment);
  return segment;
}

function animateUtilities(time) {
  if (!utilityGroup.visible) return;
  waterDroplets.forEach((dot, i) => {
    const u = (time * 0.12 + i / waterDroplets.length) % 1;
    if (u < 0.5) {
      const t = u * 2;
      dot.position.set(32 + 16 * t, 0.75, -20);
    } else {
      const t = (u - 0.5) * 2;
      dot.position.set(48 + 38 * t, 0.75, -20);
    }
  });
}

function animateSun(time) {
  const phase = 0.22 + 0.42 * (0.5 + 0.5 * Math.sin((time / LOOP_DURATION) * Math.PI * 1.4));
  const az = THREE.MathUtils.lerp(-0.85, 0.75, phase);
  const radius = 135;
  sun.position.set(Math.sin(az) * radius, 105 + 38 * Math.sin(Math.PI * phase), Math.cos(az) * radius);
  sun.target.position.set(0, 0, 0);
  sunOrb.position.copy(sun.position).multiplyScalar(1.16);
}

function resizeRenderer() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const pixelRatio = renderer.getPixelRatio();
  const targetW = Math.floor(width * pixelRatio);
  const targetH = Math.floor(height * pixelRatio);
  if (canvas.width !== targetW || canvas.height !== targetH) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

let running = true;
let elapsed = 0;
let lastTime = performance.now();
let recorder = null;
let chunks = [];

function frame(now) {
  resizeRenderer();

  let delta;
  if (captureMode) {
    delta = 1 / CAPTURE_FPS;
  } else {
    delta = Math.min((now - lastTime) / 1000, 0.08);
    lastTime = now;
  }

  if (running) elapsed += delta;
  if (elapsed >= LOOP_DURATION) elapsed %= LOOP_DURATION;

  const time = elapsed;
  updateCamera(time);
  animateSun(time);
  animateUtilities(time);

  progressFill.style.width = `${(time / LOOP_DURATION) * 100}%`;
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

playPauseButton.addEventListener('click', () => {
  running = !running;
  playPauseButton.textContent = running ? 'Pause' : 'Play';
});

restartButton.addEventListener('click', () => {
  elapsed = 0;
  lastSegment = null;
});

recordButton.addEventListener('click', () => {
  if (recorder?.state === 'recording') {
    recorder.stop();
    return;
  }

  const stream = canvas.captureStream(30);
  const preferred = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
  ].find((type) => MediaRecorder.isTypeSupported(type));

  recorder = new MediaRecorder(stream, preferred ? { mimeType: preferred } : undefined);
  chunks = [];
  recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: recorder.mimeType || 'video/webm' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'solar-agro-tree-showreel.webm';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    recordButton.textContent = 'Record';
  };

  elapsed = 0;
  lastSegment = null;
  running = true;
  recorder.start();
  recordButton.textContent = 'Stop';

  setTimeout(() => {
    if (recorder?.state === 'recording') recorder.stop();
  }, LOOP_DURATION * 1000 + 500);
});

requestAnimationFrame(frame);
