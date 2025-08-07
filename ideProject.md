# Proposal Proyek: Dasbor Produktivitas Harian

## 1. Latar Belakang

Proyek ini merupakan jawaban atas kebutuhan perusahaan BPM (Business Process Engineering) untuk mengembangkan prototipe aplikasi web fungsional tanpa adanya sumber daya UI/UX khusus. Sebagai Frontend Engineer, tujuan utama adalah merancang dan mengimplementasikan aplikasi to-do list yang kreatif, intuitif, dan berjalan secara offline (state-based), yang tidak hanya berfungsi sebagai alat manajemen tugas tetapi juga memberikan nilai tambah melalui integrasi data kontekstual.

## 2. Visi Proyek

Mengembangkan sebuah **"Dasbor Produktivitas Harian"**—sebuah aplikasi web single-page yang memberikan pengguna kemampuan untuk mengelola tugas harian mereka sambil menyajikan informasi relevan seperti waktu lokal, lokasi, dan kondisi cuaca saat ini. Tujuannya adalah menciptakan pengalaman pengguna yang personal dan informatif, melebihi fungsionalitas to-do list standar.

## 3. Ruang Lingkup Fungsional

### 3.1. Modul Dasbor Kontekstual (Integrasi API)

- **Tampilan Informasi Dinamis:** Header aplikasi akan menampilkan data yang diambil dari API eksternal.
- **Data Lokasi & Waktu:** Mengidentifikasi kota pengguna secara otomatis dan menampilkan waktu lokal beserta sapaan yang sesuai (misal: "Selamat Pagi, Jakarta").
- **Data Cuaca:** Menampilkan ringkasan cuaca saat ini (misal: "Cerah, 29°C") beserta ikon visual yang relevan.

### 3.2. Modul Manajemen Tugas (Core To-Do List)

- **Operasi CRUD:** Fungsionalitas penuh untuk Menambah (Create), Membaca (Read), Memperbarui (Update), dan Menghapus (Delete) tugas.
- **Status Tugas:** Mekanisme untuk menandai tugas sebagai "selesai", yang akan memengaruhi visualisasi (misal: teks dicoret).
- **Kategorisasi Tugas:** Pengguna dapat mengasosiasikan setiap tugas dengan kategori yang telah ditentukan (misal: `Pekerjaan`, `Pribadi`, `Belajar`) untuk organisasi yang lebih baik.

### 3.3. Modul Interaksi Pengguna

- **Filtering:** Menyediakan kontrol untuk memfilter daftar tugas berdasarkan:
  - Status (`Semua`, `Aktif`, `Selesai`).
  - Kategori.
- **Pencarian:** Implementasi fungsionalitas pencarian (_search keyword_) untuk menemukan tugas secara cepat.
- **Bonus (Nilai Plus):** Implementasi fitur _drag-and-drop_ untuk memungkinkan pengguna mengatur ulang urutan prioritas tugas secara manual.

## 4. Batasan dan Spesifikasi Teknis

- **Framework:** React.js
- **State Management:** Redux dengan middleware Redux-Saga untuk menangani _side effects_ seperti pemanggilan API.
- **HTTP Client:** Axios atau Fetch API untuk komunikasi dengan layanan eksternal.
- **Animasi:** Mengimplementasikan animasi transisi untuk status _loading_ (saat fetching data) dan interaksi UI (menambah/menghapus tugas) untuk meningkatkan pengalaman pengguna.
- **Penyimpanan:** Tidak ada persistensi data ke database atau `localStorage`. State aplikasi hanya hidup selama sesi browser, sesuai dengan requirement prototipe.

## 5. Arsitektur API dan Data

Aplikasi akan mengonsumsi data dari dua sumber API publik:

1.  **API Deteksi Lokasi (GeoJS):**

    - **Endpoint:** `https://get.geojs.io/v1/ip/geo.json`
    - **Tujuan:** Mendapatkan `latitude` dan `longitude` pengguna berdasarkan alamat IP. Data ini akan digunakan sebagai input untuk API cuaca.
    - **API Key:** Tidak diperlukan.

2.  **API Cuaca & Waktu (Open-Meteo):**
    - **Endpoint:** `https://api.open-meteo.com/v1/forecast`
    - **Tujuan:** Mendapatkan data cuaca dan informasi zona waktu berdasarkan koordinat.
    - **Contoh Parameter:** `?latitude={lat}&longitude={lon}&current_weather=true&timezone=auto`
    - **API Key:** Tidak diperlukan.

## 6. Alur Kerja State Management (Redux-Saga)

1.  **Inisialisasi Aplikasi:**

    - Komponen utama akan men-dispatch `action` `FETCH_INITIAL_DATA`.
    - Saga akan menangkap action ini, pertama memanggil API GeoJS.
    - Setelah mendapatkan koordinat, Saga akan memanggil API Open-Meteo.
    - Selama proses, state `loading: true` akan diatur.
    - Setelah semua data diterima, Saga men-dispatch `action` `FETCH_DATA_SUCCESS` dengan payload berisi data lokasi dan cuaca, yang kemudian disimpan di Redux store. State `loading` diatur kembali ke `false`.

2.  **Manajemen Tugas:**
    - Aksi seperti `ADD_TASK`, `DELETE_TASK`, `TOGGLE_TASK_STATUS` akan di-dispatch oleh komponen.
    - Karena tidak ada backend, _reducer_ akan secara langsung memanipulasi state _array_ tugas di dalam Redux store secara sinkron.

## 7. Kriteria Keberhasilan (Deliverables)

- Aplikasi fungsional yang memenuhi semua ruang lingkup yang dijelaskan di atas.
- Kode sumber yang terstruktur dengan baik dan dapat dipelihara.
- File `readme.md` yang jelas, berisi:
  - Deskripsi singkat proyek.
  - Petunjuk untuk instalasi dan menjalankan proyek secara lokal.
  - **Screenshot akhir dari aplikasi yang sedang berjalan.**
