# Spyfall – Homemade Edition

This is a Spyfall-inspired party game rebuilt from scratch using Astro and TypeScript.

The goal of the project is to provide a simple, fast, and fully client-side version of the game that can be played immediately without accounts, servers, or databases.

Players enter their names, start a game, and play. Nothing is stored, nothing persists.

## How the game works

At the start of each round:

- All players receive the same secret location and a unique role
- One or more players are spies and do not know the location

Through turn-based questions and answers, players try to identify the spy, while the spy attempts to guess the location without being discovered.

## Design choices

- Fully client-side logic
- No backend, no database, no sessions
- Game state exists only in memory
- Locations are never repeated within the same game
- Flexible rules that allow meme-oriented variations

## Features

- Fast game setup
- Multiple locations with role-based gameplay
- Support for custom and unconventional locations
- Optional meme rules (e.g. specific player names triggering special behavior)
- Mobile-friendly by design

## Tech stack

- Astro
- TypeScript
- Tailwind CSS

## Disclaimer

This project is not affiliated with the original Spyfall game.
It is intended for personal use, experimentation, and entertainment only.
