import React, { useState, useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext'; // Path impor yang benar

const Contact = ({ companyInfo }) => {
    const { t } = useContext(LanguageContext);
    const [formStatus, setFormStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');
        // Simulate API call
        try {
            // In a real application, you would send this data to a backend endpoint.
            // For this demo, we'll just simulate success/failure.
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
            console.log("Form submitted:", {
                name: e.target.name.value,
                email: e.target.email.value,
                subject: e.target.subject.value,
                message: e.target.message.value,
            });
            setFormStatus('success');
            e.target.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            setFormStatus('error');
        }
    };

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">{t('contactUs')}</h2>
                <div className="bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-2xl font-semibold text-blue-800 mb-4">Informasi Kontak</h3>
                        {companyInfo ? (
                            <div className="text-gray-700">
                                <p className="mb-2 flex items-center">
                                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m11.314 0A8.001 8.001 0 0020 11a8 8 0 10-16 0m11.314 0a4 4 0 11-5.656 0 4 4 0 015.656 0z"></path></svg>
                                    <strong>{t('office')}:</strong> {companyInfo.office}
                                </p>
                                <p className="mb-2 flex items-center">
                                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    <strong>{t('phone')}:</strong> {companyInfo.phone}
                                </p>
                                <p className="mb-4 flex items-center">
                                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4v7a2 2 0 002 2h14a2 2 0 002-2v-7m-18 0h18"></path></svg>
                                    <strong>{t('email')}:</strong> {companyInfo.email}
                                </p>
                                <div className="mt-6">
                                    <h4 className="text-xl font-semibold text-blue-700 mb-2">Lokasi Kami</h4>
                                    {/* Placeholder for a map */}
                                    <div className="bg-gray-200 h-64 w-full rounded-md flex items-center justify-center text-gray-500">
                                        
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        * {t('description')}: Peta lokasi adalah placeholder. Dalam implementasi nyata, Anda dapat mengintegrasikan Google Maps atau layanan peta lainnya.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">{t('noCompanyInfoFound')}</p>
                        )}
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-blue-800 mb-4">Kirim Pesan</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">{t('name')}:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">{t('email')}:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">{t('subject')}:</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">{t('message')}:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold"
                                disabled={formStatus === 'sending'}
                            >
                                {formStatus === 'sending' ? 'Mengirim...' : t('sendMessage')}
                            </button>
                            {formStatus === 'success' && (
                                <p className="text-green-600 mt-2">{t('successMessage')}</p>
                            )}
                            {formStatus === 'error' && (
                                <p className="text-red-600 mt-2">{t('errorMessage')}</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
