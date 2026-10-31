import { Header } from './components/Header'
import { FormTask } from './components/FormTask'
import styles from './App.module.css'

export function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main id="main-content" className={styles.content}>
        <FormTask />
        <footer className={styles.footer}>
          <span>Um passo de cada vez.</span>
          <span>Seu planejamento fica salvo neste navegador.</span>
        </footer>
      </main>
    </div>
  )
}
