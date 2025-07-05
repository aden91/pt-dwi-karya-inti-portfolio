import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Pastikan ini mengacu ke file CSS utama
import WrappedApp from './App'; // Mengimpor WrappedApp dari App.js
import reportWebVitals from './reportWebVitals'; // Opsional, jika Anda ingin mengukur performa

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>
);

// Jika Anda ingin mulai mengukur performa di aplikasi Anda,
// kirimkan fungsi ke analitik endpoint. Pelajari lebih lanjut: https://bit.ly/CRA-vitals
reportWebVitals();