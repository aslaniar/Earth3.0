import { useState } from "react"; 
import { Link } from "react-router-dom"; 
import "./css/Episodes.css";
import { episodes } from "./EpisodeData";


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

                <h3 className="detail-title"> Related Charities:</h3>
                <div className="charity-list">
                    {episodes[currentIndex].charities.map((charity, index) => (
                        <div key = {index} className="charity-item"> 
                            < div className="charity-header">
                                <a
                                   href={charity.url}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="charity-title"
                                 >
                                    {charity.name}
                                </a>
                                <img
                                    src={charity.logo}
                                    alt={`${charity.name} logo`}
                                    className="charity-logo"
                                />
                            </div>
                            <p className="charity-description"> {charity.description}</p>
                        </div>
                    ))} 
                </div>

            </div>

        </div>
    );
};

export default Episodes; 
