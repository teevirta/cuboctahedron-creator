import * as THREE from 'three';

export interface SceneControls {
  handleMouseDown: (e: MouseEvent) => void;
  handleMouseMove: (e: MouseEvent) => void;
  handleMouseUp: () => void;
  handleWheel: (e: WheelEvent) => void;
  handleResize: () => void;
}

export const createSceneControls = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  group: THREE.Group
): SceneControls => {
  let isDragging = false;
  let previousMousePosition = {
    x: 0,
    y: 0
  };

  const handleMouseDown = () => {
    isDragging = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      group.rotation.y += deltaMove.x * 0.01;
      group.rotation.x += deltaMove.y * 0.01;
    }

    previousMousePosition = {
      x: e.clientX,
      y: e.clientY
    };
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleWheel = (e: WheelEvent) => {
    camera.position.z += e.deltaY * 0.01;
    camera.position.z = Math.max(2, Math.min(10, camera.position.z));
  };

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleResize
  };
};