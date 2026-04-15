# Motivated Calendar 🗓️✨

A beautiful, motivational calendar application built with React, Vite, and Tailwind CSS. Designed to help users stay motivated by tracking daily achievements and setting goals.

## 🌟 Features

- **Interactive Calendar**: Navigate through months with a clean, intuitive interface
- **Daily Motivation**: Inspirational quotes that change based on the selected date
- **Achievement Tracking**: Add and track daily accomplishments with visual indicators
- **Goal Management**: Set, track, and complete personal goals
- **Progress Statistics**: Monthly progress tracking with visual progress bars
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: All data persists locally in your browser

## 🏗️ Architecture

This project follows a clean **MVC (Model-View-Controller)** architecture:

### Model Layer (`src/models/`)
- `CalendarModel.js`: Handles all data operations, business logic, and state management
- Manages calendar navigation, achievements, goals, and motivational content
- Handles data persistence with localStorage

### Controller Layer (`src/controllers/`)
- `CalendarController.js`: Orchestrates interactions between Model and View
- Implements Observer pattern for state management
- Provides clean API for UI components

### View Layer (`src/components/`)
- **Calendar Components**: `CalendarGrid.jsx`, `CalendarDay.jsx`, `CalendarHeader.jsx`
- **Sidebar Components**: `DailyMotivation.jsx`, `AchievementPanel.jsx`, `GoalsPanel.jsx`
- **Statistics**: `MonthlyStats.jsx`

### Custom Hooks (`src/hooks/`)
- `useCalendar.js`: React hook that bridges the Controller with React components
- Provides reactive state management using the Observer pattern

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for main UI elements
- **Motivation Colors**: 
  - Orange (`#ff6b35`) for today's date and achievements
  - Purple (`#6366f1`) for goals and branding
  - Pink (`#ec4899`) for motivational elements

### Animations
- Smooth transitions for all interactive elements
- Gentle bounce animation for today's date
- Fade-in animations for dynamic content
- Slide-up animations for form elements

## 📱 Features in Detail

### Calendar Navigation
- Month-by-month navigation with arrow controls
- "Today" button to quickly return to current date
- Visual indicators for days with achievements

### Achievement System
- Add multiple achievements per day
- Visual star indicators on calendar days
- Achievement count display for days with multiple entries
- Easy removal of achievements

### Goal Management
- Create and manage personal goals
- Toggle completion status
- Progress tracking with visual progress bar
- Separate display for completed vs pending goals

### Motivational Quotes
- Rotating daily quotes based on date
- Inspirational messages to keep users motivated
- Beautiful gradient background with quote styling

### Statistics Dashboard
- Monthly achievement rate tracking
- Goal completion percentage
- Visual progress indicators
- Motivational messages based on progress

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with modern hooks
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for robust date operations
- **State Management**: Custom Observer pattern implementation

## 📂 Project Structure

```
motivated-calendar/
├── src/
│   ├── components/
│   │   ├── Calendar/
│   │   │   ├── CalendarGrid.jsx
│   │   │   ├── CalendarDay.jsx
│   │   │   └── CalendarHeader.jsx
│   │   ├── Sidebar/
│   │   │   ├── DailyMotivation.jsx
│   │   │   ├── AchievementPanel.jsx
│   │   │   └── GoalsPanel.jsx
│   │   └── Stats/
│   │       └── MonthlyStats.jsx
│   ├── controllers/
│   │   └── CalendarController.js
│   ├── models/
│   │   └── CalendarModel.js
│   ├── hooks/
│   │   └── useCalendar.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Performance Optimizations

- **Efficient Re-renders**: Observer pattern minimizes unnecessary re-renders
- **Optimized Bundle**: Vite's tree-shaking and code splitting
- **Lazy Loading**: Components load only when needed
- **Local Storage**: Fast data persistence without server calls
- **CSS Optimizations**: Tailwind's purging removes unused styles

## 🔧 Customization

### Adding New Motivational Quotes
Edit the `getMotivationalQuotes()` method in `CalendarModel.js`:

```javascript
getMotivationalQuotes() {
  return [
    "Your custom quote here",
    // ... more quotes
  ];
}
```

### Customizing Colors
Update the color palette in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      motivation: {
        orange: '#your-color',
        purple: '#your-color',
        pink: '#your-color'
      }
    }
  }
}
```



**Stay motivated, track your progress, and celebrate every achievement! 🌟**
