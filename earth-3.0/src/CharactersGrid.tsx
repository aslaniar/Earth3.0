// import CharacterCard from "./CharacterCards.tsx";
//
// // Grid layout for character cards
// export default function CharacterGrid() {
//     // Sample character data - replace with your actual data
//     const characters = [
//         {
//             name: "Jon Snow",
//             imageUrl: "/api/placeholder/400/500",
//             info: "Lord Commander of the Night's Watch, known for his honor and brooding personality. Raised as Ned Stark's bastard son, but actually the son of Rhaegar Targaryen and Lyanna Stark."
//         },
//         {
//             name: "Daenerys Targaryen",
//             imageUrl: "/api/placeholder/400/500",
//             info: "Mother of Dragons, Breaker of Chains, and the rightful heir to the Iron Throne. Commands three dragons and seeks to reclaim the Seven Kingdoms."
//         },
//         {
//             name: "Tyrion Lannister",
//             imageUrl: "/api/placeholder/400/500",
//             info: "The youngest son of Tywin Lannister, known for his wit and intelligence. Served as Hand of the King to multiple rulers and navigated treacherous political landscapes."
//         },
//         {
//             name: "Arya Stark",
//             imageUrl: "/api/placeholder/400/500",
//             info: "Youngest daughter of House Stark, trained as a Faceless Man assassin. Skilled with her sword Needle and maintains a kill list of her enemies."
//         },
//         {
//             name: "Cersei Lannister",
//             imageUrl: "/api/placeholder/400/500",
//             info: "Queen of the Seven Kingdoms, known for her ambition and ruthlessness. Will do anything to protect her children and maintain power over the realm."
//         }
//     ];
//
//     return (
//         <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
//             <h1 className="text-2xl font-bold mb-10 text-gray-800">Character Profiles</h1>
//
//             <div className="max-w-5xl mx-auto">
//                 {/* First row - 3 cards */}
//                 <div className="mb-6 flex flex-wrap justify-center gap-4">
//                     {characters.slice(0, 3).map((character, index) => (
//                         <CharacterCard
//                             key={index}
//                             name={character.name}
//                             imageUrl={character.imageUrl}
//                             info={character.info}
//                         />
//                     ))}
//                 </div>
//
//                 {/* Second row - 2 cards (centered) */}
//                 <div className="flex flex-wrap justify-center gap-4">
//                     {characters.slice(3, 5).map((character, index) => (
//                         <CharacterCard
//                             key={index}
//                             name={character.name}
//                             imageUrl={character.imageUrl}
//                             info={character.info}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// // export default CharacterGrid