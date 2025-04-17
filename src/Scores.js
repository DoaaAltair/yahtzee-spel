import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Scores.css';

function Scores({ username }) {
    const location = useLocation();
    const initialDice = location.state?.dice || [];

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

    return (
        <div className="scores-container">
            <div className="header-container">
                <header className="header">
                    <div className="logo">Yahtzee</div>
                    <div className="profile">
                        <span className="profile-icon">👤</span>
                        <span className="username">{username}</span>
                    </div>
                </header>
                <nav className="menu">
                    <Link to="/game" className="menu-link">Nieuw spel</Link>
                    <Link to="/scores" className="menu-link">Scores</Link>
                    <Link to="/rules" className="menu-link">Regels</Link>
                    <Link to="/settings" className="menu-link">Instelling</Link>
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