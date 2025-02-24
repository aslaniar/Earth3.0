import React from 'react';
import './css/App.css';
import Gallery from "./Gallery";

function App() {
    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="App">
            {/* Header / Navbar */}
            <header className="navbar">
                <div className="navbar-left">
                    <span className="logo">Eath3.0</span>
                </div>
                <nav className="navbar-nav">
                    <ul>
                        <li>
                            <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>
                                Gallery
                            </a>
                        </li>
                        <li>
                            <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Sections (all on one page) */}
            <section id="home" className="section">
                <h1>Welcome to Eath3.0</h1>
                <p>This is the home section.</p>
            </section>

            <section id="gallery" className="section">
                <h1>Eath3.0 Gallery</h1>
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
