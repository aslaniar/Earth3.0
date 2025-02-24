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
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <div style={{ position: "relative", width: "500px", height: "500px" }}>
                <Canvas
                    dpr={[1, 2]}
                    shadows
                    camera={{ fov: 45 }}
                    style={{ width: "500px", height: "500px" }}
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
            </div>
            <div
                style={{
                    marginLeft: "20px",
                    color: "#fff",
                    maxWidth: "400px",
                    fontFamily: "sans-serif",
                    lineHeight: 1.5
                }}
            >
                <h2>Celeste / Schrödinger – Dawn’s Enigmatic Feline Companion</h2>
                <p>
                    Celeste is no ordinary cat. Rescued from humble beginnings, this playful orange feline provides comic relief in Dawn’s daily life—knocking over picture frames, playfully swiping at phones, and even prompting an accidental taste test of a cat treat. Yet beneath her mischievous exterior lies a deeper, almost quantum mystery. In moments of cosmic significance, Celeste transforms into Schrödinger—a wry, wise guide whose rare, articulate interjections hint at hidden knowledge and the paradoxical nature of existence. Balancing humor with profound insight, she bridges the gap between everyday chaos and the celestial journey that awaits Dawn, embodying both loyalty and the unpredictable spark of serendipity.
                </p>
            </div>
        </div>
    );
};

useGLTF.preload("/ocat.glb");
export default Gallery;
