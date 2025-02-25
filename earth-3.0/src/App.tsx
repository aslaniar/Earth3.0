import React, { useState, useEffect, useMemo } from 'react';
import './css/App.css';
import Gallery from "./Gallery";

function App() {
    const sections = useMemo(() => ["home", "gallery", "services", "contact"], []);
    const [activeSection, setActiveSection] = useState("home");  

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    //Track scroll postion and update with active section
    useEffect(() => {
        const handleScroll = () => {
            let currentSection = "home"; 
            
            sections.forEach((id) => {
                const section = document.getElementById(id); 
                if (section) { 
                    const {top, height} = section.getBoundingClientRect(); 
                    if (top <= window.innerHeight / 2 && top + height > window.innerHeight / 2){ 
                        currentSection = id;
                    }
                }
            });
            setActiveSection(currentSection);  
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);      
    }, [sections]);


    return (
        <div className="App">

            {/*Scroll Bar*/}
             <div className="scrollbar"> 
                {sections.map((id) => ( 
                    <div key = {id} className = {`scroll-indicator ${activeSection === id ? "active" : ""}`} />
                ))}
             </div>
             
            {/* Header / Navbar */}
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
                    </ul>
                    </nav>
                </header>
                        
            {/* Sections (all on one page) */}
            <section id="home" className="section">
                <h1>Welcome to Earth3.0</h1>
                <p>This is the home section.</p>
            </section>

            <section id="gallery" className="section">
                <h1>Earth3.0 Gallery</h1>
                <Gallery/>
            </section>

            <section id="services" className="section">

                <h1>Our Services</h1>
                <p>Details about services offered...</p>
            </section>

            <section id="contact" className="section">
                <h1>Contact Us</h1>
                <p>Contact details go here...</p>
            </section>
        </div>
    );
}

export default App;