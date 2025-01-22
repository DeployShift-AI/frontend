# Shift AI Chatbot

A modern AI chatbot interface built with React and TypeScript, featuring Solana wallet integration and real-time crypto portfolio tracking.

## Features

* 🤖 Interactive AI chatbot interface
* 💳 Solana wallet integration with Phantom
* 📊 Real-time crypto portfolio dashboard
* 📰 Crypto news feed
* 🌓 Dark/Light theme support
* ✨ Beautiful animations and transitions
* 📱 Fully responsive design

## Prerequisites

Before you begin, ensure you have the following installed:
* Node.js (v18 or higher)
* npm or yarn
* [Phantom Wallet](https://phantom.app/) browser extension for Solana integration

## Installation

1. Clone the repository
   ```sh
   git clone https://github.com/your_username/shift-ai-chatbot.git
   ```

2. Navigate to the Frontend directory
   ```sh
   cd Frontend
   ```

3. Install dependencies
   ```sh
   npm install
   ```

4. Start the development server
   ```sh
   npm run dev
   ```

## Tech Stack

* [React](https://react.dev/) - Frontend framework
* [TypeScript](https://www.typescriptlang.org/) - Programming language
* [Vite](https://vitejs.dev/) - Build tool
* [Tailwind CSS](https://tailwindcss.com/) - CSS framework
* [Zustand](https://zustand-demo.pmnd.rs/) - State management
* [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/) - Solana blockchain integration
* [Lucide React](https://lucide.dev/) - Icons
* [clsx](https://github.com/lukeed/clsx) - CSS class construction

## Project Structure

Frontend/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── store/         # Zustand store
│   ├── lib/           # Utility functions
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── index.html         # HTML template

## Available Scripts

* `npm run dev` - Starts development server
* `npm run build` - Builds for production
* `npm run preview` - Preview production build
* `npm run lint` - Run ESLint

## Key Components

* `AnimatedTitle` - Animated welcome message with typewriter effect
* `ChatMessage` - Individual chat message component with loading states
* `Dashboard` - Crypto portfolio dashboard with real-time data
* `News` - Crypto news feed component
* `WarpSpeed` - Star field animation background
* `WelcomeBox` - Initial greeting with suggested prompts
