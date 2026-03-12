import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Target } from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';

export default function FeaturedPrograms() {
    const { language } = useLanguage();
    const t = translations[language].featuredPrograms;
    const { data, loading, error, getImageUrl } = useStore();

    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesPerView = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);

    const programs = data?.programs || [];
    const maxIndex = Math.max(0, programs.length - slidesPerView);

    const nextSlide = () => setCurrentSlide(prev => (prev >= maxIndex ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide(prev => (prev <= 0 ? maxIndex : prev - 1));

    useEffect(() => {
        const handleResize = () => {
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2">{t.badge}</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-display">{t.title}</h2>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center border border-neutral-200 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center border border-neutral-200 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-colors">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    {loading && <p className="text-center text-neutral-500 py-10">Memuat program...</p>}
                    {error && <p className="text-center text-red-500 text-sm py-10">Gagal memuat program: {error}</p>}

                    {!loading && !error && programs.length > 0 && (
                        <motion.div
                            className="flex gap-6"
                            animate={{ x: `-${currentSlide * (100 / slidesPerView)}%` }}
                            transition={{ ease: "easeInOut", duration: 0.5 }}
                        >
                            {programs.map((program) => (
                                <div
                                    key={program.id}
                                    className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-neutral-100"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={getImageUrl(program.image)}
                                            alt={program.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-dark">
                                            {language === 'ID' ? program.category : program.categoryEN || program.category}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                            {language === 'ID' ? program.title : program.titleEN || program.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-neutral-500 text-sm mb-4">
                                            <MapPin className="w-4 h-4" />
                                            <span>{language === 'ID' ? program.location : program.locationEN || program.location}</span>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">{t.status}</span>
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${program.status === 'completed' ? 'bg-primary/20 text-primary-dark' :
                                                    program.status === 'in-progress' ? 'bg-secondary/20 text-secondary-dark' :
                                                        'bg-neutral-200 text-neutral-700'
                                                    }`}>
                                                    {program.status === 'completed' ? (language === 'ID' ? 'Selesai' : 'Completed') :
                                                        program.status === 'in-progress' ? (language === 'ID' ? 'Berjalan' : 'In Progress') :
                                                            (language === 'ID' ? 'Akan Datang' : 'Upcoming')}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-neutral-600">
                                                <Target className="w-4 h-4 text-secondary" />
                                                <span>{t.target}: {program.target}</span>
                                            </div>
                                            <Link to={`/programs#program-${program.id}`} className="text-primary font-semibold hover:underline">{t.detail}</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
