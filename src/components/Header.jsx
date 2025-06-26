function Header() {
    return (
        <header className="bg-blue-600 text-white text-center py-4 shadow-md">
            <h1 className="text-2x1 font-bold"> Görev Takip Uygulaması </h1>
            </header>
    );
}

export default Header;

/* Açıklamalar:

1. function Header() { ... }
   → React bileşeni tanımlıyoruz. Fonksiyon ismi büyük harfle başlar (React kuralı).
   → Bu bileşen sadece başlık kısmını döndürüyor (render ediyor).

2. <header className="..."> ... </header>
   → HTML'de sayfanın üst kısmı için kullanılan etiket (semantic tag).
   → Tailwind class'ları kullanarak arka plan, yazı rengi, ortalama, padding ve gölge verdik.

3. <h1 className="..."> ... </h1>
   → Başlık etiketi. Tailwind ile yazıyı büyüttük ve kalınlaştırdık.

4. export default Header;
   → Bu bileşeni dışa aktarıyoruz ki, başka dosyada (örneğin App.jsx) kullanabilelim.
   → “default” demek: `import Header from "..."` şeklinde kullanılabilir hale gelir.
*/