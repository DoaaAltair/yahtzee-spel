import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home({ username }) {
    const navigate = useNavigate();

    const startNewGame = () => {
        navigate('/game');
    };

    const resumeGame = () => {
        navigate('/game');
    };

    return (
        <div className="home-container">
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