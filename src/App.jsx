import { useState } from "react"
import Header from "./components/Header"
import AddTodo from "./components/AddTodo"
import TodoItem from "./components/TodoItem"

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Alışveriş yap" },
    { id: 2, title: "Kod yaz" },
    { id: 3, title: "Kitap oku" },
  ])

  const handleAddTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    setTodos(updatedTodos)
  }

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <Header />
      <AddTodo onAdd={handleAddTodo} />
      <ul className="space-y-2 mt-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleComplete}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
