import { useEffect, useState } from 'react'
import { Moon, Sun } from 'phosphor-react'
import styles from './Header.module.css'

import rocketLogo from '../assets/Logo.png'

export function Header() {
    const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')
    useEffect(() => {
        const sync = () => setDark(document.documentElement.dataset.theme === 'dark')
        window.addEventListener('themechange', sync)
        return () => window.removeEventListener('themechange', sync)
    }, [])
    function toggleTheme() {
        const next = dark ? 'light' : 'dark'
        document.documentElement.dataset.theme = next
        document.documentElement.style.colorScheme = next
        try { localStorage.setItem('todo-theme', next) } catch { /* Theme still works without storage. */ }
        setDark(!dark)
    }
    return (
        <header className={styles.header}>
            <img src={rocketLogo} alt="Todo" />
            <button className={styles.themeToggle} type="button" onClick={toggleTheme}
                aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'} title={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}>
                {dark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
            </button>
        </header>
    )
}