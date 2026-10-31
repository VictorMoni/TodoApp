import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, CheckCircle, Circle, ListChecks, Plus, Sparkle } from 'phosphor-react';
import { v4 as uuid } from 'uuid';
import { filterTasks, restoreTasks, type Task, type TaskFilter } from '../lib/tasks';
import { FormList } from './FormList';
import styles from './FormTask.module.css';

export function FormTask() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try { return restoreTasks(localStorage.getItem('todo-tasks')); } catch { return []; }
  });
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const completed = tasks.filter(task => task.isCompleted).length;
  const pending = tasks.length - completed;
  const progress = tasks.length ? Math.round(completed / tasks.length * 100) : 0;

  useEffect(() => {
    try { localStorage.setItem('todo-tasks', JSON.stringify(tasks)); } catch { /* Keep working in memory. */ }
  }, [tasks]);

  function createTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = draft.trim();
    if (!content) return;
    setTasks(current => [{ id: uuid(), content, isCompleted: false }, ...current]);
    setDraft('');
    setFilter('all');
  }

  const filters: { id: TaskFilter; label: string; count: number }[] = [
    { id: 'all', label: 'Todas', count: tasks.length },
    { id: 'pending', label: 'Pendentes', count: pending },
    { id: 'completed', label: 'Concluídas', count: completed },
  ];

  return (
    <>
      <section className={styles.intro} aria-labelledby="page-title">
        <div>
          <p className={styles.eyebrow}><span /> UM POUCO DE FOCO, TODOS OS DIAS</p>
          <h1 id="page-title">Menos na cabeça.<br /><span>Mais no seu dia.</span></h1>
          <p className={styles.subtitle}>Organize suas ideias, encontre seu ritmo e dê espaço<br className={styles.desktopBreak} /> para o que realmente importa.</p>
        </div>
        <div className={styles.introNote}><Sparkle size={19} aria-hidden="true" /><span>Grandes dias começam<br /><strong>com pequenos passos.</strong></span></div>
      </section>

      <div className={styles.stats} aria-label="Resumo das tarefas" aria-live="polite">
        <div className={styles.stat}><span className={styles.statIcon}><ListChecks size={20} aria-hidden="true" /></span><div><span>Total de tarefas</span><strong>{String(tasks.length).padStart(2, '0')}</strong></div><span className={styles.statNote}>Tudo no seu radar</span></div>
        <div className={styles.stat}><span className={styles.statIcon}><Circle size={19} aria-hidden="true" /></span><div><span>Pendentes</span><strong>{String(pending).padStart(2, '0')}</strong></div><span className={styles.statNote}>Um passo de cada vez</span></div>
        <div className={styles.stat}><span className={styles.successIcon}><CheckCircle size={20} aria-hidden="true" /></span><div><span>Concluídas</span><strong>{String(completed).padStart(2, '0')}</strong></div><span className={styles.statNote}>Cada conquista conta</span></div>
      </div>

      <div className={styles.workspace}>
        <section className={styles.taskPanel} aria-labelledby="tasks-title">
          <div className={styles.panelHeading}><div><h2 id="tasks-title">Seu próximo passo</h2><p>Uma lista mais leve. Um dia mais seu.</p></div><span className={styles.headingMark}><ArrowUpRight size={20} aria-hidden="true" /></span></div>
          <form onSubmit={createTask} className={styles.composer}>
            <label htmlFor="new-task" className={styles.srOnly}>Nova tarefa</label>
            <Plus size={20} aria-hidden="true" />
            <input id="new-task" name="task" value={draft} onChange={event => setDraft(event.target.value)} placeholder="O que você quer fazer?" required maxLength={500} autoComplete="off" />
            <button type="submit" disabled={!draft.trim()}><Plus size={17} weight="bold" aria-hidden="true" /><span>Adicionar</span></button>
          </form>
          <div className={styles.listToolbar}>
            <div className={styles.filters} role="group" aria-label="Filtrar tarefas">
              {filters.map(item => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}<span>{item.count}</span></button>)}
            </div>
            <span className={styles.listHint}>NO SEU RITMO</span>
          </div>
          <FormList tasks={filterTasks(tasks, filter)} filter={filter}
            onDeleteTask={id => setTasks(current => current.filter(task => task.id !== id))}
            onCheckTask={id => setTasks(current => current.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task))} />
        </section>
        <aside className={styles.sidebar} aria-labelledby="progress-title">
          <section className={styles.progressCard}>
            <p className={styles.cardEyebrow}><Sparkle size={14} aria-hidden="true" /> CADA PASSO CONTA</p>
            <h2 id="progress-title">Olha o seu progresso.</h2>
            <div className={styles.progressCircle} style={{ background: `conic-gradient(var(--accent) ${progress}%, var(--line) 0)` }} role="progressbar" aria-label="Tarefas concluídas" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <div><strong>{progress}<span>%</span></strong><span>do seu caminho</span></div>
            </div>
            <p className={styles.progressCaption}>{tasks.length ? <><strong>{completed} de {tasks.length} tarefas</strong><br />já saíram da sua lista.</> : <>Seu primeiro passo<br />pode começar agora.</>}</p>
            <div className={styles.progressFoot}><Check size={14} aria-hidden="true" /> Pequenas ações, grandes mudanças.</div>
          </section>
          <div className={styles.focusNote}><span className={styles.noteLine} /><p>Você não precisa fazer tudo.<br /><strong>Só precisa começar.</strong></p></div>
        </aside>
      </div>
    </>
  );
}
