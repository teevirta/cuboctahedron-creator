import * as THREE from 'three';

export const createCuboctahedronGeometry = () => {
  const geometry = new THREE.BufferGeometry();

  // Vertices
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

  // Convert vertices to flat array
  const verticesArray = new Float32Array(vertices.length * 3);
  vertices.forEach((vertex, i) => {
    verticesArray[i * 3] = vertex.x;
    verticesArray[i * 3 + 1] = vertex.y;
    verticesArray[i * 3 + 2] = vertex.z;
  });

  // Define faces (indices) - All faces oriented outward
  const indices = [
    // Top triangular faces
    0, 8, 2,    1, 2, 9,    0, 10, 3,    1, 11, 3,
    
    // Bottom triangular faces
    4, 8, 6,    5, 9, 6,    4, 7, 10,    5, 7, 11,
    
    // Middle square faces (split into triangles)
    0, 10, 8,   4, 8, 10,   // Right square
    1, 9, 11,   5, 11, 9,   // Left square
    2, 8, 9,    6, 9, 8,    // Front square
    3, 11, 10,  7, 10, 11,  // Back square
    0, 2, 1,    0, 1, 3,    // Top square
    4, 6, 5,    4, 5, 7     // Bottom square
  ];

  geometry.setAttribute('position', new THREE.BufferAttribute(verticesArray, 3));
  geometry.setIndex(indices);

  return { geometry, vertices, indices };
};