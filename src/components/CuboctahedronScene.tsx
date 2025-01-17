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
      8, 6, 2,    2, 8, 9,    // Front square
      10, 3, 7,   11, 7, 3,   // Back square
      0, 2, 3,    3, 2, 1,    // Top square
      4, 7, 6,    6, 7, 5     // Bottom square
    ];

    // Manual normal overrides for specific faces
    const manualNormals: { [key: number]: THREE.Vector3 } = {
      // Example: Override normal for first triangle (indices 0,1,2)
      0: new THREE.Vector3(1, 1, 1).normalize(),
      // Add more manual overrides as needed
    };

    // Calculate face normals with manual overrides
    const normalsArray = new Float32Array(vertices.length * 3);
    const center = new THREE.Vector3(0, 0, 0);
    
    // Process each triangle face
    for (let i = 0; i < indices.length; i += 3) {
      const faceIndex = i / 3;
      const idx1 = indices[i];
      const idx2 = indices[i + 1];
      const idx3 = indices[i + 2];

      const v1 = vertices[idx1];
      const v2 = vertices[idx2];
      const v3 = vertices[idx3];

      let normal: THREE.Vector3;

      if (manualNormals[faceIndex]) {
        // Use manual override if specified
        normal = manualNormals[faceIndex].clone();
      } else {
        // Calculate normal using cross product
        const edge1 = new THREE.Vector3().subVectors(v2, v1);
        const edge2 = new THREE.Vector3().subVectors(v3, v1);
        normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize();

        // Calculate face center
        const faceCenter = new THREE.Vector3()
          .addVectors(v1, v2)
          .add(v3)
          .multiplyScalar(1/3);

        // Get direction from overall center to face center
        const directionToCenter = new THREE.Vector3()
          .subVectors(faceCenter, center)
          .normalize();

        // If normal is pointing inward (dot product with direction to center is negative)
        // then flip it
        if (normal.dot(directionToCenter) < 0) {
          normal.multiplyScalar(-1);
        }
      }

      // Apply the same normal to all three vertices of this face
      [idx1, idx2, idx3].forEach(idx => {
        normalsArray[idx * 3] = normal.x;
        normalsArray[idx * 3 + 1] = normal.y;
        normalsArray[idx * 3 + 2] = normal.z;
      });
    }

    // Set attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(verticesArray, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normalsArray, 3));
    geometry.setIndex(indices);

    // Colors for each face
    const colors = [
      '#9b87f5', // Face 0 - Primary Purple
      '#7E69AB', // Face 1 - Secondary Purple
      '#6E59A5', // Face 2 - Tertiary Purple
      '#F2FCE2', // Face 3 - Soft Green
      '#FEF7CD', // Face 4 - Soft Yellow
      '#FEC6A1', // Face 5 - Soft Orange
      '#E5DEFF', // Face 6 - Soft Purple
      '#FFDEE2', // Face 7 - Soft Pink
      '#FDE1D3', // Face 8 - Soft Peach
      '#D3E4FD', // Face 9 - Soft Blue
      '#F1F0FB', // Face 10 - Soft Gray
      '#8B5CF6', // Face 11 - Vivid Purple
      '#D946EF', // Face 12 - Magenta Pink
      '#F97316', // Face 13 - Bright Orange
      '#0EA5E9', // Face 14 - Ocean Blue
      '#1EAEDB', // Face 15 - Bright Blue
      '#33C3F0', // Face 16 - Sky Blue
      '#0FA0CE', // Face 17 - Bright Blue
      '#888888', // Face 18 - Gray
      '#F1F1F1'  // Face 19 - Light Gray
    ];

    // Create materials array
    const materials = colors.map(color => 
      new THREE.MeshPhongMaterial({
        color: new THREE.Color(color),
        shininess: 100,
        specular: 0x4A90E2,
        flatShading: true,
      })
    );

    // Create TextSprite function
    const createTextSprite = (text: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return null;
      
      canvas.width = 64;
      canvas.height = 64;
      
      context.fillStyle = 'white';
      context.font = '48px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, 32, 32);
      
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(0.3, 0.3, 1);
      
      return sprite;
    };

    const cuboctahedronGroup = new THREE.Group();

    // Create individual meshes for each face
    for (let i = 0; i < indices.length; i += 3) {
      const faceGeometry = new THREE.BufferGeometry();
      const faceVertices = new Float32Array(9);
      const faceNormals = new Float32Array(9);
      
      // Get vertices for this face
      for (let j = 0; j < 3; j++) {
        const vertexIndex = indices[i + j];
        faceVertices[j * 3] = verticesArray[vertexIndex * 3];
        faceVertices[j * 3 + 1] = verticesArray[vertexIndex * 3 + 1];
        faceVertices[j * 3 + 2] = verticesArray[vertexIndex * 3 + 2];
        
        faceNormals[j * 3] = normalsArray[vertexIndex * 3];
        faceNormals[j * 3 + 1] = normalsArray[vertexIndex * 3 + 1];
        faceNormals[j * 3 + 2] = normalsArray[vertexIndex * 3 + 2];
      }
      
      faceGeometry.setAttribute('position', new THREE.BufferAttribute(faceVertices, 3));
      faceGeometry.setAttribute('normal', new THREE.BufferAttribute(faceNormals, 3));
      
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
        // Move sprite slightly out from the face along its normal
        const normal = new THREE.Vector3(faceNormals[0], faceNormals[1], faceNormals[2]);
        sprite.position.add(normal.multiplyScalar(0.1));
        cuboctahedronGroup.add(sprite);
      }
      
      cuboctahedronGroup.add(faceMesh);
    }

    scene.add(cuboctahedronGroup);

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

        cuboctahedronGroup.rotation.y += deltaMove.x * 0.01;
        cuboctahedronGroup.rotation.x += deltaMove.y * 0.01;
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
        cuboctahedronGroup.rotation.x += 0.001;
        cuboctahedronGroup.rotation.y += 0.002;
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
