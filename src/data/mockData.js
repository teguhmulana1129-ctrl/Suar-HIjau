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
    { name: "Ijun", role: "Tim Suar Hijau", image: staffIjun, bio: "" },
    { name: "Sanusi, S.Pd", role: "Tim Suar Hijau", image: staffSanusi, bio: "" },
    { name: "Wiwit", role: "Tim Suar Hijau", image: staffWiwit, bio: "" },
    { name: "Budiman", role: "Tim Suar Hijau", image: staffBudiman, bio: "" },
    { name: "Novi Lestari", role: "Tim Suar Hijau", image: staffNovi, bio: "" },
    { name: "Via Andrisia", role: "Tim Suar Hijau", image: staffVia, bio: "" },
    { name: "Bayu", role: "Tim Suar Hijau", image: staffBayu, bio: "" },
    { name: "Ita", role: "Tim Suar Hijau", image: staffIta, bio: "" },
    { name: "Beiby Citra", role: "Tim Suar Hijau", image: staffBeiby, bio: "" },
    { name: "Alfin", role: "Tim Suar Hijau", image: staffAlfin, bio: "" },
    { name: "Andris Nirwana", role: "Tim Suar Hijau", image: staffAndris, bio: "" },
    { name: "Jiwo Ageng", role: "Tim Suar Hijau", image: staffJiwo, bio: "" },
    { name: "Reni", role: "Tim Suar Hijau", image: staffReni, bio: "" },
    { name: "Romlatul Hasanah", role: "Tim Suar Hijau", image: staffRomlatul, bio: "" }
];
