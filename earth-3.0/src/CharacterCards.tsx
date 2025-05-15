// import { useState, useRef } from 'react';
//
// // Individual Character Card Component with optimized animations
// function CharacterCard({
//                            name = "Character Name",
//                            imageUrl = "/api/placeholder/400/500",
//                            info = "Character information goes here."
//                        }) {
//     const [isFlipped, setIsFlipped] = useState(false);
//     const [coords, setCoords] = useState({ x: 0, y: 0 });
//     const cardRef = useRef(null);
//
//     // Simple handler for mouse movement - more stable approach
//     const handleMouseMove = (e) => {
//         if (!cardRef.current) return;
//
//         const rect = cardRef.current.getBoundingClientRect();
//
//         // Calculate percentage position (-50 to 50) for rotation
//         const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
//         const y = ((e.clientY - rect.top) / rect.height - 0.5) * -100;
//
//         // Limit rotation angle and apply easing
//         const rotateX = Math.max(Math.min(y * 0.1, 10), -10);
//         const rotateY = Math.max(Math.min(x * 0.1, 10), -10);
//
//         setCoords({ x: rotateX, y: rotateY });
//     };
//
//     // Reset position when mouse leaves
//     const handleMouseLeave = () => {
//         setCoords({ x: 0, y: 0 });
//     };
//
//     // Toggle card flip
//     const handleClick = () => {
//         setIsFlipped(!isFlipped);
//     };
//
//     return (
//         <div className="p-2 w-64 h-80">
//             <div
//                 ref={cardRef}
//                 className="relative w-full h-full cursor-pointer rounded-lg overflow-hidden shadow-lg"
//                 style={{ perspective: "1000px" }}
//                 onMouseMove={handleMouseMove}
//                 onMouseLeave={handleMouseLeave}
//                 onClick={handleClick}
//             >
//                 <div
//                     className="w-full h-full transition-transform duration-200 ease-out"
//                     style={{
//                         transformStyle: "preserve-3d",
//                         transform: isFlipped
//                             ? "rotateY(180deg)"
//                             : `rotateX(${coords.x}deg) rotateY(${coords.y}deg)`
//                     }}
//                 >
//                     {/* FRONT SIDE */}
//                     <div
//                         className="absolute w-full h-full bg-gray-900 rounded-lg"
//                         style={{ backfaceVisibility: "hidden" }}
//                     >
//                         {/* Character image */}
//                         <img
//                             src={imageUrl}
//                             alt={name}
//                             className="w-full h-full object-cover rounded-lg"
//                         />
//
//                         {/* Light reflection overlay - extended beyond borders */}
//                         <div
//                             className="absolute inset-0 rounded-lg pointer-events-none"
//                             style={{
//                                 background: `radial-gradient(circle at ${50 + coords.y * 2}% ${50 - coords.x * 2}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
//                                 opacity: 0.4,
//                                 transform: "scale(1.2)" // Scale up to avoid corner issues
//                             }}
//                         />
//
//                         {/* Character name */}
//                         <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent pt-6 pb-3 px-3 text-white">
//                             <h2 className="font-bold text-lg">{name}</h2>
//                         </div>
//                     </div>
//
//                     {/* BACK SIDE */}
//                     <div
//                         className="absolute w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 rounded-lg flex flex-col"
//                         style={{
//                             backfaceVisibility: "hidden",
//                             transform: "rotateY(180deg)"
//                         }}
//                     >
//                         {/* Light reflection overlay for back too */}
//                         <div
//                             className="absolute inset-0 rounded-lg pointer-events-none"
//                             style={{
//                                 background: `radial-gradient(circle at ${50 + coords.y * 2}% ${50 - coords.x * 2}%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)`,
//                                 opacity: 0.15,
//                                 transform: "scale(1.2)" // Scale up to avoid corner issues
//                             }}
//                         />
//
//                         <h2 className="text-lg font-bold mb-2 text-center relative z-10">{name}</h2>
//                         <p className="text-sm leading-relaxed overflow-y-auto flex-grow relative z-10">{info}</p>
//                         <div className="text-xs text-center text-gray-400 pt-2 relative z-10">
//                             Click to flip back
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default CharacterCard;