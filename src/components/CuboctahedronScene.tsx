import { useEffect, useRef } from 'react';
import * as THREE from 'three';

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
    const geometry = new THREE.BufferGeometry();

    // Vertices for a proper cuboctahedron
    const vertices = [
      // Top square vertices
      new THREE.Vector3(1, 1, 0),    // 0
      new THREE.Vector3(-1, 1, 0),   // 1
      new THREE.Vector3(0, 1, 1),    // 2
      new THREE.Vector3(0, 1, -1),   // 3
      
      // Bottom square vertices
      new THREE.Vector3(1, -1, 0),   // 4
      new THREE.Vector3(-1, -1, 0),  // 5
      new THREE.Vector3(0, -1, 1),   // 6
      new THREE.Vector3(0, -1, -1),  // 7
      
      // Middle square vertices
      new THREE.Vector3(1, 0, 1),    // 8
      new THREE.Vector3(-1, 0, 1),   // 9
      new THREE.Vector3(1, 0, -1),   // 10
      new THREE.Vector3(-1, 0, -1),  // 11
    ];

    // Define faces (indices) with correct winding order
    const indices = [
      // Top triangular faces
      0, 8, 2,    1, 9, 2,    0, 3, 10,    1, 3, 11,
      
      // Bottom triangular faces
      8, 4, 6,    9, 6, 5,    10, 7, 4,    11, 5, 7,
      
      // Middle square faces
      8, 0, 10,   10, 4, 8,     // Right square
      9, 1, 11,   11, 5, 9,     // Left square
      8, 6, 2,    2, 8, 9,      // Front square
      10, 3, 7,   11, 7, 3,     // Back square
      0, 2, 3,    3, 2, 1,      // Top square
      4, 7, 6,    6, 7, 5       // Bottom square
    ];

    // Convert vertices to flat array
    const verticesArray = new Float32Array(vertices.length * 3);
    vertices.forEach((vertex, i) => {
      verticesArray[i * 3] = vertex.x;
      verticesArray[i * 3 + 1] = vertex.y;
      verticesArray[i * 3 + 2] = vertex.z;
    });

    // Set attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(verticesArray, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhongMaterial({
      color: 0x4A90E2,
      shininess: 100,
      specular: 0x4A90E2,
      flatShading: true,
    });

    const cuboctahedron = new THREE.Mesh(geometry, material);
    scene.add(cuboctahedron);

    // Interaction state
    let isDragging = false;
    let previousMousePosition = {
      x: 0,
      y: 0
    };

    // Mouse controls
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y
        };

        cuboctahedron.rotation.y += deltaMove.x * 0.01;
        cuboctahedron.rotation.x += deltaMove.y * 0.01;
      }

      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Zoom controls
    const handleWheel = (e: WheelEvent) => {
      camera.position.z += e.deltaY * 0.01;
      camera.position.z = Math.max(2, Math.min(10, camera.position.z));
    };

    // Window resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Add event listeners
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (!isDragging) {
        cuboctahedron.rotation.x += 0.001;
        cuboctahedron.rotation.y += 0.002;
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
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default CuboctahedronScene;
