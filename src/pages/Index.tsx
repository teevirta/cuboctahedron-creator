import CuboctahedronScene from '../components/CuboctahedronScene';

const Index = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <CuboctahedronScene />
      <div className="absolute top-4 left-0 w-full text-center text-white font-light">
        <h1 className="text-2xl mb-2">Interactive Cuboctahedron</h1>
        <p className="text-sm opacity-75">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default Index;