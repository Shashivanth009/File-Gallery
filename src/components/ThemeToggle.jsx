import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="glass-panel"
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 9999,
                border: '1px solid var(--glass-border)',
                background: 'var(--glass-bg)',
                color: 'var(--text-primary)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
            }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
    );
};

export default ThemeToggle;
