
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Target } from 'lucide-react';
import { PROGRAMS } from '../../data/mockData';
import { cn } from '../../lib/utils';

export default function FeaturedPrograms() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesPerView = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
    const maxIndex = Math.max(0, PROGRAMS.length - slidesPerView);

    const nextSlide = () => setCurrentSlide(prev => (prev >= maxIndex ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide(prev => (prev <= 0 ? maxIndex : prev - 1));

    useEffect(() => {
        const handleResize = () => {
            // In a real app we might want to debounce this or use a proper hook
            // For now relies on component re-render on resize if we used window width in state/render
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2">Program Konservasi</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-display">Aksi Nyata Untuk Bumi</h2>
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
                    <motion.div
                        className="flex gap-6"
                        animate={{ x: `-${currentSlide * (100 / slidesPerView)}%` }}
                        transition={{ ease: "easeInOut", duration: 0.5 }}
                    >
                        {PROGRAMS.map((program) => (
                            <div
                                key={program.id}
                                className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-neutral-100"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={program.image}
                                        alt={program.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-dark">
                                        {program.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">{program.title}</h3>

                                    <div className="flex items-center gap-2 text-neutral-500 text-sm mb-4">
                                        <MapPin className="w-4 h-4" />
                                        <span>{program.location}</span>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs font-semibold mb-1">
                                            <span className="text-neutral-600">Progress</span>
                                            <span className="text-primary">{program.progress}%</span>
                                        </div>
                                        <div className="w-full bg-neutral-100 rounded-full h-2">
                                            <div
                                                className="bg-primary h-2 rounded-full transition-all duration-1000"
                                                style={{ width: `${program.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-neutral-600">
                                            <Target className="w-4 h-4 text-secondary" />
                                            <span>Target: {program.target}</span>
                                        </div>
                                        <button className="text-primary font-semibold hover:underline">Detail</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
