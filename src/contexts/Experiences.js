import React, { useState, useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext'; // Path impor yang benar

const Experiences = ({ projects, navigate, selectedProjectId }) => {
    const { t, currentLang } = useContext(LanguageContext);
    const [filterYear, setFilterYear] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const years = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);

    const filteredProjects = projects.filter(project => {
        const matchesYear = filterYear === 'all' || project.year.toString() === filterYear;
        const matchesSearch = project.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              project.work.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              project.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesYear && matchesSearch;
    });

    const selectedProject = selectedProjectId ? projects.find(p => p.id === selectedProjectId) : null;

    if (selectedProject) {
        // Function to format currency based on language
        const formatCurrency = (value) => {
            return value.toLocaleString(currentLang === 'en' ? 'en-US' : 'id-ID', {
                style: 'currency',
                currency: 'IDR', // Always use IDR as per original data
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).replace('IDR', 'Rp'); // Replace 'IDR' with 'Rp' for consistency
        };

        return (
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate('experiences')}
                        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        {t('backToExperiences')}
                    </button>
                    <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">{t('projectDetails')}: {selectedProject.project}</h2>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-2xl font-semibold text-blue-800 mb-4">{t('description')}</h3>
                                <p className="text-gray-700 mb-2"><strong>{t('project')}:</strong> {selectedProject.project}</p>
                                <p className="text-gray-700 mb-2"><strong>{t('work')}:</strong> {selectedProject.work}</p>
                                <p className="text-gray-700 mb-2"><strong>{t('location')}:</strong> {selectedProject.location}</p>
                                <p className="text-gray-700 mb-2"><strong>{t('year')}:</strong> {selectedProject.year}</p>
                                <p className="text-gray-700 mb-2"><strong>{t('value')}:</strong> {formatCurrency(selectedProject.value)}</p>
                                <p className="text-gray-700 mt-4">
                                    {t('projectDescriptionIntro', selectedProject.project, selectedProject.location, selectedProject.work)}
                                    {' '}
                                    {t('projectDescriptionDetail', selectedProject.year, formatCurrency(selectedProject.value))}
                                    {' '}
                                    {t('projectDescriptionOutro')}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-blue-800 mb-4">{t('projectImages')}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <img
                                        src={`https://placehold.co/400x300/ADD8E6/000000?text=${selectedProject.project.replace(/\s/g, '+')}+1`}
                                        alt={`${selectedProject.project} 1`}
                                        className="w-full h-auto rounded-lg shadow-md"
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/CCCCCC/000000?text=Image+Not+Found"; }}
                                    />
                                    <img
                                        src={`https://placehold.co/400x300/ADD8E6/000000?text=${selectedProject.project.replace(/\s/g, '+')}+2`}
                                        alt={`${selectedProject.project} 2`}
                                        className="w-full h-auto rounded-lg shadow-md"
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/CCCCCC/000000?text=Image+Not+Found"; }}
                                    />
                                </div>
                                <p className="mt-4 text-sm text-gray-500">
                                    * {t('projectImages')} {t('description')}: Gambar-gambar ini adalah placeholder.
                                    Dalam implementasi nyata, Anda akan mengunggah gambar proyek asli di sini.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">{t('projectExperiences')}</h2>

                <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-1/3">
                        <label htmlFor="filterYear" className="block text-gray-700 text-sm font-bold mb-2">{t('filterByYear')}:</label>
                        <select
                            id="filterYear"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                        >
                            <option value="all">{t('all')}</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full md:w-2/3">
                        <label htmlFor="searchTerm" className="block text-gray-700 text-sm font-bold mb-2">{t('searchProjects')}:</label>
                        <input
                            type="text"
                            id="searchTerm"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            placeholder={t('searchProjects')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg overflow-x-auto">
                    {filteredProjects.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('project')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('work')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('location')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('year')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('value')}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProjects.map((project) => (
                                    <tr key={project.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('experiences', { projectId: project.id })}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">{project.project}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.work}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.year}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp {project.value.toLocaleString('id-ID')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 text-center">{t('noProjectsFound')}</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
