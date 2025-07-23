let tasks = [];
let nextId = 1;

const getAllTasks = () => tasks;

const getTaskById = (id) => tasks.find(task => task.id === id);

const createTask = (title, description) => {
  const task = { id: nextId++, title, description, completed: false };
  tasks.push(task);
  return task;
};

const updateTask = (id, updates) => {
  const task = tasks.find(task => task.id === id);
  if (!task) return null;
  task.title = updates.title || task.title;
  task.description = updates.description || task.description;
  task.completed = updates.completed !== undefined ? updates.completed : task.completed;
  return task;
};

const deleteTask = (id) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };