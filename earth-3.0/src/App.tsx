import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './css/App.css';
import Gallery from "./Gallery";
import Episodes from './Episodes';
import Carousel from "./Carousel.tsx";
import ClimateSection from "./ClimateSection";

function App() {
    const sections = useMemo(() => ["home", "gallery", "futureEarth", "contact"], []);
    const [activeSection, setActiveSection] = useState("home");
    const [showScrollbar, setShowScrollbar] = useState(false);
    const hideTimerRef = useRef<number | null>(null);

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            let currentSection = "home";
            sections.forEach((id) => {
                const section = document.getElementById(id);
                if (section) {
                    const { top, height } = section.getBoundingClientRect();
                    if (top <= window.innerHeight / 2 && top + height > window.innerHeight / 2) {
                        currentSection = id;
                    }
                }
            });
            if (currentSection !== activeSection) {
                setActiveSection(currentSection);
                setShowScrollbar(true);
                if (hideTimerRef.current) {
                    clearTimeout(hideTimerRef.current);
                }
                hideTimerRef.current = setTimeout(() => {
                    setShowScrollbar(false);
                }, 2000);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections, activeSection]);

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <header className="navbar">
                                <div className="navbar-left">
                                    <span className="logo">Earth3.0</span>
                                </div>
                                <nav className="navbar-nav">
                                    <ul>
                                        {sections.map((id) => (
                                            <li key={id}>
                                                <a href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>
                                                    {id.charAt(0).toUpperCase() + id.slice(1)}
                                                </a>
                                            </li>
                                        ))}
                                        <li>
                                            <Link to="/episodes">Episodes</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </header>

                            <div className={`scrollbar ${showScrollbar ? "" : "hide"}`}>
                                {sections.map((id) => (
                                    <div
                                        key={id}
                                        className={`scroll-indicator ${activeSection === id ? "active" : ""}`}
                                    />
                                ))}
                            </div>

                            <section id="home" className="section">
                                <h1>Welcome to Earth3.0</h1>
                                <Carousel
                                    images={[
                                        '/image1.png',
                                        '/image2.png',
                                        '/image3.png',
                                    ]}
                                    interval={5000}
                                />
                            </section>

                            <section id="gallery" className="section">
                                <h1>Earth3.0 Gallery</h1>
                                <Gallery
                                    collectibles={[
                                        {id: 1, modelPath: "/ocat.glb"},
                                        {id: 2, modelPath: "/ocat1.glb"},
                                        {id: 3, modelPath: "/ocat2.glb"},
                                        {id: 4, modelPath: "/ocat3.glb"},
                                        {id: 5, modelPath: "/ocat4.glb"},
                                        {id: 6, modelPath: "/ocat5.glb"},
                                        {id: 7, modelPath: "/ocat6.glb"},
                                        {id: 8, modelPath: "/ocat7.glb"},
                                    ]}
                                />
                            </section>

                            <section id="futureEarth" className="section">
                                <h1>Future Earth</h1>
                                <ClimateSection />
                            </section>

                            <section id="contact" className="section">
                                <h1>Contact Us</h1>
                                <p>Contact details go here...</p>
                            </section>
                        </>
                    }
                />
                <Route path="/episodes" element={<Episodes/>}/>
            </Routes>
        </div>
    );
}

export default App;