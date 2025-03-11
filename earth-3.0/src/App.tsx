import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './css/App.css';
import Gallery from "./Gallery";
import Episodes from './Episodes';
import Carousel from "./Carousel.tsx";
import ClimateFacts from "./ClimateFacts.tsx";
import ClimateData from "./ClimateData.tsx";

function App() {
    const sections = useMemo(() => ["home", "gallery","climateFacts" ,"contact"], []);
    const [activeSection, setActiveSection] = useState("home");
    const [showScrollbar, setShowScrollbar] = useState(false);
    const hideTimerRef = useRef<number | null>(null);
    const lastScrollTime = useRef(0);

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const now = Date.now();
            if (now - lastScrollTime.current < 100) return;
            lastScrollTime.current = now;

            let currentSection = "home";
            sections.forEach((id) => {
                const section = document.getElementById(id);
                if (section) {
                    const { top, height } = section.getBoundingClientRect();
                    if (top <= window.innerHeight / 2 + 20 && top + height > window.innerHeight / 2 + 20) {
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
                hideTimerRef.current = window.setTimeout(() => {
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
                                        {
                                            id: 1, modelPath: "/ocat.glb",
                                            description: "Schrödinger – Dawn’s Enigmatic Companion. Schrödinger is the red cat with an air of mystery and wisdom, named after the famous quantum thought experiment. Far more than comic relief, he serves as a philosophical symbol in Earth3.0—bridging the paradoxes of quantum mechanics with the human journey. With his sleek, shifting coat and curious, independent nature, he inspires introspection and self-discovery in Dawn, reminding us of the profound interconnectedness of all things."
                                        },
                                        {
                                            id: 2, modelPath: "/mysteriousLocket.glb",
                                            description: "The Mysterious Locket – The locket is not just a piece of jewelry but a dual-natured object that combines industrial design with ancient, symbolic artistry. Its glowing and transformative properties signal the beginning of Dawn’s cosmic journey." +
                                                "When Dawn clasps the locket, it triggers an otherworldly sequence—a glowing beam, a shift in scenery, and the activation of cosmic technology. It functions as the narrative key that unlocks (quite literally) the passage from Earth 2.0 (our familiar world) into the radical possibilities of Earth 3.0."
                                        },
                                        {
                                            id: 3, modelPath: "/cupcake.glb",
                                            description: "The Birthday Cupcake – Set on a worn table in Dawn’s living room, the Birthday Cupcake is a modest, half-eaten treat. Its golden sponge, exposed by a bite, contrasts with a delicate layer of melting frosting. A solitary candle—partly melted with wax dribbling down its side—marks a faded celebration. A scribbled note reading “To our favorite client on their SPECIAL DAY” lies nearby, blending everyday warmth with ironic cosmic destiny."
                                        },
                                        {
                                            id: 4, modelPath: "/adward.glb",
                                            description: "The Environmental Award – Resting on a dusty shelf, the Environmental Award is a relic of past eco-achievements. Its brushed metal base supports an intricate emblem—perhaps a globe entwined with a tree—symbolizing Earth’s fragile beauty. Once vibrant with greens and blues, its faded hues and subtle engravings now whisper of former glory and neglected passion, a bittersweet reminder of environmental ideals."
                                        },
                                    ]}
                                />
                            </section>

                            <section id="climateFacts" className="section">
                                <h1>Climate Facts</h1>
                                <ClimateData/>
                                <ClimateFacts/>
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
