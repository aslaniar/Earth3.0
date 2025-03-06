import { FC } from 'react';
import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls } from "@react-three/drei";

interface ModelProps {
    modelPath: string;
    scale?: number | [number, number, number];
    position?: [number, number, number];
    rotation?: [number, number, number];
}

const Model: FC<ModelProps> = ({ modelPath, scale = 1, position, rotation }) => {
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
};

interface GalleryItemProps {
    modelPath: string;
}

const GalleryItem: FC<GalleryItemProps> = ({ modelPath }) => {
    return (
        <div
            style={{
                width: '300px',
                height: '300px',
                margin: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: "#101010"
            }}
        >
            <Canvas camera={{ fov: 45 }}>
                <ambientLight intensity={0.8} />
                <directionalLight intensity={1} position={[10, 10, 10]} />
                <PresentationControls
                    speed={1.5}
                    global
                    zoom={0.5}
                    polar={[-0.1, Math.PI / 4]}
                >
                    <Model modelPath={modelPath} scale={1} />
                </PresentationControls>
            </Canvas>
        </div>
    );
};

interface GalleryProps {
    collectibles: { id: number, modelPath: string }[];
}

const Gallery: FC<GalleryProps> = ({ collectibles }) => {
    return (
        <div
            style={{
                padding: '2rem',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
            }}
        >
            {collectibles.map(item => (
                <GalleryItem key={item.id} modelPath={item.modelPath} />
            ))}
        </div>
    );
};

export default Gallery;
