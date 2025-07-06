import React, { useState, useEffect, createContext } from 'react';

// Define LanguageContext
export const LanguageContext = createContext();

// LanguageProvider component
export const LanguageProvider = ({ children }) => {
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
