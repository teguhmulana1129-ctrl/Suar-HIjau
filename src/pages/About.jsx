import { motion } from 'framer-motion';
import { Leaf, Users, ShoppingBag, TreeDeciduous, Target, Heart, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
    const stats = [
        { value: '10,000+', label: 'Pohon Ditanam', icon: TreeDeciduous },
        { value: '50+', label: 'UMKM Partner', icon: ShoppingBag },
        { value: '500+', label: 'Relawan Aktif', icon: Users },
        { value: '25', label: 'Hektar Restorasi', icon: Leaf },
    ];

    const pillars = [
        {
            icon: TreeDeciduous,
            title: 'Konservasi Bambu',
            desc: 'Pelacakan & reporting program konservasi bambu dengan real-time progress visualization dan impact metrics.',
            color: 'bg-primary/10 text-primary'
        },
        {
            icon: ShoppingBag,
            title: 'Marketplace UMKM',
            desc: 'Platform digital untuk produk ramah lingkungan dari pengrajin lokal dengan akses pasar yang lebih luas.',
            color: 'bg-secondary/10 text-secondary'
        },
        {
            icon: Users,
            title: 'Komunitas Volunteer',
            desc: 'Jaringan relawan dan partnership untuk mendukung program konservasi dan pemberdayaan masyarakat.',
            color: 'bg-blue-500/10 text-blue-500'
        },
        {
            icon: Target,
            title: 'Impact Tracking',
            desc: 'Analytics dan pelaporan dampak yang transparan untuk setiap program konservasi dan produk UMKM.',
            color: 'bg-purple-500/10 text-purple-500'
        },
    ];

    const values = [
        { title: 'Sustainability', desc: 'Setiap keputusan berorientasi pada keberlanjutan lingkungan.' },
        { title: 'Transparency', desc: 'Pelaporan dampak yang jujur dan terbuka untuk semua stakeholder.' },
        { title: 'Empowerment', desc: 'Memberdayakan komunitas lokal melalui akses pasar dan teknologi.' },
        { title: 'Innovation', desc: 'Solusi digital inovatif untuk konservasi dan ekonomi hijau.' },
    ];

    return (
        <div className="pt-24 min-h-screen bg-[#fafafa] pb-20">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/[0.03] to-transparent rounded-full blur-3xl" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 max-w-screen-xl mx-auto px-6 mb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-12 bg-primary" />
                            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Tentang Kami</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 font-display tracking-tight leading-[1.1] mb-6">
                            Ekosistem Digital untuk<br />
                            <span className="text-primary">Konservasi & UMKM</span>
                        </h1>
                        <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                            Suar Hijau adalah platform digital terpadu yang menggabungkan konservasi lingkungan dengan pemberdayaan ekonomi lokal. Kami menciptakan ekosistem yang sustainable, profitable, dan scalable untuk bisnis UMKM lokal sambil mendorong konservasi bambu di Indonesia.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/programs"
                                className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
                            >
                                <span>Lihat Program</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors border border-neutral-200"
                            >
                                <span>Hubungi Kami</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 border border-neutral-100 hover:shadow-lg transition-shadow"
                            >
                                <stat.icon className="w-8 h-8 text-primary mb-3" />
                                <div className="text-3xl font-bold text-neutral-900 mb-1">{stat.value}</div>
                                <div className="text-sm text-neutral-500">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 4 Pillars Section */}
            <section className="relative z-10 max-w-screen-xl mx-auto px-6 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>Pilar Utama</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 font-display">
                        Empat Pilar Suar Hijau
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {pillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-neutral-100 hover:shadow-lg transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-xl ${pillar.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <pillar.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">{pillar.title}</h3>
                            <p className="text-sm text-neutral-600 leading-relaxed">{pillar.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Values Section */}
            <section className="relative z-10 max-w-screen-xl mx-auto px-6 mb-20">
                <div className="bg-neutral-900 rounded-3xl overflow-hidden p-10 lg:p-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-6">
                                <Heart className="w-4 h-4" />
                                <span>Nilai Kami</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white font-display mb-6">
                                Komitmen untuk Keberlanjutan
                            </h2>
                            <p className="text-white/70 text-lg leading-relaxed">
                                Kami percaya bahwa bisnis yang sukses harus berjalan seiring dengan pelestarian lingkungan dan pemberdayaan masyarakat lokal.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {values.map((value, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                                    <CheckCircle2 className="w-5 h-5 text-primary mb-2" />
                                    <h4 className="font-semibold text-white mb-1">{value.title}</h4>
                                    <p className="text-white/60 text-sm">{value.desc}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Target Users Section */}
            <section className="relative z-10 max-w-screen-xl mx-auto px-6 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 font-display mb-4">
                        Siapa yang Kami Layani?
                    </h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Platform kami dirancang untuk berbagai stakeholder dalam ekosistem konservasi dan ekonomi hijau.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            title: 'Konsumen',
                            percent: '40%',
                            desc: 'Pembeli produk UMKM yang ingin berkontribusi pada lingkungan melalui pembelian produk berkelanjutan.',
                            features: ['Browse produk UMKM', 'Baca artikel sustainability', 'Dukung program konservasi']
                        },
                        {
                            title: 'UMKM Penjual',
                            percent: '30%',
                            desc: 'Pengrajin lokal dan usaha kecil yang ingin menjangkau pasar lebih luas dengan produk ramah lingkungan.',
                            features: ['Showcase produk', 'Akses pasar digital', 'Tracking engagement']
                        },
                        {
                            title: 'Volunteer',
                            percent: '20%',
                            desc: 'Environmental enthusiasts, mahasiswa, dan profesional yang ingin berkontribusi pada konservasi.',
                            features: ['Join program konservasi', 'Track personal impact', 'Share achievements']
                        }
                    ].map((user, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-neutral-100 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-neutral-900">{user.title}</h3>
                                <span className="text-2xl font-bold text-primary">{user.percent}</span>
                            </div>
                            <p className="text-neutral-600 text-sm mb-4">{user.desc}</p>
                            <ul className="space-y-2">
                                {user.features.map((f, j) => (
                                    <li key={j} className="flex items-center gap-2 text-sm text-neutral-700">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 max-w-screen-xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-primary rounded-3xl p-10 lg:p-16 text-center text-white relative overflow-hidden"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl lg:text-4xl font-bold font-display mb-4">
                            Bergabung dengan Gerakan Hijau
                        </h2>
                        <p className="text-white/80 text-lg mb-8">
                            Jadilah bagian dari ekosistem yang menciptakan dampak positif bagi lingkungan dan ekonomi lokal Indonesia.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/programs"
                                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-neutral-100 transition-colors"
                            >
                                <span>Lihat Program</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-colors border border-white/30"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                <span>Belanja Produk</span>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
