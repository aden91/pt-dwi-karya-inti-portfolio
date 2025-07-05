import React, { useState, useEffect, createContext } from 'react';

// Define LanguageContext
export const LanguageContext = createContext();

// LanguageProvider component
export const LanguageProvider = ({ children }) => {
    const [currentLang, setCurrentLang] = useState(localStorage.getItem('selectedLang') || 'id');
    const [translations, setTranslations] = useState({});