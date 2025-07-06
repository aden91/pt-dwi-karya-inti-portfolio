import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext'; // Path impor yang benar

const Footer = () => {
    const { t } = useContext(LanguageContext);
    return (
        <footer className="bg-blue-900 text-white p-4 text-center mt-8 rounded-t-lg">
            <div className="container mx-auto">
                <p className="text-sm">{t('copyright')}</p>
            </div>
        </footer>
    );
};

export default Footer;
