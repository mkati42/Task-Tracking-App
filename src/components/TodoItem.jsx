function TodoItem({ id, title, completed, onDelete, onToggle }) {
  return (
    <li className="bg-white flex items-center justify-between px-4 py-2 rounded shadow-sm border">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <span className={completed ? "line-through text-gray-400" : ""}>
          {title}
        </span>
      </label>
      <button
        onClick={() => onDelete(id)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Sil
      </button>
    </li>
  )
}

export default TodoItem