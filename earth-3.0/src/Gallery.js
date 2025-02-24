import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls } from "@react-three/drei";

function Model(props) {
    const { scene } = useGLTF("/ocat.glb");
    return <primitive object={scene} {...props} />

}

export default function App() {
    return (
        <Canvas dpr={[1, 2]} shadows camera={{fov: 45}} style={{"position": "absolute"}}>
            <color attach="background" args={["#101010"]}/>
            <ambientLight intensity={0.8}/>
            <directionalLight
                castShadow
                position={[10, 10, 10]}
                intensity={1}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
            <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
                <Model scale={0.01}/>
            </PresentationControls>
        </Canvas>
    );
}
