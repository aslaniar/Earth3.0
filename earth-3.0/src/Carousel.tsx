import React, { useState, useEffect } from 'react';
import './css/Carousel.css';

interface CarouselProps {
    images: string[];
    interval?: number;
    title?: string;
    subtitle?: string;
}

const Carousel: React.FC<CarouselProps> = ({
                                               images,
                                               interval = 3000,
                                               title = "Earth3.0",
                                               subtitle = "Exploring a sustainable future"
                                           }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
                setIsTransitioning(false);
            }, 500); // Match this with CSS transition time
        }, interval);
        return () => clearInterval(timer);
    }, [images, interval]);

    const handleNext = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setIsTransitioning(false);
        }, 500);
    };

    const handlePrev = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            setIsTransitioning(false);
        }, 500);
    };

    return (
        <div className="carousel-container">
            <div className="carousel-overlay">
                <div className="carousel-content">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                    <button className="carousel-cta-button">Explore Now</button>
                </div>
            </div>

            {images.map((img, index) => (
                <div
                    key={index}
                    className={`carousel-slide ${index === currentIndex ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}

            <button
                className="carousel-arrow carousel-arrow-left"
                onClick={handlePrev}
                aria-label="Previous slide"
            >
                &#10094;
            </button>

            <button
                className="carousel-arrow carousel-arrow-right"
                onClick={handleNext}
                aria-label="Next slide"
            >
                &#10095;
            </button>

            <div className="carousel-dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => {
                            setIsTransitioning(true);
                            setTimeout(() => {
                                setCurrentIndex(index);
                                setIsTransitioning(false);
                            }, 500);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;