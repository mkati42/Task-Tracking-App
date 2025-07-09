import { useEffect, useState, useRef } from "react"
import './index.css'
import Header from "./components/Header"
import AddTodo from "./components/AddTodo"
import TodoItem from "./components/TodoItem"

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "JSX ve Component yapısı", completed: true },
    { id: 2, title: "Props ile veri aktarımı", completed: true },
    { id: 3, title: "useState ile state yönetimi", completed: true },
    { id: 4, title: "useEffect ile lifecycle kontrolü", completed: true },
    { id: 5, title: "useRef ile ilk render kontrolü", completed: true },
    { id: 6, title: "localStorage ile veri kaydetme", completed: true },
    { id: 7, title: "filter/map ile liste işlemleri", completed: true },
    { id: 8, title: "Boş görev validasyonu", completed: true },
    { id: 9, title: "Filtreleme (tamamlanan, tamamlanmayan)", completed: true },
    { id: 10, title: "Animasyonlar (Framer Motion)", completed: false },
    { id: 11, title: "Context API", completed: false },
    { id: 12, title: "Custom Hook yazımı", completed: false },
    { id: 13, title: "Reducer ve useReducer", completed: false },
    { id: 14, title: "Testing (Jest, React Testing Library)", completed: false }
  ])
  const [filter, setFilter] = useState("all")
  const [error, setError] = useState("")

  // ✅ Bu flag ilk yüklemeyi kontrol etmek için kullanılır
  const isInitialLoad = useRef(true)

  // 📥 İlk yüklemede localStorage’tan verileri al
  useEffect(() => {
    const stored = localStorage.getItem("todos")
    if (stored || 0) {
      try {
        const parsed = JSON.parse(stored)
        setTodos(parsed)
      } catch (err) {
        console.error("LocalStorage JSON parse hatası:", err)
      }
    }
    else{
      setTodos([
        { id: 1, title: "JSX ve Component yapısı", completed: true },
        { id: 2, title: "Props ile veri aktarımı", completed: true },
        { id: 3, title: "useState ile state yönetimi", completed: true },
        { id: 4, title: "useEffect ile lifecycle kontrolü", completed: true },
        { id: 5, title: "useRef ile ilk render kontrolü", completed: true },
        { id: 6, title: "localStorage ile veri kaydetme", completed: true },
        { id: 7, title: "filter/map ile liste işlemleri", completed: true },
        { id: 8, title: "Boş görev validasyonu", completed: true },
        { id: 9, title: "Filtreleme (tamamlanan, tamamlanmayan)", completed: true },
        { id: 10, title: "Animasyonlar (Framer Motion)", completed: false },
        { id: 11, title: "Context API", completed: false },
        { id: 12, title: "Custom Hook yazımı", completed: false },
        { id: 13, title: "Reducer ve useReducer", completed: false },
        { id: 14, title: "Testing (Jest, React Testing Library)", completed: false }
      ])
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
    if (title.trim() === "") {
      setError("Görev Metni Boş Olamaz")
      return
    }

    setError("")

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

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed
    if (filter === "incomplete") return !todo.completed
    return true
  })

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <Header />
      <div className="flex justify-center gap-2 mt-4">
        <button
          className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("all")}
        >
          Tümü
        </button>
        <button
          className={`px-3 py-1 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("completed")}
        >
          Tamamlananlar
        </button>
        <button
          className={`px-3 py-1 rounded ${filter === "incomplete" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("incomplete")}
        >
          Tamamlanmayanlar
        </button>
      </div>

      <AddTodo onAdd={handleAddTodo} error={error} />
      <ul className="space-y-2 mt-4">
        {filteredTodos.map((todo) => (
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
