import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Game.css';
import '../Home/Home.css';

function Game() {
    const { username, handleLogout } = useAuth();
    const [dice, setDice] = useState([
        '/dice1.png',
        '/dice1.png',
        '/dice1.png',
        '/dice1.png',
        '/dice1.png'
    ]);
    const [selectedDice, setSelectedDice] = useState([false, false, false, false, false]);
    const [rollCount, setRollCount] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const userInitial = (username && username[0]) ? username[0].toUpperCase() : '?';

    const navigate = useNavigate();

    const diceImages = [
        '/dice1.png',
        '/dice2.png',
        '/dice3.png',
        '/dice4.png',
        '/dice5.png',
        '/dice6.png'
    ];

    useEffect(() => {
        const savedGame = JSON.parse(localStorage.getItem('yahtzeeGame'));
        if (savedGame && savedGame.dice) {
            setDice(savedGame.dice);
        }
    }, []);

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

    const handleDiceClick = (index) => {
        if (rollCount === 0) return; // Kan alleen dobbelstenen selecteren na eerste worp

        const newSelected = [...selectedDice];
        newSelected[index] = !newSelected[index];
        setSelectedDice(newSelected);
    };

    const handleRoll = () => {
        if (rollCount >= 3) return; // Max 3 worpen

        const newDice = dice.map((die, index) => {
            // Als dobbelsteen geselecteerd is, houd hem vast
            if (selectedDice[index]) {
                return die;
            }
            // Anders gooi opnieuw
            const randomIndex = Math.floor(Math.random() * 6);
            return diceImages[randomIndex];
        });

        setDice(newDice);
        setRollCount(rollCount + 1);

        // Na 3 worpen, reset selecties voor volgende beurt
        if (rollCount + 1 >= 3) {
            setSelectedDice([false, false, false, false, false]);
        }

        localStorage.setItem('yahtzeeGame', JSON.stringify({ dice: newDice }));
    };

    const handleNewTurn = () => {
        setDice([
            '/dice1.png',
            '/dice1.png',
            '/dice1.png',
            '/dice1.png',
            '/dice1.png'
        ]);
        setSelectedDice([false, false, false, false, false]);
        setRollCount(0);
    };

    const viewScores = () => {
        navigate('/scores', { state: { dice, username } });
    };

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/');
        setDropdownOpen(false);
    };

    return (
        <div className="game-container">
            <div className='header-container'>
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
                    <Link to="/scores" state={{ dice, username }} className="menu-link">Scores</Link>
                    <Link to="/rules" className="menu-link">Regels</Link>
                </nav>
            </div>
            <div className='main-container'>
                <div className="left-game-side">
                    <div className="roll-info">
                        <p className="roll-count-text">Worp: {rollCount} / 3</p>
                    </div>
                    <div className="dice-container">
                        {dice.map((die, index) => (
                            <div
                                key={index}
                                className={`dice-wrapper ${selectedDice[index] ? 'selected' : ''}`}
                                onClick={() => handleDiceClick(index)}
                            >
                                <img
                                    src={die}
                                    alt={`Dobbelsteen ${index + 1}`}
                                    className="dice-image"
                                />
                                {selectedDice[index] && (
                                    <div className="dice-lock-indicator">🔒</div>
                                )}
                            </div>
                        ))}
                    </div>
                    {rollCount === 0 && (
                        <p className="dice-hint">Klik op "Gooien" om te beginnen</p>
                    )}
                    {rollCount > 0 && rollCount < 3 && (
                        <p className="dice-hint">Klik op dobbelstenen om ze vast te houden, daarna "Gooien"</p>
                    )}
                    {rollCount >= 3 && (
                        <p className="dice-hint completed">Beurt voltooid! Kies een categorie of start een nieuwe beurt</p>
                    )}
                </div>
                <div className="right-game-side">
                    <div className="game-options">
                        <button
                            onClick={handleRoll}
                            disabled={rollCount >= 3}
                            className={rollCount >= 3 ? 'disabled' : ''}
                        >
                            {rollCount === 0 ? 'Gooien' : rollCount < 3 ? 'Opnieuw gooien' : 'Max worpen bereikt'}
                        </button>
                        {rollCount >= 3 && (
                            <button onClick={handleNewTurn} className="new-turn-button">
                                Nieuwe beurt
                            </button>
                        )}
                        <button onClick={viewScores}>Scores bekijken</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;

