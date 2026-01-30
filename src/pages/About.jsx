import { motion } from 'framer-motion';
import { Leaf, Users, ShoppingBag, TreeDeciduous, Target, Heart, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function About() {
    const { language } = useLanguage();
    const t = translations[language];

    const stats = [
        { value: '10,000+', label: language === 'ID' ? 'Pohon Ditanam' : 'Trees Planted', icon: TreeDeciduous },
        { value: '50+', label: language === 'ID' ? 'UMKM Partner' : 'MSME Partners', icon: ShoppingBag },
        { value: '500+', label: language === 'ID' ? 'Relawan Aktif' : 'Active Volunteers', icon: Users },
        { value: '25', label: language === 'ID' ? 'Hektar Restorasi' : 'Restoration Hectares', icon: Leaf },
    ];

    const pillars = [
        {
            icon: TreeDeciduous,
            title: language === 'ID' ? 'Konservasi Bambu' : 'Bamboo Conservation',
            desc: language === 'ID' ? 'Pelacakan & reporting program konservasi bambu dengan real-time progress visualization dan impact metrics.' : 'Tracking & reporting bamboo conservation programs with real-time progress visualization and impact metrics.',
            color: 'bg-primary/10 text-primary'
        },
        {
            icon: ShoppingBag,
            title: language === 'ID' ? 'Marketplace UMKM' : 'MSME Marketplace',
            desc: language === 'ID' ? 'Platform digital untuk produk ramah lingkungan dari pengrajin lokal dengan akses pasar yang lebih luas.' : 'Digital platform for eco-friendly products from local artisans with broader market access.',
            color: 'bg-secondary/10 text-secondary'
        },
        {
            icon: Users,
            title: language === 'ID' ? 'Komunitas Volunteer' : 'Volunteer Community',
            desc: language === 'ID' ? 'Jaringan relawan dan partnership untuk mendukung program konservasi dan pemberdayaan masyarakat.' : 'Relay network and partnerships to support conservation programs and community empowerment.',
            color: 'bg-blue-500/10 text-blue-500'
        },
        {
            icon: Target,
            title: language === 'ID' ? 'Impact Tracking' : 'Impact Tracking',
            desc: language === 'ID' ? 'Analytics dan pelaporan dampak yang transparan untuk setiap program konservasi dan produk UMKM.' : 'Transparent impact analytics and reporting for every conservation program and MSME product.',
            color: 'bg-purple-500/10 text-purple-500'
        },
    ];

    const values = [
        { title: 'Sustainability', desc: language === 'ID' ? 'Setiap keputusan berorientasi pada keberlanjutan lingkungan.' : 'Every decision is oriented towards environmental sustainability.' },
        { title: 'Transparency', desc: language === 'ID' ? 'Pelaporan dampak yang jujur dan terbuka untuk semua stakeholder.' : 'Honest and open impact reporting for all stakeholders.' },
        { title: 'Empowerment', desc: language === 'ID' ? 'Memberdayakan komunitas lokal melalui akses pasar dan teknologi.' : 'Empowering local communities through market access and technology.' },
        { title: 'Innovation', desc: language === 'ID' ? 'Solusi digital inovatif untuk konservasi dan ekonomi hijau.' : 'Innovative digital solutions for conservation and the green economy.' },
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
                            <span className="text-sm font-semibold text-primary uppercase tracking-widest">{t.nav.about}</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 font-display tracking-tight leading-[1.1] mb-6" dangerouslySetInnerHTML={{ __html: language === 'ID' ? 'Ekosistem Digital untuk<br /><span class="text-primary">Konservasi & UMKM</span>' : 'Digital Ecosystem for<br /><span class="text-primary">Conservation & MSMEs</span>' }}>
                        </h1>
                        <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                            {language === 'ID'
                                ? 'Suar Hijau adalah platform digital terpadu yang menggabungkan konservasi lingkungan dengan pemberdayaan ekonomi lokal. Kami menciptakan ekosistem yang sustainable, profitable, dan scalable untuk bisnis UMKM lokal sambil mendorong konservasi bambu di Indonesia.'
                                : 'Suar Hijau is an integrated digital platform that combines environmental conservation with local economic empowerment. We create a sustainable, profitable, and scalable ecosystem for local MSME businesses while driving bamboo conservation in Indonesia.'}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/programs"
                                className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
                            >
                                <span>{language === 'ID' ? 'Lihat Program' : 'View Programs'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors border border-neutral-200"
                            >
                                <span>{t.nav.contactUs || t.nav.contact}</span>
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
                        <span>{language === 'ID' ? 'Pilar Utama' : 'Main Pillars'}</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 font-display">
                        {language === 'ID' ? 'Empat Pilar Suar Hijau' : 'The Four Pillars of Suar Hijau'}
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
                <div className="bg-neutral-900 rounded-3xl overflow-hidden p-6 lg:p-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-6">
                                <Heart className="w-4 h-4" />
                                <span>{language === 'ID' ? 'Nilai Kami' : 'Our Values'}</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white font-display mb-6">
                                {language === 'ID' ? 'Komitmen untuk Keberlanjutan' : 'Commitment to Sustainability'}
                            </h2>
                            <p className="text-white/70 text-lg leading-relaxed">
                                {language === 'ID'
                                    ? 'Kami percaya bahwa bisnis yang sukses harus berjalan seiring dengan pelestarian lingkungan dan pemberdayaan masyarakat lokal.'
                                    : 'We believe that a successful business must go hand in hand with environmental preservation and local community empowerment.'}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            {values.map((value, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10">
                                    <CheckCircle2 className="w-5 h-5 text-primary mb-2" />
                                    <h4 className="font-semibold text-white mb-1 break-words">{value.title}</h4>
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
                        {language === 'ID' ? 'Siapa yang Kami Layani?' : 'Who We Serve'}
                    </h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        {language === 'ID'
                            ? 'Platform kami dirancang untuk berbagai stakeholder dalam ekosistem konservasi dan ekonomi hijau.'
                            : 'Our platform is designed for various stakeholders in the conservation and green economy ecosystem.'}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            title: language === 'ID' ? 'Konsumen' : 'Consumers',
                            percent: '40%',
                            desc: language === 'ID' ? 'Pembeli produk UMKM yang ingin berkontribusi pada lingkungan melalui pembelian produk berkelanjutan.' : 'MSME product buyers who want to contribute to the environment through sustainable product purchases.',
                            features: language === 'ID'
                                ? ['Browse produk UMKM', 'Baca artikel sustainability', 'Dukung program konservasi']
                                : ['Browse MSME products', 'Read sustainability articles', 'Support conservation programs']
                        },
                        {
                            title: language === 'ID' ? 'UMKM Penjual' : 'MSME Sellers',
                            percent: '30%',
                            desc: language === 'ID' ? 'Pengrajin lokal dan usaha kecil yang ingin menjangkau pasar lebih luas dengan produk ramah lingkungan.' : 'Local artisans and small businesses looking to reach a wider market with eco-friendly products.',
                            features: language === 'ID'
                                ? ['Showcase produk', 'Akses pasar digital', 'Tracking engagement']
                                : ['Showcase products', 'Digital market access', 'Engagement tracking']
                        },
                        {
                            title: language === 'ID' ? 'Volunteer' : 'Volunteers',
                            percent: '20%',
                            desc: language === 'ID' ? 'Environmental enthusiasts, mahasiswa, dan profesional yang ingin berkontribusi pada konservasi.' : 'Environmental enthusiasts, students, and professionals who want to contribute to conservation.',
                            features: language === 'ID'
                                ? ['Join program konservasi', 'Track personal impact', 'Share achievements']
                                : ['Join conservation programs', 'Track personal impact', 'Share achievements']
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
                            {language === 'ID' ? 'Bergabung dengan Gerakan Hijau' : 'Join the Green Movement'}
                        </h2>
                        <p className="text-white/80 text-lg mb-8">
                            {language === 'ID'
                                ? 'Jadilah bagian dari ekosistem yang menciptakan dampak positif bagi lingkungan dan ekonomi lokal Indonesia.'
                                : 'Be part of an ecosystem that creates positive impact for Indonesia\'s environment and local economy.'}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/programs"
                                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-neutral-100 transition-colors"
                            >
                                <span>{language === 'ID' ? 'Lihat Program' : 'View Programs'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-colors border border-white/30"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                <span>{language === 'ID' ? 'Belanja Produk' : 'Shop Products'}</span>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
