import { FC, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls, Environment } from "@react-three/drei";

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
    description: string;
    index: number;
}

const GalleryItem: FC<GalleryItemProps> = ({ modelPath, description, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Alternate layout for items (left-right-left-right)
    const isEven = index % 2 === 0;

    return (
        <div
            className="gallery-item"
            style={{
                width: '100%',
                margin: '2rem 0',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                display: 'flex',
                flexDirection: isEven ? 'row' : 'row-reverse',
                boxShadow: isHovered
                    ? '0 8px 30px rgba(76, 165, 255, 0.2)'
                    : '0 4px 20px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 3D Model Canvas */}
            <div
                style={{
                    flex: '1 1 50%',
                    height: '400px',
                    position: 'relative',
                    background: 'linear-gradient(45deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))'
                }}
            >
                <Canvas camera={{ fov: 45 }}>
                    <ambientLight intensity={1} />
                    <spotLight intensity={1.5} position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <directionalLight intensity={1} position={[10, 10, 10]} />
                    <Environment preset="city" />
                    <PresentationControls
                        global
                        zoom={0.8}
                        rotation={[0, isEven ? -Math.PI / 12 : Math.PI / 12, 0]}
                        polar={[-Math.PI / 3, Math.PI / 3]}
                        azimuth={[-Math.PI / 1.5, Math.PI / 1.5]}
                    >
                        <Model modelPath={modelPath} scale={1.2} />
                    </PresentationControls>
                </Canvas>

                {/* Object number indicator */}
                <div
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: isEven ? '20px' : 'auto',
                        right: isEven ? 'auto' : '20px',
                        background: 'rgba(76, 165, 255, 0.8)',
                        color: 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    {index + 1}
                </div>
            </div>

            {/* Description */}
            <div
                style={{
                    flex: '1 1 50%',
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: '#fff',
                    textAlign: 'left',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Background gradient */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: isEven
                            ? 'linear-gradient(135deg, rgba(76, 165, 255, 0.05), transparent)'
                            : 'linear-gradient(-135deg, rgba(76, 165, 255, 0.05), transparent)',
                        zIndex: 0
                    }}
                />

                {/* Description text with a subtle highlight for the first sentence */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {description.split('.').map((sentence, idx) => {
                        if (sentence.trim() === '') return null;

                        // First sentence styling
                        if (idx === 0) {
                            return (
                                <p
                                    key={idx}
                                    style={{
                                        fontSize: '1.4rem',
                                        fontWeight: 'bold',
                                        marginBottom: '1.5rem',
                                        color: '#4ca5ff',
                                        lineHeight: 1.4
                                    }}
                                >
                                    {sentence.trim()}.
                                </p>
                            );
                        }

                        return (
                            <p
                                key={idx}
                                style={{
                                    fontSize: '1rem',
                                    lineHeight: 1.7,
                                    marginBottom: '0.8rem',
                                    color: 'rgba(255, 255, 255, 0.9)'
                                }}
                            >
                                {sentence.trim()}.
                            </p>
                        );
                    })}
                </div>

                {/* Interactive button */}
                <button
                    style={{
                        marginTop: '2rem',
                        alignSelf: 'flex-start',
                        background: 'rgba(76, 165, 255, 0.15)',
                        border: '1px solid rgba(76, 165, 255, 0.3)',
                        color: '#4ca5ff',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <span>Interact</span>
                    <span>→</span>
                </button>
            </div>
        </div>
    );
};

interface GalleryProps {
    collectibles: { id: number; modelPath: string; description: string }[];
}

const Gallery: FC<GalleryProps> = ({ collectibles }) => {
    return (
        <div
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '2rem',
            }}
        >
            {/* Gallery intro section */}
            <div
                style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    position: 'relative',
                    padding: '2rem'
                }}
            >
                <h2
                    style={{
                        fontSize: '2.5rem',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(90deg, #4ca5ff, #1da1f2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                    }}
                >
                    Artifacts of Earth3.0
                </h2>
                <p
                    style={{
                        fontSize: '1.1rem',
                        maxWidth: '800px',
                        margin: '0 auto',
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 1.7
                    }}
                >
                    Explore these key objects that tell the story of our world's transformation.
                    Each artifact represents a crucial element in the narrative of Earth3.0.
                </p>
            </div>

            {/* Gallery items */}
            <div style={{ marginTop: '2rem' }}>
                {collectibles.map((item, index) => (
                    <GalleryItem
                        key={item.id}
                        modelPath={item.modelPath}
                        description={item.description}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Gallery;