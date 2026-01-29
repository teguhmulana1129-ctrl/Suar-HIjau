import bambooSeeds from '../assets/bamboo_seeds_new.jpg';
import bambooLab from '../assets/bamboo_lab_new.png';
import bambooNursery from '../assets/bamboo_nursery.png';
import bambooFarmer from '../assets/bamboo_farmer_correct.jpg';
import produkBakul from '../assets/produk/produk_bakul.webp';
import produkBesek from '../assets/produk/produk_besek.webp';
import produkCapil from '../assets/produk/produk_capil.webp';
import produkTampah from '../assets/produk/produk_tampah.webp';
import bambooProductsHero from '../assets/bamboo_products_hero.jpg';
import bambooFarmersHero from '../assets/bamboo_farmers_hero.jpg';
import bambooRestorationDrone from '../assets/bamboo_restoration_drone.jpg';
import bambooArtisanEmpowerment from '../assets/bamboo_artisan_empowerment_new.jpg';
import bambooResearchLabFinal from '../assets/bamboo_research_lab_final.png';
import bambooEducationFinal from '../assets/bamboo_education_final.jpg';
import bambooMenuBg from '../assets/bamboo_menu_bg.jpg';

export const HEADER_LINKS = [
    { label: "Beranda", href: "/" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Program", href: "/programs" },
    { label: "Produk", href: "/products" },
    { label: "Berita", href: "/blog" },
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
        title: "Restorasi Hutan Bambu",
        titleEN: "Bamboo Forest Restoration",
        category: "Konservasi",
        categoryEN: "Conservation",
        location: "Kediri, Jawa Timur",
        locationEN: "Kediri, East Java",
        progress: 85,
        target: "50.000 Rumpun",
        targetEN: "50.000 Clusters",
        image: bambooRestorationDrone
    },
    {
        id: 2,
        title: "Pemberdayaan Pengrajin Bambu",
        titleEN: "Artisan Empowerment",
        category: "Sosial Ekonomi",
        categoryEN: "Social Economy",
        location: "Kediri, Jawa Timur",
        locationEN: "Kediri, East Java",
        progress: 60,
        target: "200 Pengrajin",
        targetEN: "200 Artisans",
        image: bambooArtisanEmpowerment
    },
    {
        id: 3,
        title: "Pusat Riset Bambu",
        titleEN: "Bamboo Research Center",
        category: "Penelitian",
        categoryEN: "Research",
        location: "Kediri, Jawa Timur",
        locationEN: "Kediri, East Java",
        progress: 90,
        target: "5 Varietas Baru",
        targetEN: "5 New Varieties",
        image: bambooResearchLabFinal
    },
    {
        id: 4,
        title: "Edukasi Produk Lestari",
        titleEN: "Sustainable Product Ed",
        category: "Pendidikan",
        categoryEN: "Education",
        location: "Nasional",
        locationEN: "National",
        progress: 30,
        target: "50 Komunitas",
        targetEN: "50 Communities",
        image: bambooEducationFinal
    }
];

export const IMPACT_STATS = [
    { label: "Bambu Ditanam", labelEN: "Bamboo Planted", value: 54200, icon: "Tree" },
    { label: "Pengrajin Binaan", labelEN: "Supported Artisans", value: 1250, icon: "Users" },
    { label: "Oksigen Dihasilkan", labelEN: "Oxygen Produced", value: 8000, suffix: "Ton", icon: "Cloud" },
    { label: "Lahan Konservasi", labelEN: "Conservation Area", value: 850, suffix: "Ha", icon: "Map" }
];

export const TEAM_MEMBERS = [
    {
        name: "Dr. Amanda Wijaya",
        role: "Lead Researcher",
        roleEN: "Lead Researcher",
        image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=800",
        bio: "Spesialis genetika tanaman dengan fokus pada pengembangan varietas bambu tahan iklim.",
        bioEN: "Plant genetics specialist focusing on developing climate-resilient bamboo varieties."
    },
    {
        name: "Budi Santoso",
        role: "Head of Cultivation",
        roleEN: "Head of Cultivation",
        image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800",
        bio: "Praktisi pertanian organik dengan pengalaman lebih dari 15 tahun dalam manajemen lahan berkelanjutan.",
        bioEN: "Organic farming practitioner with over 15 years of experience in sustainable land management."
    },
    {
        name: "Sarah Lim",
        role: "Community Manager",
        roleEN: "Community Manager",
        image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
        bio: "Penghubung antara Suar Hijau dan komunitas petani lokal, fokus pada pemberdayaan sosial.",
        bioEN: "Connector between Suar Hijau and local farming communities, focused on social empowerment."
    },
    {
        name: "David Tan",
        role: "Sustainability Director",
        roleEN: "Sustainability Director",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
        bio: "Ahli strategi keberlanjutan yang memastikan seluruh rantai pasok kami ramah lingkungan.",
        bioEN: "Sustainability strategist ensuring our entire supply chain is environmentally friendly."
    }
];
