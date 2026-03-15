// 3D Ubuntu Desktop Portfolio — Realistic Room

let scene, camera, renderer, controls;
let screenMesh, raycaster, mouse;
let clock, isLoaded = false;
let prevTime = performance.now();
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let lastClockUpdate = 0;
let clickableScreenAreas = [];
let pointerDownPos = null;
let pointerDownTime = 0;
let activeWindow = null;
let lastFocusedElement = null;
let windowZCounter = 120;

const UBUNTU_ORANGE = 0xe95420;
const UBUNTU_PURPLE = 0x77216f;
const UBUNTU_DARK   = 0x2c001e;

// Room dimensions (meters)
const ROOM_W = 5.5;
const ROOM_D = 4.5;
const ROOM_H = 2.8;

init();

function init() {
  clock = new THREE.Clock();
  setupRenderer();
  setupControls();
  setupScene();
  setupEventListeners();
  animate();
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
    isLoaded = true;
  }, 1800);
}

// ─── Renderer ────────────────────────────────────────────────
function setupRenderer() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0d10);

  camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.05, 60);
  // Start the viewer inside the room with a clear line of sight to the monitor.
  camera.position.set(0.95, 1.45, 1.55);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.physicallyCorrectLights = true;
  document.getElementById('canvas-container').appendChild(renderer.domElement);
}

// ─── Controls ────────────────────────────────────────────────
function setupControls() {
  const PLCtor = THREE.PointerLockControls || window.PointerLockControls;
  controls = new PLCtor(camera, document.body);
  const instr = document.getElementById('instructions');

  controls.addEventListener('lock', () => { instr.style.display = 'none'; });
  controls.addEventListener('unlock', () => { instr.style.display = 'block'; });
  scene.add(controls.getObject());

  const OrbitCtor = THREE.OrbitControls || window.OrbitControls;
  const orbit = new OrbitCtor(camera, renderer.domElement);
  orbit.enableDamping = true;
  orbit.dampingFactor = 0.07;
  orbit.minDistance = 0.8;
  orbit.maxDistance = 6;
  orbit.maxPolarAngle = Math.PI * 0.85;
  orbit.minPolarAngle = 0.2;
  orbit.target.set(0.08, 1.05, -1.46);
  orbit.enabled = true;
  window.orbitControls = orbit;

  document.addEventListener('keydown', e => {
    if (e.code === 'Tab') {
      e.preventDefault();
      if (controls.isLocked) { controls.unlock(); orbit.enabled = true; }
      else { orbit.enabled = false; controls.lock(); }
    }
  });
}

// ─── Scene assembly ──────────────────────────────────────────
function setupScene() {
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  createLighting();
  createRoom();
  createDesk();
  createChair();
  createMonitor();
  createKeyboardMouse();
  createDeskLamp();
  createDecorations();
}

function setupEventListeners() {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  renderer.domElement.addEventListener('pointerdown', e => {
    pointerDownPos = { x: e.clientX, y: e.clientY };
    pointerDownTime = performance.now();
  });
  renderer.domElement.addEventListener('pointerup', e => {
    if (!pointerDownPos) return;
    const dx = e.clientX - pointerDownPos.x;
    const dy = e.clientY - pointerDownPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const elapsed = performance.now() - pointerDownTime;
    pointerDownPos = null;
    if (dist < 6 && elapsed < 500) {
      onSceneClick(e);
    }
  });

  window.addEventListener('mousemove', onSceneHover);
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  if ('ontouchstart' in window) {
    window.orbitControls.enabled = true;
    document.getElementById('instructions').innerHTML =
      '<i class="fa-solid fa-hand-pointer"></i> Touch to orbit &middot; Tap screen icons to open';
  }
}

// ─── Procedural textures ─────────────────────────────────────
function makeWoodTexture(w, h, baseR, baseG, baseB) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = `rgb(${baseR},${baseG},${baseB})`;
  ctx.fillRect(0, 0, w, h);
  for (let y = 0; y < h; y += 3) {
    const v = Math.random() * 12 - 6;
    ctx.fillStyle = `rgba(${baseR + v},${baseG + v},${baseB + v - 2},0.6)`;
    ctx.fillRect(0, y, w, 2);
  }
  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.04})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() * 40 + 10, 1);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function makeMarbleTexture() {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 512;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, c.width, c.height);
  grad.addColorStop(0, '#0d1118');
  grad.addColorStop(0.5, '#181e28');
  grad.addColorStop(1, '#0a0d13');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, c.width, c.height);

  for (let i = 0; i < 18; i++) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(180, 200, 255, ${0.06 + Math.random() * 0.08})`;
    ctx.lineWidth = 1 + Math.random() * 2;
    let x = Math.random() * c.width;
    let y = Math.random() * c.height;
    ctx.moveTo(x, y);
    for (let j = 0; j < 8; j++) {
      x += 80 + Math.random() * 90;
      y += Math.random() * 70 - 35;
      ctx.bezierCurveTo(x - 30, y - 10, x - 10, y + 20, x, y);
    }
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function makeFloorTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const ctx = c.getContext('2d');
  const plankH = 64;
  for (let y = 0; y < 512; y += plankH) {
    const shade = 28 + Math.random() * 12;
    ctx.fillStyle = `rgb(${shade + 8},${shade + 4},${shade})`;
    ctx.fillRect(0, y, 512, plankH - 1);
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, y + plankH - 1, 512, 1);
    for (let x = 0; x < 512; x += 2) {
      const g = Math.random() * 8 - 4;
      ctx.fillStyle = `rgba(${shade + g + 8},${shade + g + 4},${shade + g},0.3)`;
      ctx.fillRect(x, y, 1, plankH - 1);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(ROOM_W / 2, ROOM_D / 2);
  return tex;
}

function makeWallTexture(tint) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = tint;
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 800; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.012})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1, 1);
  }
  for (let i = 0; i < 400; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.015})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1, 1);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// ─── Lighting ────────────────────────────────────────────────
function createLighting() {
  scene.add(new THREE.HemisphereLight(0x2a3352, 0x06070a, 0.12));
  scene.add(new THREE.AmbientLight(0x08090d, 0.16));

  const key = new THREE.DirectionalLight(0xe6ecff, 0.45);
  key.position.set(-1.8, 2.25, 1.1);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 0.1;
  key.shadow.camera.far = 12;
  key.shadow.camera.left = -4;
  key.shadow.camera.right = 4;
  key.shadow.camera.top = 4;
  key.shadow.camera.bottom = -1;
  key.shadow.bias = -0.0003;
  scene.add(key);

  const screenGlow = new THREE.PointLight(0x8e7dff, 0.45, 3.2, 2);
  screenGlow.position.set(0.05, 1.3, -1.2);
  scene.add(screenGlow);

  const fillGlow = new THREE.PointLight(0x74c8ff, 0.2, 2.8, 2);
  fillGlow.position.set(-0.4, 1.15, -1.1);
  scene.add(fillGlow);

  const rim = new THREE.PointLight(0x2b4eff, 0.12, 5, 2);
  rim.position.set(ROOM_W / 2 - 0.35, 1.4, -0.7);
  scene.add(rim);
}

// ─── Room ────────────────────────────────────────────────────
function createRoom() {
  const hw = ROOM_W / 2;
  const hd = ROOM_D / 2;

  // Floor
  const floorTex = makeFloorTexture();
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_W, ROOM_D),
    new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.92, metalness: 0.02, color: 0x5d6673 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Ceiling
  const ceilTex = makeWallTexture('#101218');
  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_W, ROOM_D),
    new THREE.MeshStandardMaterial({ map: ceilTex, roughness: 0.95, metalness: 0 })
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = ROOM_H;
  scene.add(ceiling);

  // Ceiling light fixture
  // Walls
  const wallColor = '#12141b';
  const backTex = makeWallTexture(wallColor);
  backTex.repeat.set(2, 1);

  const wallMat = new THREE.MeshStandardMaterial({ map: backTex, roughness: 0.92, metalness: 0.02 });

  // Back wall
  const back = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_H), wallMat);
  back.position.set(0, ROOM_H / 2, -hd);
  back.receiveShadow = true;
  scene.add(back);

  // Left wall — slightly different shade
  const lTex = makeWallTexture('#141721');
  lTex.repeat.set(2, 1);
  const leftWall = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_D, ROOM_H),
    new THREE.MeshStandardMaterial({ map: lTex, roughness: 0.92, metalness: 0.02 })
  );
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-hw, ROOM_H / 2, 0);
  leftWall.receiveShadow = true;
  scene.add(leftWall);

  // Right wall
  const rTex = makeWallTexture('#141721');
  rTex.repeat.set(2, 1);
  const rightWall = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_D, ROOM_H),
    new THREE.MeshStandardMaterial({ map: rTex, roughness: 0.92, metalness: 0.02 })
  );
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(hw, ROOM_H / 2, 0);
  scene.add(rightWall);

  // Keep the room open toward the camera so the desktop is visible on first load.

  // Baseboards
  createBaseboard(hw, hd);

  // Clean walls keep the scene closer to a realistic battlestation render.
}

function createBaseboard(hw, hd) {
  const bbH = 0.08;
  const bbMat = new THREE.MeshStandardMaterial({ color: 0x151518, roughness: 0.8, metalness: 0.1 });

  // Back
  const bbBack = new THREE.Mesh(new THREE.BoxGeometry(ROOM_W, bbH, 0.02), bbMat);
  bbBack.position.set(0, bbH / 2, -hd + 0.01);
  scene.add(bbBack);

  // Left
  const bbLeft = new THREE.Mesh(new THREE.BoxGeometry(0.02, bbH, ROOM_D), bbMat);
  bbLeft.position.set(-hw + 0.01, bbH / 2, 0);
  scene.add(bbLeft);

  // Right
  const bbRight = new THREE.Mesh(new THREE.BoxGeometry(0.02, bbH, ROOM_D), bbMat);
  bbRight.position.set(hw - 0.01, bbH / 2, 0);
  scene.add(bbRight);
}

function createWindow(x, y, z) {
  const frameW = 1.0, frameH = 1.2, depth = 0.05;
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x404048, roughness: 0.6, metalness: 0.3 });

  const frame = new THREE.Mesh(new THREE.BoxGeometry(depth, frameH, frameW), frameMat);
  frame.position.set(x + depth / 2, y, z);
  scene.add(frame);

  // Glass pane
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(frameH - 0.08, frameW - 0.08),
    new THREE.MeshStandardMaterial({
      color: 0x8090b0,
      transparent: true,
      opacity: 0.25,
      roughness: 0.05,
      metalness: 0.1,
      side: THREE.DoubleSide
    })
  );
  glass.rotation.y = Math.PI / 2;
  glass.position.set(x + depth + 0.005, y, z);
  scene.add(glass);

  // Window light bloom
  const bloom = new THREE.Mesh(
    new THREE.PlaneGeometry(frameH + 0.3, frameW + 0.3),
    new THREE.MeshBasicMaterial({ color: 0xc8d8f0, transparent: true, opacity: 0.06, side: THREE.DoubleSide })
  );
  bloom.rotation.y = Math.PI / 2;
  bloom.position.set(x + depth + 0.02, y, z);
  scene.add(bloom);
}

function createWallArt() {
  const hd = ROOM_D / 2;

  createImagePoster(0.6, 1.7, -hd + 0.02, 0.7, 0.46, './images/farm5.png', 'Smart Farming');
  createImagePoster(-0.7, 1.55, -hd + 0.02, 0.55, 0.36, './images/lms.jpg', 'LMS Platform');

  const hw = ROOM_W / 2;
  createImagePoster(hw - 0.02, 1.65, -0.8, 0.55, 0.36, './images/floor.jpg', null, Math.PI / 2);
}

function createImagePoster(x, y, z, w, h, imgSrc, label, rotY) {
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2e, roughness: 0.6, metalness: 0.3 });
  const frame = new THREE.Mesh(new THREE.BoxGeometry(w + 0.06, h + 0.06, 0.025), frameMat);
  frame.position.set(x, y, z + 0.012);
  if (rotY) frame.rotation.y = -rotY;
  frame.castShadow = true;
  scene.add(frame);

  const posterGeo = new THREE.PlaneGeometry(w, h);
  const fallbackTex = makeFallbackPosterTexture(w, h, label || imgSrc);
  const posterMat = new THREE.MeshStandardMaterial({ map: fallbackTex, roughness: 0.55 });
  const poster = new THREE.Mesh(posterGeo, posterMat);
  poster.position.set(x, y, z + 0.026);
  if (rotY) poster.rotation.y = -rotY;
  scene.add(poster);

  if (typeof window !== 'undefined' && window.location && window.location.protocol !== 'file:') {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(imgSrc, function (tex) {
      posterMat.map = tex;
      posterMat.needsUpdate = true;
    });
  }
}

function makeFallbackPosterTexture(w, h, text) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = Math.round(256 * (h / w));
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, c.width, c.height);
  grad.addColorStop(0, '#2c001e');
  grad.addColorStop(1, '#e95420');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, c.width, c.height);
  if (text) {
    ctx.font = `bold ${Math.round(c.height * 0.15)}px Ubuntu, Arial`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.8;
    ctx.fillText(text, c.width / 2, c.height / 2);
  }
  return new THREE.CanvasTexture(c);
}

// ─── Desk ────────────────────────────────────────────────────
function createDesk() {
  const deskW = 1.85, deskD = 0.85, deskH = 0.04;
  const deskY = 0.74;
  const deskZ = -1.4;

  const topTex = makeMarbleTexture();
  topTex.repeat.set(1.5, 1.1);
  const topMat = new THREE.MeshStandardMaterial({ map: topTex, roughness: 0.22, metalness: 0.08 });

  // Tabletop
  const top = new THREE.Mesh(new THREE.BoxGeometry(deskW, deskH, deskD), topMat);
  top.position.set(0, deskY, deskZ);
  top.castShadow = true;
  top.receiveShadow = true;
  scene.add(top);

  // Edge bevel (thin strip)
  const edgeMat = new THREE.MeshStandardMaterial({ color: 0x11151d, roughness: 0.32, metalness: 0.55 });
  const frontEdge = new THREE.Mesh(new THREE.BoxGeometry(deskW, 0.025, 0.008), edgeMat);
  frontEdge.position.set(0, deskY - deskH / 2 + 0.012, deskZ + deskD / 2);
  scene.add(frontEdge);

  const backEdge = new THREE.Mesh(new THREE.BoxGeometry(deskW, 0.025, 0.008), edgeMat);
  backEdge.position.set(0, deskY - deskH / 2 + 0.012, deskZ - deskD / 2);
  scene.add(backEdge);

  // Legs — metal rectangular
  const legW = 0.04, legD = 0.04, legH = deskY - deskH / 2;
  const legMat = new THREE.MeshStandardMaterial({ color: 0x12151d, roughness: 0.24, metalness: 0.82 });
  const legPositions = [
    [-deskW / 2 + 0.06, legH / 2, deskZ - deskD / 2 + 0.06],
    [ deskW / 2 - 0.06, legH / 2, deskZ - deskD / 2 + 0.06],
    [-deskW / 2 + 0.06, legH / 2, deskZ + deskD / 2 - 0.06],
    [ deskW / 2 - 0.06, legH / 2, deskZ + deskD / 2 - 0.06]
  ];
  legPositions.forEach(p => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(legW, legH, legD), legMat);
    leg.position.set(...p);
    leg.castShadow = true;
    scene.add(leg);
  });

  // Side panel (modesty panel)
  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(deskW - 0.2, 0.35, 0.012),
    new THREE.MeshStandardMaterial({ color: 0x0f1319, roughness: 0.55, metalness: 0.18 })
  );
  panel.position.set(0, 0.54, deskZ - deskD / 2 + 0.08);
  scene.add(panel);

}

// ─── Chair ───────────────────────────────────────────────────
function createChair() {
  const chairX = 1.02;
  const chairZ = -0.82;
  const shellMat = new THREE.MeshStandardMaterial({ color: 0x121318, roughness: 0.55, metalness: 0.18 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0x233957, roughness: 0.4, metalness: 0.28, emissive: 0x07101b });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x31343c, roughness: 0.26, metalness: 0.82 });

  const seatBase = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.08, 0.46), shellMat);
  seatBase.position.set(chairX, 0.49, chairZ);
  seatBase.rotation.y = -0.75;
  seatBase.castShadow = true;
  scene.add(seatBase);

  const seatCushion = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.045, 0.33), accentMat);
  seatCushion.position.set(chairX, 0.54, chairZ - 0.005);
  seatCushion.rotation.y = -0.75;
  seatCushion.castShadow = true;
  scene.add(seatCushion);

  const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.78, 0.08), shellMat);
  backrest.position.set(chairX, 0.85, chairZ + 0.2);
  backrest.rotation.x = 0.08;
  backrest.rotation.y = -0.75;
  backrest.castShadow = true;
  scene.add(backrest);

  const backInset = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.6, 0.025), accentMat);
  backInset.position.set(chairX, 0.83, chairZ + 0.245);
  backInset.rotation.x = 0.08;
  backInset.rotation.y = -0.75;
  scene.add(backInset);

  const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.11, 0.045), accentMat);
  headrest.position.set(chairX, 1.12, chairZ + 0.25);
  headrest.rotation.x = 0.08;
  headrest.rotation.y = -0.75;
  scene.add(headrest);

  [-1, 1].forEach(side => {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.3, 0.09), shellMat);
    wing.position.set(chairX + side * 0.12, 0.82, chairZ + 0.18);
    wing.rotation.x = 0.08;
    wing.rotation.y = -0.75 + side * 0.18;
    wing.castShadow = true;
    scene.add(wing);
  });

  [-1, 1].forEach(side => {
    const armrest = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.025, 0.2), metalMat);
    armrest.position.set(chairX + side * 0.18, 0.66, chairZ + 0.02);
    armrest.rotation.y = -0.75;
    scene.add(armrest);

    const support = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.14, 0.02), metalMat);
    support.position.set(chairX + side * 0.17, 0.58, chairZ + 0.02);
    support.rotation.y = -0.75;
    scene.add(support);
  });

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.32, 12), metalMat);
  pole.position.set(chairX, 0.34, chairZ);
  scene.add(pole);

  // Base star (5 legs)
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - 0.75;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.024, 0.3), metalMat);
    arm.position.set(chairX + Math.sin(angle) * 0.15, 0.16, chairZ + Math.cos(angle) * 0.15);
    arm.rotation.y = angle;
    scene.add(arm);

    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.02, 10), metalMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(chairX + Math.sin(angle) * 0.28, 0.025, chairZ + Math.cos(angle) * 0.28);
    scene.add(wheel);
  }
}

// ─── Monitor ─────────────────────────────────────────────────
function createMonitor() {
  const monY = 1.16, monZ = -1.63;
  const scrW = 0.86, scrH = 0.54;
  const bezelW = 0.012;
  const leftX = -0.44;
  const rightX = 0.44;
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x0b0d11, roughness: 0.42, metalness: 0.36 });
  const neckMat = new THREE.MeshStandardMaterial({ color: 0x12151a, roughness: 0.32, metalness: 0.68 });

  const screenCanvas = createUbuntuScreenCanvas(scrW, scrH);
  const screenTex = new THREE.CanvasTexture(screenCanvas);
  screenTex.needsUpdate = true;
  const screenGeo = new THREE.PlaneGeometry(scrW, scrH);
  const screenMat = new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false });
  screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.set(leftX, monY, monZ + 0.017);
  screenMesh.rotation.y = 0.03;
  scene.add(screenMesh);

  createMonitorShell(leftX, monY, monZ, scrW, scrH, bezelW, frameMat, neckMat, 0.03);

  const rightCanvas = createAmbientMonitorCanvas();
  const rightTex = new THREE.CanvasTexture(rightCanvas);
  const rightScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(scrW, scrH),
    new THREE.MeshBasicMaterial({ map: rightTex, toneMapped: false })
  );
  rightScreen.position.set(rightX, monY, monZ + 0.017);
  rightScreen.rotation.y = -0.03;
  scene.add(rightScreen);

  createMonitorShell(rightX, monY, monZ, scrW, scrH, bezelW, frameMat, neckMat, -0.03);
}

function createMonitorShell(x, y, z, scrW, scrH, bezelW, frameMat, neckMat, rotY) {
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(scrW + bezelW * 2, scrH + bezelW * 2, 0.02),
    frameMat
  );
  frame.position.set(x, y, z);
  frame.rotation.y = rotY;
  frame.castShadow = true;
  scene.add(frame);

  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.24, 0.04), neckMat);
  neck.position.set(x, 0.89, z - 0.04);
  neck.rotation.y = rotY;
  scene.add(neck);

  const base = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.014, 0.14), neckMat);
  base.position.set(x, 0.755, z - 0.02);
  base.rotation.y = rotY;
  base.castShadow = true;
  scene.add(base);
}

function createUbuntuScreenCanvas() {
  const c = document.createElement('canvas');
  c.width = 1920; c.height = 1080;
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;

  drawWallpaper(ctx, W, H);
  drawTopBar(ctx, W);
  drawDesktopIcons(ctx, W, H);
  drawDock(ctx, W, H);

  return c;
}

function drawWallpaper(ctx, W, H) {
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#9de3ff');
  bg.addColorStop(0.45, '#c7e1ff');
  bg.addColorStop(1, '#d89aff');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.globalAlpha = 0.05;
  for (let i = 0; i < 18; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 140 + 60, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawTopBar(ctx, W) {
  const topH = 36;
  ctx.fillStyle = 'rgba(18,20,26,0.32)';
  ctx.fillRect(0, 0, W, topH);

  ctx.font = 'bold 15px Ubuntu, Arial';
  ctx.fillStyle = 'rgba(25,27,34,0.65)';
  ctx.textAlign = 'left';
  ctx.fillText('Activities', 18, 24);

  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  ctx.font = 'bold 14px Ubuntu, Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(25,27,34,0.78)';
  ctx.fillText(dateStr + '  ' + timeStr, W / 2, 24);
}

function drawDesktopIcons(ctx, W, H) {
  const icons = [
    { label: 'About Me', icon: '\u{1F464}', color: '#5c7cff', window: 'about-window' },
    { label: 'Skills', icon: '\u{1F4BB}', color: '#8f72ff', window: 'skills-window' },
    { label: 'Projects', icon: '\u{1F4C1}', color: '#55a8ff', window: 'projects-window' },
    { label: 'Contact', icon: '\u{2709}\u{FE0F}', color: '#4d88ff', window: 'contact-window' },
    { label: 'Terminal', icon: '\u{2B1B}', color: '#65718c', window: 'terminal-window' }
  ];

  clickableScreenAreas = [];

  const iconW = 110;
  const iconH = 110;
  const startX = W - 170;
  const startY = 120;
  const gap = 22;

  icons.forEach((item, index) => {
    const x = startX;
    const y = startY + index * (iconH + gap);

    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.roundRect(x, y, iconW, iconH, 18);
    ctx.fill();

    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(x + 20, y + 14, 70, 56, 18);
    ctx.fill();

    ctx.font = '34px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(item.icon, x + iconW / 2, y + 42);

    ctx.font = 'bold 18px Ubuntu, Arial';
    ctx.fillStyle = 'rgba(20,22,30,0.78)';
    ctx.fillText(item.label, x + iconW / 2, y + 88);

    clickableScreenAreas.push({
      uMin: x / W,
      uMax: (x + iconW) / W,
      vMin: 1 - (y + iconH) / H,
      vMax: 1 - y / H,
      window: item.window
    });
  });
}

function drawDock(ctx, W, H) {
  const dockW = 420;
  const dockH = 72;
  const dockY = H - dockH - 18;
  const dockX = (W - dockW) / 2;
  const apps = [
    { icon: '\u{1F464}', window: 'about-window', color: '#5c7cff' },
    { icon: '\u{1F4BB}', window: 'skills-window', color: '#8f72ff' },
    { icon: '\u{1F4C1}', window: 'projects-window', color: '#55a8ff' },
    { icon: '\u{2709}\u{FE0F}', window: 'contact-window', color: '#4d88ff' },
    { icon: '\u{1F5A5}\u{FE0F}', window: 'terminal-window', color: '#65718c' }
  ];

  ctx.fillStyle = 'rgba(18,20,26,0.28)';
  ctx.beginPath();
  ctx.roundRect(dockX, dockY, dockW, dockH, 24);
  ctx.fill();

  apps.forEach((app, i) => {
    const x = dockX + 32 + i * 78;
    const y = dockY + 12;
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath();
    ctx.roundRect(x, y, 48, 48, 16);
    ctx.fill();

    ctx.fillStyle = app.color;
    ctx.font = '28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(app.icon, x + 24, y + 25);

    clickableScreenAreas.push({
      uMin: x / W,
      uMax: (x + 48) / W,
      vMin: 1 - (y + 48) / H,
      vMax: 1 - y / H,
      window: app.window
    });
  });
}

function createAmbientMonitorCanvas() {
  const c = document.createElement('canvas');
  c.width = 1600;
  c.height = 1000;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, c.width, c.height);
  grad.addColorStop(0, '#a6ebff');
  grad.addColorStop(0.5, '#d8ebff');
  grad.addColorStop(1, '#e0a2ff');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, c.width, c.height);
  return c;
}

// ─── Keyboard & Mouse ────────────────────────────────────────
function createKeyboardMouse() {
  const deskY = 0.76, deskZ = -1.4;

  // Keyboard body
  const kbW = 0.38, kbD = 0.13, kbH = 0.012;
  const kbMat = new THREE.MeshStandardMaterial({ color: 0x1c1c20, roughness: 0.6, metalness: 0.35 });
  const kb = new THREE.Mesh(new THREE.BoxGeometry(kbW, kbH, kbD), kbMat);
  kb.position.set(0.0, deskY, deskZ + 0.24);
  kb.castShadow = true;
  scene.add(kb);

  // Key rows — single InstancedMesh for performance
  const keyGeo = new THREE.BoxGeometry(0.022, 0.004, 0.018);
  const keyMat = new THREE.MeshStandardMaterial({ color: 0x252528, roughness: 0.7, metalness: 0.2 });
  const keyCount = 5 * 14;
  const keys = new THREE.InstancedMesh(keyGeo, keyMat, keyCount);
  const dummy = new THREE.Object3D();
  let idx = 0;
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 14; col++) {
      dummy.position.set(
        0.0 - kbW / 2 + 0.018 + col * 0.026,
        deskY + kbH / 2 + 0.002,
        deskZ + 0.24 - kbD / 2 + 0.018 + row * 0.024
      );
      dummy.scale.set(col === 13 ? 1.6 : 1, 1, 1);
      dummy.updateMatrix();
      keys.setMatrixAt(idx++, dummy.matrix);
    }
  }
  keys.instanceMatrix.needsUpdate = true;
  scene.add(keys);

  // Mouse
  const mouseBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.055, 0.025, 0.09),
    new THREE.MeshStandardMaterial({ color: 0x1c1c20, roughness: 0.5, metalness: 0.3 })
  );
  mouseBody.position.set(0.52, deskY + 0.006, deskZ + 0.23);
  mouseBody.castShadow = true;
  scene.add(mouseBody);

  // Mouse scroll wheel
  const wheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.004, 0.004, 0.015, 8),
    new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.4, metalness: 0.5 })
  );
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(0.52, deskY + 0.02, deskZ + 0.21);
  scene.add(wheel);

  // Mousepad
  const pad = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.004, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x111115, roughness: 0.92, metalness: 0 })
  );
  pad.position.set(0.52, deskY - 0.003, deskZ + 0.23);
  scene.add(pad);
}

// ─── Desk Lamp ───────────────────────────────────────────────
function createDeskLamp() {
  const deskY = 0.76, deskZ = -1.4;
  const lampX = -0.73;
  const lampZ = deskZ + 0.18;
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x111216, roughness: 0.42, metalness: 0.38 });

  // Base
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.018, 24), metalMat);
  base.position.set(lampX, deskY + 0.007, lampZ);
  scene.add(base);

  // Lower arm
  const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.3, 8), metalMat);
  arm1.position.set(lampX + 0.02, deskY + 0.19, lampZ - 0.02);
  arm1.rotation.z = -0.55;
  scene.add(arm1);

  // Upper arm
  const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.25, 8), metalMat);
  arm2.position.set(lampX + 0.13, deskY + 0.4, lampZ - 0.04);
  arm2.rotation.z = -1.08;
  scene.add(arm2);

  // Shade
  const shade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.12, 0.1, 24, 1, true),
    new THREE.MeshStandardMaterial({ color: 0x111216, roughness: 0.45, metalness: 0.32, side: THREE.DoubleSide })
  );
  shade.position.set(lampX + 0.24, deskY + 0.49, lampZ - 0.05);
  shade.rotation.z = 1.08;
  shade.rotation.x = Math.PI / 2;
  scene.add(shade);

  // Bulb
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.015, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xfff4e0 })
  );
  bulb.position.set(lampX + 0.22, deskY + 0.47, lampZ - 0.05);
  scene.add(bulb);

  // Lamp light
  const lampLight = new THREE.PointLight(0xfff0dc, 0.55, 2.6, 2);
  lampLight.position.set(lampX + 0.2, deskY + 0.47, lampZ - 0.04);
  scene.add(lampLight);
}

// ─── Decorations ─────────────────────────────────────────────
function createDecorations() {
  const deskY = 0.76, deskZ = -1.4;

  createGamingPc(1.03, 0.0, -1.0);
  createConsole(0.68, deskY, deskZ + 0.04);
}

function createGamingPc(x, deskY, z) {
  const towerMat = new THREE.MeshStandardMaterial({ color: 0x101319, roughness: 0.32, metalness: 0.55 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x69d0ff, transparent: true, opacity: 0.18, roughness: 0.08, metalness: 0.15 });
  const tower = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.46, 0.42), towerMat);
  tower.position.set(x, deskY + 0.23, z);
  tower.castShadow = true;
  scene.add(tower);

  const sideGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.4), glassMat);
  sideGlass.position.set(x - 0.091, deskY + 0.24, z);
  sideGlass.rotation.y = Math.PI / 2;
  scene.add(sideGlass);

  [0.13, 0, -0.13].forEach(offset => {
    const fan = new THREE.Mesh(
      new THREE.TorusGeometry(0.045, 0.008, 10, 20),
      new THREE.MeshStandardMaterial({ color: 0x18c7ff, emissive: 0x093248, roughness: 0.28, metalness: 0.45 })
    );
    fan.position.set(x - 0.089, deskY + 0.25, z + offset);
    fan.rotation.y = Math.PI / 2;
    scene.add(fan);
  });

  const topLight = new THREE.PointLight(0x18c7ff, 0.12, 1.2, 2);
  topLight.position.set(x - 0.04, deskY + 0.38, z);
  scene.add(topLight);
}

function createConsole(x, deskY, z) {
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.04, 0.28),
    new THREE.MeshStandardMaterial({ color: 0xe9edf2, roughness: 0.35, metalness: 0.08 })
  );
  body.position.set(x, deskY + 0.02, z);
  scene.add(body);

  const shadowBand = new THREE.Mesh(
    new THREE.BoxGeometry(0.19, 0.01, 0.26),
    new THREE.MeshStandardMaterial({ color: 0x13171d, roughness: 0.6, metalness: 0.05 })
  );
  shadowBand.position.set(x + 0.01, deskY + 0.03, z);
  scene.add(shadowBand);
}

function createHeadset(x, deskY, z) {
  const headsetMat = new THREE.MeshStandardMaterial({ color: 0x14171d, roughness: 0.48, metalness: 0.25 });
  const arc = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.01, 10, 24, Math.PI), headsetMat);
  arc.position.set(x, deskY + 0.12, z);
  arc.rotation.z = Math.PI;
  arc.rotation.y = 0.15;
  scene.add(arc);

  [-1, 1].forEach(side => {
    const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.025, 16), headsetMat);
    ear.rotation.z = Math.PI / 2;
    ear.position.set(x + side * 0.07, deskY + 0.07, z + side * 0.015);
    scene.add(ear);
  });
}

function createElectronicsWorkbench(x, topY, z) {
  const benchTopMat = new THREE.MeshStandardMaterial({ color: 0x1a1f28, roughness: 0.48, metalness: 0.22 });
  const legMat = new THREE.MeshStandardMaterial({ color: 0x2d323b, roughness: 0.3, metalness: 0.72 });
  const top = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.035, 0.5), benchTopMat);
  top.position.set(x, topY, z);
  top.castShadow = true;
  top.receiveShadow = true;
  scene.add(top);

  [
    [-0.5, -0.2], [0.5, -0.2], [-0.5, 0.2], [0.5, 0.2]
  ].forEach(([dx, dz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.04, topY, 0.04), legMat);
    leg.position.set(x + dx, topY / 2, z + dz);
    leg.castShadow = true;
    scene.add(leg);
  });

  const mat = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.005, 0.34),
    new THREE.MeshStandardMaterial({ color: 0x0c766a, roughness: 0.9, metalness: 0.02 })
  );
  mat.position.set(x - 0.06, topY + 0.02, z);
  scene.add(mat);

  createRaspberryPi(x - 0.18, topY + 0.02, z + 0.03);
  createSensorKit(x + 0.03, topY + 0.02, z - 0.03);
  createMicrocontrollerBoard(x + 0.22, topY + 0.02, z + 0.06);
  createToolStand(x + 0.38, topY + 0.02, z - 0.08);
}

function createRaspberryPi(x, y, z) {
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.012, 0.09),
    new THREE.MeshStandardMaterial({ color: 0x1d7b34, roughness: 0.75, metalness: 0.08 })
  );
  board.position.set(x, y, z);
  scene.add(board);

  const chip = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.01, 0.04),
    new THREE.MeshStandardMaterial({ color: 0x1c1c20, roughness: 0.45, metalness: 0.25 })
  );
  chip.position.set(x, y + 0.011, z);
  scene.add(chip);

  for (let i = 0; i < 2; i++) {
    const port = new THREE.Mesh(
      new THREE.BoxGeometry(0.018, 0.018, 0.03),
      new THREE.MeshStandardMaterial({ color: 0xb8bcc4, roughness: 0.26, metalness: 0.88 })
    );
    port.position.set(x + 0.05, y + 0.014, z - 0.02 + i * 0.04);
    scene.add(port);
  }
}

function createSensorKit(x, y, z) {
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.012, 0.11),
    new THREE.MeshStandardMaterial({ color: 0x164f92, roughness: 0.75, metalness: 0.08 })
  );
  base.position.set(x, y, z);
  scene.add(base);

  const sensor = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.02, 0.03),
    new THREE.MeshStandardMaterial({ color: 0x111318, roughness: 0.4, metalness: 0.18 })
  );
  sensor.position.set(x - 0.03, y + 0.016, z);
  scene.add(sensor);

  const ultrasonicLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.01, 16), new THREE.MeshStandardMaterial({ color: 0xd7dde6, roughness: 0.2, metalness: 0.9 }));
  ultrasonicLeft.rotation.x = Math.PI / 2;
  ultrasonicLeft.position.set(x + 0.04, y + 0.018, z - 0.02);
  scene.add(ultrasonicLeft);

  const ultrasonicRight = ultrasonicLeft.clone();
  ultrasonicRight.position.z = z + 0.02;
  scene.add(ultrasonicRight);
}

function createMicrocontrollerBoard(x, y, z) {
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.01, 0.07),
    new THREE.MeshStandardMaterial({ color: 0x0f6c88, roughness: 0.72, metalness: 0.08 })
  );
  board.position.set(x, y, z);
  board.rotation.y = 0.15;
  scene.add(board);

  for (let i = 0; i < 8; i++) {
    const pin = new THREE.Mesh(
      new THREE.BoxGeometry(0.006, 0.012, 0.006),
      new THREE.MeshStandardMaterial({ color: 0xe1c15b, roughness: 0.35, metalness: 0.7 })
    );
    pin.position.set(x - 0.055 + i * 0.016, y + 0.01, z - 0.024);
    pin.rotation.y = 0.15;
    scene.add(pin);
  }

  const wireColors = [0xd94141, 0xf0c43a, 0x2fc15f, 0x2ca4ff];
  wireColors.forEach((color, i) => {
    const wire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.003, 0.003, 0.12, 6),
      new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.05 })
    );
    wire.rotation.z = 0.9;
    wire.rotation.y = 0.15;
    wire.position.set(x + 0.045 + i * 0.01, y + 0.04, z - 0.01 + i * 0.008);
    scene.add(wire);
  });
}

function createToolStand(x, y, z) {
  const stand = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.06, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x242830, roughness: 0.7, metalness: 0.12 })
  );
  stand.position.set(x, y + 0.03, z);
  scene.add(stand);

  for (let i = 0; i < 4; i++) {
    const tool = new THREE.Mesh(
      new THREE.CylinderGeometry(0.004, 0.004, 0.12, 8),
      new THREE.MeshStandardMaterial({ color: 0x8d97a3, roughness: 0.25, metalness: 0.88 })
    );
    tool.position.set(x - 0.022 + i * 0.015, y + 0.09, z - 0.02 + i * 0.012);
    tool.rotation.z = 0.08 + i * 0.05;
    scene.add(tool);
  }
}

function createMug(x, y, z) {
  // Outer shell
  const outer = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.03, 0.09, 16),
    new THREE.MeshStandardMaterial({ color: 0xcc4422, roughness: 0.55, metalness: 0.08 })
  );
  outer.position.set(x, y + 0.045, z);
  outer.castShadow = true;
  scene.add(outer);

  // Inner (dark liquid)
  const inner = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.025, 0.005, 16),
    new THREE.MeshStandardMaterial({ color: 0x1a0e06, roughness: 0.3, metalness: 0.05 })
  );
  inner.position.set(x, y + 0.088, z);
  scene.add(inner);

  // Handle
  const handleGeo = new THREE.TorusGeometry(0.018, 0.005, 8, 12, Math.PI);
  const handle = new THREE.Mesh(
    handleGeo,
    new THREE.MeshStandardMaterial({ color: 0xcc4422, roughness: 0.55, metalness: 0.08 })
  );
  handle.position.set(x + 0.04, y + 0.055, z);
  handle.rotation.y = Math.PI / 2;
  scene.add(handle);
}

function createPlant(x, y, z) {
  // Pot
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.03, 0.07, 12),
    new THREE.MeshStandardMaterial({ color: 0x6b3a2a, roughness: 0.85, metalness: 0 })
  );
  pot.position.set(x, y + 0.035, z);
  pot.castShadow = true;
  scene.add(pot);

  // Soil
  const soil = new THREE.Mesh(
    new THREE.CylinderGeometry(0.038, 0.038, 0.008, 12),
    new THREE.MeshStandardMaterial({ color: 0x2a1a10, roughness: 0.95 })
  );
  soil.position.set(x, y + 0.068, z);
  scene.add(soil);

  // Leaves (small green cones clustered)
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2d6b30, roughness: 0.7, metalness: 0 });
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2;
    const r = 0.012 + Math.random() * 0.008;
    const h = 0.04 + Math.random() * 0.03;
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.012, h, 5), leafMat);
    leaf.position.set(x + Math.cos(angle) * r, y + 0.07 + h / 2, z + Math.sin(angle) * r);
    leaf.rotation.x = (Math.random() - 0.5) * 0.3;
    leaf.rotation.z = (Math.random() - 0.5) * 0.3;
    scene.add(leaf);
  }

  // Center tall stem
  const stem = new THREE.Mesh(new THREE.ConeGeometry(0.015, 0.07, 6), leafMat);
  stem.position.set(x, y + 0.105, z);
  scene.add(stem);
}

function createBookStack(x, y, z) {
  const colors = [0x8b2020, 0x1a3060, 0x2a5030, 0x4a3060];
  colors.forEach((color, i) => {
    const h = 0.22 + Math.random() * 0.06;
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, h, 0.03 + Math.random() * 0.01),
      new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0 })
    );
    book.position.set(x, y + h / 2, z + i * 0.035);
    book.rotation.y = (Math.random() - 0.5) * 0.05;
    book.castShadow = true;
    scene.add(book);
  });
}

function createSmallShelf(x, y, z) {
  const shelfMat = new THREE.MeshStandardMaterial({ color: 0x2a2420, roughness: 0.7, metalness: 0.1 });
  const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.02, 0.15), shelfMat);
  shelf.position.set(x, y, z + 0.08);
  shelf.castShadow = true;
  scene.add(shelf);

  // Brackets
  const bracketMat = new THREE.MeshStandardMaterial({ color: 0x333338, metalness: 0.6, roughness: 0.3 });
  [-0.22, 0.22].forEach(dx => {
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.1, 0.008), bracketMat);
    bracket.position.set(x + dx, y - 0.05, z + 0.02);
    scene.add(bracket);
  });

  // Small objects on shelf
  const miniBook = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.12, 0.02),
    new THREE.MeshStandardMaterial({ color: 0xe95420, roughness: 0.7 })
  );
  miniBook.position.set(x - 0.15, y + 0.07, z + 0.08);
  miniBook.rotation.y = 0.1;
  scene.add(miniBook);

  const miniFrame = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.1, 0.01),
    new THREE.MeshStandardMaterial({ color: 0x444448, roughness: 0.5, metalness: 0.3 })
  );
  miniFrame.position.set(x + 0.1, y + 0.06, z + 0.06);
  miniFrame.rotation.y = -0.15;
  scene.add(miniFrame);
}

// ─── Desk Photo Frame ────────────────────────────────────────
function createDeskPhotoFrame(deskY, deskZ) {
  const fw = 0.1, fh = 0.13, fd = 0.015;
  const frameX = -0.68;
  const frameY = deskY + fh / 2 + 0.01;
  const frameZ = deskZ - 0.15;
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x3a3028, roughness: 0.55, metalness: 0.2 });
  const frame = new THREE.Mesh(new THREE.BoxGeometry(fw + 0.016, fh + 0.016, fd), frameMat);
  frame.position.set(frameX, frameY, frameZ);
  frame.rotation.x = -0.12;
  frame.castShadow = true;
  scene.add(frame);

  const photoGeo = new THREE.PlaneGeometry(fw, fh);
  const fallback = makeFallbackPosterTexture(fw, fh, 'HA');
  const photoMat = new THREE.MeshStandardMaterial({ map: fallback, roughness: 0.6 });
  const photo = new THREE.Mesh(photoGeo, photoMat);
  photo.position.set(frameX, frameY, frameZ + fd / 2 + 0.001);
  photo.rotation.x = -0.12;
  scene.add(photo);

  if (typeof window !== 'undefined' && window.location && window.location.protocol !== 'file:') {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load('./images/mypicture.jpg', function (tex) {
      photoMat.map = tex;
      photoMat.needsUpdate = true;
    });
  }

  const standMat = new THREE.MeshStandardMaterial({ color: 0x3a3028, roughness: 0.55, metalness: 0.2 });
  const stand = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.08, 0.045), standMat);
  stand.position.set(frameX, deskY + 0.038, frameZ - 0.022);
  stand.rotation.x = -0.35;
  scene.add(stand);
}

// ─── Bookcase (left side of room) ────────────────────────────
function createBookcase(x, y, z) {
  const bcW = 0.6, bcH = 1.8, bcD = 0.28;
  const shelfCount = 5;

  createBookcaseFrame(x, y, z, bcW, bcH, bcD, shelfCount);
  populateBookcaseShelves(x, y, z, bcW, bcH, bcD, shelfCount);
}

function createBookcaseFrame(x, y, z, bcW, bcH, bcD, shelfCount) {
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x2a2420, roughness: 0.7, metalness: 0.08 });

  const backPanel = new THREE.Mesh(new THREE.BoxGeometry(bcW, bcH, 0.015), woodMat);
  backPanel.position.set(x, y + bcH / 2, z - bcD / 2 + 0.008);
  backPanel.castShadow = true;
  scene.add(backPanel);

  const sideMat = new THREE.MeshStandardMaterial({ color: 0x252018, roughness: 0.7, metalness: 0.08 });
  [-1, 1].forEach(s => {
    const side = new THREE.Mesh(new THREE.BoxGeometry(0.018, bcH, bcD), sideMat);
    side.position.set(x + s * (bcW / 2 - 0.009), y + bcH / 2, z);
    side.castShadow = true;
    scene.add(side);
  });

  for (let i = 0; i <= shelfCount; i++) {
    const shelfY = y + (i / shelfCount) * bcH;
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(bcW, 0.018, bcD), woodMat);
    shelf.position.set(x, shelfY + 0.009, z);
    shelf.receiveShadow = true;
    scene.add(shelf);
  }
}

function populateBookcaseShelves(x, y, z, bcW, bcH, bcD, shelfCount) {
  const shelfH = bcH / shelfCount;
  const innerW = bcW - 0.04;
  const bookColors = [
    [0x8b2020, 0x1a3060, 0x2a5030, 0xe95420, 0x4a3060],
    [0x77216f, 0x1a4060, 0x604020, 0x205040],
    [0xc0392b, 0x2980b9, 0x27ae60, 0xf39c12],
    [0x8e44ad, 0x2c3e50, 0xd35400],
    [0x16a085, 0xc0392b, 0x2c3e50, 0xe74c3c, 0x3498db]
  ];

  bookColors.forEach((colors, shelfIdx) => {
    const baseY = y + shelfIdx * shelfH + 0.02;
    placeBooks(colors, x, baseY, z, innerW, shelfH, bcD);
    placeShelfDecor(shelfIdx, x, baseY, z, innerW);
  });
}

function placeBooks(colors, x, baseY, z, innerW, shelfH, bcD) {
  let offsetX = x - innerW / 2 + 0.02;
  colors.forEach(color => {
    const bw = 0.02 + Math.random() * 0.015;
    const bh = shelfH * 0.7 + Math.random() * shelfH * 0.2;
    const bd = bcD * 0.65 + Math.random() * bcD * 0.15;
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(bw, bh, bd),
      new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0 })
    );
    book.position.set(offsetX + bw / 2, baseY + bh / 2, z + 0.02);
    book.rotation.y = (Math.random() - 0.5) * 0.04;
    book.castShadow = true;
    scene.add(book);
    offsetX += bw + 0.003;
  });
}

function placeShelfDecor(shelfIdx, x, baseY, z, innerW) {
  if (shelfIdx === 1) {
    const potMat = new THREE.MeshStandardMaterial({ color: 0x8b6040, roughness: 0.85 });
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.02, 0.04, 8), potMat);
    pot.position.set(x + innerW / 2 - 0.04, baseY + 0.02, z + 0.02);
    scene.add(pot);
    const leaf = new THREE.Mesh(
      new THREE.ConeGeometry(0.015, 0.04, 5),
      new THREE.MeshStandardMaterial({ color: 0x3a8040, roughness: 0.7 })
    );
    leaf.position.set(x + innerW / 2 - 0.04, baseY + 0.06, z + 0.02);
    scene.add(leaf);
  }

  if (shelfIdx === 3) {
    const orbMat = new THREE.MeshStandardMaterial({ color: 0x6090c0, roughness: 0.2, metalness: 0.5 });
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.025, 12, 12), orbMat);
    orb.position.set(x + innerW / 2 - 0.05, baseY + 0.028, z + 0.02);
    scene.add(orb);
  }
}

// ─── Interaction ─────────────────────────────────────────────
function onSceneClick(event) {
  if (!isLoaded || controls.isLocked) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObject(screenMesh);

  if (hits.length > 0) {
    const uv = hits[0].uv;
    for (const area of clickableScreenAreas) {
      if (uv.x >= area.uMin && uv.x <= area.uMax && uv.y >= area.vMin && uv.y <= area.vMax) {
        openWindow(area.window);
        return;
      }
    }
  }
}

function onSceneHover(event) {
  if (!isLoaded || controls.isLocked) return;
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const hits = raycaster.intersectObject(screenMesh);
  let overTile = false;
  if (hits.length > 0 && hits[0].uv) {
    const uv = hits[0].uv;
    for (const area of clickableScreenAreas) {
      if (uv.x >= area.uMin && uv.x <= area.uMax && uv.y >= area.vMin && uv.y <= area.vMax) {
        overTile = true;
        break;
      }
    }
  }
  renderer.domElement.style.cursor = overTile ? 'pointer' : 'grab';
}

function onKeyDown(e) {
  switch (e.code) {
    case 'KeyW': case 'ArrowUp':    moveForward  = true; break;
    case 'KeyS': case 'ArrowDown':  moveBackward = true; break;
    case 'KeyA': case 'ArrowLeft':  moveLeft     = true; break;
    case 'KeyD': case 'ArrowRight': moveRight    = true; break;
  }
}

function onKeyUp(e) {
  switch (e.code) {
    case 'KeyW': case 'ArrowUp':    moveForward  = false; break;
    case 'KeyS': case 'ArrowDown':  moveBackward = false; break;
    case 'KeyA': case 'ArrowLeft':  moveLeft     = false; break;
    case 'KeyD': case 'ArrowRight': moveRight    = false; break;
  }
}

// ─── Windows ─────────────────────────────────────────────────
function openWindow(id) {
  const win = document.getElementById(id);
  if (win) {
    lastFocusedElement = document.activeElement;
    win.classList.add('active');
    win.dataset.minimized = 'false';
    win.setAttribute('aria-hidden', 'false');
    if (!win.dataset.positioned) {
      win.style.left = '50%';
      win.style.top = '50%';
      win.style.transform = 'translate(-50%, -50%)';
      win.dataset.positioned = 'true';
    }
    focusWindowElement(win);
    makeDraggable(win);
    focusWindow(win);
  }
  // Hide onboarding guide after first interaction
  const guide = document.getElementById('guide');
  if (guide && !guide.classList.contains('hidden')) {
    guide.classList.add('hidden');
  }
}

function closeWindow(id) {
  const win = document.getElementById(id);
  if (win) {
    win.classList.remove('active');
    win.setAttribute('aria-hidden', 'true');
    if (activeWindow === win) activeWindow = null;
  }
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}
window.closeWindow = closeWindow;

function minimizeWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.classList.remove('active');
  win.dataset.minimized = 'true';
  win.setAttribute('aria-hidden', 'true');
  if (activeWindow === win) activeWindow = null;
}
window.minimizeWindow = minimizeWindow;

function focusWindowElement(win) {
  windowZCounter += 1;
  win.style.zIndex = String(windowZCounter);
  activeWindow = win;
}

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
    .filter(el => !el.hasAttribute('disabled'));
}

function focusWindow(win) {
  const focusable = getFocusableElements(win);
  if (focusable.length > 0) focusable[0].focus();
  else win.focus();
}

function makeDraggable(el) {
  const header = el.querySelector('.window-header');
  if (!header) return;
  let dragging = false, sx, sy, ix, iy;

  if (el.dataset.draggableBound === 'true') return;
  el.dataset.draggableBound = 'true';

  header.onmousedown = e => {
    if (e.target.classList.contains('window-btn')) return;
    focusWindowElement(el);
    dragging = true;
    sx = e.clientX; sy = e.clientY;
    const r = el.getBoundingClientRect();
    ix = r.left; iy = r.top;
    el.style.transform = 'none';
  };
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    el.style.left = ix + e.clientX - sx + 'px';
    el.style.top  = iy + e.clientY - sy + 'px';
  });
  document.addEventListener('mouseup', () => { dragging = false; });
}

document.addEventListener('mousedown', e => {
  const win = e.target.closest('.ubuntu-window.active');
  if (win) focusWindowElement(win);
});

document.addEventListener('keydown', e => {
  if (!activeWindow || e.key !== 'Tab') return;

  const focusable = getFocusableElements(activeWindow);
  if (focusable.length === 0) {
    e.preventDefault();
    activeWindow.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

// ─── Physics ─────────────────────────────────────────────────
function updatePhysics(delta) {
  if (!controls.isLocked) return;

  velocity.x -= velocity.x * 10 * delta;
  velocity.z -= velocity.z * 10 * delta;

  direction.z = Number(moveForward) - Number(moveBackward);
  direction.x = Number(moveRight) - Number(moveLeft);
  direction.normalize();

  const speed = 3.5;
  if (moveForward || moveBackward) velocity.z -= direction.z * speed * delta;
  if (moveLeft || moveRight)       velocity.x -= direction.x * speed * delta;

  controls.moveRight(-velocity.x * delta);
  controls.moveForward(-velocity.z * delta);

  // Clamp inside room
  const cam = controls.getObject().position;
  const hw = ROOM_W / 2 - 0.3, hd = ROOM_D / 2 - 0.3;
  cam.x = Math.max(-hw, Math.min(hw, cam.x));
  cam.z = Math.max(-hd, Math.min(hd, cam.z));
  cam.y = 1.6;
}

// ─── Screen clock update ─────────────────────────────────────
function updateScreenClock() {
  if (!screenMesh || !screenMesh.material.map) return;
  const now = Date.now();
  if (now - lastClockUpdate < 30000) return;
  lastClockUpdate = now;

  const c = screenMesh.material.map.image;
  if (!c) return;
  const ctx = c.getContext('2d');

  // Repaint top bar clock region
  ctx.fillStyle = 'rgba(18,18,22,0.92)';
  ctx.fillRect(c.width * 0.35, 0, c.width * 0.3, 32);

  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  ctx.font = 'bold 13px Ubuntu, Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${dateStr}  ${timeStr}`, c.width / 2, 21);

  screenMesh.material.map.needsUpdate = true;
}

// ─── Animation loop ──────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);

  const now = performance.now();
  const delta = Math.min((now - prevTime) / 1000, 0.1);
  prevTime = now;

  updatePhysics(delta);

  if (!controls.isLocked && window.orbitControls) {
    window.orbitControls.update();
  }

  updateScreenClock();
  renderer.render(scene, camera);
}
