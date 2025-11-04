import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Scores.css';
import '../Home/Home.css';

function Scores() {
    const { username, handleLogout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const initialDice = location.state?.dice || [];
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const userInitial = (username && username[0]) ? username[0].toUpperCase() : '?';

    // State voor de scores-tabel
    const [scores, setScores] = useState(calculateScores(initialDice));

    // Converteer afbeeldingspaden naar getallen (1-6)
    function getDiceValues(dice) {
        return dice.map((die) => {
            const number = parseInt(die.split('dice')[1].split('.png')[0]);
            return number;
        });
    }

    // Bereken scores gebaseerd op dice
    function calculateScores(dice) {
        const diceValues = getDiceValues(dice);
        const counts = {};
        diceValues.forEach((num) => {
            counts[num] = (counts[num] || 0) + 1;
        });

        return {
            Ones: counts[1] ? counts[1] * 1 : 0,
            Twos: counts[2] ? counts[2] * 2 : 0,
            Threes: counts[3] ? counts[3] * 3 : 0,
            Fours: counts[4] ? counts[4] * 4 : 0,
            Fives: counts[5] ? counts[5] * 5 : 0,
            Sixes: counts[6] ? counts[6] * 6 : 0,
            'Three of a Kind': Object.values(counts).some((count) => count >= 3)
                ? diceValues.reduce((sum, num) => sum + num, 0)
                : 0,
            'Four of a Kind': Object.values(counts).some((count) => count >= 4)
                ? diceValues.reduce((sum, num) => sum + num, 0)
                : 0,
            'Full House': Object.values(counts).includes(3) && Object.values(counts).includes(2)
                ? 25
                : 0,
            'Small Straight': checkStraight(diceValues, 4) ? 30 : 0,
            'Large Straight': checkStraight(diceValues, 5) ? 40 : 0,
            Yahtzee: Object.values(counts).some((count) => count === 5) ? 50 : 0,
            Chance: diceValues.reduce((sum, num) => sum + num, 0)
        };
    }

    // Functie om Small/Large Straight te checken
    function checkStraight(values, length) {
        const sortedUnique = [...new Set(values)].sort((a, b) => a - b);
        let consecutive = 1;
        for (let i = 1; i < sortedUnique.length; i++) {
            if (sortedUnique[i] === sortedUnique[i - 1] + 1) {
                consecutive++;
                if (consecutive >= length) return true;
            } else {
                consecutive = 1;
            }
        }
        return false;
    }

    // Reset scores naar 0
    const handleNewScoreBlock = () => {
        setScores({
            Ones: 0,
            Twos: 0,
            Threes: 0,
            Fours: 0,
            Fives: 0,
            Sixes: 0,
            'Three of a Kind': 0,
            'Four of a Kind': 0,
            'Full House': 0,
            'Small Straight': 0,
            'Large Straight': 0,
            Yahtzee: 0,
            Chance: 0
        });
    };

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

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/');
        setDropdownOpen(false);
    };

    return (
        <div className="scores-container">
            <div className="header-container">
                <header className="header">
                    <div className="logo">Yahtzee</div>
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
            </div>
            <div className="scores-main">
                <div className="left-scores-side">
                    {initialDice.length === 0 && Object.values(scores).every((score) => score === 0) ? (
                        <p>Geen worp beschikbaar. Ga terug en gooi eerst!</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Categorie</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(scores).map(([category, score]) => (
                                    <tr key={category}>
                                        <td>{category}</td>
                                        <td>{score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="right-scores-side">
                    <div className="scores-options">
                        <Link to="/game" className="scores-button">Verder spelen</Link>
                        <button onClick={handleNewScoreBlock} className="scores-button">
                            Nieuwe scoreblok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Scores;

