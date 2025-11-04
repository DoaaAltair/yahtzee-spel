import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Rules.css';
import '../Home/Home.css';

function Rules() {
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

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/');
        setDropdownOpen(false);
    };

    return (
        <div className="rules-container">
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

            <div className="rules-content">
                <div className="rules-wrapper">
                    <h1 className="rules-title"> Instructies en Regels van Yahtzee </h1>

                    <section className="rules-section">
                        <h2 className="section-title">🎯 Doel van het spel</h2>
                        <p className="section-text">
                            Probeer met vijf dobbelstenen de hoogste score te behalen door verschillende combinaties te gooien.
                            Elke speler mag per beurt drie keer gooien en kiest daarna in welke categorie hij zijn score invult.
                        </p>
                    </section>

                    <section className="rules-section">
                        <h2 className="section-title">🎲 Hoe speel je Yahtzee?</h2>
                        <ol className="rules-list">
                            <li>Je gooit met vijf dobbelstenen.</li>
                            <li>Na de eerste worp mag je maximaal twee keer opnieuw gooien.</li>
                            <li>Tussen de worpen door mag je één of meer dobbelstenen vasthouden en de rest opnieuw gooien.</li>
                            <li>Na maximaal drie worpen kies je één categorie waarin je je resultaat noteert.</li>
                            <li>Elke categorie mag maar één keer worden gebruikt.</li>
                            <li>Het spel gaat door tot alle categorieën zijn ingevuld.</li>
                            <li>De speler met de hoogste totaalscore wint!</li>
                        </ol>
                    </section>

                    <section className="rules-section">
                        <h2 className="section-title">🧮 Puntentelling</h2>

                        <div className="scoring-category">
                            <h3 className="category-title">Bovenste deel:</h3>
                            <ul className="rules-list">
                                <li><strong>Éénen:</strong> tel alle 1's bij elkaar op</li>
                                <li><strong>Tweeën:</strong> tel alle 2's bij elkaar op</li>
                                <li><strong>Drieën:</strong> tel alle 3's bij elkaar op</li>
                                <li><strong>Vieren:</strong> tel alle 4's bij elkaar op</li>
                                <li><strong>Vijfen:</strong> tel alle 5's bij elkaar op</li>
                                <li><strong>Zessen:</strong> tel alle 6's bij elkaar op</li>
                            </ul>
                            <div className="bonus-info">
                                🎁 <strong>Bonus:</strong> Als je in dit gedeelte samen 63 punten of meer scoort, krijg je 35 bonuspunten!
                            </div>
                        </div>

                        <div className="scoring-category">
                            <h3 className="category-title">Onderste deel:</h3>
                            <ul className="rules-list">
                                <li><strong>Three of a kind:</strong> minimaal drie dezelfde dobbelstenen → tel alle dobbelstenen op</li>
                                <li><strong>Four of a kind:</strong> minimaal vier dezelfde dobbelstenen → tel alle dobbelstenen op</li>
                                <li><strong>Full House:</strong> drie dezelfde + twee dezelfde → 25 punten</li>
                                <li><strong>Kleine straat (Small Straight):</strong> vier opeenvolgende nummers (bijv. 1-2-3-4) → 30 punten</li>
                                <li><strong>Grote straat (Large Straight):</strong> vijf opeenvolgende nummers (bijv. 2-3-4-5-6) → 40 punten</li>
                                <li><strong>Yahtzee:</strong> vijf dezelfde → 50 punten</li>
                                <li><strong>Kans (Chance):</strong> tel alle dobbelstenen op, maakt niet uit wat je gooit</li>
                            </ul>
                        </div>
                    </section>

                    <section className="rules-section">
                        <h2 className="section-title">🔄 Extra regels</h2>
                        <ul className="rules-list">
                            <li>Gooi je meer dan één Yahtzee in een spel? Dan krijg je een bonus van 100 punten voor elke extra Yahtzee.</li>
                            <li>Je moet altijd een categorie kiezen, ook als je geen goede worp hebt — soms krijg je dus nul punten.</li>
                            <li>Als alle vakjes zijn ingevuld, worden alle punten opgeteld om de eindtotaal te bepalen.</li>
                        </ul>
                    </section>

                    <section className="rules-section">
                        <h2 className="section-title">🏆 Doel van het spel</h2>
                        <p className="section-text">
                            Probeer strategisch te gooien en slim te kiezen welke categorie je invult.
                            Met een beetje geluk (en goed plannen) haal jij de hoogste score!
                        </p>
                    </section>

                    <div className="rules-actions">
                        <Link to="/game" className="rules-button">Begin een spel</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rules;

