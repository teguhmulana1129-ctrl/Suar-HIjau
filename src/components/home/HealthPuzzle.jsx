import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Leaf, Award, Package, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';
import { useStore } from '../../hooks/useStore';

export default function HealthPuzzle() {
    const { language } = useLanguage();
    const t = translations[language];
    const { data: storeData, getImageUrl } = useStore();
    const products = storeData?.products || [];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered || products.length === 0) return;
        const timer = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % products.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isHovered, products.length]);

    if (products.length === 0) {
        return null;
    }

    const currentProduct = products[activeIndex] || products[0];

    const stats = [
        { value: '100+', label: language === 'ID' ? 'Produk' : 'Products', icon: Package },
        { value: '50+', label: language === 'ID' ? 'Pengrajin' : 'Artisans', icon: Award },
        { value: '100%', label: language === 'ID' ? 'Organik' : 'Organic', icon: Leaf },
    ];

    const getTitle = (prod) => {
        if (!prod) return '';
        if (language === 'EN' && prod.title_en) return prod.title_en;
        return prod.title || '';
    };

    const getDesc = (prod) => {
        if (!prod) return '';
        if (language === 'EN' && prod.description_en) return prod.description_en;
        return prod.description || prod.desc || '';
    };

    // Prepare arrays for rendering remaining products (limited to maintain layout)
    const rightColProducts = products.slice(0, 2);
    // Keep layout structure similar. If less than available it may just show less blocks.
    const bottomRowProducts = products.length > 2 ? products.slice(2, 4) : [];

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
                            <span className="text-sm font-semibold text-primary uppercase tracking-widest">{t.productsSection.catalogue}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-900 font-display tracking-tight leading-[1.1] mb-6">
                            {t.productsSection.handcrafted} <br />
                            <span className="text-primary">{t.productsSection.byLocalArtisans}</span>
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            {t.productsSection.weaveStory}
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
                                    src={getImageUrl(currentProduct.image)}
                                    alt={getTitle(currentProduct)}
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
                                        to={`/products?open=${encodeURIComponent(getTitle(currentProduct))}`}
                                        className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white/20"
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
                                            {products.slice(0, 5).map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setActiveIndex(i);
                                                    }}
                                                    className={cn(
                                                        "h-1 rounded-full transition-all duration-500",
                                                        i === activeIndex ? "w-8 bg-white" : "w-4 bg-white/30 hover:bg-white/50"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <h3 className="text-2xl lg:text-4xl font-bold text-white font-display mb-3">
                                            {getTitle(currentProduct)}
                                        </h3>
                                        <p className="text-white/70 text-sm lg:text-lg max-w-md">
                                            {getDesc(currentProduct)}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Small Cards */}
                    {rightColProducts.map((product, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * (idx + 1) }}
                            className="col-span-6 lg:col-span-5"
                        >
                            <Link
                                to={`/products?open=${encodeURIComponent(getTitle(product))}`}
                                className={cn(
                                    "block relative h-[240px] lg:h-[288px] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500",
                                    activeIndex === idx ? "ring-2 ring-primary ring-offset-4 ring-offset-[#fafafa]" : ""
                                )}
                            >
                                <img
                                    src={getImageUrl(product.image)}
                                    alt={getTitle(product)}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-5">
                                    <h4 className="text-sm lg:text-lg font-semibold text-white mb-1 leading-tight">{getTitle(product)}</h4>
                                    <p className="text-white/60 text-xs md:text-sm line-clamp-1 opacity-90">{getDesc(product)}</p>
                                </div>
                                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-20">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Bottom Row - Remaining Cards */}
                    {bottomRowProducts.map((product, idx) => (
                        <motion.div
                            key={idx + 2}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * (idx + 3) }}
                            className="col-span-6 lg:col-span-4"
                        >
                            <Link
                                to={`/products?open=${encodeURIComponent(getTitle(product))}`}
                                className={cn(
                                    "block relative h-[200px] lg:h-[240px] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500",
                                    activeIndex === idx + 2 ? "ring-2 ring-primary ring-offset-4 ring-offset-[#fafafa]" : ""
                                )}
                            >
                                <img
                                    src={getImageUrl(product.image)}
                                    alt={getTitle(product)}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-5">
                                    <h4 className="text-sm lg:text-lg font-semibold text-white mb-1 leading-tight">{getTitle(product)}</h4>
                                    <p className="text-white/60 text-xs md:text-sm line-clamp-1 opacity-90">{getDesc(product)}</p>
                                </div>
                                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 z-20">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className={cn(
                            "col-span-12",
                            (products.length < 3) ? "lg:col-span-5" : "lg:col-span-4"
                        )}
                    >
                        <Link
                            to="/products"
                            className="group flex flex-col justify-center items-center h-[200px] lg:h-[240px] rounded-2xl bg-neutral-900 text-white p-8 hover:bg-neutral-800 transition-colors"
                        >
                            <div className="w-16 h-16 flex items-center justify-center border-2 border-white/20 rounded-full mb-4 group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <span className="text-xl font-semibold mb-2">{t.productsSection.viewAll}</span>
                            <span className="text-neutral-400 text-sm">{t.productsSection.exploreCollection}</span>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Decorative */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
        </section>
    );
}
