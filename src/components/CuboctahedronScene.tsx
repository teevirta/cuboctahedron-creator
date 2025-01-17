import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { setupScene } from '../utils/sceneSetup';
import { createCuboctahedronGeometry } from '../utils/cuboctahedronGeometry';
import { setupLighting } from '../utils/lighting';
import { setupControls } from '../utils/controls';
import { FACE_COLORS } from '../constants/colors';

const CuboctahedronScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const { scene, camera, renderer } = setupScene(mountRef.current);
    setupLighting(scene);

    const { geometry, materials } = createCuboctahedronGeometry(FACE_COLORS);
    const cuboctahedronGroup = new THREE.Group();
    scene.add(cuboctahedronGroup);

    const cleanup = setupControls(cuboctahedronGroup, camera, renderer, scene);

    return () => {
      cleanup();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default CuboctahedronScene;