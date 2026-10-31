import { useEffect, useState } from 'react'
import { Check, Moon, Sun } from 'phosphor-react'
import styles from './Header.module.css'

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
    try { localStorage.setItem('todo-theme', next) } catch { /* Optional persistence. */ }
    setDark(!dark)
  }
  const label = dark ? 'Ativar modo claro' : 'Ativar modo escuro'
  return (
    <>
      <a className={styles.skipLink} href="#main-content">Pular para o conteúdo</a>
      <header className={styles.header}>
        <div className={styles.inner}>
          <a className={styles.brand} href="./" aria-label="ToDo — início">
            <span className={styles.brandIcon}><Check size={23} weight="bold" aria-hidden="true" /></span>
            <span>to<span className={styles.brandAccent}>do</span><span className={styles.brandDot}>.</span></span>
          </a>
          <div className={styles.right}>
            <span className={styles.tagline}>ESPAÇO PARA O QUE IMPORTA</span>
            <button className={styles.themeToggle} type="button" onClick={toggleTheme} aria-label={label} title={label}>
              {dark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
