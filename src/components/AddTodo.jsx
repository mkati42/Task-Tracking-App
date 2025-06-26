import { useState } from "react";

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

export default AddTodo;

/*
🧠 Açıklamalar:
- useState("") → inputun içeriğini takip ediyoruz
- onAdd → App.jsx’ten gelen fonksiyon, yeni görev ekleme işini dışarıya devrediyoruz
- handleSubmit → form gönderildiğinde tetikleniyor
- e.preventDefault() → sayfanın yenilenmesini engelliyor
*/
