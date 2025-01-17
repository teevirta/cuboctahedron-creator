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

  // Define faces (indices)
  const indices = [
    // Top triangular faces
    0, 8, 2,    1, 9, 2,    0, 3, 10,    1, 3, 11,
    
    // Bottom triangular faces
    8, 4, 6,    9, 6, 5,    10, 7, 4,    11, 5, 7,
    
    // Middle square faces (split into triangles)
    8, 0, 10,   10, 4, 8,   // Right square
    9, 1, 11,   11, 5, 9,   // Left square
    8, 2, 6,    2, 8, 9,    // Front square (face 6 inverted)
    3, 10, 7,   11, 3, 7,   // Back square (faces 16 and 17 inverted)
    0, 2, 3,    3, 2, 1,    // Top square
    4, 7, 6,    6, 7, 5     // Bottom square
  ];

  geometry.setAttribute('position', new THREE.BufferAttribute(verticesArray, 3));
  geometry.setIndex(indices);

  return { geometry, vertices, indices };
};