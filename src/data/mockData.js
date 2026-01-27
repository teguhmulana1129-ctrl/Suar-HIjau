export const HEADER_LINKS = [
    { label: "Beranda", href: "/" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Program", href: "/programs" },
    { label: "Produk", href: "/products" },
    { label: "Blog", href: "/blog" },
    { label: "Kontak", href: "/contact" },
];

export const MENU_ITEMS = [
    {
        label: "Beranda",
        href: "/",
        image: "https://images.pexels.com/photos/1460136/pexels-photo-1460136.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
        label: "Tentang Kami",
        href: "/about",
        image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
        label: "Program",
        href: "/programs",
        image: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
        label: "Produk",
        href: "/products",
        image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
        label: "Blog",
        href: "/blog",
        image: "https://images.pexels.com/photos/159652/pencil-office-design-creative-159652.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
        label: "Kontak",
        href: "/contact",
        image: "https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
];

export const HERO_CARDS = [
    {
        title: "Benih Unggul: Elite",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/aa31d635-3237-4ed2-858c-5ec42068e222_800w.png",
        direction: [-1, -1]
    },
    {
        title: "Produk Olahan",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b7fd9648-721b-497f-a38e-2ace6245dc03_800w.png",
        direction: [-1, 1]
    },
    {
        title: "Riset & Teknologi",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d1c4fa0c-ce16-4ed3-ae1b-db525748c93e_800w.jpg",
        direction: [1, -1]
    },
    {
        title: "Mitra Petani",
        image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cb074d68-e7a8-4698-ac04-858d429248c9_800w.jpg",
        direction: [1, 1]
    }
];

export const HERO_STATS = [
    { number: 20, suffix: "+", label: "Tahun Pengalaman" },
    { number: 15, suffix: "+", label: "Varietas Paten" },
    { number: 500, suffix: "+", label: "Hektar Lahan" },
    { number: 50, suffix: "+", label: "Mitra Ilmiah" }
];

export const PRODUCTS = [
    {
        title: "Bakul Anyaman",
        desc: "Bakul anyaman bambu tradisional, cocok untuk wadah buah, sayuran, atau dekorasi rumah.",
        image: "/src/assets/produk/produk_bakul.webp"
    },
    {
        title: "Besek Bambu",
        desc: "Besek bambu berkualitas tinggi untuk kemasan makanan tradisional dan oleh-oleh.",
        image: "/src/assets/produk/produk_besek.webp"
    },
    {
        title: "Caping Petani",
        desc: "Caping atau topi petani dari anyaman bambu, melindungi dari sinar matahari.",
        image: "/src/assets/produk/produk_capil.webp"
    },
    {
        title: "Tampah Bambu",
        desc: "Tampah bambu untuk menjemur hasil panen atau sebagai wadah sajian makanan.",
        image: "/src/assets/produk/produk_tampah.webp"
    }
];

export const PROGRAMS = [
    {
        id: 1,
        title: "Reboisasi Kalimantan",
        category: "Konservasi Hutan",
        location: "Kalimantan Tengah",
        progress: 75,
        target: "1000 Pohon",
        image: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 2,
        title: "Pemberdayaan Petani Amaran",
        category: "Sosial Ekonomi",
        location: "Jawa Timur",
        progress: 45,
        target: "500 Petani",
        image: "https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 3,
        title: "Restorasi Mangrove",
        category: "Lingkungan Pesisir",
        location: "Sumatera Utara",
        progress: 90,
        target: "20 Hektar",
        image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 4,
        title: "Edukasi Pangan Sehat",
        category: "Pendidikan",
        location: "Nasional",
        progress: 30,
        target: "50 Sekolah",
        image: "https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];

export const IMPACT_STATS = [
    { label: "Pohon Ditanam", value: 15420, icon: "Tree" },
    { label: "Petani Binaan", value: 1250, icon: "Users" },
    { label: "Emisi Karbon", value: 5000, suffix: "Ton", icon: "Cloud" },
    { label: "Lahan Restorasi", value: 350, suffix: "Ha", icon: "Map" }
];

export const TEAM_MEMBERS = [
    {
        name: "Dr. Amanda Wijaya",
        role: "Lead Researcher",
        image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=800",
        bio: "Spesialis genetika tanaman dengan fokus pada pengembangan varietas amaran tahan iklim."
    },
    {
        name: "Budi Santoso",
        role: "Head of Cultivation",
        image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800",
        bio: "Praktisi pertanian organik dengan pengalaman lebih dari 15 tahun dalam manajemen lahan berkelanjutan."
    },
    {
        name: "Sarah Lim",
        role: "Community Manager",
        image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
        bio: "Penghubung antara Suar Hijau dan komunitas petani lokal, fokus pada pemberdayaan sosial."
    },
    {
        name: "David Tan",
        role: "Sustainability Director",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
        bio: "Ahli strategi keberlanjutan yang memastikan seluruh rantai pasok kami ramah lingkungan."
    }
];
