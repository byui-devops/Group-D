const request = require('supertest');
const express = require('express');
const routes = require('../src/routes');

const app = express();
app.use(express.json());
routes(app);

describe('Task API Routes', () => {
  beforeEach(() => {
    // Reset tasks via a POST to ensure clean state
    return request(app).post('/tasks').send({ title: 'Test Task' });
  });

  test('should create a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'New Task', description: 'New Description' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('New Task');
  });

  test('should get all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('should get task by id', async () => {
    const res = await request(app).get('/tasks/1');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Test Task');
  });

  test('should update task', async () => {
    const res = await request(app)
      .put('/tasks/1')
      .send({ title: 'Updated Task', completed: true });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Task');
    expect(res.body.completed).toBe(true);
  });

  test('should delete task', async () => {
    const res = await request(app).delete('/tasks/1');
    expect(res.status).toBe(204);
    const getRes = await request(app).get('/tasks/1');
    expect(getRes.status).toBe(404);
  });
});