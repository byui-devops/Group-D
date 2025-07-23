const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('./tasks');

module.exports = (app) => {
  app.get('/tasks', (req, res) => {
    res.json(getAllTasks());
  });

  app.get('/tasks/:id', (req, res) => {
    const task = getTaskById(parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  });

  app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const task = createTask(title, description || '');
    res.status(201).json(task);
  });

  app.put('/tasks/:id', (req, res) => {
    const task = updateTask(parseInt(req.params.id), req.body);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  });

  app.delete('/tasks/:id', (req, res) => {
    const success = deleteTask(parseInt(req.params.id));
    if (!success) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  });
};