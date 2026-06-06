# 📚 E-Modul Pembelajaran Simple Present Tense

Website e-learning interaktif untuk mempelajari Simple Present Tense dalam bahasa Inggris dengan pendekatan yang terstruktur dan menyenangkan.

## ✨ Fitur Utama

- **📖 Materi Lengkap**: Penjelasan komprehensif tentang Simple Present Tense
  - Pengertian dan fungsi
  - Rumus (Positive, Negative, Interrogative)
  - Time signals/adverbs
  - Verb forms (s/es rules)
  - 20+ contoh kalimat

- **✏️ Latihan Interaktif**: 20 soal latihan dengan feedback instant
  - Multiple choice questions
  - Fill in the blanks exercises
  - Scoring system otomatis
  - Penjelasan untuk setiap jawaban

- **🎯 Quiz Evaluasi**: Test pemahaman dengan 15 soal quiz
  - Randomized questions
  - Progress tracking
  - Hasil detail dengan rekomendasi

- **📊 Progress Tracking**: Monitor perkembangan belajar
  - Auto-save progress menggunakan localStorage
  - Visual progress indicators
  - Overall completion percentage

- **🎨 Desain Modern**: UI/UX yang menarik dan mudah digunakan
  - Dark/Light mode toggle
  - Responsive design (mobile, tablet, desktop)
  - Smooth animations and transitions
  - Clean and intuitive interface

## 🚀 Cara Menjalankan

### Metode 1: Langsung di Browser
1. Clone atau download repository ini
2. Buka file `index.html` di browser
3. Mulai belajar!

### Metode 2: Dengan Live Server (Recommended)
1. Install ekstensi Live Server di VS Code
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"

### Metode 3: Dengan Python Server
```bash
# Python 3
python -m http.server 8000

# Buka di browser: http://localhost:8000
```

## 📁 Struktur Project

```
emodul-simple-present/
├── index.html              # Landing page
├── pages/
│   ├── material.html      # Halaman materi pembelajaran
│   ├── practice.html      # Halaman latihan interaktif
│   ├── quiz.html         # Halaman quiz evaluasi
│   └── result.html       # Halaman hasil quiz
├── css/
│   ├── style.css         # Main stylesheet dengan design system
│   └── responsive.css    # Media queries untuk responsiveness
├── js/
│   ├── main.js           # Core JavaScript (navigation, theme, etc)
│   ├── practice.js       # Logic untuk latihan interaktif
│   ├── quiz.js          # Quiz system
│   └── result.js        # Display hasil quiz
├── assets/
│   ├── images/          # Ilustrasi dan gambar
│   └── icons/           # Icons SVG
└── README.md
```

## 🎯 Alur Pembelajaran

1. **Beranda** → Overview fitur dan progress
2. **Materi** → Pelajari teori Simple Present lengkap
3. **Latihan** → Kerjakan 20 soal latihan dengan feedback
4. **Quiz** → Test pemahaman dengan 15 soal evaluasi
5. **Hasil** → Lihat skor dan rekomendasi

## 💻 Teknologi yang Digunakan

- **HTML5**: Struktur semantic dan accessible
- **CSS3**: Modern styling dengan custom properties
  - Flexbox & Grid layout
  - CSS animations & transitions
  - Dark mode support
- **Vanilla JavaScript**: 
  - No frameworks/libraries
  - LocalStorage untuk data persistence
  - Event-driven programming

## 🎨 Design System

### Color Palette
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#06b6d4` (Cyan)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Error: `#ef4444` (Red)

### Typography
- Font Family: 'Inter', sans-serif
- Responsive font scaling
- Clear hierarchy

### Components
- Cards dengan hover effects
- Custom buttons dengan gradients
- Progress bars
- Modals & alerts
- Form elements
- Navigation bar

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🌟 Highlight Features

✅ **100% Client-side** - Tidak butuh backend/database  
✅ **Offline capable** - Bisa dijalankan tanpa internet  
✅ **Progressive Enhancement** - Berfungsi di semua browser modern  
✅ **Responsive Design** - Optimal di semua ukuran layar  
✅ **Dark Mode** - Nyaman dimata dengan theme toggle  
✅ **Fast & Lightweight** - Load cepat, no dependencies  

## 📝 Konten Pembelajaran

### Materi yang Dicakup:
- ✅ Pengertian Simple Present Tense
- ✅ Rumus lengkap (Positive, Negative, Interrogative)
- ✅ 4 Fungsi utama penggunaan
- ✅ 14 Time signals/frequency adverbs
- ✅ Verb forms rules (s/es/ies)
- ✅ Subject & auxiliary verb table
- ✅ 20+ contoh kalimat

### Latihan Soal:
- 10 soal Multiple Choice
- 10 soal Fill in the Blanks
- Instant feedback dengan penjelasan
- Auto-save progress

### Quiz Evaluasi:
- 15 soal pilihan ganda
- Passing score: 70/100
- Hasil dengan rekomendasi personalized

## 🔧 Kustomisasi

### Mengubah Warna
Edit variabel CSS di `css/style.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  /* ... */
}
```

### Menambah Soal
Edit array questions di:
- `js/practice.js` untuk latihan
- `js/quiz.js` untuk quiz

## 📄 License

This project is created for educational purposes.

## 👤 Author

E-Modul Simple Present - 2026

## 🙏 Acknowledgments

- Google Fonts untuk typography
- Inspiration dari modern e-learning platforms
- Built with ❤️ untuk pembelajaran bahasa Inggris

---

**Happy Learning! 🎓**
