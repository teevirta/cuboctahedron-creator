import * as THREE from 'three';

export const setupScene = (mountElement: HTMLDivElement) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#1a1a1a');

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  mountElement.appendChild(renderer.domElement);

  return { scene, camera, renderer };
};