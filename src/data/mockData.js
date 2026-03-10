import bambooSeeds from '../assets/bamboo_seeds_new-ezgif.com-jpg-to-webp-converter.webp';
import bambooLab from '../assets/bamboo_lab_new.webp';
import bambooNursery from '../assets/bamboo_planting_jangkar.webp';
import bambooFarmer from '../assets/bamboo_craftsman_empowerment.webp';
import produkBakul from '../assets/produk/produk_bakul.webp';
import produkBesek from '../assets/produk/produk_besek.webp';
import produkCapil from '../assets/produk/produk_capil.webp';
import produkTampah from '../assets/produk/produk_tampah.webp';
import bambooProductsHero from '../assets/bamboo_products_hero.webp';
import bambooFarmersHero from '../assets/bamboo_farmers_hero.webp';
import bambooRestorationDrone from '../assets/bamboo_restoration_drone-ezgif.com-jpg-to-webp-converter.webp';
import bambooArtisanEmpowerment from '../assets/bamboo_artisan_empowerment_new.webp';
import bambooResearchLabFinal from '../assets/bamboo_lab_new.webp';
import bambooEducationFinal from '../assets/bamboo_education_final.webp';
import bambooMenuBg from '../assets/bamboo_menu_bg.webp';
import imgErosion from '../assets/bamboo_river_erosion_mitigation.webp';
import imgEducation from '../assets/bamboo_education_session.webp';
import bambooMitigation from '../assets/bamboo_mitigation_in_mount.webp';
import imgNgadiluwih from '../assets/bamboo_planting_jangkar.webp';

// Staff Imports
import staffAlfin from '../assets/Staff/Alfin.webp';
import staffAndris from '../assets/Staff/Andris Nirwana.webp';
import staffBayu from '../assets/Staff/Bayu.webp';
import staffBeiby from '../assets/Staff/Beiby Citra.webp';
import staffBudiman from '../assets/Staff/Budiman.webp';
import staffJiwo from '../assets/Staff/Jiwo Ageng.webp';
import staffNovi from '../assets/Staff/Novi Lestari.webp';
import staffReni from '../assets/Staff/Reni.webp';
import staffRomlatul from '../assets/Staff/Romlatul Hasanah.webp';
import staffSanusi from '../assets/Staff/Sanusi, S.Pd.webp';
import staffVia from '../assets/Staff/Via Andrisia.webp';
import staffWiwit from '../assets/Staff/Wiwit.webp';
import staffIjun from '../assets/Staff/ijun.webp';
import staffIta from '../assets/Staff/ita.webp';

export const HEADER_LINKS = [
    { label: "Beranda", href: "/" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Program", href: "/programs" },
    { label: "Produk", href: "/products" },
    { label: "Berita", href: "/blog" },
    { label: "Acara", href: "/events" },
    { label: "Alamat Suar", href: "/contact" },
];

export const MENU_ITEMS = [
    {
        label: "Beranda",
        href: "/",
        image: bambooMenuBg
    },
    {
        label: "Tentang Kami",
        href: "/about",
        image: bambooMenuBg
    },
    {
        label: "Program",
        href: "/programs",
        image: bambooMenuBg
    },
    {
        label: "Produk",
        href: "/products",
        image: bambooMenuBg
    },
    {
        label: "Berita",
        href: "/blog",
        image: bambooMenuBg
    },
    {
        label: "Alamat Suar",
        href: "/contact",
        image: bambooMenuBg
    },
];

export const HERO_CARDS = [
    {
        title: "Benih Unggul: Elite",
        titleEN: "Elite Seeds",
        image: bambooSeeds,
        direction: [-1, -1]
    },
    {
        title: "Produk Olahan",
        titleEN: "Crafted Products",
        image: bambooProductsHero,
        direction: [-1, 1]
    },
    {
        title: "Riset & Teknologi",
        titleEN: "Research & Tech",
        image: bambooLab,
        direction: [1, -1]
    },
    {
        title: "Mitra Petani",
        titleEN: "Farmer Partners",
        image: bambooFarmersHero,
        direction: [1, 1]
    }
];

export const HERO_STATS = [
    { number: 20, suffix: "+", label: "Tahun Pengalaman", labelEN: "Years Experience" },
    { number: 12, suffix: "+", label: "Spesies Bambu", labelEN: "Bamboo Species" },
    { number: 500, suffix: "+", label: "Hektar Hutan Bambu", labelEN: "Hectares Protected" },
    { number: 85, suffix: "+", label: "Produk Inovatif", labelEN: "Innovative Products" }
];

export const PRODUCTS = [
    {
        title: "Bakul Anyaman",
        titleEN: "Woven Basket",
        desc: "Bakul anyaman bambu tradisional, cocok untuk wadah buah, sayuran, atau dekorasi rumah.",
        descEN: "Traditional woven bamboo basket, perfect for fruit, vegetables, or home decoration.",
        image: produkBakul
    },
    {
        title: "Besek Bambu",
        titleEN: "Bamboo Box (Besek)",
        desc: "Besek bambu berkualitas tinggi untuk kemasan makanan tradisional dan oleh-oleh.",
        descEN: "High-quality bamboo box for traditional food packaging and souvenirs.",
        image: produkBesek
    },
    {
        title: "Caping Petani",
        titleEN: "Farmer Hat (Caping)",
        desc: "Caping atau topi petani dari anyaman bambu, melindungi dari sinar matahari.",
        descEN: "Traditional farmer's hat made of woven bamboo, providing protection from the sun.",
        image: produkCapil
    },
    {
        title: "Tampah Bambu",
        titleEN: "Bamboo Winnow",
        desc: "Tampah bambu untuk menjemur hasil panen atau sebagai wadah sajian makanan.",
        descEN: "Bamboo winnow for drying harvests or as a traditional food serving platter.",
        image: produkTampah
    }
];

export const PROGRAMS = [
    {
        id: 1,
        title: "Penanaman Bambu Jangkar",
        titleEN: "Jangkar Bamboo Planting",
        category: "Konservasi Hutan",
        categoryEN: "Forest Conservation",
        location: "Kediri, Jawa Timur",
        locationEN: "Kediri, East Java",
        status: 'in-progress',
        target: "1000 Pohon",
        targetEN: "1000 Trees",
        image: bambooNursery
    },
    {
        id: 2,
        title: "Pemberdayaan Pengrajin Bambu",
        titleEN: "Bamboo Artisan Empowerment",
        category: "Sosial Ekonomi",
        categoryEN: "Social Economy",
        location: "Kediri, Jawa Timur",
        locationEN: "Kediri, East Java",
        status: 'in-progress',
        target: "500 Pengrajin",
        targetEN: "500 Artisans",
        image: bambooFarmer
    },
    {
        id: 3,
        title: "Mitigasi Erosi Sungai",
        titleEN: "River Erosion Mitigation",
        category: "Penghijauan",
        categoryEN: "Greening",
        location: "Kediri, Jawa Timur",
        locationEN: "Kediri, East Java",
        status: 'upcoming',
        target: "20 Hektar",
        targetEN: "20 Hectares",
        image: imgErosion
    },
    {
        id: 4,
        title: "Edukasi Pemanfaatan Bambu",
        titleEN: "Bamboo Utilization Education",
        category: "Pendidikan",
        categoryEN: "Education",
        location: "Kediri, Jawa Timur",
        locationEN: "Kediri, East Java",
        status: 'in-progress',
        target: "50 Komunitas",
        targetEN: "50 Communities",
        image: imgEducation
    },
    {
        id: 5,
        title: "Mitigasi Pencegahan Longsor Lereng Gunung",
        titleEN: "Mountain Slope Landslide Prevention",
        category: "Mitigasi Bencana",
        categoryEN: "Disaster Mitigation",
        location: "Kediri, Jawa Timur",
        locationEN: "Kediri, East Java",
        status: 'upcoming',
        target: "50 Hektar",
        targetEN: "50 Hectares",
        image: bambooMitigation
    }
];

export const IMPACT_STATS = [
    { label: "Bambu Ditanam", labelEN: "Bamboo Planted", value: 54200, icon: "Tree" },
    { label: "Pengrajin Binaan", labelEN: "Supported Artisans", value: 1250, icon: "Users" },
    { label: "Oksigen Dihasilkan", labelEN: "Oxygen Produced", value: 8000, suffix: "Ton", icon: "Cloud" },
    { label: "Lahan Konservasi", labelEN: "Conservation Area", value: 850, suffix: "Ha", icon: "Map" }
];

export const TEAM_MEMBERS = [
    { name: "Sanusi", role: "Tim SuaR Hijau", image: staffSanusi, bio: "" },
    { name: "Ijun", role: "Tim SuaR Hijau", image: staffIjun, bio: "" },
    { name: "Wiwit", role: "Tim SuaR Hijau", image: staffWiwit, bio: "" },
    { name: "Budiman", role: "Tim SuaR Hijau", image: staffBudiman, bio: "" },
    { name: "Novi Lestari", role: "Tim SuaR Hijau", image: staffNovi, bio: "" },
    { name: "Via Andrisia", role: "Tim SuaR Hijau", image: staffVia, bio: "" },
    { name: "Bayu", role: "Tim SuaR Hijau", image: staffBayu, bio: "" },
    { name: "Ita", role: "Tim SuaR Hijau", image: staffIta, bio: "" },
    { name: "Beiby Citra", role: "Tim SuaR Hijau", image: staffBeiby, bio: "" },
    { name: "Alfin", role: "Tim SuaR Hijau", image: staffAlfin, bio: "" },
    { name: "Andris Nirwana", role: "Tim SuaR Hijau", image: staffAndris, bio: "" },
    { name: "Jiwo Ageng", role: "Tim SuaR Hijau", image: staffJiwo, bio: "" },
    { name: "Reni", role: "Tim SuaR Hijau", image: staffReni, bio: "" },
    { name: "Romlatul Hasanah", role: "Tim SuaR Hijau", image: staffRomlatul, bio: "" }
];

export const EVENTS = [
    {
        id: 1,
        title: "Penanaman Bambu di Ngadiluwih",
        titleEN: "Bamboo Planting in Ngadiluwih",
        date: "2026-01-15",
        time: "07:00 - 11:00 WIB",
        location: "Desa Ngadiluwih, Kediri",
        image: imgNgadiluwih,
        description: "Kegiatan penanaman 1000 bibit bambu bersama warga desa Ngadiluwih dan komunitas pecinta alam.",
        descriptionEN: "Planting of 1000 bamboo seedlings with Ngadiluwih villagers and nature lover communities.",
        fullDescription: "Bergabunglah dalam aksi nyata pelestarian lingkungan di Desa Ngadiluwih. Acara ini menargetkan penanaman 1000 bibit bambu jenis Petung dan Apus di area seluas 2 hektar yang rawan erosi. Selain menanam, peserta juga akan mendapatkan edukasi singkat tentang cara merawat bambu dan manfaatnya bagi ekosistem sungai.",
        fullDescriptionEN: "Join real environmental conservation action in Ngadiluwih Village. This event targets planting 1000 Petung and Apus bamboo seedlings in a 2-hectare area prone to erosion. Besides planting, participants will also receive short education on how to care for bamboo and its benefits for the river ecosystem.",
        rundown: [
            { time: "07:00 - 07:30", activity: "Registrasi Ulang", activityEN: "Re-registration" },
            { time: "07:30 - 08:00", activity: "Briefing & Pembagian Area", activityEN: "Briefing & Area Distribution" },
            { time: "08:00 - 10:00", activity: "Sesi Penanaman", activityEN: "Planting Session" },
            { time: "10:00 - 11:00", activity: "Makan Bersama & Penutupan", activityEN: "Communal Meal & Closing" }
        ],
        requirements: ["Membawa botol minum sendiri (tumbler)", "Memakai pakaian lapangan/olahraga", "Membawa topi"],
        requirementsEN: ["Bring your own water bottle (tumbler)", "Wear field/sports attire", "Bring a hat"],
        price: "Gratis",
        priceEN: "Free",
        status: "completed"
    },
    {
        id: 2,
        title: "Workshop Kerajinan Bambu",
        titleEN: "Bamboo Craft Workshop",
        date: "2026-07-20",
        time: "09:00 - 15:00 WIB",
        location: "Pusat Kerajinan Suar Hijau, Pare",
        image: bambooFarmer,
        description: "Pelatihan dasar menganyam bambu untuk pemula. Belajar membuat besek dan produk sederhana lainnya.",
        descriptionEN: "Basic bamboo weaving training for beginners. Learn to make 'besek' and other simple products.",
        fullDescription: "Pelajari seni anyaman bambu warisan leluhur bersama pengrajin ahli Suar Hijau. Dalam workshop sehari ini, Anda akan diajarkan teknik dasar mengirat bambu, pola anyaman dasar, hingga membuat produk jadi berupa besek serbaguna. Cocok untuk pemula yang ingin memulai hobi baru atau wirausaha.",
        fullDescriptionEN: "Learn the ancestral art of bamboo weaving with Suar Hijau's master artisans. In this one-day workshop, you will be taught basic bamboo slicing techniques, basic weaving patterns, to making finished products in the form of versatile 'besek'. Suitable for beginners who want to start a new hobby or entrepreneurship.",
        rundown: [
            { time: "09:00 - 09:30", activity: "Pengenalan Alat & Bahan", activityEN: "Tools & Materials Introduction" },
            { time: "09:30 - 12:00", activity: "Sesi Praktek 1: Teknik Dasar", activityEN: "Practice Session 1: Basic Techniques" },
            { time: "12:00 - 13:00", activity: "Istirahat & Makan Siang", activityEN: "Break & Lunch" },
            { time: "13:00 - 15:00", activity: "Sesi Praktek 2: Finishing Produk", activityEN: "Practice Session 2: Product Finishing" }
        ],
        requirements: ["Usia minimal 15 tahun", "Membayar biaya pendaftaran"],
        requirementsEN: ["Minimum age 15 years", "Pay registration fee"],
        price: "Rp 150.000",
        priceEN: "IDR 150,000",
        status: "upcoming"
    },
    {
        id: 3,
        title: "Festival Bambu Kediri 2026",
        titleEN: "Kediri Bamboo Festival 2026",
        date: "2026-10-10",
        time: "08:00 - 20:00 WIB",
        location: "Simpang Lima Gumul, Kediri",
        image: bambooMenuBg,
        description: "Pameran produk bambu terbesar di Kediri, dimeriahkan dengan pentas seni dan pasar rakyat.",
        descriptionEN: "The largest bamboo product exhibition in Kediri, featuring art performances and a folk market.",
        fullDescription: "Festival tahunan yang merayakan keajaiban bambu! Temukan ratusan produk inovatif dari UMKM lokal, instalasi seni bambu raksasa, dan pertunjukan musik menggunakan instrumen bambu. Acara ini juga menjadi ajang networking bagi pegiat lingkungan, pengrajin, dan investor hijau.",
        fullDescriptionEN: "Annual festival celebrating the magic of bamboo! Discover hundreds of innovative products from local MSMEs, giant bamboo art installations, and music performances using bamboo instruments. This event is also a networking venue for environmentalists, artisans, and green investors.",
        rundown: [
            { time: "08:00 - 10:00", activity: "Pembukaan & Parade Budaya", activityEN: "Opening & Cultural Parade" },
            { time: "10:00 - 18:00", activity: "Pameran & Pasar Rakyat", activityEN: "Exhibition & Folk Market" },
            { time: "18:00 - 20:00", activity: "Pentas Musik Bambu & Penutupan", activityEN: "Bamboo Music Performance & Closing" }
        ],
        requirements: ["Terbuka untuk umum", "Membawa uang tunai/QRIS untuk belanja"],
        requirementsEN: ["Open to public", "Bring cash/QRIS for shopping"],
        price: "Gratis",
        priceEN: "Free",
        status: "upcoming"
    }
];
