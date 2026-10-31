import type { Task, TaskFilter } from '../lib/tasks';
import styles from './FormList.module.css';
import { Check, ClipboardText, Trash } from 'phosphor-react';

interface FormListProps {
  tasks: Task[];
  filter: TaskFilter;
  onDeleteTask: (taskId: string) => void;
  onCheckTask: (taskId: string) => void;
}

export function FormList({ tasks, filter, onDeleteTask, onCheckTask }: FormListProps) {
  if (!tasks.length) return (
    <div className={styles.emptyList} role="status">
      <span className={styles.emptyIcon}><ClipboardText size={30} weight="light" aria-hidden="true" /></span>
      <h3>{filter === 'completed' ? 'Cada conquista começa com um passo.' : filter === 'pending' ? 'Tudo em dia por aqui.' : 'Dê espaço para suas ideias.'}</h3>
      <p>{filter === 'completed' ? 'Suas tarefas concluídas vão aparecer aqui.' : filter === 'pending' ? 'Nenhuma tarefa pendente. Aproveite a pausa.' : 'Adicione sua primeira tarefa e comece com calma.'}</p>
    </div>
  );

  return (
    <ul className={styles.list} aria-label="Lista de tarefas">
      {tasks.map(task => (
        <li key={task.id} className={styles.task} data-completed={task.isCompleted}>
          <label className={styles.checkControl}>
            <input type="checkbox" checked={task.isCompleted} onChange={() => onCheckTask(task.id)}
              aria-label={`Concluir tarefa: ${task.content}`} />
            <span aria-hidden="true"><Check size={13} weight="bold" /></span>
          </label>
          <div className={styles.taskText}><span>{task.content}</span><small>{task.isCompleted ? 'Mais um passo dado' : 'Um passo possível'}</small></div>
          <span className={styles.status}>{task.isCompleted ? 'Concluída' : 'Pendente'}</span>
          <button type="button" onClick={() => onDeleteTask(task.id)} className={styles.deleteButton} aria-label={`Excluir tarefa: ${task.content}`} title="Excluir tarefa"><Trash size={17} aria-hidden="true" /></button>
        </li>
      ))}
    </ul>
  );
}
