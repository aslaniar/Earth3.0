import { FC, useState, useEffect } from 'react';
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Sky } from "@react-three/drei";
import { Vector3 } from "three";

interface ModelProps {
    modelPath: string;
    scale?: number | [number, number, number];
    position?: [number, number, number];
    rotation?: [number, number, number];
}

const Model: FC<ModelProps> = ({ modelPath, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
    const { scene } = useGLTF(modelPath);
    
    // Preload the model to ensure it's available
    useGLTF.preload(modelPath);
    
    return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
};

interface SceneProps {
    title: string;
    description: string;
    modelPath: string;
}

const CameraSetup = ({ position = [0, 0, 0], lookAt = [0, 0, 0] }) => {
    const { camera } = useThree();
    
    useEffect(() => {
        camera.position.set(position[0], position[1], position[2]);
        
        if (lookAt) {
            camera.lookAt(new Vector3(lookAt[0], lookAt[1], lookAt[2]));
        }
    }, [camera, position, lookAt]);
    
    return null;
};

const Scene: FC<SceneProps> = ({ title, description, modelPath }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const initialCameraPosition = [1, 2, 10];
    const initialLookAtPoint = [10, 0, 3];
    
    const sceneCenter = [0, 0, 0];
    
    const modelPosition: [number, number, number] = [0, 0, 0];
    const modelScale = 1;
    const modelRotation: [number, number, number] = [0, 0, 0];
    
    return (
        <div 
            className="scene-container"
            style={{
                width: '100%',
                margin: '2rem 0',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                boxShadow: isHovered
                    ? '0 8px 30px rgba(76, 165, 255, 0.2)'
                    : '0 4px 20px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Scene Title */}
            <div
                style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}
            >
                <h3
                    style={{
                        fontSize: '1.8rem',
                        margin: 0,
                        color: '#4ca5ff',
                    }}
                >
                    {title}
                </h3>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
                className="scene-content"
            >
                {/* 3D Model Canvas */}
                <div
                    style={{
                        flex: '1 1 65%',
                        height: '500px',
                        position: 'relative',
                        background: 'linear-gradient(45deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))'
                    }}
                >
                    <Canvas 
                        camera={{ 
                            fov: 75, 
                            near: 0.1,
                            far: 10000
                        }}
                        gl={{ antialias: true }}
                        shadows
                    >
                        <CameraSetup position={initialCameraPosition} lookAt={initialLookAtPoint} />
                        
                        <group position={[sceneCenter[0], sceneCenter[1], sceneCenter[2]]}>
                            <ambientLight intensity={0.4} />
                            <directionalLight 
                                intensity={0.6}
                                position={[10, 10, 5]} 
                                castShadow
                                shadow-mapSize-width={1024}
                                shadow-mapSize-height={1024}
                            />
                            
                            <Model 
                                modelPath={modelPath} 
                                scale={modelScale} 
                                position={modelPosition} 
                                rotation={modelRotation} 
                            />
                        </group>
                        
                        {/* Add sky if needed as a fallback */}
                        <Sky 
                            distance={450}
                            sunPosition={[0, 1, 0]}
                            inclination={0}
                            azimuth={0.25}
                        />
                        
                        {/* Controls for navigation */}
                        <OrbitControls 
                            enableZoom={true} 
                            enablePan={true}
                            minDistance={0.1}
                            maxDistance={500}
                            enableDamping
                            dampingFactor={0.05}
                            target={new Vector3(initialLookAtPoint[0], initialLookAtPoint[1], initialLookAtPoint[2])}
                            makeDefault 
                        />
                    </Canvas>
                </div>

                {/* Description */}
                <div
                    style={{
                        flex: '1 1 35%',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        color: '#fff',
                        textAlign: 'left',
                        position: 'relative',
                    }}
                >
                    <p
                        style={{
                            fontSize: '1rem',
                            lineHeight: 1.7,
                            color: 'rgba(255, 255, 255, 0.9)'
                        }}
                    >
                        {description}
                    </p>
                    
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
                        <span>Explore Scene</span>
                        <span>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
interface SlideShowProps {
    title: string;
    description: string;
    imagePaths: string[];
}

const SlideShow: FC<SlideShowProps> = ({ title, description, imagePaths }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
        }, 5000);
        
        return () => clearInterval(timer);
    }, [imagePaths.length]);
    
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    };
    
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? imagePaths.length - 1 : prevIndex - 1
        );
    };
    
    return (
        <div 
            className="scene-container"
            style={{
                width: '100%',
                margin: '2rem 0',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                boxShadow: isHovered
                    ? '0 8px 30px rgba(76, 165, 255, 0.2)'
                    : '0 4px 20px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Scene Title */}
            <div
                style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}
            >
                <h3
                    style={{
                        fontSize: '1.8rem',
                        margin: 0,
                        color: '#4ca5ff',
                    }}
                >
                    {title}
                </h3>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
                className="scene-content"
            >
                <div
                    style={{
                        flex: '1 1 65%',
                        height: '500px',
                        position: 'relative',
                        background: 'linear-gradient(45deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))'
                    }}
                >
                    <img 
                        src={imagePaths[currentImageIndex]} 
                        alt={`Slide ${currentImageIndex + 1}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            padding: '0',
                            transition: 'opacity 0.5s ease-in-out'
                        }}
                    />
                </div>

                {/* Description */}
                <div
                    style={{
                        flex: '1 1 35%',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        color: '#fff',
                        textAlign: 'left',
                        position: 'relative',
                    }}
                >
                    <p
                        style={{
                            fontSize: '1rem',
                            lineHeight: 1.7,
                            color: 'rgba(255, 255, 255, 0.9)'
                        }}
                    >
                        {description}
                    </p>
                    
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
                        <span>View Gallery</span>
                        <span>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const CreativeSection: FC = () => {
    const spaceBeachImages = [
        "/SpaceBeach1.png",
        "/SpaceBeach2.png",
        "/SpaceBeach3.png"
    ];

    const cityImages = [
        "/city1.png",
        "/city2.png",
        "/city3.png",
        "/city4.png"
    ];

    const scenes = [
        {
            id: 1,
            title: "Schrodingers Rooms",
            description: "Using Unreal Engine, we designed how we might imagine his room to be. In his own private futuristic room, he carefully includes artifacts and remnants from his time on Earth.",
            modelPath: "/CatScene.glb",
            type: "3d"
        },
        {
            id: 2,
            title: "Earth 2.0",
            description: "Using Unreal Engine, we designed a scene to represent Earth 2.0 — the current version of Earth and the one Dawn grew up in. Taking inspiration from modern big cities, this scene includes tall skyscrapers and a glowing sunset.",
            images: cityImages,
            type: "slideshow"
        },
        {
            id: 3,
            title: "Space Hub",
            description: "Using Unreal Engine, we designed the place Dawn gets transported to at the beginning of the show. Its meant to be a beach floating in space where you can overlook Earth 2.0. It is also where the ship, which is the main location for the show, can be found.",
            images: spaceBeachImages,
            type: "slideshow"
        }
    ];

    return (
        <div
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '2rem',
            }}
        >
            {/* Section intro */}
            <div
                style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    position: 'relative',
                    padding: '2rem'
                }}
            >
            </div>

            {/* Scenes */}
            <div>
                {scenes.map(scene => (
                    scene.type === "3d" ? (
                        <Scene
                            key={scene.id}
                            title={scene.title}
                            description={scene.description}
                            modelPath={scene.modelPath as string}
                        />
                    ) : (
                        <SlideShow
                            key={scene.id}
                            title={scene.title}
                            description={scene.description}
                            imagePaths={scene.images as string[]}
                        />
                    )
                ))}
            </div>
        </div>
    );
};

export default CreativeSection; 