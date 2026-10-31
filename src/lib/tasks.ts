export interface Task {
  id: string;
  content: string;
  isCompleted: boolean;
}

export type TaskFilter = 'all' | 'pending' | 'completed';

export function restoreTasks(raw: string | null): Task[] {
  try {
    const value: unknown = JSON.parse(raw || '[]');
    if (!Array.isArray(value)) return [];
    const seen = new Set<string>();
    return value.filter((item): item is Task => {
      if (!item || typeof item !== 'object' || typeof item.id !== 'string' ||
        !item.id || typeof item.content !== 'string' || !item.content.trim() ||
        typeof item.isCompleted !== 'boolean' || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  } catch {
    return [];
  }
}

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  return tasks.filter(task => filter === 'all' ||
    (filter === 'completed' ? task.isCompleted : !task.isCompleted))
    .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
}
