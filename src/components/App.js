import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';

// Define LanguageContext
const LanguageContext = createContext();

// LanguageProvider component
const LanguageProvider = ({ children }) => {
    const [currentLang, setCurrentLang] = useState(localStorage.getItem('selectedLang') || 'id');
    const [translations, setTranslations] = useState({});

    useEffect(() => {
        // Fetch translations - in a real app, this would come from Firestore or a static JSON
        const fetchTranslations = async () => {
            const fetchedTranslations = {
                id: {
                    home: 'Beranda',
                    about: 'Tentang Kami',
                    legalities: 'Legalitas',
                    experiences: 'Pengalaman',
                    contact: 'Kontak Kami',
                    missionTitle: 'Misi Kami',
                    mission1: 'Perusahaan yang Kuat dan Berkembang di Tingkat Regional dan Nasional',
                    mission2: 'Berkontribusi pada Pembangunan Nasional',
                    mission3: 'Perusahaan dengan Standar Etika Tinggi dan Integritas Tinggi',
                    mission4: 'Kepuasan Pelanggan adalah Prioritas Utama Kami',
                    mission5: 'Keselamatan dan Kesehatan Lingkungan adalah Keharusan',
                    featuredProjects: 'Proyek Unggulan',
                    viewAllProjects: 'Lihat Semua Proyek',
                    companyProfile: 'Profil Perusahaan',
                    office: 'Kantor',
                    phone: 'Telepon',
                    email: 'Email',
                    legalDocuments: 'Dokumen Legalitas',
                    projectExperiences: 'Pengalaman Proyek',
                    project: 'Proyek',
                    work: 'Pekerjaan',
                    location: 'Lokasi',
                    year: 'Tahun',
                    value: 'Nilai (Rp)',
                    copyright: 'Hak Cipta Oleh PT DWI Karya Inti 2025',
                    loading: 'Memuat...',
                    error: 'Terjadi kesalahan saat memuat data.',
                    language: 'Bahasa',
                    indonesian: 'Bahasa Indonesia',
                    english: 'English',
                    contactUs: 'Hubungi Kami',
                    message: 'Pesan',
                    sendMessage: 'Kirim Pesan',
                    name: 'Nama',
                    subject: 'Subjek',
                    successMessage: 'Pesan Anda telah terkirim!',
                    errorMessage: 'Gagal mengirim pesan. Silakan coba lagi.',
                    allProjects: 'Semua Proyek',
                    filterByYear: 'Filter berdasarkan Tahun',
                    all: 'Semua',
                    searchProjects: 'Cari Proyek...',
                    projectDetails: 'Detail Proyek',
                    backToExperiences: 'Kembali ke Pengalaman',
                    description: 'Deskripsi',
                    projectImages: 'Gambar Proyek',
                    noProjectsFound: 'Tidak ada proyek ditemukan.',
                    noLegalitiesFound: 'Tidak ada dokumen legalitas ditemukan.',
                    noCompanyInfoFound: 'Informasi perusahaan tidak ditemukan.',
                    aboutSummaryTitle: 'Tentang Kami',
                    projectsSummaryTitle: 'Beberapa Proyek Kami',
                    aboutSummaryText: 'PT. DWI KARYA INTI adalah kontraktor umum terkemuka yang berkomitmen untuk memberikan layanan konstruksi berkualitas tinggi. Kami mengutamakan kepuasan pelanggan, standar etika yang tinggi, dan integritas dalam setiap proyek.',
                    projectsSummaryText: 'Kami memiliki rekam jejak yang luas dalam menyelesaikan berbagai proyek di seluruh Indonesia, mulai dari gedung perkantoran, hotel, rumah sakit, hingga fasilitas industri. Keahlian kami meliputi pekerjaan Mekanikal, Elektrikal, dan Plumbing (MEP).',
                    legalitiesNote: 'Dokumen-dokumen ini menunjukkan legalitas dan sertifikasi perusahaan kami. Untuk alasan keamanan dan privasi, tautan ke file PDF asli tidak disertakan dalam demo ini. Dalam implementasi nyata, Anda akan mengunggah file PDF dan menautkannya di sini.',
                    viewDocument: 'Lihat Dokumen',
                    projectDescriptionIntro: 'Proyek {0} di {1} melibatkan pekerjaan {2}.',
                    projectDescriptionDetail: 'Ini adalah salah satu proyek penting kami yang diselesaikan pada tahun {0} dengan nilai Rp {1}.',
                    projectDescriptionOutro: 'Kami bangga dengan kualitas dan efisiensi yang kami berikan dalam setiap proyek.',
                },
                en: {
                    home: 'Home',
                    about: 'About Us',
                    legalities: 'Legalities',
                    experiences: 'Experiences',
                    contact: 'Contact Us',
                    missionTitle: 'Our Mission',
                    mission1: 'A Strong and Growing Company at Regional and National Levels',
                    mission2: 'Contributing to National Development',
                    mission3: 'Company with High Ethical Standards and High Integrities',
                    mission4: 'Customer Satisfaction is Our Main Priority',
                    mission5: 'Safety and Health Environmental is a Must',
                    featuredProjects: 'Featured Projects',
                    viewAllProjects: 'View All Projects',
                    companyProfile: 'Company Profile',
                    office: 'Office',
                    phone: 'Phone',
                    email: 'Email',
                    legalDocuments: 'Legal Documents',
                    projectExperiences: 'Project Experiences',
                    project: 'Project',
                    work: 'Work',
                    location: 'Location',
                    year: 'Year',
                    value: 'Value (Rp)',
                    copyright: 'Copyright By PT DWI Karya Inti 2025',
                    loading: 'Loading...',
                    error: 'An error occurred while loading data.',
                    language: 'Language',
                    indonesian: 'Bahasa Indonesia',
                    english: 'English',
                    contactUs: 'Contact Us',
                    message: 'Message',
                    sendMessage: 'Send Message',
                    name: 'Name',
                    subject: 'Subject',
                    successMessage: 'Your message has been sent!',
                    errorMessage: 'Failed to send message. Please try again.',
                    allProjects: 'All Projects',
                    filterByYear: 'Filter by Year',
                    all: 'All',
                    searchProjects: 'Search Projects...',
                    projectDetails: 'Project Details',
                    backToExperiences: 'Back to Experiences',
                    description: 'Description',
                    projectImages: 'Project Images',
                    noProjectsFound: 'No projects found.',
                    noLegalitiesFound: 'No legal documents found.',
                    noCompanyInfoFound: 'Company information not found.',
                    aboutSummaryTitle: 'About Us',
                    projectsSummaryTitle: 'Some of Our Projects',
                    aboutSummaryText: 'PT. DWI KARYA INTI is a leading general contractor committed to delivering high-quality construction services. We prioritize customer satisfaction, high ethical standards, and integrity in every project.',
                    projectsSummaryText: 'We have an an extensive track record of completing various projects across Indonesia, ranging from office buildings, hotels, hospitals, to industrial facilities. Our expertise includes Mechanical, Electrical, and Plumbing (MEP) works.',
                    legalitiesNote: 'These documents demonstrate our company\'s legal standing and certifications. For security and privacy reasons, links to original PDF files are not included in this demo. In a real implementation, you would upload and link your actual PDF files here.',
                    viewDocument: 'View Document',
                    projectDescriptionIntro: 'The project {0} in {1} involved {2} works.',
                    projectDescriptionDetail: 'This is one of our important projects completed in {0} with a value of Rp {1}.',
                    projectDescriptionOutro: 'We are proud of the quality and efficiency we deliver in every project.',
                }
            };
            setTranslations(fetchedTranslations);
        };
        fetchTranslations();
    }, []);

    const t = (key, ...args) => {
        let text = translations[currentLang]?.[key] || key;
        args.forEach((arg, index) => {
            text = text.replace(`{${index}}`, arg);
        });
        return text;
    };

    const changeLanguage = (lang) => {
        setCurrentLang(lang);
        localStorage.setItem('selectedLang', lang);
    };

    return (
        <LanguageContext.Provider value={{ currentLang, t, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hook to use language context
const useLanguage = () => useContext(LanguageContext);

// Header Component
const Header = ({ navigate, dateTime }) => {
    const { t, currentLang, changeLanguage } = useLanguage();

    return (
        <header className="bg-blue-800 text-white p-4 shadow-md rounded-b-lg">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                    <img src="https://placehold.co/60x60/0000FF/FFFFFF?text=DKI" alt="PT. DWI KARYA INTI Logo" className="rounded-full mr-3" />
                    <h1 className="text-2xl font-bold text-white">PT. DWI KARYA INTI</h1>
                </div>
                <nav className="mb-4 md:mb-0">
                    <ul className="flex flex-wrap justify-center md:space-x-6 space-x-3">
                        <li><button onClick={() => navigate('home')} className="hover:text-blue-200 transition-colors duration-300 px-2 py-1 rounded-md">{t('home')}</button></li>
                        <li><button onClick={() => navigate('about')} className="hover:text-blue-200 transition-colors duration-300 px-2 py-1 rounded-md">{t('about')}</button></li>
                        <li><button onClick={() => navigate('legalities')} className="hover:text-blue-200 transition-colors duration-300 px-2 py-1 rounded-md">{t('legalities')}</button></li>
                        <li><button onClick={() => navigate('experiences')} className="hover:text-blue-200 transition-colors duration-300 px-2 py-1 rounded-md">{t('experiences')}</button></li>
                        <li><button onClick={() => navigate('contact')} className="hover:text-blue-200 transition-colors duration-300 px-2 py-1 rounded-md">{t('contact')}</button></li>
                    </ul>
                </nav>
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

// Home Component
const Home = ({ companyInfo, projects, navigate }) => {
    const { t } = useLanguage();

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

// About Component
const About = ({ companyInfo }) => {
    const { t } = useLanguage();
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

// Legalities Component
const Legalities = ({ legalities }) => {
    const { t } = useLanguage();
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

// Experiences Component
const Experiences = ({ projects, navigate, selectedProjectId }) => {
    const { t, currentLang } = useLanguage(); // Get currentLang here
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

// Contact Component
const Contact = ({ companyInfo }) => {
    const { t } = useLanguage();
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

// Footer Component
const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="bg-blue-900 text-white p-4 text-center mt-8 rounded-t-lg">
            <div className="container mx-auto">
                <p className="text-sm">{t('copyright')}</p>
            </div>
        </footer>
    );
};

// Main App Component
const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [pageProps, setPageProps] = useState({});
    const [dateTime, setDateTime] = useState('');
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [legalities, setLegalities] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { currentLang } = useLanguage(); // Get currentLang from context

    // Initialize Firebase and Auth
    useEffect(() => {
        try {
            // Menggunakan konfigurasi Firebase yang disediakan oleh lingkungan Canvas
            // atau fallback ke konfigurasi default jika tidak tersedia.
            // Ini adalah cara yang lebih andal untuk mendapatkan konfigurasi di Canvas.
            const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // Fallback ID jika tidak di Canvas

            console.log("Firebase Config:", firebaseConfig); // Log untuk debugging
            console.log("App ID:", appId); // Log untuk debugging

            // Periksa apakah firebaseConfig kosong atau tidak valid
            if (!firebaseConfig || Object.keys(firebaseConfig).length === 0 || !firebaseConfig.apiKey) {
                console.error("ERROR: Konfigurasi Firebase tidak ditemukan atau tidak valid dari lingkungan Canvas.");
                setError("Konfigurasi Firebase tidak valid. Harap pastikan proyek Firebase Anda terhubung dengan benar di lingkungan Canvas.");
                setLoading(false);
                return;
            }

            const app = initializeApp(firebaseConfig);
            const firestoreDb = getFirestore(app);
            const firebaseAuth = getAuth(app);

            setDb(firestoreDb);
            setAuth(firebaseAuth);

            const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    // Sign in anonymously if no user is logged in
                    try {
                        // __initial_auth_token is only available in Canvas environment
                        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                            await signInWithCustomToken(firebaseAuth, __initial_auth_token);
                        } else {
                            await signInAnonymously(firebaseAuth);
                        }
                        setUserId(firebaseAuth.currentUser?.uid || crypto.randomUUID());
                    } catch (authError) {
                        console.error("Firebase Auth Error:", authError);
                        setError(`Gagal melakukan autentikasi: ${authError.message}. Pastikan autentikasi anonim diaktifkan di Firebase.`);
                        setUserId(crypto.randomUUID()); // Fallback to random ID
                    }
                }
                setIsAuthReady(true);
            });

            return () => unsubscribe();
        } catch (initError) {
            console.error("Firebase Initialization Error:", initError);
            setError(`Gagal menginisialisasi Firebase: ${initError.message}. Pastikan konfigurasi telah benar.`);
            setLoading(false);
        }
    }, []);

    // Fetch data from Firestore
    useEffect(() => {
        if (!isAuthReady || !db || !userId) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch Company Info
                // Pastikan __app_id digunakan di sini
                const companyInfoRef = doc(db, `artifacts/${__app_id}/public/data/companyInfo`, 'main');
                const companyInfoSnap = await getDoc(companyInfoRef);
                if (companyInfoSnap.exists()) {
                    setCompanyInfo(companyInfoSnap.data());
                } else {
                    // Initialize if not exists
                    const initialCompanyInfo = {
                        office: 'Jalan Kedinding Tengah Sekolahan No. 1 Kenjeran Surabaya',
                        phone: '(031)9924438',
                        email: 'ptdwikaryainti@yahoo.com',
                        mission: [
                            'A Strong and Growing Company at Regional and National Levels',
                            'Contributing at National Development',
                            'Company with High Ethical Standards and High Integrities',
                            'Customer Satisfaction is Our Main Priorities',
                            'Safety and Health Environmental is a must'
                        ]
                    };
                    await setDoc(companyInfoRef, initialCompanyInfo);
                    setCompanyInfo(initialCompanyInfo);
                }

                // Fetch Legalities
                // Pastikan __app_id digunakan di sini
                const legalitiesColRef = collection(db, `artifacts/${__app_id}/public/data/legalities`);
                const legalitiesSnap = await getDocs(legalitiesColRef);
                if (legalitiesSnap.empty) {
                    const initialLegalities = [
                        {
                            title: 'Surat Keterangan Terdaftar (Kementerian Keuangan)',
                            fileUrl: '#',
                            description: 'Dokumen resmi pendaftaran perusahaan dari Kementerian Keuangan Republik Indonesia, menunjukkan kepatuhan pajak.',
                            imageUrl: 'https://placehold.co/400x250/ADD8E6/000000?text=SKT'
                        },
                        {
                            title: 'Tanda Daftar Perusahaan (Pemerintah Kota Surabaya)',
                            fileUrl: '#',
                            description: 'Tanda daftar resmi perusahaan yang dikeluarkan oleh Pemerintah Kota Surabaya, mengkonfirmasi legalitas operasional.',
                            imageUrl: 'https://placehold.co/400x250/ADD8E6/000000?text=TDP'
                        },
                        {
                            title: 'Surat Pengukuhan Pengusaha Kena Pajak',
                            fileUrl: '#',
                            description: 'Surat pengukuhan sebagai Pengusaha Kena Pajak (PKP), menunjukkan status wajib pajak perusahaan.',
                            imageUrl: 'https://placehold.co/400x250/ADD8E6/000000?text=PKP'
                        },
                        {
                            title: 'Sertifikat Badan Usaha Jasa Pelaksana Konstruksi',
                            fileUrl: '#',
                            description: 'Sertifikat yang menegaskan PT DWI Karya Inti sebagai badan usaha jasa pelaksana konstruksi yang sah.',
                            imageUrl: 'https://placehold.co/400x250/ADD8E6/000000?text=SBUJK'
                        },
                        {
                            title: 'Kartu Tanda Anggota GAPENSI',
                            fileUrl: '#',
                            description: 'Keanggotaan resmi di Gabungan Pelaksana Konstruksi Nasional Indonesia (GAPENSI), menunjukkan afiliasi industri.',
                            imageUrl: 'https://placehold.co/400x250/ADD8E6/000000?text=GAPENSI'
                        },
                        {
                            title: 'Kartu Tanda Anggota KADIN',
                            fileUrl: '#',
                            description: 'Keanggotaan resmi di Kamar Dagang dan Industri (KADIN), memperkuat jaringan bisnis dan legalitas.',
                            imageUrl: 'https://placehold.co/400x250/ADD8E6/000000?text=KADIN'
                        },
                        {
                            title: 'Surat Izin Usaha Perdagangan (Kecil)',
                            fileUrl: '#',
                            description: 'Izin resmi untuk melakukan kegiatan usaha perdagangan, dikeluarkan oleh Pemerintah Kota Surabaya.',
                            imageUrl: 'https://placehold.co/400x250/ADD8E6/000000?text=SIUP'
                        },
                        {
                            title: 'Izin Usaha Jasa Konstruksi Nasional',
                            fileUrl: '#',
                            description: 'Izin yang memungkinkan perusahaan untuk beroperasi dalam jasa konstruksi di tingkat nasional.',
                            imageUrl: 'https://placehold.co/400x250/ADD8E6/000000?text=IUJK'
                        },
                        {
                            title: 'Sertifikat Kompetensi (M.V. HERY KUSBIANTORO)',
                            fileUrl: '#',
                            description: 'Sertifikat kompetensi atas nama M.V. Hery Kusbiantoro, menunjukkan keahlian profesional di bidang terkait.',
                            imageUrl: 'https://placehold.co/400x250/ADD8E6/000000?text=Sertifikat+Kompetensi'
                        },
                        {
                            title: 'Lampiran Keputusan Menteri Hukum dan Hak Asasi Manusia (Perubahan Anggaran Dasar)',
                            fileUrl: '#',
                            description: 'Dokumen yang mencatat perubahan anggaran dasar perusahaan, disetujui oleh Kementerian Hukum dan HAM.',
                            imageUrl: 'https://placehold.co/400x250/ADD8E6/000000?text=AD+Perubahan'
                        },
                        {
                            title: 'Daftar Perseroan',
                            fileUrl: '#',
                            description: 'Daftar resmi perseroan terbatas, mencakup informasi penting mengenai status hukum perusahaan.',
                            imageUrl: 'https://placehold.co/400x250/ADD8E6/000000?text=Daftar+Perseroan'
                        },
                    ];
                    for (const doc of initialLegalities) {
                        await addDoc(legalitiesColRef, doc);
                    }
                    setLegalities(initialLegalities);
                } else {
                    setLegalities(legalitiesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                }

                // Fetch Projects
                // Pastikan __app_id digunakan di sini
                const projectsColRef = collection(db, `artifacts/${__app_id}/public/data/projects`);
                const projectsSnap = await getDocs(projectsColRef);
                if (projectsSnap.empty) {
                    const initialProjects = [
                        { project: 'Apartment Adhiwangsa', work: 'MEP', location: 'Surabaya', year: 2009, value: 750000000 },
                        { project: 'Gedung PWK ITS Tahap I', work: 'MEP', location: 'Surabaya', year: 2009, value: 350000000 },
                        { project: 'Gedung Geomatika ITS Tahap II', work: 'MEP', location: 'Surabaya', year: 2009, value: 375000000 },
                        { project: 'Gedung Elektro ITS Tahap II', work: 'MEP', location: 'Surabaya', year: 2009, value: 350000000 },
                        { project: 'Rusunawa Gedung C UNAIR', work: 'MEP', location: 'Surabaya', year: 2009, value: 1350000000 },
                        { project: 'Rumah Sakit Dr. Soewandhi', work: 'MEP', location: 'Surabaya', year: 2010, value: 950000000 },
                        { project: 'GOR Sultan Agung', work: 'MEP', location: 'Pasuruan', year: 2010, value: 1300000000 },
                        { project: 'Pasar Ikan Kenjeran', work: 'MEP', location: 'Surabaya', year: 2010, value: 1300000000 },
                        { project: 'Gedung FTSP Univ. Diponegoro', work: 'MEP', location: 'Semarang', year: 2010, value: 1750000000 },
                        { project: 'Rumah Sakit Gambiran Tahap II', work: 'MEP', location: 'Kediri', year: 2011, value: 700000000 },
                        { project: 'Gedung Rektorat Univ. Trunojoyo', work: 'MEP', location: 'Madura', year: 2011, value: 6000000000 },
                        { project: 'Rusunawa Kampus C UNAIR', work: 'MEP', location: 'Surabaya', year: 2011, value: 600000000 },
                        { project: 'Rusunawa UPN', work: 'MEP', location: 'Surabaya', year: 2011, value: 900000000 },
                        { project: 'Rusunawa Gontor', work: 'MEP', location: 'Ponorogo', year: 2011, value: 800000000 },
                        { project: 'Best Western Premier La Grande', work: 'Design MEP', location: 'Bandung', year: 2012, value: 3000000000 },
                        { project: 'Gedung Sospol Univ. Brawijaya', work: 'MEP', location: 'Malang', year: 2012, value: 1100000000 },
                        { project: 'Gedung TTG UPN', work: 'MEP (AC & FA)', location: 'Surabaya', year: 2012, value: 250000000 },
                        { project: 'Pasar Ikan Kenjeran Tahap II', work: 'MEP', location: 'Surabaya', year: 2012, value: 950000000 },
                        { project: 'Kantor Imigrasi Kelas C', work: 'MEP', location: 'Sidoarjo', year: 2012, value: 780000000 },
                        { project: 'Kampus UPN', work: 'MEP (AC)', location: 'Surabaya', year: 2012, value: 450000000 },
                        { project: 'Gedung Mahkamah Militer', work: 'MEP', location: 'Sidoarjo', year: 2012, value: 175000000 },
                        { project: 'Gedung Lab Keuangan', work: 'MEP', location: 'Surabaya', year: 2012, value: 275000000 },
                        { project: 'Gedung TTG UPN', work: 'MEP (Panel Surya)', location: 'Surabaya', year: 2012, value: 320000000 },
                        { project: 'Gedung Fisip Unibraw Tahap I', work: 'MEP', location: 'Malang', year: 2012, value: 1200000000 },
                        { project: 'Gedung Fisip Unibraw Tahap II', work: 'MEP', location: 'Malang', year: 2013, value: 1150000000 },
                        { project: 'Rumah Sakit Bina Sehat', work: 'MEP', location: 'Jember', year: 2014, value: 975000000 },
                        { project: 'Grand Hotel Aston (Double Tree)', work: 'MEP', location: 'Surabaya', year: 2014, value: 6750000000 },
                        { project: 'Gedung Universitas Jember', work: 'MEP', location: 'Jember', year: 2015, value: 6256000000 },
                        { project: 'Double Tree Hotel by Hilton', work: 'MEP', location: 'Surabaya', year: 2015, value: 3000000000 },
                        { project: 'Kampus Hukum Unibraw', work: 'MEP', location: 'Malang', year: 2016, value: 9000000000 },
                        { project: 'Universitas Jember', work: 'MEP', location: 'Jember', year: 2016, value: 1200000000 },
                        { project: 'Hotel Eastern', work: 'MEP', location: 'Bojonegoro', year: 2016, value: 3600000000 },
                        { project: 'Bandara Supadio', work: 'MEP', location: 'Pontianak', year: 2017, value: 1800000000 },
                        { project: 'Hotel Pesonna Magelang', work: 'MEP', location: 'Magelang', year: 2017, value: 8000000000 },
                        { project: 'Hotel Pesonna Gresik', work: 'MEP', location: 'Gresik', year: 2017, value: 7000000000 },
                        { project: 'Pabrik Supresso', work: 'MEP', location: 'Pasuruan', year: 2018, value: 1600000000 },
                        { project: 'Pabrik Mutu Gading Tekstil', work: 'MEP', location: 'Solo', year: 2018, value: 3800000000 },
                        { project: 'Pabrik Indopipe', work: 'MEP', location: 'Gresik', year: 2018, value: 1250000000 },
                        { project: 'Pusvetma', work: 'MEP', location: 'Surabaya', year: 2018, value: 175000000 },
                        { project: 'Pabrik Boga Laksmi', work: 'MEP', location: 'Bogor', year: 2019, value: 2400000000 },
                        { project: 'Pabrik Indopipe', work: 'MEP', location: 'Gresik', year: 2019, value: 2000000000 },
                        { project: 'Fairfield Hotel by Mariott Legian', work: 'MEP', location: 'Bali', year: 2019, value: 1000000000 },
                        { project: 'Quest Hotel Diponegoro', work: 'MEP', location: 'Surabaya', year: 2019, value: 750000000 },
                        { project: 'Pengadaan Genset Puskesmas', work: 'MEP', location: 'Sumenep', year: 2020, value: 2000000000 },
                        { project: 'Markas Komando Rayon Militer', work: 'MEP', location: 'Pekanbaru', year: 2021, value: 12300000000 },
                        { project: 'RS Ar-Rozy Kota Probolinggo', work: 'MEP', location: 'Probolinggo', year: 2022, value: 16000000000 },
                        { project: 'Kampus UPN Veteran', work: 'MEP', location: 'Surabaya', year: 2022, value: 9400000000 },
                        { project: 'Kimia Farma Darmo Surabaya', work: 'MEP', location: 'Surabaya', year: 2023, value: 4000000000 },
                        { project: 'Kimia Farma Balikpapan', work: 'MEP', location: 'Balikpapan', year: 2023, value: 1700000000 },
                        { project: 'Kimia Farma Makasar', work: 'MEP', location: 'Makasar', year: 2023, value: 4000000000 },
                        { project: 'RS Hajah Lasmana Banjarnegara', work: 'MEP', location: 'Banjarnegara', year: 2023, value: 1700000000 },
                        { project: 'Kampus Poltrada Tabanan', work: 'MEP', location: 'Bali', year: 2024, value: 1000000000 },
                        { project: 'Discovery Mall Kuta', work: 'MEP', location: 'Bali', year: 2024, value: 8000000000 },
                        { project: 'Hotel Uma Sri Umalas', work: 'MEP', location: 'Bali', year: 2025, value: 4300000000 },
                        { project: 'Kejaksaan Tinggi Surabaya', work: 'MEP', location: 'Surabaya', year: 2025, value: 300000000 }
                    ];
                    for (const project of initialProjects) {
                        await addDoc(projectsColRef, project);
                    }
                    setProjects(initialProjects.map((p, i) => ({ id: `proj${i}`, ...p }))); // Add dummy IDs for initial load
                } else {
                    setProjects(projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                }

            } catch (err) {
                console.error("Error fetching data:", err);
                setError(`Gagal memuat data: ${err.message}. Pastikan aturan keamanan Firestore sudah benar.`); // Perbarui pesan error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isAuthReady, db, userId]); // Re-run when auth is ready or db/userId changes

    // Update Date and Time
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
            };
            setDateTime(now.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'id-ID', options));
        };

        const intervalId = setInterval(updateDateTime, 1000);
        updateDateTime(); // Initial call

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [currentLang]); // Re-run when language changes

    const navigate = (page, props = {}) => {
        setCurrentPage(page);
        setPageProps(props);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-blue-100 text-blue-800 text-xl">
                {useContext(LanguageContext).t('loading')}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800 text-xl p-4 text-center">
                {useContext(LanguageContext).t('error')} {error}
            </div>
        );
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home companyInfo={companyInfo} projects={projects} navigate={navigate} />;
            case 'about':
                return <About companyInfo={companyInfo} />;
            case 'legalities':
                return <Legalities legalities={legalities} />;
            case 'experiences':
                return <Experiences projects={projects} navigate={navigate} selectedProjectId={pageProps.projectId} />;
            case 'contact':
                return <Contact companyInfo={companyInfo} />;
            default:
                return <Home companyInfo={companyInfo} projects={projects} navigate={navigate} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-inter">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                `}
            </style>
            <Header navigate={navigate} dateTime={dateTime} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};

// Export the main App component wrapped with LanguageProvider
export default function WrappedApp() {
    return (
        <LanguageProvider>
            <App />
        </LanguageProvider>
    );
}