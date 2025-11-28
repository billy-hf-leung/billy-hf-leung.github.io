# Timer m8 - Functional Specification & Plan

## 1. Overview
Timer m8 is a sophisticated web-based timing tool designed for productivity and precision. It features a Smart Timer and Pomodoro focus tool, wrapped in a beautiful, responsive interface using selectable design languages.

## 2. User Interface (UX/UI)
*   **Design Language:** Minimalist, calm, and focus-oriented.
*   **Theme Switcher:** Users can toggle between 4 distinct color presets.
*   **Color Palettes:**
    *   **Set A (Soft Sky):** #7EC8E3 Primary, #F0F9FF Bg. (Default)
    *   **Set B (Soft Mint):** #BFEDE6 Primary, #F4FBFA Bg.
    *   **Set C (Muted Teal):** #7BB5BD Primary, #F2F7F8 Bg.
    *   **Set D (Minimal Grey):** #9DB7C4 Primary, #F7FAFC Bg.
*   **Navigation:** Tab-based switching between modes (Timer, Pomodoro).
*   **Visual Feedback:** Large, readable typography for digits. Animated circular progress rings.
*   **Responsiveness:** Mobile-first design, fully responsive on desktop.

## 3. Core Features

### A. Timer (Countdown)
*   **Manual Input:** Quick controls to add time.
*   **Scroll Adjustment:** Users can scroll up/down on the timer display to increase/decrease duration (1-minute increments).
*   **Controls:** Start, Pause, Reset, Add +1 min.
*   **Visuals:** Decreasing circular progress bar.

### B. Pomodoro Focus
*   **Presets:** Focus (25m), Short Break (5m), Long Break (15m).
*   **Flow:** Simple one-click start for productivity cycles.
*   **Theme Integration:** Colors adapt to the selected global theme.

### C. Audio
*   **Alerts:** Browser-based Audio Oscillator for completion beeps.

### D. Personalization
*   **Theme Menu:** UI to select between the 4 defined color schemes.

## 4. Technical Architecture
*   **Framework:** React 18 with TypeScript.
*   **State Management:** React Hooks.
*   **Styling:** Tailwind CSS with CSS Variables for dynamic theming.
*   **Icons:** Lucide React.