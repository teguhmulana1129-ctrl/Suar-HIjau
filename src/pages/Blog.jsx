
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import imgAnyaman from '../assets/bamboo_benefits_daily.jpg';
import imgProses from '../assets/bamboo_weaving_traditional_process.jpg';
import imgUMKM from '../assets/bamboo_umkm_market.jpg';
import imgDekor from '../assets/bamboo_home_decor_modern.jpg';

export default function Blog() {
    const { language } = useLanguage();
    const t = translations[language];

    const BLOG_POSTS = [
        {
            id: 1,
            title: language === 'ID' ? "Manfaat Anyaman Bambu untuk Kehidupan Sehari-hari" : "Benefits of Bamboo Weaving for Daily Life",
            excerpt: language === 'ID' ? "Temukan berbagai manfaat produk anyaman bambu yang ramah lingkungan dan tahan lama untuk kebutuhan rumah tangga Anda." : "Discover various benefits of eco-friendly and durable bamboo weaving products for your household needs.",
            image: imgAnyaman,
            author: "Tim Suar Hijau",
            date: language === 'ID' ? "20 Jan 2026" : "Jan 20, 2026",
            category: language === 'ID' ? "Tips & Trik" : "Tips & Tricks"
        },
        {
            id: 2,
            title: language === 'ID' ? "Proses Pembuatan Anyaman Bambu Tradisional" : "Traditional Bamboo Weaving Process",
            excerpt: language === 'ID' ? "Mengenal lebih dekat proses pembuatan anyaman bambu dari awal hingga menjadi produk berkualitas tinggi." : "Get a closer look at the bamboo weaving process from start to high-quality finished product.",
            image: imgProses,
            author: "Budi Santoso",
            date: language === 'ID' ? "15 Jan 2026" : "Jan 15, 2026",
            category: language === 'ID' ? "Edukasi" : "Education"
        },
        {
            id: 3,
            title: language === 'ID' ? "Mendukung UMKM Lokal Melalui Produk Ramah Lingkungan" : "Supporting Local MSMEs Through Eco-Friendly Products",
            excerpt: language === 'ID' ? "Bagaimana memilih produk lokal dapat membantu ekonomi masyarakat dan menjaga kelestarian lingkungan." : "How choosing local products can help the community's economy and maintain environmental sustainability.",
            image: imgUMKM,
            author: "Sarah Lim",
            date: language === 'ID' ? "10 Jan 2026" : "Jan 10, 2026",
            category: language === 'ID' ? "Komunitas" : "Community"
        },
        {
            id: 4,
            title: language === 'ID' ? "Tren Dekorasi Rumah dengan Material Alami" : "Home Decor Trends with Natural Materials",
            excerpt: language === 'ID' ? "Inspirasi dekorasi rumah menggunakan material alami seperti bambu, rotan, and anyaman tradisional." : "Home decoration inspiration using natural materials like bamboo, rattan, and traditional weaving.",
            image: imgDekor,
            author: "Tim Suar Hijau",
            date: language === 'ID' ? "5 Jan 2026" : "Jan 5, 2026",
            category: language === 'ID' ? "Inspirasi" : "Inspiration"
        }
    ];
    return (
        <div className="pt-24 min-h-screen bg-background pb-20">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 font-sans">{language === 'ID' ? 'Artikel' : 'Articles'}</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8">{t.nav.blog}</h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-sans leading-relaxed">
                        {language === 'ID'
                            ? 'Informasi terbaru seputar produk, tips, dan cerita inspiratif dari komunitas Suar Hijau.'
                            : 'Latest information about products, tips, and inspiring stories from the Suar Hijau community.'}
                    </p>
                </motion.div>
            </section>

            {/* Blog Grid */}
            <section className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    {BLOG_POSTS.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-neutral-100"
                        >
                            <div className="aspect-video overflow-hidden bg-neutral-100">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">{post.category}</span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {post.date}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 font-display mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                                <p className="text-neutral-500 text-sm leading-relaxed font-sans mb-4 line-clamp-2">{post.excerpt}</p>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-sm text-neutral-600">
                                        <User className="w-4 h-4" />
                                        {post.author}
                                    </span>
                                    <button className="flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                                        {language === 'ID' ? 'Baca' : 'Read'} <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>
        </div>
    );
}
