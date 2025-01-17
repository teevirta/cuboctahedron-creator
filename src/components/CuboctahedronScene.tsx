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
    const geometry = new THREE.Geometry();

    // Vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const vertices = [
      new THREE.Vector3(1, 1, 1),
      new THREE.Vector3(-1, 1, 1),
      new THREE.Vector3(1, -1, 1),
      new THREE.Vector3(-1, -1, 1),
      new THREE.Vector3(1, 1, -1),
      new THREE.Vector3(-1, 1, -1),
      new THREE.Vector3(1, -1, -1),
      new THREE.Vector3(-1, -1, -1),
      new THREE.Vector3(0, phi, 1/phi),
      new THREE.Vector3(0, -phi, 1/phi),
      new THREE.Vector3(0, phi, -1/phi),
      new THREE.Vector3(0, -phi, -1/phi),
    ];

    // Add vertices to geometry
    vertices.forEach(vertex => geometry.vertices.push(vertex));

    // Add faces
    const faces = [
      [0, 8, 1], [0, 1, 2], [1, 3, 2], [0, 2, 4],
      [2, 6, 4], [1, 5, 3], [3, 7, 6], [0, 4, 8],
      [4, 10, 8], [1, 8, 5], [5, 8, 10], [3, 5, 7],
      [5, 10, 7], [4, 6, 10], [6, 7, 10], [2, 3, 6]
    ];

    faces.forEach(face => {
      geometry.faces.push(new THREE.Face3(face[0], face[1], face[2]));
    });

    geometry.computeFaceNormals();
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

    // Cleanup
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