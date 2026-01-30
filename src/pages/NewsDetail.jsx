import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { newsData } from '../data/newsData';

export default function NewsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();

    // Find post by ID (convert id to number as params returns string)
    const post = newsData.find(p => p.id === parseInt(id));

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                        {language === 'ID' ? 'Berita tidak ditemukan' : 'News not found'}
                    </h2>
                    <button
                        onClick={() => navigate('/news')}
                        className="text-primary hover:underline font-semibold"
                    >
                        {language === 'ID' ? 'Kembali ke Berita' : 'Back to News'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <article className="pt-28 pb-20 min-h-screen bg-white">
            {/* Hero Image */}
            <div className="container mx-auto px-6 mb-10">
                <Link
                    to="/news"
                    className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors mb-6 font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {language === 'ID' ? 'Kembali' : 'Back'}
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-neutral-100 mb-8">
                        <img
                            src={post.image}
                            alt={post.title[language]}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                                {post.category[language]}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {post.date[language]}
                            </span>
                            <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {post.author}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 font-display mb-8 leading-tight">
                            {post.title[language]}
                        </h1>

                        <div
                            className="prose prose-lg prose-neutral max-w-none font-sans leading-relaxed text-neutral-600
                                prose-headings:font-display prose-headings:font-bold prose-headings:text-neutral-900
                                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                prose-img:rounded-xl prose-img:shadow-sm"
                            dangerouslySetInnerHTML={{ __html: post.content[language] }}
                        />

                        {/* Share Section - Optional */}
                        <div className="mt-12 pt-8 border-t border-neutral-100 flex items-center justify-between">
                            <p className="font-semibold text-neutral-900">
                                {language === 'ID' ? 'Bagikan artikel ini:' : 'Share this article:'}
                            </p>
                            <div className="flex gap-4">
                                <button className="p-2 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                {/* Add more social buttons as needed */}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </article>
    );
}
