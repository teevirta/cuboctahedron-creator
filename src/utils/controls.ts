import * as THREE from 'three';

export const setupControls = (
  group: THREE.Group,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene
) => {
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

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

  window.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
  window.addEventListener('wheel', handleWheel);
  window.addEventListener('resize', handleResize);

  const animate = () => {
    requestAnimationFrame(animate);

    if (!isDragging) {
      group.rotation.x += 0.001;
      group.rotation.y += 0.002;
    }

    renderer.render(scene, camera);
  };

  animate();

  return () => {
    window.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('resize', handleResize);
  };
};