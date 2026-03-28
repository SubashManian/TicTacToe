# 🎮 TicTacToe — React Native

A sleek, neon-themed Tic Tac Toe game built with React Native + Expo.

## ✨ Features

- **Neon dark theme** — cyan (X) vs plasma pink (O) aesthetic
- **Animations** — spring-pop cells, pulsing turn indicator, win glow
- **Persistent scoreboard** — tracks X wins, O wins, and draws
- **Win detection** — highlights winning cells with gold glow
- **Play again / Clear scores** actions

## 🗂 Project Structure

```
TicTacToe/
├── App.js                        # Entry point
├── app.json                      # Expo config
├── babel.config.js
├── package.json
└── src/
    ├── constants/
    │   └── theme.js              # Colors, spacing, fonts
    ├── hooks/
    │   └── useGameLogic.js       # Game state & logic
    ├── components/
    │   ├── Cell.js               # Single board cell
    │   ├── Board.js              # 3x3 grid
    │   ├── GameStatus.js         # Turn / win / draw banner
    │   └── Scoreboard.js         # Score tracker
    └── screens/
        └── GameScreen.js         # Main screen layout
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (iOS/Android)

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the Expo dev server
npx expo start

# 3. Scan the QR code with Expo Go (Android)
#    or Camera app (iOS)
```

### Run on Simulator / Emulator

```bash
# iOS Simulator (Mac only)
npx expo start --ios

# Android Emulator
npx expo start --android
```

## 🎨 Theme

| Token        | Color     | Usage              |
|--------------|-----------|--------------------|
| `neon`       | `#00f5ff` | Player X           |
| `plasma`     | `#ff3cac` | Player O           |
| `gold`       | `#ffd700` | Win highlight      |
| `background` | `#0d0d1a` | App background     |
| `surface`    | `#13132a` | Cards / board      |

## 🛠 Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) ~51
- `Animated` API (built-in RN) for all animations
