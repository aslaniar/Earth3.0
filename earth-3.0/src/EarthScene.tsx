// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);
//
// const EarthScene = () => {
//     const mountRef = useRef<HTMLDivElement>(null!);
//
//     useEffect(() => {
//         if (!mountRef.current) return;
//
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         camera.position.set(0, 0, 5);
//
//         const renderer = new THREE.WebGLRenderer({ alpha: true });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//
//         if (mountRef.current instanceof HTMLDivElement) {
//             mountRef.current.appendChild(renderer.domElement);
//         }
//
//         const loader = new GLTFLoader();
//
//         loader.load(
//             '/earth.glb',
//             (gltf) => {
//                 const earth = gltf.scene;
//                 earth.position.set(0, 0, 0);
//                 earth.scale.set(0.5, 0.5, 0.5);
//                 scene.add(earth);
//
//                 // Ambient light to add soft general lighting
//                 const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft light to prevent full darkness
//                 scene.add(ambientLight);
//
//                 // Directional light to act as the Sun
//                 const sunLight = new THREE.DirectionalLight(0xffffff, 3);
//                 sunLight.position.set(5, 3, 5); // Position the Sun-like light
//                 sunLight.castShadow = true;
//                 scene.add(sunLight);
//
//                 // Space background darkness - Optional but useful for realism
//                 scene.background = new THREE.Color(0x000000); // Pure black space
//
//                 const renderer = new THREE.WebGLRenderer({
//                     alpha: true,
//                     antialias: true
//                 });
//                 renderer.setPixelRatio(window.devicePixelRatio); // Improves clarity on high-res screens
//                 renderer.setSize(window.innerWidth, window.innerHeight);
//                 renderer.toneMapping = THREE.ACESFilmicToneMapping; // Better color grading
//                 renderer.toneMappingExposure = 1.2; // Slight brightness boost
//
//                 const animate = () => {
//                     requestAnimationFrame(animate);
//
//                     // Rotate the Earth model smoothly
//                     if (earth) {
//                         earth.rotation.y += 0.0002;
//                     }
//
//                     renderer.render(scene, camera);
//                 };
//
// // Listen for window resize events
//                 window.addEventListener("resize", () => {
//                     const width = window.innerWidth;
//                     const height = window.innerHeight;
//
//                     camera.aspect = width / height;
//                     camera.updateProjectionMatrix();
//
//                     renderer.setSize(width, height);
//                     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//                 });
//
//                 animate(); // Start animation loop
//
//
//                 gsap.to(earth.rotation, {
//                     x: Math.PI * 2,
//                     scrollTrigger: {
//                         trigger: "body",
//                         start: "top top",
//                         end: "bottom bottom",
//                         scrub: true
//                     }
//                 });
//             },
//             undefined, // Progress callback
//             (error) => {
//                 console.error('Error loading GLTF:', error);
//             }
//         );
//
//
//         const handleResize = () => {
//             renderer.setSize(window.innerWidth, window.innerHeight);
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//         };
//
//         window.addEventListener('resize', handleResize);
//
//         const animate = () => {
//             requestAnimationFrame(animate);
//             renderer.render(scene, camera);
//         };
//         animate();
//
//         return () => {
//             window.removeEventListener('resize', handleResize);
//             if (mountRef.current instanceof HTMLDivElement) {
//                 mountRef.current.removeChild(renderer.domElement);
//             }
//         };
//     }, []);
//
//     return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
// };
//
// export default EarthScene;

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EarthScene = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return; // Ensure mountRef exists

        // Setup Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Append renderer only if mountRef is defined
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        } else {
            console.error("mountRef is still null!");
            return;
        }

        // Lights
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xffffff, 3);
        sunLight.position.set(5, 3, 5);
        sunLight.castShadow = true;
        scene.add(sunLight);

        // Load Earth Model
        const loader = new GLTFLoader();
        loader.load(
            '/earth.glb',
            (gltf) => {
                console.log('Model loaded successfully!');
                const earth = gltf.scene;
                earth.position.set(0, 0, 0);
                earth.scale.set(0.5, 0.5, 0.5);
                scene.add(earth);

                const animate = () => {
                    requestAnimationFrame(animate);
//
                    // Rotate the Earth model smoothly
                    if (earth) {
                        earth.rotation.y += 0.0006;
                    }
                    renderer.render(scene, camera);
                };
                animate();

                // Scroll animations
                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#section1",
                        start: "top center",
                        end: "bottom center",
                        scrub: true
                    }
                }).to(earth.position, { x: 2, y: 1, duration: 2 })
                    .to(earth.rotation, { y: Math.PI / 2, duration: 2 }, "<");

                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#section2",
                        start: "top center",
                        end: "bottom center",
                        scrub: true
                    }
                }).to(earth.position, { x: -2, y: -1, duration: 2 })
                    .to(earth.rotation, { y: Math.PI, duration: 2 }, "<");
                    // .to(earth.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 2 }, "<");

                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#section3",
                        start: "top center",
                        end: "bottom center",
                        scrub: true
                    }
                }).to(earth.position, { x: 1, y: -4, z: -2,  duration: 2 })
                    .to(earth.rotation, { y: Math.PI, duration: 2 }, "<")
                    .to(earth.scale, { x: 1.01, y: 1, z: 1, duration: 2 }, "<");
            },
            undefined, // Progress callback
            (error) => {
                console.error('Error loading GLTF:', error);
            }
        );

        // Handle window resizing
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Animation loop
//         const animate = () => {
//             requestAnimationFrame(animate);
// //
//             // Rotate the Earth model smoothly
//             if (earth) {
//                 earth.rotation.y += 0.0002;
//             }
//         renderer.render(scene, camera);
//         };
//         animate();

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <>
            <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.5 }} />
            <div id="section1" style={{ height: '100vh', background: '#111', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                <h1>Section 1 - Initial Position</h1>
            </div>
            <div id="section2" style={{ height: '100vh', background: '#222', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                <h1>Section 2 - Moves and Rotates</h1>
            </div>
            <div id="section3" style={{ height: '100vh', background: '#333', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                <h1>Section 3 - Scales Up</h1>
            </div>
        </>
    );
};

export default EarthScene;
