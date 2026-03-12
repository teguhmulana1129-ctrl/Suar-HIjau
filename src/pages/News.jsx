import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { useStore } from '../hooks/useStore';
import { Link } from 'react-router-dom';

export default function News() {
    const { language } = useLanguage();
    const t = translations[language];
    const { data, loading, error, getImageUrl } = useStore();

    const newsData = data?.news || [];

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
                            ? 'Informasi terbaru seputar produk, tips, dan cerita inspiratif dari komunitas SuaR Hijau.'
                            : 'Latest information about products, tips, and inspiring stories from the SuaR Hijau community.'}
                    </p>
                </motion.div>
            </section>

            {/* Blog Grid */}
            <section className="container mx-auto px-6">
                {loading && <p className="text-center text-neutral-500 py-10">Memuat artikel...</p>}
                {error && <p className="text-center text-red-500 text-sm py-10">Gagal memuat artikel: {error}</p>}

                {!loading && !error && (
                    <div className="grid md:grid-cols-2 gap-8">
                        {newsData.length === 0 ? (
                            <p className="text-center text-neutral-500 py-10 col-span-full">Belum ada artikel yang diterbitkan.</p>
                        ) : (
                            newsData.map((post, index) => {
                                const title = (post.title && typeof post.title === 'object') ? post.title[language] || post.title.ID : (post.title || '');
                                const category = (post.category && typeof post.category === 'object') ? post.category[language] || post.category.ID : (post.category || 'Berita');
                                const date = (post.date && typeof post.date === 'object') ? post.date[language] || post.date.ID : (post.date || '');
                                const excerpt = (post.excerpt && typeof post.excerpt === 'object') ? post.excerpt[language] || post.excerpt.ID : (post.excerpt || '');

                                return (
                                    <motion.article
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-neutral-100"
                                    >
                                        <Link to={`/news/${post.id}`} className="block h-full flex flex-col">
                                            <div className="aspect-video overflow-hidden bg-neutral-100">
                                                <img
                                                    src={getImageUrl(post.image)}
                                                    alt={title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">{category}</span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(date).toLocaleDateString(language === 'ID' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-neutral-900 font-display mb-3 group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
                                                <p className="text-neutral-500 text-sm leading-relaxed font-sans mb-4 line-clamp-2 flex-1">{excerpt}</p>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className="flex items-center gap-2 text-sm text-neutral-600">
                                                        <User className="w-4 h-4" />
                                                        {post.author || 'Tim SuaR Hijau'}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                                                        {language === 'ID' ? 'Baca' : 'Read'} <ArrowRight className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.article>
                                );
                            })
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
