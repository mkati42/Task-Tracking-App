import { useState } from "react"
import { useTodo } from "../context/TodoContext" // 🎯 context'ten veri alacağız

function AddTodo() {
  const [text, setText] = useState("")
  const { addTodo, error } = useTodo() // ✨ context'ten addTodo fonksiyonu ve error mesajını alıyoruz

  const handleSubmit = (e) => {
    e.preventDefault()
    addTodo(text)
    setText("")
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Yeni görev"
          className="flex-1 border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
          Ekle
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </>
  )
}

export default AddTodo




/* import { useState } from "react";

function AddTodo({ onAdd }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfa yenilenmesin
    if (inputValue.trim() === "") return; // Boş görev eklenmesin
    onAdd(inputValue); // Ana bileşene görev gönder
    setInputValue(""); // inputu temizle
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Yeni görev ekle..."
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
      >
        Ekle
      </button>
    </form>
  );
}

export default AddTodo; */

/*
🧠 Açıklamalar:
- useState("") → inputun içeriğini takip ediyoruz
- onAdd → App.jsx’ten gelen fonksiyon, yeni görev ekleme işini dışarıya devrediyoruz
- handleSubmit → form gönderildiğinde tetikleniyor
- e.preventDefault() → sayfanın yenilenmesini engelliyor
*/
