import { useEffect, useState, useRef } from "react"
import Header from "./components/Header"
import AddTodo from "./components/AddTodo"
import TodoItem from "./components/TodoItem"

function App() {
  const [todos, setTodos] = useState([])

  // ✅ Bu flag ilk yüklemeyi kontrol etmek için kullanılır
  const isInitialLoad = useRef(true)

  // 📥 İlk yüklemede localStorage’tan verileri al
  useEffect(() => {
    const stored = localStorage.getItem("todos")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setTodos(parsed)
      } catch (err) {
        console.error("LocalStorage JSON parse hatası:", err)
      }
    }
  }, [])

  // 📤 todos değiştiğinde localStorage’a yaz, ama ilk seferi atla
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      return
    }
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const handleDeleteTodo = (id) => {
    const updated = todos.filter((todo) => todo.id !== id)
    setTodos(updated)
  }

  const handleToggleComplete = (id) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updated)
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
