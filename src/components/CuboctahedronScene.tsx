import { useEffect, useRef } from 'react';
import { setupScene, setupCamera, setupRenderer, setupLights } from './three/SceneSetup';
import { buildCuboctahedron } from './three/CuboctahedronBuilder';
import { createSceneControls } from './three/SceneControls';

const CuboctahedronScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = setupScene();
    const camera = setupCamera();
    const renderer = setupRenderer();
    mountRef.current.appendChild(renderer.domElement);

    setupLights(scene);

    const cuboctahedronGroup = buildCuboctahedron();
    scene.add(cuboctahedronGroup);

    const controls = createSceneControls(camera, renderer, cuboctahedronGroup);

    window.addEventListener('mousedown', controls.handleMouseDown);
    window.addEventListener('mousemove', controls.handleMouseMove);
    window.addEventListener('mouseup', controls.handleMouseUp);
    window.addEventListener('wheel', controls.handleWheel);
    window.addEventListener('resize', controls.handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousedown', controls.handleMouseDown);
      window.removeEventListener('mousemove', controls.handleMouseMove);
      window.removeEventListener('mouseup', controls.handleMouseUp);
      window.removeEventListener('wheel', controls.handleWheel);
      window.removeEventListener('resize', controls.handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default CuboctahedronScene;