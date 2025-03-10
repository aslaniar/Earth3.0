import { useState } from "react"; 
import { Link } from "react-router-dom"; 
import "./css/Episodes.css"; 

const episodes = [
    { id: 1, title: "Episode 1", description: "Description for Episode 1", charities: "Charity 1", image: "screenshot.png"}, 
    { id: 2, title: "Episode 2", description: "Description for Episode 2", charities: "Charity 2", image: "screenshot.png"}, 
    { id: 3, title: "Episode 3", description: "Description for Episode 3", charities: "Charity 3", image: "screenshot.png"}, 
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
                <div className="episode-card">
                    <h2>{episodes[currentIndex].image} </h2>
                    <div className="episode-image"> 
                        <img src={episodes[currentIndex].image} alt={episodes[currentIndex].title} />
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
