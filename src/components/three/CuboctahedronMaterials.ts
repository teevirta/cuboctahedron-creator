import * as THREE from 'three';

export const createCuboctahedronMaterials = () => {
  const colors = [
    '#9b87f5', '#7E69AB', '#6E59A5', '#F2FCE2',
    '#FEF7CD', '#FEC6A1', '#E5DEFF', '#FFDEE2',
    '#FDE1D3', '#D3E4FD', '#F1F0FB', '#8B5CF6',
    '#D946EF', '#F97316', '#0EA5E9', '#1EAEDB',
    '#33C3F0', '#0FA0CE', '#888888', '#F1F1F1'
  ];

  return colors.map(color => 
    new THREE.MeshPhongMaterial({
      color: new THREE.Color(color),
      shininess: 100,
      specular: 0x4A90E2,
      flatShading: true,
    })
  );
};