import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext'; // Path impor yang benar

const Home = ({ companyInfo, projects, navigate }) => {
    const { t } = useContext(LanguageContext);

    const featuredProjects = projects.filter(p => [
        'Apartment Adhiwangsa',
        'Best Western Premier La Grande',
        'Double Tree Hotel by Hilton',
        'Hotel Eastern Bojonegoro',
        'Hotel Pesonna Magelang',
        'Hotel Pesonna Gresik',
        'Fairfield By Marriott Legian Bali',
        'Quest Hotel Diponegoro Surabaya',
        'RSUD Ar - Rozy Kota Probolinggo'
    ].includes(p.project)).slice(0, 3); // Take top 3 if more are featured

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-blue-900 mb-4">PT. DWI KARYA INTI</h2>
                    <p className="text-xl text-gray-700">General Contractor Terkemuka untuk Proyek Anda</p>
                </div>

                {/* New Summary Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-blue-600">
                        <h3 className="text-2xl font-semibold text-blue-800 mb-3">{t('aboutSummaryTitle')}</h3>
                        <p className="text-gray-600 text-left">
                            {t('aboutSummaryText')}
                        </p>
                        <button
                            onClick={() => navigate('about')}
                            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                        >
                            {t('about')}
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-blue-600">
                        <h3 className="text-2xl font-semibold text-blue-800 mb-3">{t('projectsSummaryTitle')}</h3>
                        <p className="text-gray-600 text-left">
                            {t('projectsSummaryText')}
                        </p>
                        <button
                            onClick={() => navigate('experiences')}
                            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                        >
                            {t('viewAllProjects')}
                        </button>
                    </div>
                </div>

                <h3 className="text-3xl font-bold text-blue-900 text-center mb-8">{t('featuredProjects')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProjects.length > 0 ? (
                        featuredProjects.map((project, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                <img
                                    src={`https://placehold.co/600x400/ADD8E6/000000?text=${project.project.replace(/\s/g, '+')}`}
                                    alt={project.project}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/000000?text=Image+Not+Found"; }}
                                />
                                <div className="p-5">
                                    <h4 className="text-xl font-semibold text-blue-800 mb-2">{project.project}</h4>
                                    <p className="text-gray-600 text-sm mb-3">{t('work')}: {project.work}</p>
                                    <p className="text-gray-600 text-sm">{t('year')}: {project.year}</p>
                                    <button
                                        onClick={() => navigate('experiences', { projectId: project.id })}
                                        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                                    >
                                        {t('projectDetails')}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="md:col-span-3 text-center text-gray-500">{t('noProjectsFound')}</p>
                    )}
                </div>
                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate('experiences')}
                        className="bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-800 transition-colors duration-300 shadow-lg"
                    >
                        {t('viewAllProjects')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Home;
