import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './css/App.css';
import Gallery from "./Gallery";
import Episodes from './Episodes';
import Carousel from "./Carousel";
import ClimateSection from "./ClimateSection";
import AIChatBot from "./AIChatBot";
import CharacterCard from "./CharacterCard.tsx";

function App() {
    const sections = useMemo(() => ["home", "gallery", "climateFacts", "characters", "chatbot", "contact"], []);
    const [activeSection, setActiveSection] = useState("home");
    const [showScrollbar, setShowScrollbar] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const hideTimerRef = useRef<number | null>(null);
    const lastScrollTime = useRef<number>(0);

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false); // Close mobile menu when navigation item is clicked
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
                }, 2000) as unknown as number; // Cast setTimeout return type for TypeScript
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections, activeSection]);

    // Handle menu toggle for mobile
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    //to fix the bug where the website will load in the chatbot section
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <header className="navbar">
                                <div className="navbar-left">
                                    <span className="logo">
                                        <span className="logo-text">Earth</span>
                                        <span className="logo-accent">3.0</span>
                                    </span>
                                </div>

                                <div className="menu-toggle" onClick={toggleMenu}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                                <nav className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
                                    <ul>
                                        {sections.map((id) => (
                                            <li key={id} className={activeSection === id ? 'active' : ''}>
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
                                <div className="section-container">
                                    <h1 className="section-title">Welcome to Earth3.0</h1>
                                    <Carousel
                                        images={[
                                            '/image1.png',
                                            '/image2.png',
                                            '/image3.png',
                                        ]}
                                        interval={5000}
                                    />
                                </div>
                            </section>

                            <section id="gallery" className="section">
                                <div className="section-container">
                                    <h1 className="section-title">Earth3.0 Gallery</h1>
                                    <Gallery
                                        collectibles={[
                                            {
                                                id: 1,
                                                modelPath: "/ocat.glb",
                                                description: "Schrödinger – Dawn's Enigmatic Companion. Schrödinger is the red cat with an air of mystery and wisdom, named after the famous quantum thought experiment. Far more than comic relief, he serves as a philosophical symbol in Earth3.0—bridging the paradoxes of quantum mechanics with the human journey. With his sleek, shifting coat and curious, independent nature, he inspires introspection and self-discovery in Dawn, reminding us of the profound interconnectedness of all things."
                                            },
                                            {
                                                id: 2,
                                                modelPath: "/mysteriousLocket.glb",
                                                description: "The Mysterious Locket – The locket is not just a piece of jewelry but a dual-natured object that combines industrial design with ancient, symbolic artistry. Its glowing and transformative properties signal the beginning of Dawn's cosmic journey. When Dawn clasps the locket, it triggers an otherworldly sequence—a glowing beam, a shift in scenery, and the activation of cosmic technology. It functions as the narrative key that unlocks (quite literally) the passage from Earth 2.0 (our familiar world) into the radical possibilities of Earth 3.0."
                                            },
                                            {
                                                id: 3,
                                                modelPath: "/cupcake.glb",
                                                description: "The Birthday Cupcake – Set on a worn table in Dawn's living room, the Birthday Cupcake is a modest, half-eaten treat. Its golden sponge, exposed by a bite, contrasts with a delicate layer of melting frosting. A solitary candle—partly melted with wax dribbling down its side—marks a faded celebration. A scribbled note reading \"To our favorite client on their SPECIAL DAY\" lies nearby, blending everyday warmth with ironic cosmic destiny."
                                            },
                                            {
                                                id: 4,
                                                modelPath: "/adward.glb",
                                                description: "The Environmental Award – Resting on a dusty shelf, the Environmental Award is a relic of past eco-achievements. Its brushed metal base supports an intricate emblem—perhaps a globe entwined with a tree—symbolizing Earth's fragile beauty. Once vibrant with greens and blues, its faded hues and subtle engravings now whisper of former glory and neglected passion, a bittersweet reminder of environmental ideals."
                                            },
                                        ]}
                                    />
                                </div>
                            </section>

                            <section id="climateFacts" className="section">
                                <div className="section-container">
                                    <h1 className="section-title">Climate Facts</h1>
                                    <ClimateSection/>
                                </div>
                            </section>

                            <section id="characters" className="section">
                                <div className="section-container">
                                    <h1 className="section-title">View Earth 3.0 Characters</h1>
                                    <p className="section-description">
                                        Dive deeper into the world of Earth 3.0! Check out the team devoted to creating Earth
                                        right.
                                    </p>
                                    <CharacterCard/>
                                </div>
                            </section>

                            <section id="chatbot" className="section">
                                <div className="section-container">
                                    <h1 className="section-title">Chat with Earth3.0 Characters</h1>
                                    <p className="section-description">
                                        Have a conversation with characters from the Earth3.0 show. Ask them about their
                                        experiences, the show's themes, or their perspectives on environmental issues.
                                    </p>
                                    <AIChatBot/>
                                </div>
                            </section>

                            <section id="contact" className="section">
                                <div className="section-container">
                                    <h1 className="section-title">Contact Us</h1>
                                    <div className="contact-container">
                                        <div className="contact-card">
                                            <div className="contact-form">
                                                <div className="form-group">
                                                    <input type="text" placeholder="Your Name"/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" placeholder="Your Email"/>
                                                </div>
                                                <div className="form-group">
                                                    <textarea placeholder="Your Message"></textarea>
                                                </div>
                                                <button className="contact-button">Send Message</button>
                                            </div>
                                            <div className="contact-info">
                                                <h3>Get in Touch</h3>
                                                <p>Have questions about Earth3.0? Contact our team for more
                                                    information.</p>
                                                <div className="contact-details">
                                                    <div className="contact-item">
                                                        <span className="contact-icon">✉️</span>
                                                        <span>hello@earth3-0.com</span>
                                                    </div>
                                                    <div className="contact-item">
                                                        <span className="contact-icon">📞</span>
                                                        <span>+1 (555) 123-4567</span>
                                                    </div>
                                                    <div className="contact-item">
                                                        <span className="contact-icon">📍</span>
                                                        <span>123 Earth Way, Planet Earth</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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