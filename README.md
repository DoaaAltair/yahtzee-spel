# Yahtzee - Online Dice Game

Een moderne, interactieve webapplicatie voor het klassieke Yahtzee-dobbelspel. Gebouwd met React en voorzien van een intuïtieve gebruikersinterface, automatische scoreberekening en gebruikersauthenticatie.

![React](https://img.shields.io/badge/React-19.0-blue.svg)
![React Router](https://img.shields.io/badge/React%20Router-7.6-orange.svg)
![License](https://img.shields.io/badge/License-Private-red.svg)

## Inhoudsopgave

- [Overzicht](#overzicht)
- [Features](#features)
- [Technologieën](#technologieën)
- [Installatie](#installatie)
- [Gebruik](#gebruik)
- [Spelregels](#spelregels)
- [Project Structuur](#project-structuur)
- [Scripts](#scripts)
- [Toekomstige Verbeteringen](#toekomstige-verbeteringen)

## Overzicht

Yahtzee is een volledig functionele digitale versie van het klassieke dobbelspel Yahtzee. Spelers kunnen inloggen, een spel starten, dobbelstenen gooien, scores berekenen en hun voortgang volgen. De applicatie biedt een soepele gebruikerservaring met moderne UI-componenten en responsief design.

## Features

### Spel Functionaliteiten
- **Interactief Dobbelspel**: Gooi met vijf dobbelstenen en selecteer welke je wilt vasthouden
- **Drie Worpen per Beurt**: Maximaal drie worpen per beurt om de beste combinatie te krijgen
- **Automatische Scoreberekening**: Real-time berekening van alle mogelijke Yahtzee-categorieën
- **Score Categorieën**:
  - Bovenste sectie: Eénen, Tweeën, Drieën, Vieren, Vijfen, Zessen
  - Onderste sectie: Three of a Kind, Four of a Kind, Full House, Kleine Straat, Grote Straat, Yahtzee, Kans
- **Spelstatus Opslag**: Automatische opslag van spelstatus in localStorage
- **Nieuwe Beurt Functionaliteit**: Start een nieuwe beurt wanneer je klaar bent

### Gebruikerservaring
- **Gebruikersauthenticatie**: Inloggen met gebruikersnaam
- **Gebruikersprofiel**: Modern profiel-dropdown met avatar
- **Responsive Design**: Volledig geoptimaliseerd voor desktop, tablet en mobiel
- **Intuïtieve Navigatie**: Duidelijke menu's en navigatiestructuur

### Score Management
- **Real-time Score Overzicht**: Bekijk alle mogelijke scores voor je huidige worp
- **Score Categorieën**: Volledige ondersteuning voor alle Yahtzee-categorieën
- **Score Reset**: Start met een nieuw scoreblok wanneer gewenst

### Informatie
- **Uitgebreide Regels**: Complete handleiding met alle spelregels en puntentelling
- **Visuele Instructies**: Duidelijke uitleg van het doel en de spelmechanica

## Technologieën

Deze applicatie is gebouwd met de volgende technologieën:

- **React 19.0** - Moderne JavaScript bibliotheek voor gebruikersinterfaces
- **React Router 7.6** - Client-side routing voor single-page applicaties
- **React Context API** - State management voor authenticatie
- **CSS3** - Moderne styling met custom properties en responsive design
- **LocalStorage API** - Client-side data opslag voor spelstatus
- **Create React App** - Build tooling en development environment

## Installatie

### Vereisten

- Node.js (versie 14.0 of hoger)
- npm of yarn package manager

### Stappen

1. **Clone de repository**
   ```bash
   git clone <repository-url>
   cd yahtzee
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Start de development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   De applicatie opent automatisch op http://localhost:3000
   ```

## Gebruik

### Eerste Keer Gebruiken

1. **Inloggen**: Voer een gebruikersnaam in op de loginpagina
2. **Start een Spel**: Klik op "Nieuw spel" of "Opnieuw" op de homepagina
3. **Gooi Dobbelstenen**: Klik op de "Gooien" knop om te beginnen
4. **Selecteer Dobbelstenen**: Klik op dobbelstenen die je wilt vasthouden (na de eerste worp)
5. **Bekijk Scores**: Navigeer naar de Scores-pagina om alle mogelijke scores te zien
6. **Regels Bekijken**: Bezoek de Regels-pagina voor uitgebreide spelinstructies

### Spel Mechanica

- **Eerste Worp**: Gooi alle vijf dobbelstenen
- **Selectie Fase**: Klik op dobbelstenen die je wilt vasthouden (ze worden vergrendeld met een 🔒)
- **Herhaalde Worpen**: Gooi opnieuw met de niet-geselecteerde dobbelstenen (maximaal 3 worpen totaal)
- **Score Kiezen**: Na je laatste worp, bekijk de mogelijke scores op de Scores-pagina
- **Nieuwe Beurt**: Start een nieuwe beurt wanneer je klaar bent

## Spelregels

### Doel van het Spel
Probeer met vijf dobbelstenen de hoogste score te behalen door verschillende combinaties te gooien. Elke speler mag per beurt drie keer gooien en kiest daarna in welke categorie de score wordt genoteerd.

### Puntentelling

#### Bovenste Sectie
- **Eénen t/m Zessen**: Tel alle dobbelstenen met die waarde bij elkaar op
- **Bonus**: Als je in dit gedeelte samen 63 punten of meer scoort, krijg je 35 bonuspunten!

#### Onderste Sectie
- **Three of a Kind**: Minimaal drie dezelfde → tel alle dobbelstenen op
- **Four of a Kind**: Minimaal vier dezelfde → tel alle dobbelstenen op
- **Full House**: Drie dezelfde + twee dezelfde → 25 punten
- **Kleine Straat**: Vier opeenvolgende nummers → 30 punten
- **Grote Straat**: Vijf opeenvolgende nummers → 40 punten
- **Yahtzee**: Vijf dezelfde → 50 punten
- **Kans**: Tel alle dobbelstenen op, maakt niet uit wat je gooit

Voor een volledige uitleg van alle regels, bezoek de Regels-pagina in de applicatie.

## Project Structuur

```
yahtzee/
├── public/
│   ├── dice1.png - dice6.png    # Dobbelsteen afbeeldingen
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login/
│   │   │   ├── Login.js         # Login component
│   │   │   └── Login.css
│   │   └── ProtectedRoute/
│   │       └── ProtectedRoute.js # Route protection
│   ├── context/
│   │   └── AuthContext.js       # Authenticatie context
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.js          # Home pagina
│   │   │   └── Home.css
│   │   ├── Game/
│   │   │   ├── Game.js          # Spel pagina
│   │   │   └── Game.css
│   │   ├── Scores/
│   │   │   ├── Scores.js        # Scores pagina
│   │   │   └── Scores.css
│   │   └── Rules/
│   │       ├── Rules.js         # Regels pagina
│   │       └── Rules.css
│   ├── App.js                   # Hoofd applicatie component
│   ├── index.js                 # Entry point
│   └── index.css               # Globale styles
├── package.json
└── README.md
```

## Scripts

### Development
```bash
npm start
```
Start de development server op http://localhost:3000. De pagina wordt automatisch herladen bij wijzigingen.

### Build voor Productie
```bash
npm run build
```
Bouwt een geoptimaliseerde productieversie in de `build` folder. De build is geminificeerd en klaar voor deployment.

### Testen
```bash
npm test
```
Start de test runner in interactive watch mode. Zie [Running Tests](https://facebook.github.io/create-react-app/docs/running-tests) voor meer informatie.

### Eject
```bash
npm run eject
```
**Let op:** Dit is een one-way operatie. Eject verwijdert de single build dependency en kopieert alle configuratiebestanden naar je project zodat je volledige controle hebt.

## Design Features

- **Moderne UI**: Schone, professionele interface met moderne design principes
- **Responsive Layout**: Volledig geoptimaliseerd voor alle schermformaten
- **Interactieve Elementen**: Hover effects, transitions en animaties
- **Gebruiksvriendelijke Navigatie**: Duidelijke menu's en navigatiestructuur
- **Profiel Dropdown**: Modern profielmenu met avatar en gebruikersinformatie

## Toekomstige Verbeteringen

-  Multiplayer functionaliteit
-  Statistieken en voortgang tracking
-  Geluidseffecten en animaties
-  Verschillende thema's en personalisatie opties
-  Export/import van speldata

## Licentie

Dit project is privé eigendom en niet beschikbaar voor publiek gebruik.

## Auteur

Ontwikkeld door Doaa Altair als onderdeel van een persoonlijk project voor educatieve doeleinden.

---

**Veel plezier met Yahtzee!**
