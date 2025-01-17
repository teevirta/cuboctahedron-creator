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
    2, 8, 0,    2, 9, 1,    3, 0, 10,    3, 1, 11,
    
    // Bottom triangular faces
    6, 4, 8,    6, 5, 9,    7, 4, 10,    7, 5, 11,
    
    // Middle square faces (split into triangles)
    10, 0, 8,   8, 4, 10,   // Right square
    11, 1, 9,   9, 5, 11,   // Left square
    8, 2, 9,    9, 6, 8,    // Front square
    10, 3, 11,  11, 7, 10,  // Back square
    2, 0, 1,    3, 1, 0,    // Top square
    6, 7, 4,    7, 5, 6     // Bottom square
  ];

  geometry.setAttribute('position', new THREE.BufferAttribute(verticesArray, 3));
  geometry.setIndex(indices);

  return { geometry, vertices, indices };
};