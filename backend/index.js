const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

let todos = [
    { id: 1, task: 'Learn CI/CD', completed: true },
    { id: 2, task: 'Implement Docker', completed: false },
    { id: 3, task: 'Setup GitHub Actions', completed: false }
];

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: Date.now(),
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
