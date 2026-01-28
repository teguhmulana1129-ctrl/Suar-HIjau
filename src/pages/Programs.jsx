
import { motion } from 'framer-motion';
import { MapPin, Target, Users, Calendar, ArrowRight, Leaf, TreeDeciduous, Waves, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const PROGRAMS_DETAILED = [
    {
        id: 1,
        title: "Penanaman Bambu Jangkar",
        category: "Konservasi Hutan",
        location: "Kalimantan Tengah",
        progress: 75,
        target: "1000 Pohon",
        current: 750,
        volunteers: 125,
        startDate: "Januari 2025",
        image: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=800",
        icon: TreeDeciduous,
        description: "Program penanaman bambu jangkar untuk memulihkan hutan yang rusak akibat penebangan liar. Bambu jangkar dipilih karena kemampuannya menahan erosi tanah dan menyerap karbon dengan efektif.",
        fullDescription: "Program Penanaman Bambu Jangkar adalah inisiatif konservasi unggulan kami yang berfokus pada pemulihan ekosistem hutan di Kalimantan Tengah. Bambu jangkar (Gigantochloa apus) dipilih karena pertumbuhannya yang cepat, kemampuan menyerap karbon hingga 12 ton per hektar per tahun, dan fungsinya sebagai penahan erosi tanah.\n\nProgram ini melibatkan masyarakat lokal dalam setiap tahap, mulai dari pembibitan hingga pemeliharaan. Setiap pohon yang ditanam dilengkapi dengan GPS tracking untuk monitoring pertumbuhan dan survival rate.",
        impact: [
            "750 pohon bambu telah ditanam",
            "15 hektar lahan terehabilitasi",
            "9 ton CO2 diserap per tahun",
            "125 volunteer aktif terlibat"
        ],
        timeline: [
            { phase: "Pembibitan", status: "completed" },
            { phase: "Penanaman Fase 1", status: "completed" },
            { phase: "Penanaman Fase 2", status: "in-progress" },
            { phase: "Monitoring", status: "upcoming" }
        ]
    },
    {
        id: 2,
        title: "Pemberdayaan Pengrajin Bambu",
        category: "Sosial Ekonomi",
        location: "Jawa Timur",
        progress: 45,
        target: "500 Pengrajin",
        current: 225,
        volunteers: 50,
        startDate: "Maret 2025",
        image: "https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=800",
        icon: Users,
        description: "Pelatihan dan pendampingan pengrajin lokal untuk meningkatkan keterampilan dan akses pasar produk anyaman bambu berkualitas tinggi.",
        fullDescription: "Program Pemberdayaan Pengrajin Bambu bertujuan meningkatkan kesejahteraan ekonomi masyarakat lokal melalui pelatihan keterampilan anyaman bambu dan akses ke pasar yang lebih luas. Program ini mencakup pelatihan teknik anyaman modern, manajemen usaha kecil, dan pemasaran digital.\n\nSetiap pengrajin yang lulus program mendapatkan sertifikasi dan kesempatan untuk memasarkan produknya melalui platform Suar Hijau, sehingga memperluas jangkauan pasar mereka secara nasional dan internasional.",
        impact: [
            "225 pengrajin telah dilatih",
            "85% peningkatan pendapatan rata-rata",
            "50 produk baru dikembangkan",
            "3 koperasi terbentuk"
        ],
        timeline: [
            { phase: "Rekrutmen", status: "completed" },
            { phase: "Pelatihan Dasar", status: "completed" },
            { phase: "Pelatihan Lanjutan", status: "in-progress" },
            { phase: "Sertifikasi", status: "upcoming" }
        ]
    },
    {
        id: 3,
        title: "Restorasi Mangrove",
        category: "Lingkungan Pesisir",
        location: "Sumatera Utara",
        progress: 90,
        target: "20 Hektar",
        current: 18,
        volunteers: 200,
        startDate: "September 2024",
        image: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800",
        icon: Waves,
        description: "Program restorasi ekosistem mangrove untuk melindungi garis pantai dan menjadi habitat bagi berbagai spesies laut.",
        fullDescription: "Program Restorasi Mangrove adalah upaya pemulihan ekosistem pesisir di Sumatera Utara yang telah mengalami degradasi akibat konversi lahan dan abrasi. Mangrove berfungsi sebagai pelindung pantai alami, habitat biodiversitas, dan penyerap karbon yang sangat efektif.\n\nProgram ini melibatkan nelayan lokal dan komunitas pesisir dalam penanaman dan pemeliharaan mangrove. Dengan pendekatan berbasis komunitas, program ini tidak hanya memulihkan ekosistem tetapi juga meningkatkan kesadaran lingkungan masyarakat setempat.",
        impact: [
            "18 hektar mangrove dipulihkan",
            "50,000+ bibit ditanam",
            "Populasi ikan meningkat 40%",
            "Abrasi pantai berkurang 60%"
        ],
        timeline: [
            { phase: "Survey Lokasi", status: "completed" },
            { phase: "Pembibitan", status: "completed" },
            { phase: "Penanaman", status: "completed" },
            { phase: "Pemeliharaan", status: "in-progress" }
        ]
    },
    {
        id: 4,
        title: "Edukasi Sustainability",
        category: "Pendidikan",
        location: "Nasional",
        progress: 30,
        target: "50 Sekolah",
        current: 15,
        volunteers: 75,
        startDate: "Februari 2025",
        image: "https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=800",
        icon: GraduationCap,
        description: "Program edukasi ke sekolah-sekolah tentang pentingnya kelestarian lingkungan dan pemanfaatan bambu secara berkelanjutan.",
        fullDescription: "Program Edukasi Sustainability adalah inisiatif pendidikan lingkungan yang menyasar siswa SD hingga SMA di seluruh Indonesia. Program ini menyediakan kurikulum tentang konservasi, daur ulang, dan pemanfaatan sumber daya alam secara berkelanjutan.\n\nMelalui workshop interaktif, kunjungan lapangan, dan proyek berbasis sekolah, siswa diajak untuk memahami pentingnya menjaga lingkungan dan peran bambu dalam ekosistem. Setiap sekolah yang berpartisipasi mendapatkan kit pembelajaran dan bibit bambu untuk ditanam di area sekolah.",
        impact: [
            "15 sekolah sudah terjangkau",
            "3,000+ siswa teredukasi",
            "100+ guru terlatih",
            "15 kebun sekolah tercipta"
        ],
        timeline: [
            { phase: "Pengembangan Kurikulum", status: "completed" },
            { phase: "Pilot Program", status: "completed" },
            { phase: "Ekspansi Regional", status: "in-progress" },
            { phase: "Program Nasional", status: "upcoming" }
        ]
    }
];

export default function Programs() {
    return (
        <div className="pt-24 min-h-screen bg-background pb-20">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 font-sans">Program Konservasi</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8">Aksi Nyata Untuk Bumi</h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-sans leading-relaxed">
                        Bergabunglah dengan program konservasi kami untuk menciptakan dampak nyata bagi lingkungan dan masyarakat.
                    </p>
                </motion.div>
            </section>

            {/* Programs Grid */}
            <section className="container mx-auto px-6">
                <div className="space-y-16">
                    {PROGRAMS_DETAILED.map((program, index) => (
                        <motion.article
                            key={program.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100"
                        >
                            <div className="grid lg:grid-cols-2">
                                {/* Image */}
                                <div className="relative h-72 lg:h-auto overflow-hidden">
                                    <img
                                        src={program.image}
                                        alt={program.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-primary-dark">
                                            <program.icon className="w-4 h-4" />
                                            {program.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 lg:p-10">
                                    <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {program.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {program.startDate}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 font-display mb-4">{program.title}</h2>

                                    <p className="text-neutral-600 leading-relaxed mb-6 whitespace-pre-line">{program.fullDescription}</p>

                                    {/* Progress */}
                                    <div className="mb-6">
                                        <div className="flex justify-between text-sm font-semibold mb-2">
                                            <span className="text-neutral-600">Progress: {program.current} / {program.target}</span>
                                            <span className="text-primary">{program.progress}%</span>
                                        </div>
                                        <div className="w-full bg-neutral-100 rounded-full h-3">
                                            <div
                                                className="bg-primary h-3 rounded-full transition-all duration-1000"
                                                style={{ width: `${program.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Impact */}
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-neutral-900 mb-3">Dampak Program:</h4>
                                        <ul className="grid grid-cols-2 gap-2">
                                            {program.impact.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                                                    <Leaf className="w-4 h-4 text-primary flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Timeline */}
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-neutral-900 mb-3">Timeline:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {program.timeline.map((phase, i) => (
                                                <span
                                                    key={i}
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${phase.status === 'completed' ? 'bg-primary/10 text-primary' :
                                                        phase.status === 'in-progress' ? 'bg-secondary/10 text-secondary' :
                                                            'bg-neutral-100 text-neutral-500'
                                                        }`}
                                                >
                                                    {phase.phase}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                                        <span className="flex items-center gap-2 text-sm text-neutral-600">
                                            <Users className="w-4 h-4" />
                                            {program.volunteers} Volunteer
                                        </span>
                                        <Link
                                            to="/contact"
                                            className="ml-auto flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
                                        >
                                            Gabung Sekarang
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 mt-20">
                <div className="bg-primary rounded-2xl p-10 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">Ingin Bermitra dengan Kami?</h2>
                    <p className="text-white/80 mb-6 max-w-xl mx-auto">
                        Kami membuka peluang kerjasama untuk organisasi, perusahaan, dan komunitas yang ingin berkontribusi pada konservasi dan pemberdayaan masyarakat.
                    </p>
                    <Link to="/contact" className="inline-flex bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors">
                        Hubungi Kami
                    </Link>
                </div>
            </section>
        </div>
    );
}
