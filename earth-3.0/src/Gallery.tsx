import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls } from "@react-three/drei";
import { FC } from "react";

interface ModelProps {
    scale?: number | [number, number, number];
    position?: [number, number, number];
    rotation?: [number, number, number];
}

const Model: FC<ModelProps> = (props) => {
    const { scene } = useGLTF("/ocat.glb");
    return <primitive object={scene} {...props} />;
};

interface GalleryProps {
    backgroundColor?: string;
    ambientLightIntensity?: number;
    directionalLightIntensity?: number;
}

const Gallery: FC<GalleryProps> = ({
                                       backgroundColor = "#101010",
                                       ambientLightIntensity = 0.8,
                                       directionalLightIntensity = 1
                                   }) => {
    return (
        <Canvas
            dpr={[1, 2]}
            shadows
            camera={{ fov: 45 }}
            style={{ position: "absolute",
                width: "500px",
                height: "500px"  }}
        >
            <color attach="background" args={[backgroundColor]} />
            <ambientLight intensity={ambientLightIntensity} />
            <directionalLight
                castShadow
                position={[10, 10, 10]}
                intensity={directionalLightIntensity}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
            <PresentationControls
                speed={1.5}
                global
                zoom={0.5}
                polar={[-0.1, Math.PI / 4]}
            >
                <Model scale={1} />
            </PresentationControls>
        </Canvas>
    );
};

useGLTF.preload("/ocat.glb");
export default Gallery;