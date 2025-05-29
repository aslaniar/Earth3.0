import "./css/Characters.css";

const CharacterCard = () => {

    const characters = {
        dawn: {
            name: "Dawn",
            description: "A sharp-witted former environmentalist in her 60s, unexpectedly chosen to help " +
                "design a new Earth. Reluctant, resourceful, and far more important than she believes."
        },
        quan: {
            name: "Quan",
            description: "A timeless Higher Being whose wisdom is matched only by her clarity. " +
                "Guides Dawn with metaphors, insight, and an unwavering belief in her potential."
        },
        chronos: {
            name: "Chronos",
            description: "A strategist obsessed with order and efficiency. Logical and skeptical, " +
                "Cronos questions humanity’s role in Earth 3.0—but his loyalty runs deep."
        },
        eros: {
            name: "Eros",
            description: "A passionate visionary who sees beauty in chaos and emotion. Eros champions creativity, " +
                "empathy, and the unpredictable nature of the human spirit.\n"
        },
        pryme: {
            name: "Pryme",
            description: "The exuberant leader of the Higher Beings, blending theatrical flair with genuine conviction. " +
                "Believes Dawn is the key to humanity’s future."
        },
        schrodinger: {
            name: "Schrödinger",
            description: "Once thought to be an ordinary cat, Schrödinger is a sentient guide with ancient knowledge and a dry wit. " +
                "Loyal, mysterious, and deeply invested in Dawn’s journey."
        },
        vega: {
            name: "Vega",
            description: "An advanced AI with vast knowledge and a rigid worldview. " +
                "Tasked with testing Dawn, Vega hides a deeper agenda beneath the algorithms."
        }
    };

    return (
        <div className="grid grid-cols-1 gap-y-10">
            <div className="grid grid-cols-4 gap-x-5 parent ">


                <div className="bg-[url('/dawn.png')] bg-cover bg-[position:top] relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">



                        <h3 className="text-2xl font-bold mb-2 text-blue-400 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {characters.dawn.name}
                        </h3>
                        <p className="text-sm text-center text-white px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                            {characters.dawn.description}
                        </p>
                    </div>
                </div>


                    <div className="bg-[url('/quan.png')] bg-cover bg-[position:top] relative overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">



                            <h3 className="text-2xl font-bold mb-2 text-blue-400 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                {characters.quan.name}
                            </h3>
                            <p className="text-sm text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                {characters.chronos.description}
                            </p>
                        </div>
                    </div>


                <div className="bg-[url('/chronos.png')] bg-cover bg-[position:top] relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">




                        <h3 className="text-2xl font-bold text-blue-400 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {characters.chronos.name}
                        </h3>
                        <p className="text-sm text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                            {characters.chronos.description}
                        </p>
                    </div>
                </div>

                <div
                    className="bg-[url('/eros.png')] bg-cover bg-[position:top] relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">



                        <h3 className="text-2xl font-bold text-blue-400 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {characters.eros.name}
                        </h3>
                        <p className="text-sm text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                            {characters.eros.description}
                        </p>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-[repeat(auto-fit,_25%)] justify-center gap-x-5 parent">

                <div className="bg-[url('/pryme.png')] bg-cover bg-[position:top] relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">



                        <h3 className="text-2xl font-bold text-blue-400 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {characters.pryme.name}
                        </h3>
                        <p className="text-sm text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                            {characters.pryme.description}
                        </p>
                    </div>
                </div>

                <div className="bg-white bg-[url('/schrodinger-Photoroom.png')] bg-cover bg-[position:top] relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">



                        <h3 className="text-2xl font-bold mb-2 text-blue-400 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {characters.schrodinger.name}
                        </h3>
                        <p className="text-sm text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                            {characters.schrodinger.description}
                        </p>
                    </div>
                </div>

                <div className="bg-[url('/vega.png')] bg-cover bg-[position:top] relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100">



                        <h3 className="text-2xl font-bold text-blue-400 mb-2  transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {characters.vega.name}
                        </h3>
                        <p className="text-sm text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                            {characters.vega.description}
                        </p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default CharacterCard;