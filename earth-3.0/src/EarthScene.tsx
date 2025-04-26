// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';
//
// gsap.registerPlugin(ScrollTrigger);
//
// const EarthScene = () => {
//     const mountRef = useRef<HTMLDivElement>(null);
//
//     useEffect(() => {
//         if (!mountRef.current) return; // Ensure mountRef exists
//
//         // Setup Three.js scene
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         camera.position.set(0, 0, 5);
//
//         const renderer = new THREE.WebGLRenderer({ alpha: true });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//
//         // Append renderer only if mountRef is defined
//         if (mountRef.current) {
//             mountRef.current.appendChild(renderer.domElement);
//         } else {
//             console.error("mountRef is still null!");
//             return;
//         }
//
//         // Lights
//         const ambientLight = new THREE.AmbientLight(0x404040, 1);
//         scene.add(ambientLight);
//
//         const sunLight = new THREE.DirectionalLight(0xffffff, 3);
//         sunLight.position.set(5, 3, 5);
//         sunLight.castShadow = true;
//         scene.add(sunLight);
//
//         // Load Earth Model
//         const loader = new GLTFLoader();
//         loader.load(
//             '/earth.glb',
//             (gltf) => {
//                 console.log('Model loaded successfully!');
//                 const earth = gltf.scene;
//                 earth.position.set(0, 0, 0);
//                 earth.scale.set(0.5, 0.5, 0.5);
//                 scene.add(earth);
//
//                 const animate = () => {
//                     requestAnimationFrame(animate);
// //
//                     // Rotate the Earth model smoothly
//                     if (earth) {
//                         earth.rotation.y += 0.0006;
//                     }
//                     renderer.render(scene, camera);
//                 };
//                 animate();
//
//                 // Scroll animations
//                 gsap.timeline({
//                     scrollTrigger: {
//                         trigger: "#section1",
//                         start: "top center",
//                         end: "bottom center",
//                         scrub: true
//                     }
//                 }).to(earth.position, { x: 2, y: 1, duration: 2 })
//                     .to(earth.rotation, { y: Math.PI / 2, duration: 2 }, "<");
//
//                 gsap.timeline({
//                     scrollTrigger: {
//                         trigger: "#section2",
//                         start: "top center",
//                         end: "bottom center",
//                         scrub: true
//                     }
//                 }).to(earth.position, { x: -2, y: -1, duration: 2 })
//                     .to(earth.rotation, { y: Math.PI, duration: 2 }, "<");
//                     // .to(earth.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 2 }, "<");
//
//                 gsap.timeline({
//                     scrollTrigger: {
//                         trigger: "#section3",
//                         start: "top center",
//                         end: "bottom center",
//                         scrub: true
//                     }
//                 }).to(earth.position, { x: 1, y: -4, z: -2,  duration: 2 })
//                     .to(earth.rotation, { y: Math.PI, duration: 2 }, "<")
//                     .to(earth.scale, { x: 1.01, y: 1, z: 1, duration: 2 }, "<");
//             },
//             undefined, // Progress callback
//             (error) => {
//                 console.error('Error loading GLTF:', error);
//             }
//         );
//
//         // Handle window resizing
//         const handleResize = () => {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//         };
//
//         window.addEventListener('resize', handleResize);
//
//         // Animation loop
// //         const animate = () => {
// //             requestAnimationFrame(animate);
// // //
// //             // Rotate the Earth model smoothly
// //             if (earth) {
// //                 earth.rotation.y += 0.0002;
// //             }
// //         renderer.render(scene, camera);
// //         };
// //         animate();
//
//         // Cleanup on unmount
//         return () => {
//             window.removeEventListener('resize', handleResize);
//             if (mountRef.current) {
//                 mountRef.current.removeChild(renderer.domElement);
//             }
//         };
//     }, []);
//
//     return (
//         <>
//             <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.5 }} />
//             <div id="section1" style={{ height: '100vh', background: '#111', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
//                 <h1>Section 1 - Initial Position</h1>
//             </div>
//             <div id="section2" style={{ height: '100vh', background: '#222', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
//                 <h1>Section 2 - Moves and Rotates</h1>
//             </div>
//             <div id="section3" style={{ height: '100vh', background: '#333', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
//                 <h1>Section 3 - Scales Up</h1>
//             </div>
//         </>
//     );
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
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xffffff, 3);
        sunLight.position.set(5, 3, 5);
        scene.add(sunLight);

        const loader = new GLTFLoader();

        const planetGroup = new THREE.Group();
        scene.add(planetGroup);

        let earth = null;
        let mars = null;

        const getMaterials = (model) => {
            const materials = [];
            model.traverse((child) => {
                if (child.isMesh && child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => {
                            mat.transparent = true;
                            mat.opacity = 1;
                            mat.needsUpdate = true;
                            materials.push(mat);
                        });
                    } else {
                        child.material.transparent = true;
                        child.material.opacity = 1;
                        child.material.needsUpdate = true;
                        materials.push(child.material);
                    }
                }
            });
            return materials;
        };

        loader.load('/earth.glb', (gltf) => {
            earth = gltf.scene;
            earth.position.set(0, 0, 0);
            earth.scale.set(0.5, 0.5, 0.5);
            getMaterials(earth);
            planetGroup.add(earth);

            loader.load('/mars.glb', (marsGltf) => {
                mars = marsGltf.scene;
                mars.position.set(0, 0, 0);
                mars.scale.set(2.5,2.5,2.5);
                getMaterials(mars).forEach(mat => {
                    mat.opacity = 0;
                    mat.transparent = true;
                    mat.needsUpdate = true;
                });
                mars.visible = false;
                planetGroup.add(mars);

                animate();

                // Scroll animations for planetGroup
                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#section1",
                        start: "top center",
                        end: "bottom center",
                        scrub: true
                    }
                })
                    .to(planetGroup.position, { x: 2, y: 1, duration: 2 })
                    .to(planetGroup.rotation, { y: Math.PI / 2, duration: 2 }, "<");

                gsap.timeline({
                    scrollTrigger: {
                        trigger: "#section2",
                        start: "top center",
                        end: "bottom center",
                        scrub: true
                    }
                })
                    .to(planetGroup.position, { x: -2, y: -1, duration: 2 })
                    .to(planetGroup.rotation, { y: Math.PI, duration: 2 }, "<");

                const transitionTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#section3",
                        start: "top center",
                        end: "bottom center",
                        scrub: true,
                        onUpdate: (self) => {
                            if (mars && !mars.visible && self.progress > 0.01) {
                                mars.visible = true;
                            }
                        },
                        onLeaveBack: () => {
                            if (mars) mars.visible = false;
                        }
                    }
                });

                transitionTimeline
                    .to(getMaterials(earth), { opacity: 0, duration: 1 }, "<")
                    .to(getMaterials(mars), { opacity: 1, duration: 1 }, "<");
            });
        });

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <>
            <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: .5 }} />
            <div id="section1" style={{ height: '100vh', background: '#111', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .5 }}>
                <h1>Section 1 - Initial Position</h1>
            </div>
            <div id="section2" style={{ height: '100vh', background: '#222', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .5 }}>
                <h1>Section 2 - Moves and Rotates</h1>
            </div>
            <div id="section3" style={{ height: '200vh', background: '#333', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .5 }}>
                <h1>Section 3 - Morph to Mars</h1>
            </div>
        </>
    );
};

export default EarthScene;
