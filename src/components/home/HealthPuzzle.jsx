import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Leaf, Award, Package, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';
import bambooBottom from '../../assets/bamboo_bottom.webp';

export default function HealthPuzzle() {
    const { language } = useLanguage();
    const t = translations[language];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % PRODUCTS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isHovered]);

    const stats = [
        { value: '100+', label: language === 'ID' ? 'Produk' : 'Products', icon: Package },
        { value: '50+', label: language === 'ID' ? 'Pengrajin' : 'Artisans', icon: Award },
        { value: '100%', label: language === 'ID' ? 'Organik' : 'Organic', icon: Leaf },
    ];

    return (
        <section id="products" className="relative py-32 overflow-hidden bg-[#fafafa]">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/[0.03] to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-secondary/[0.03] to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-screen-xl mx-auto px-6">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-12 bg-primary" />
                            <span className="text-sm font-semibold text-primary uppercase tracking-widest">{language === 'ID' ? 'Katalog Produk' : 'Product Catalogue'}</span>
                        </div>
                        <h2 className="text-5xl lg:text-6xl font-bold text-neutral-900 font-display tracking-tight leading-[1.1] mb-6">
                            {language === 'ID' ? 'Karya Tangan' : 'Handcrafted'} <br />
                            <span className="text-primary">{language === 'ID' ? 'Pengrajin Lokal' : 'By Local Artisans'}</span>
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            {language === 'ID'
                                ? 'Setiap anyaman menceritakan kisah tradisi yang dijaga turun-temurun, dipadukan dengan desain kontemporer.'
                                : 'Each weave tells a story of tradition preserved across generations, blended with contemporary design.'}
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-8"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                                <div className="text-3xl font-bold text-neutral-900">{stat.value}</div>
                                <div className="text-sm text-neutral-500">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Bento Grid Layout */}
                <div
                    className="grid grid-cols-12 gap-4 lg:gap-6"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Main Featured Product - Large Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="col-span-12 lg:col-span-7 row-span-2"
                    >
                        <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden group cursor-pointer bg-neutral-900">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeIndex}
                                    src={PRODUCTS[activeIndex].image}
                                    alt={PRODUCTS[activeIndex].title}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-80" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-between">
                                {/* Top */}
                                <div className="flex justify-between items-start">
                                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                                        <Sparkles className="w-4 h-4" />
                                        Featured
                                    </span>
                                    <Link
                                        to="/products"
                                        className="w-12 h-12 flex items-center justify-center bg-white text-neutral-900 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                    >
                                        <ArrowUpRight className="w-5 h-5" />
                                    </Link>
                                </div>

                                {/* Bottom */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            {PRODUCTS.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setActiveIndex(i)}
                                                    className={cn(
                                                        "h-1 rounded-full transition-all duration-500",
                                                        i === activeIndex ? "w-8 bg-white" : "w-4 bg-white/30 hover:bg-white/50"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <h3 className="text-3xl lg:text-4xl font-bold text-white font-display mb-3">
                                            {language === 'ID' ? PRODUCTS[activeIndex].title : PRODUCTS[activeIndex].titleEN || PRODUCTS[activeIndex].title}
                                        </h3>
                                        <p className="text-white/70 text-lg max-w-md">
                                            {language === 'ID' ? PRODUCTS[activeIndex].desc : PRODUCTS[activeIndex].descEN || PRODUCTS[activeIndex].desc}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Small Cards */}
                    {PRODUCTS.slice(0, 2).map((product, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * (idx + 1) }}
                            onClick={() => setActiveIndex(idx)}
                            className="col-span-6 lg:col-span-5"
                        >
                            <div className={cn(
                                "relative h-[240px] lg:h-[288px] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500",
                                activeIndex === idx ? "ring-2 ring-primary ring-offset-4 ring-offset-[#fafafa]" : ""
                            )}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h4 className="text-lg font-semibold text-white mb-1">{language === 'ID' ? product.title : product.titleEN || product.title}</h4>
                                    <p className="text-white/60 text-sm line-clamp-1">{language === 'ID' ? product.desc : product.descEN || product.desc}</p>
                                </div>
                                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all border border-white/20">
                                    <ArrowUpRight className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Bottom Row - Remaining Cards */}
                    {PRODUCTS.slice(2).map((product, idx) => (
                        <motion.div
                            key={idx + 2}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * (idx + 3) }}
                            onClick={() => setActiveIndex(idx + 2)}
                            className="col-span-6 lg:col-span-4"
                        >
                            <div className={cn(
                                "relative h-[200px] lg:h-[240px] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500",
                                activeIndex === idx + 2 ? "ring-2 ring-primary ring-offset-4 ring-offset-[#fafafa]" : ""
                            )}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h4 className="text-lg font-semibold text-white mb-1">{language === 'ID' ? product.title : product.titleEN || product.title}</h4>
                                    <p className="text-white/60 text-sm line-clamp-1">{language === 'ID' ? product.desc : product.descEN || product.desc}</p>
                                </div>
                                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all border border-white/20">
                                    <ArrowUpRight className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="col-span-12 lg:col-span-4"
                    >
                        <Link
                            to="/products"
                            className="group flex flex-col justify-center items-center h-[200px] lg:h-[240px] rounded-2xl bg-neutral-900 text-white p-8 hover:bg-neutral-800 transition-colors"
                        >
                            <div className="w-16 h-16 flex items-center justify-center border-2 border-white/20 rounded-full mb-4 group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <span className="text-xl font-semibold mb-2">{language === 'ID' ? 'Lihat Semua' : 'View All'}</span>
                            <span className="text-neutral-400 text-sm">{language === 'ID' ? 'Jelajahi koleksi lengkap' : 'Explore full collection'}</span>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Decorative */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
        </section>
    );
}
