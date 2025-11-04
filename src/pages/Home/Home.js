import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Home.css';

function Home() {
    const { username, handleLogout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const userInitial = (username && username[0]) ? username[0].toUpperCase() : '?';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const startNewGame = () => {
        navigate('/game');
    };

    const resumeGame = () => {
        navigate('/game');
    };

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/');
        setDropdownOpen(false);
    };

    return (
        <div className="home-container">
            <header className="header">
                <div className="logo">
                    Yahtzee
                </div>
                <div className="profile-container" ref={dropdownRef}>
                    <button
                        className="profile-button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        aria-label="Profiel menu"
                        aria-haspopup="menu"
                        aria-expanded={dropdownOpen}
                    >
                        <span className="avatar" aria-hidden>{userInitial}</span>
                        <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="profile-dropdown" role="menu">
                            <div className="dropdown-caret" />
                            <div className="dropdown-header">
                                <span className="avatar-lg" aria-hidden>{userInitial}</span>
                                <div className="user-info">
                                    <div className="user-name">{username || 'Gebruiker'}</div>
                                    <div className="user-subtle">Profiel</div>
                                </div>
                            </div>
                            <div className="dropdown-divider" />
                            <button className="dropdown-item" onClick={handleLogoutClick} role="menuitem">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Uitloggen</span>
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <nav className="menu">
                <Link to="/game" className="menu-link">Nieuw spel</Link>
                <Link to="/scores" className="menu-link">Scores</Link>
                <Link to="/rules" className="menu-link">Regels</Link>
                
            </nav>

            <main className="main-content">
                <img src="/dubbelstenen-gooien.png" alt="Dobbelstenen" className="main-image" />
                <div className="options">
                    <button onClick={startNewGame}>Opnieuw</button>
                    <button onClick={resumeGame}>Hervatten</button>
                </div>
            </main>
        </div>
    );
}

export default Home;

