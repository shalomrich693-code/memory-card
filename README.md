# Memory Card Game

## Overview

A small browser-based matching game built with React. Flip emoji cards, find pairs, track moves, and replay with a shuffled deck.

## Features

- Flip cards to reveal their values
- Match pairs and track completed matches
- Count moves
- Shuffle and reset the deck
- Show a completion message with the final move count

## Technology Stack

React 19 · JavaScript · CSS · Vite

## Structure and Interaction

The `App` component manages the deck and game state. The interface is divided into `GameHeader`, `Card`, and `WinMessage` components. Players turn over two cards at a time; matching pairs stay matched and increase the score, while non-matching cards are turned back after a short delay.

## Local Setup

Requirements: Node.js and npm.

```bash
git clone https://github.com/shalomrich693-code/memory-card.git
cd memory-card
npm install
npm run dev
```

The project also defines `npm run build` and `npm run preview`.

## Engineering Highlights

- React component organization
- State management for a turn-based interaction
- Randomized deck shuffling and match detection
- Input locking while a pair resolves

## Developer

**Shalom Solomon**  
Full Stack Developer | Mobile App Developer

[Portfolio](https://portfolio-zeta-teal-99.vercel.app) · [GitHub](https://github.com/shalomrich693-code)
