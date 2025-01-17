import * as THREE from 'three';
import { createCuboctahedronGeometry } from './CuboctahedronGeometry';
import { createCuboctahedronMaterials } from './CuboctahedronMaterials';
import { createTextSprite } from './TextSprite';

export const buildCuboctahedron = () => {
  const { geometry, vertices, indices } = createCuboctahedronGeometry();
  const materials = createCuboctahedronMaterials();
  const cuboctahedronGroup = new THREE.Group();

  for (let i = 0; i < indices.length; i += 3) {
    const faceGeometry = new THREE.BufferGeometry();
    const faceVertices = new Float32Array(9);
    
    for (let j = 0; j < 3; j++) {
      const vertexIndex = indices[i + j];
      const vertex = vertices[vertexIndex];
      faceVertices[j * 3] = vertex.x;
      faceVertices[j * 3 + 1] = vertex.y;
      faceVertices[j * 3 + 2] = vertex.z;
    }
    
    faceGeometry.setAttribute('position', new THREE.BufferAttribute(faceVertices, 3));
    const faceMesh = new THREE.Mesh(faceGeometry, materials[Math.floor(i / 3)]);
    cuboctahedronGroup.add(faceMesh);
  }

  return cuboctahedronGroup;
};