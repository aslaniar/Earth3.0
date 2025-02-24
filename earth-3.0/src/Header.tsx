import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 shadow-lg rounded-b-3xl p-4 flex justify-between items-center mx-4 mt-4">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
                <img
                    src="/earth-logo.png"
                    alt="Earth Logo"
                    className="h-10 w-10 rounded-full border-2 border-white shadow-md"
                />
                <h1 className="text-2xl font-bold text-black tracking-wide">
                    Earth 3.0
                </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex space-x-8">
                <a href="#home" className="nav-link">
                    Home
                </a>
                <a href="#philanthropic" className="nav-link">
                    Philanthropic Connection
                </a>
                <a href="#characters" className="nav-link">
                    Characters/City Hub
                </a>
                <a href="#behind-scenes" className="nav-link">
                    Behind Scenes
                </a>
                <a href="#about" className="nav-link">
                    About
                </a>
            </nav>
        </header>
    );
};

export default Header;
