import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Game.css';
import './Home.css';

function Game({ username }) {
    const [dice, setDice] = useState([
        '/dice1.png',
        '/dice1.png',
        '/dice1.png',
        '/dice1.png',
        '/dice1.png'
    ]);

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

    const handleRoll = () => {
        const newDice = dice.map(() => {
            const randomIndex = Math.floor(Math.random() * 6);
            return diceImages[randomIndex];
        });
        setDice(newDice);

        localStorage.setItem('yahtzeeGame', JSON.stringify({ dice: newDice }));
    };

    const viewScores = () => {
        navigate('/scores', { state: { dice, username } });
    };

    return (
        <div className="game-container">
            <div className='header-container'>
                <header className="header">
                    <div className="logo">
                        Yahtzee
                    </div>
                    <div className="profile">
                        <span className="profile-icon">👤</span>
                        <span className="username">{username}</span>
                    </div>
                </header>

                <nav className="menu">
                    <Link to="/Game" className="menu-link">Nieuw spel</Link>
                    <Link to="/scores" className="menu-link">Scores</Link>
                    <Link to="/rules" className="menu-link">Regels</Link>
                    <Link to="/settings" className="menu-link">Instelling</Link>
                </nav>
            </div>
            <div className='main-container'>
                <div className="left-game-side">
                    <div className="dice-container">
                        {dice.map((die, index) => (
                            <img
                                key={index}
                                src={die}
                                alt=''
                                className="dice-image"
                            />
                        ))}
                    </div>
                </div>
                <div className="right-game-side">
                    <div className="game-options">
                        <button onClick={handleRoll}>Gooien</button>
                        <button onClick={viewScores}>Scores bekijken</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;