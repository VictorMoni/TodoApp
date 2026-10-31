import { test } from 'node:test';
import assert from 'node:assert/strict';
import { restoreTasks, filterTasks } from '../src/lib/tasks.ts';

test('restores valid tasks and rejects malformed or duplicate saved entries', () => {
  const task = { id: 'a', content: 'Read a chapter', isCompleted: false };
  assert.deepEqual(restoreTasks(JSON.stringify([task, task, { id: 'b', content: ' ', isCompleted: false }, null])), [task]);
  assert.deepEqual(restoreTasks('not json'), []);
  assert.deepEqual(restoreTasks('{}'), []);
});

test('filters pending and completed tasks while preserving source data', () => {
  const done = { id: 'a', content: 'Done', isCompleted: true };
  const pending = { id: 'b', content: 'Next step', isCompleted: false };
  const tasks = [done, pending];
  assert.deepEqual(filterTasks(tasks, 'all'), [pending, done]);
  assert.deepEqual(filterTasks(tasks, 'pending'), [pending]);
  assert.deepEqual(filterTasks(tasks, 'completed'), [done]);
  assert.deepEqual(tasks, [done, pending]);
});
