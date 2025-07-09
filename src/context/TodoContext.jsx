import { createContext, useContext, useState, useEffect, useRef, Children } from "react";

const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([])
    const [filter, setFilter] = useState("all")
    const [error, setError] = useState("")
    const isInitialLoad = useRef(true)

    //LocalStorage veri çekme
    useEffect(() => {
        const stored = localStorage.getItem("todos")
        if (stored) {
            try {
                setTodos(JSON.parse(stored))
            } catch(err) {
                console.error("Hatalı JSON:", err)
            }
        }
    }, [])

    //LocalStorage yazma
    useEffect(() => {
        if (isInitialLoad.current){
            isInitialLoad.current = false
            return
        }
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    //Görev Ekle
    const addTodo = (title) => {
        if (title.trim() === "") {
            setError("Görev boş olamaz")
            return
        }
        setError("")
        const newTodo = {
            id: Date.now(),
            title,
            completed: false,
        }
        setTodos([...todos, newTodo])
    }

    const deleteTodo = (id) => {
        const updated = todos.filter((todo) => todo.id !== id)
        setTodos(updated)
    }

    //Tamamlama durumu değiştir
    const toggleComplete = (id) => {
        const updated = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        setTodos(updated)
    }

    return (
        <TodoContext.Provider
            value={{
                todos,
                filter,
                setFilter,
                error,
                addTodo,
                deleteTodo,
                toggleComplete,
            }}
            >
                {children}
            </TodoContext.Provider> 
    )
}

export const useTodo = () => useContext(TodoContext)