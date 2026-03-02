const request = require('supertest');
const app = require('./index');

describe('API Endpoints', () => {

    describe('GET /health', () => {
        it('should return 200 OK', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toEqual(200);
            expect(res.text).toBe('OK');
        });
    });

    describe('GET /api/todos', () => {
        it('should return all todos', async () => {
            const res = await request(app).get('/api/todos');
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    describe('POST /api/todos', () => {
        it('should create a new todo', async () => {
            const newTodoTask = 'Write Unit Tests';
            const res = await request(app)
                .post('/api/todos')
                .send({ task: newTodoTask });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.task).toBe(newTodoTask);
            expect(res.body.completed).toBe(false);
        });
    });
});
