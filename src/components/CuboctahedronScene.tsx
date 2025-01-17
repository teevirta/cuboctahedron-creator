import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCuboctahedronGeometry } from './three/CuboctahedronGeometry';
import { createCuboctahedronMaterials } from './three/CuboctahedronMaterials';
import { createSceneControls } from './three/SceneControls';
import { createTextSprite } from './three/TextSprite';

const CuboctahedronScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1a1a1a');

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0x4A90E2, 1);
    backLight.position.set(-1, -1, -1);
    scene.add(backLight);

    // Create Cuboctahedron
    const { geometry, vertices, indices } = createCuboctahedronGeometry();
    const materials = createCuboctahedronMaterials();
    const cuboctahedronGroup = new THREE.Group();

    // Create individual meshes for each face
    for (let i = 0; i < indices.length; i += 3) {
      const faceGeometry = new THREE.BufferGeometry();
      const faceVertices = new Float32Array(9);
      
      // Get vertices for this face
      for (let j = 0; j < 3; j++) {
        const vertexIndex = indices[i + j];
        const vertex = vertices[vertexIndex];
        faceVertices[j * 3] = vertex.x;
        faceVertices[j * 3 + 1] = vertex.y;
        faceVertices[j * 3 + 2] = vertex.z;
      }
      
      faceGeometry.setAttribute('position', new THREE.BufferAttribute(faceVertices, 3));
      
      const faceMesh = new THREE.Mesh(faceGeometry, materials[Math.floor(i / 3)]);
      
      // Calculate face center for label placement
      const center = new THREE.Vector3();
      for (let j = 0; j < 3; j++) {
        center.x += faceVertices[j * 3] / 3;
        center.y += faceVertices[j * 3 + 1] / 3;
        center.z += faceVertices[j * 3 + 2] / 3;
      }
      
      // Create and position number label
      const faceNumber = Math.floor(i / 3);
      const sprite = createTextSprite(faceNumber.toString());
      if (sprite) {
        sprite.position.copy(center);
        sprite.position.multiplyScalar(1.1); // Move slightly outward
        cuboctahedronGroup.add(sprite);
      }
      
      cuboctahedronGroup.add(faceMesh);
    }

    scene.add(cuboctahedronGroup);

    // Setup controls
    const controls = createSceneControls(camera, renderer, cuboctahedronGroup);

    // Add event listeners
    window.addEventListener('mousedown', controls.handleMouseDown);
    window.addEventListener('mousemove', controls.handleMouseMove);
    window.addEventListener('mouseup', controls.handleMouseUp);
    window.addEventListener('wheel', controls.handleWheel);
    window.addEventListener('resize', controls.handleResize);

    // Animation loop
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