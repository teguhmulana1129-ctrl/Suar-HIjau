import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { newsData } from '../data/newsData';
import { Link } from 'react-router-dom';

export default function News() {
    const { language } = useLanguage();
    const t = translations[language];

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
                    {newsData.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-neutral-100"
                        >
                            <Link to={`/news/${post.id}`} className="block h-full">
                                <div className="aspect-video overflow-hidden bg-neutral-100">
                                    <img
                                        src={post.image}
                                        alt={post.title[language]}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">{post.category[language]}</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {post.date[language]}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900 font-display mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title[language]}</h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed font-sans mb-4 line-clamp-2">{post.excerpt[language]}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-sm text-neutral-600">
                                            <User className="w-4 h-4" />
                                            {post.author}
                                        </span>
                                        <span className="flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                                            {language === 'ID' ? 'Baca' : 'Read'} <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </section>
        </div>
    );
}
