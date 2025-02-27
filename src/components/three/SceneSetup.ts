import * as THREE from 'three';

export const setupScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#1a1a1a');
  return scene;
};

export const setupCamera = () => {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  return camera;
};

export const setupRenderer = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  return renderer;
};

export const setupLights = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const backLight = new THREE.DirectionalLight(0x4A90E2, 1);
  backLight.position.set(-1, -1, -1);
  scene.add(backLight);
};