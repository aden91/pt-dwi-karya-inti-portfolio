import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext'; // Path impor yang benar

const About = ({ companyInfo }) => {
    const { t } = useContext(LanguageContext);
    // Mission points are now directly used from translations for easier column display
    const missionPoints = [
        t('mission1'),
        t('mission2'),
        t('mission3'),
        t('mission4'),
        t('mission5')
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">{t('about')} PT. DWI KARYA INTI</h2>
                <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                    <h3 className="text-2xl font-semibold text-blue-800 mb-4">{t('companyProfile')}</h3>
                    {companyInfo ? (
                        <div className="text-gray-700 leading-relaxed">
                            <p className="mb-4">
                                PT. DWI KARYA INTI adalah kontraktor umum terkemuka yang berlokasi di {companyInfo.office}.
                                Dengan pengalaman bertahun-tahun, kami berkomitmen untuk memberikan layanan konstruksi
                                berkualitas tinggi di berbagai sektor, termasuk perumahan, komersial, dan infrastruktur.
                            </p>
                            <p className="mb-4">
                                Kami mengutamakan kepuasan pelanggan, standar etika yang tinggi, dan integritas dalam
                                setiap proyek yang kami tangani. Tim ahli kami berdedikasi untuk memastikan setiap
                                pekerjaan diselesaikan dengan presisi, efisiensi, dan sesuai dengan standar keselamatan
                                dan kesehatan lingkungan yang ketat.
                            </p>
                            <p className="mb-2"><strong>{t('office')}:</strong> {companyInfo.office}</p>
                            <p className="mb-2"><strong>{t('phone')}:</strong> {companyInfo.phone}</p>
                            <p><strong>{t('email')}:</strong> {companyInfo.email}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500">{t('noCompanyInfoFound')}</p>
                    )}
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold text-blue-700 mb-4 text-center">{t('missionTitle')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {missionPoints.map((mission, index) => (
                            <div key={index} className="bg-blue-50 p-6 rounded-lg shadow-sm flex items-start">
                                <svg className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <p className="text-gray-700">{mission}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
