import { useState, useEffect } from 'react'
import './App.css'
import { lastUpdate } from './heartbeat'

function App() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos')
      const data = await response.json()
      setTodos(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching todos:', error)
      setLoading(false)
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!task) return

    try {
      await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
      })
      setTask('')
      fetchTodos()
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List (Industry-Standard CI/CD)</h1>
        <p style={{ color: '#888', fontStyle: 'italic', fontSize: '0.8rem' }}>Last Daily Heartbeat: {lastUpdate}</p>

        <form onSubmit={addTodo}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="New Task..."
          />
          <button type="submit">Add</button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {todos.map(todo => (
              <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.task}
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  )
}

export default App
