import { PlusCircle } from "phosphor-react";
import styles from "./FormTask.module.css";
import { v4 as uuid } from "uuid";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { FormList } from "./FormList";

export interface ITask {
  id: string;
  content: string;
  isCompleted: boolean;
}

export function FormTask() {
  const [tasks, setTask] = useState<ITask[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  function handleCreatedNewTask(event: FormEvent) {
    event.preventDefault();
    const newTask = {
      id: uuid(),
      content: newTaskText,
      isCompleted: false,
    };
    const newTasksArray = [...tasks, newTask];
    setTask(newTasksArray);
    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.currentTarget.setCustomValidity("Este campo é obrigatório");
  }

  function handleDeleteTask(taskId: string) {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTask(updatedTasks);
  }

  function handleCheckTask(taskId: string) {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTask(updatedTasks);
  }

  return (
    <>
      <div className={styles.list}>
        <header className={styles.listHeader}>
          <form onSubmit={handleCreatedNewTask}>
            <input
              name="task"
              placeholder="Adicione uma nova tarefa"
              value={newTaskText}
              onChange={handleNewTaskChange}
              onInvalid={handleNewCommentInvalid}
              required
              className={styles.listInputNewTask}
            />
            <button type="submit" className={styles.listButtonNewTask}>
              Criar <PlusCircle size={16} />
            </button>
          </form>
        </header>
      </div>
      <FormList 
        tasks={tasks}
        onDeleteTask={handleDeleteTask} 
        onCheckTask={handleCheckTask} 
      />
    </>
  );
}