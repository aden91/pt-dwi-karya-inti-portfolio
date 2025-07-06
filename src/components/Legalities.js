import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext'; // Path impor yang benar

const Legalities = ({ legalities }) => {
    const { t } = useContext(LanguageContext);
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">{t('legalDocuments')}</h2>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    {legalities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {legalities.map((doc, index) => (
                                <div key={index} className="bg-blue-50 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={doc.imageUrl || `https://placehold.co/400x250/ADD8E6/000000?text=${doc.title.replace(/\s/g, '+')}`}
                                        alt={doc.title}
                                        className="w-full h-40 object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/CCCCCC/000000?text=Dokumen"; }}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-blue-800 mb-2">{doc.title}</h3>
                                        <p className="text-gray-700 text-sm mb-3">{doc.description}</p>
                                        <a
                                            href={doc.fileUrl || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm"
                                        >
                                            {t('viewDocument')}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">{t('noLegalitiesFound')}</p>
                    )}
                    <p className="mt-6 text-sm text-gray-500 text-center">
                        * {t('legalitiesNote')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Legalities;
