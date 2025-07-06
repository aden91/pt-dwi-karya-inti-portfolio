import React, { useState, useEffect, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';

// Impor LanguageContext dan LanguageProvider dari file terpisah
import { LanguageContext, LanguageProvider } from './contexts/LanguageContext';

// Impor komponen-komponen terpisah (Pastikan ini adalah default import)
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Legalities from './components/Legalities';
import Experiences from './components/Experiences';
import Contact from './components/Contact';
import Footer from './components/Footer';


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

    // PENTING: Hooks harus dipanggil di awal fungsi komponen, tanpa syarat.
    // Menggunakan useContext di sini untuk mengakses LanguageContext
    const { currentLang, t } = useContext(LanguageContext); 

    // Konfigurasi Firebase Anda (DIHARDCODE DI SINI UNTUK DEPLOYMENT)
    // Ini adalah konfigurasi yang Anda berikan sebelumnya.
    const firebaseConfig = {
        apiKey: "AIzaSyCEQzL5fTW9CILJ3_A27t_HfX9ZpRXwV2E",
        authDomain: "pt-dwi-karya-inti-portfolio.firebaseapp.com",
        projectId: "pt-dwi-karya-inti-portfolio",
        storageBucket: "pt-dwi-karya-inti-portfolio.appspot.com",
        messagingSenderId: "32186762511",
        appId: "1:32186762511:web:113b41f4271e66dd4daa7a"
        // measurementId: "G-21Z8CT3DSZ" // Opsional, bisa dihapus jika tidak digunakan
    };

    // Gunakan projectId dari firebaseConfig sebagai appId untuk Firestore
    // Karena __app_id hanya ada di lingkungan Canvas
    const appId = firebaseConfig.projectId;


    // Initialize Firebase and Auth
    useEffect(() => {
        let unsubscribeAuth = () => {}; // Inisialisasi unsubscribeAuth

        try {
            console.log("Firebase Config (used):", firebaseConfig); // Log untuk debugging
            console.log("App ID (used):", appId); // Log untuk debugging

            // Periksa apakah firebaseConfig kosong atau tidak valid (setelah dihardcode, ini seharusnya tidak lagi menjadi masalah)
            if (!firebaseConfig || Object.keys(firebaseConfig).length === 0 || !firebaseConfig.apiKey) {
                console.error("ERROR: Konfigurasi Firebase tidak valid setelah dihardcode. Ada kesalahan penulisan?");
                setError("Konfigurasi Firebase tidak valid. Harap periksa kode App.js.");
                setLoading(false);
                return;
            }

            const app = initializeApp(firebaseConfig);
            const firestoreDb = getFirestore(app);
            const firebaseAuth = getAuth(app);

            setDb(firestoreDb);
            setAuth(firebaseAuth);

            unsubscribeAuth = onAuthStateChanged(firebaseAuth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    // Sign in anonymously if no user is logged in
                    try {
                        // __initial_auth_token hanya ada di lingkungan Canvas, jadi fallback ke signInAnonymously
                        if (typeof window !== 'undefined' && typeof window.__initial_auth_token !== 'undefined' && window.__initial_auth_token) {
                            await signInWithCustomToken(firebaseAuth, window.__initial_auth_token);
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

        } catch (initError) {
            console.error("Firebase Initialization Error:", initError);
            setError(`Gagal menginisialisasi Firebase: ${initError.message}. Pastikan konfigurasi telah benar.`);
            setLoading(false);
        }

        return () => unsubscribeAuth(); // Cleanup function
    }, []); // Dependensi kosong karena config sudah dihardcode

    // Fetch data from Firestore
    useEffect(() => {
        if (!isAuthReady || !db || !userId) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Gunakan appId yang sudah didefinisikan di atas (dari firebaseConfig.projectId)
                const currentAppId = appId; // Menggunakan appId yang sudah dihardcode

                // Fetch Company Info
                const companyInfoRef = doc(db, `artifacts/${currentAppId}/public/data/companyInfo`, 'main');
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
                const legalitiesColRef = collection(db, `artifacts/${currentAppId}/public/data/legalities`);
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
                const projectsColRef = collection(db, `artifacts/${currentAppId}/public/data/projects`);
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
                    for (const doc of initialProjects) {
                        await addDoc(projectsColRef, doc);
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
                {t('loading')}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800 text-xl p-4 text-center">
                {t('error')} {error}
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
{
  "name": "pt-dwi-karya-inti-portfolio",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://aden91.github.io/pt-dwi-karya-inti-portfolio/",
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "firebase": "^11.6.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",  <-- TAMBAHKAN INI
    "deploy": "gh-pages -d build"  <-- TAMBAHKAN INI
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "tailwindcss": "^3.4.4",
    "gh-pages": "^X.Y.Z"  // Versi gh-pages akan otomatis ditambahkan npm install
  }
}
