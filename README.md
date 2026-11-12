# Dokumentasi Proyek Portofolio & Tugas Kuliah
**Muhammad Wandi Saputra Nurhasan (NIM: 2503010050)**  
Program Studi: Teknik Informatika (Kelas C)

---

## 📁 Struktur Folder & File Proyek

```
D:\PORTOFOLIO\
├── index.html                  # Halaman utama portofolio profesional
├── tugas-sistem-operasi.html   # Halaman daftar tugas & praktikum Sistem Operasi
├── isi-tugas.html              # Halaman detail isi materi & galeri foto tugas
├── server.js                   # Server lokal opsional (Node.js)
├── README.md                   # Dokumentasi panduan proyek
│
├── css/
│   └── custom.css              # Custom styling & scrollbar
│
├── js/
│   ├── app.js                  # Aplikasi React utama untuk halaman depan (index.html)
│   ├── data.js                 # Data profil, keahlian, dan portofolio utama
│   ├── auth.js                 # Helper autentikasi akses pemilik (password: wandi2026)
│   └── data-tugas.js           # File data publik kumpulan tugas (hasil download/export)
│
└── assets/                     # Folder untuk aset gambar lokal (opsional)
```

---

## 🌟 Fitur Halaman Tugas Sistem Operasi
1. **Daftar Tugas Interaktif (`tugas-sistem-operasi.html`)**:
   - Menampilkan kartu-kartu tugas yang rapi dan terorganisir.
   - Dilengkapi mode gelap (*Dark Mode*) dan terang (*Light Mode*).
   - Mode Akses Pemilik (hanya pemilik yang bisa menambah & menghapus tugas).

2. **Detail Isi Tugas (`isi-tugas.html`)**:
   - Ringkasan & Penjelasan Materi.
   - Galeri Foto & Screenshot hasil praktikum (dengan preview lightbox popup).
   - Kesimpulan pengerjaan tugas.
   - Mode edit teks langsung di halaman (*contenteditable*).

3. **Tanpa Database (Portable)**:
   - Data otomatis tersimpan di browser Anda (`localStorage`).
   - Dapat dipublikasikan ke orang lain dengan tombol **"Publikasikan / Download Data"** (`js/data-tugas.js`).

---

## 🔑 Akses Pemilik
- **Password Default**: `wandi2026`
- Mengontrol hak akses untuk:
  - Menambah tugas baru
  - Menghapus tugas
  - Mengedit ringkasan & kesimpulan
  - Mengunggah & menghapus foto
  - Mengunduh / mempublikasikan data
