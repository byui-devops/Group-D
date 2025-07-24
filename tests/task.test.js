const { getAllTasks, createTask, getTaskById, updateTask, deleteTask } = require('../scr/task');

describe('Task Model', () => {
  beforeEach(() => {
    // Reset tasks array
    createTask('Test Task', 'Test Description');
  });

  test('should create a task', () => {
    const task = createTask('New Task', 'New Description');
    expect(task).toHaveProperty('id');
    expect(task.title).toBe('New Task');
    expect(task.description).toBe('New Description');
    expect(task.completed).toBe(false);
  });

  test('should get all tasks', () => {
    const tasks = getAllTasks();
    expect(tasks.length).toBeGreaterThan(0);
  });

  test('should get task by id', () => {
    const task = getTaskById(1);
    expect(task.title).toBe('Test Task');
  });

  test('should update task', () => {
    const updated = updateTask(1, { title: 'Updated Task', completed: true });
    expect(updated.title).toBe('Updated Task');
    expect(updated.completed).toBe(true);
  });

  test('should delete task', () => {
    const success = deleteTask(1);
    expect(success).toBe(true);
    expect(getTaskById(1)).toBeUndefined();
  });
});
