import * as THREE from 'three';

export const createTextSprite = (text: string) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return null;
  
  canvas.width = 64;
  canvas.height = 64;
  
  context.fillStyle = 'white';
  context.font = '48px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, 32, 32);
  
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(0.3, 0.3, 1);
  
  return sprite;
};