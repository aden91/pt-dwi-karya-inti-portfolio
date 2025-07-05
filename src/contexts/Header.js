import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext'; // Perbarui path import untuk LanguageContext

// Header Component
const Header = ({ navigate, dateTime }) => {
    // Menggunakan LanguageContext untuk mengakses fungsi terjemahan (t) dan bahasa saat ini (currentLang)
    const { t, currentLang, changeLanguage } = useContext(LanguageContext);

    return (
        <header className="bg-blue-800 text-white p-4 shadow-md rounded-b-lg">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                    {/* Logo perusahaan */}
                    <img src="https://placehold.co/60x60/0000FF/FFFFFF?text=DKI" alt="PT. DWI KARYA INTI Logo" className="rounded-full mr-3" />
                    <h1 className="text-2xl font-bold text-white">PT. DWI KARYA INTI</h1>
                </div>
                {/* Navigasi utama */}
                <nav className="mb-4 md:mb-0">
                    <ul className="flex flex-wrap justify-center md:space-x-6 space-x-3">
                        <li><button onClick={() => navigate('home')} className="hover:text-blue-200 transition-colors duration-300 px-2 py-1 rounded-md">{t('home')}</button></li>
                        <li><button onClick={() => navigate('about')} className="hover:text-blue-200 transition-colors duration-300 px-2 py-1 rounded-md">{t('about')}</button></li>
                        <li><button onClick={() => navigate('legalities')} className="hover:text-blue-200 transition-colors duration-300 px-2 py-1 rounded-md">{t('legalities')}</button></li>
                        <li><button onClick={() => navigate('experiences')} className="hover:text-blue-200 transition-colors duration-300 px-2 py-1 rounded-md">{t('experiences')}</button></li>
                        <li><button onClick={() => navigate('contact')} className="hover:text-blue-200 transition-colors duration-300 px-2 py-1 rounded-md">{t('contact')}</button></li>
                    </ul>
                </nav>
                {/* Informasi waktu/tanggal dan pemilih bahasa */}
                <div className="flex items-center space-x-4">
                    <div className="text-sm text-blue-200" id="datetime">{dateTime}</div>
                    <div className="language-switcher">
                        <select
                            id="lang-select"
                            onChange={(e) => changeLanguage(e.target.value)}
                            value={currentLang}
                            className="bg-blue-700 text-white text-sm p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="id">{t('indonesian')}</option>
                            <option value="en">{t('english')}</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
