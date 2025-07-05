# Portofolio PT. DWI KARYA INTI

Proyek ini adalah aplikasi web portofolio untuk PT. DWI KARYA INTI, sebuah kontraktor umum. Aplikasi ini menampilkan informasi perusahaan, misi, dokumen legalitas, dan pengalaman proyek.

## Fitur Utama

* Desain minimalis dan menarik
* Dukungan dua bahasa (Indonesia dan Inggris)
* Integrasi dengan Firebase Firestore untuk manajemen data
* Tampilan pengalaman proyek yang dapat difilter
* Informasi kontak dengan ikon

## Instalasi

1.  **Kloning repositori ini:**
    ```bash
    git clone [https://github.com/your-username/pt-dwi-karya-inti-portfolio.git](https://github.com/your-username/pt-dwi-karya-inti-portfolio.git)
    cd pt-dwi-karya-inti-portfolio
    ```
2.  **Instal dependensi:**
    ```bash
    npm install
    ```
3.  **Konfigurasi Firebase:**
    * Buat proyek Firebase di [Firebase Console](https://console.firebase.google.com/).
    * Tambahkan aplikasi web ke proyek Anda dan salin `firebaseConfig`.
    * Perbarui `firebaseConfig` di `src/App.js` dengan detail proyek Anda (lihat bagian `App.js` di bawah).
    * Atur aturan keamanan Firestore Anda seperti yang dijelaskan dalam dokumentasi Firebase untuk mengizinkan `read` dan `write` untuk koleksi publik.

## Menjalankan Aplikasi Secara Lokal

```bash
npm start