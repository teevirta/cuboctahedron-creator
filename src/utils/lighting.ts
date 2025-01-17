import * as THREE from 'three';

export const setupLighting = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const backLight = new THREE.DirectionalLight(0x4A90E2, 1);
  backLight.position.set(-1, -1, -1);
  scene.add(backLight);
};