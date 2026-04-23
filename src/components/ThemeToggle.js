import React from 'react';
import { PiSun, PiMoon } from 'react-icons/pi';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <PiSun /> : <PiMoon />}
    </button>
  );
}

export default ThemeToggle;
