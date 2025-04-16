import { useState } from "react"; 
import { Link } from "react-router-dom"; 
import "./css/Episodes.css"; 

const episodes = [
    {
        id: 1, 
        title: "Episode 1", 
        description: "On what seems like just another birthday, Dawn—an unassuming woman with a spark for sarcasm and a love for her cat—is unexpectedly thrust into a mysterious, cosmic adventure. Guided by an eccentric team of higher beings and AI, she’s asked to help shape the future of a struggling Earth. Blending humor, heart, and sci-fi charm, the episode explores what happens when an ordinary person is given an extraordinary role in reimagining humanity’s next chapter—whether she wants to or not.", 
        charities: "https://www.catf.us /https://gfi.org/", 
        image: "/Episode1.png"
    }, 
    { 
        id: 2,
        title: "Episode 2",
        description: "Description for Episode 2",
        charities: "Charity 2", 
        image: "screenshot.png"
    }, 
    { 
        id: 3, 
        title: "Episode 3", 
        description: "Description for Episode 3", 
        charities: "Charity 3", 
        image: "screenshot.png"
    }, 
]
const Episodes = () => { 
    const [currentIndex, setCurrentIndex] = useState(0); 
    
    const nextEpisode = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1 ) % episodes.length); 
    }; 

    const prevEpisode = () => {
        setCurrentIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : episodes.length - 1);
    };

    return (
        <div className="episodes-page"> 
           <Link to = "/" className="back-button"> ⬅ Travel Back </Link>

           <h1 className="episodes-title">EPISODES</h1>

           <div className="carousel">
                <button className="arrow left" onClick={prevEpisode}>⬅</button>
                    <div className="episode-container">
                        <h2>{episodes[currentIndex].title} </h2>
                        <div className="episode-card">
                            <div className="episode-image">
                                <img src={episodes[currentIndex].image} alt={episodes[currentIndex].title} />
                            </div> 
                        </div>
                    </div>
                <button className="arrow right" onClick={nextEpisode}>⮕</button>
           </div>

            <div className="dots">
                {episodes.map((_, index) => (
                    <span key={index} className={`dot ${index === currentIndex ? "active" : ""}`} />
                ))}
            </div>

            <div className="episode-details">
                <h3 className="detail-title">Description:</h3>
                <p>{episodes[currentIndex].description}</p>

                <h3 className="detail-title">Charities:</h3>
                <p>{episodes[currentIndex].charities}</p>

            </div>

        </div>
    );
};

export default Episodes; 
