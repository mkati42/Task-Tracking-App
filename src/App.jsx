import { useTodo } from "./context/TodoContext"
import { TodoProvider } from "./context/TodoContext"
import Header from "./components/Header"
import AddTodo from "./components/AddTodo"
import TodoItem from "./components/TodoItem"

function AppContent() {
  const { todos, filter, setFilter } = useTodo()

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed
    if (filter === "incomplete") return !todo.completed
    return true
  })

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <Header />

      {/* Filtre butonları */}
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

      <AddTodo />

      <ul className="space-y-2 mt-4">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
          />
        ))}
      </ul>
    </div>
  )
}

function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  )
}

export default App


/*   // ✅ Bu flag ilk yüklemeyi kontrol etmek için kullanılır
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
 */