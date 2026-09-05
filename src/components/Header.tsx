// src/components/Header.tsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import srmLogo from '../assets/srm-logo.png';
import './Header.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/experiments', label: 'Experiments' },
  { to: '/learning-path', label: 'Learning Path' },
  { to: '/visual-lab', label: 'Visual Lab' },
  { to: '/glossary', label: 'Glossary' },
];

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { getOverallPercent } = useProgress();
  const overallPercent = getOverallPercent();

  const circumference = 2 * Math.PI * 7;
  const offset = circumference - (overallPercent / 100) * circumference;

  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <Link to="/" className="header-brand" aria-label="ML Virtual Lab Home">
          <img src={srmLogo} alt="SRM Logo" className="header-logo" />
          <span className="header-title">
            ML <span className="header-title-accent">Virtual Lab</span>
          </span>
        </Link>

        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `header-nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          {overallPercent > 0 && (
            <div className="header-progress-badge" aria-label={`Overall progress: ${overallPercent}%`}>
              <svg className="header-progress-ring" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="7" fill="none" stroke="var(--border-secondary)" strokeWidth="2" />
                <circle
                  cx="10" cy="10" r="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  transform="rotate(-90 10 10)"
                />
              </svg>
              <span>{overallPercent}%</span>
            </div>
          )}

          <button
            className="header-icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
