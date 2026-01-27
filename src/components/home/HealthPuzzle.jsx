import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import { cn } from '../../lib/utils';
import bambooBottom from '../../assets/bamboo_bottom.webp';

export default function HealthPuzzle() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = PRODUCTS.length;
    const slidesPerView = typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1;
    const maxIndex = Math.max(0, totalSlides - slidesPerView);

    const nextSlide = () => setCurrentSlide(prev => (prev >= maxIndex ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide(prev => (prev <= 0 ? maxIndex : prev - 1));

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [maxIndex]);

    return (
        <section id="health-puzzle" className="relative min-h-screen w-full overflow-hidden bg-white">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0 flex flex-col pointer-events-none">
                <div className="h-1/2 w-full bg-white" />
                <div className="h-1/2 w-full relative">
                    <img
                        src={bambooBottom}
                        alt="Nature BG"
                        className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
            </div>

            <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-10 py-20 lg:py-12 h-full flex flex-col pt-8 md:pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">


                    {/* Left Content */}
                    <div className="flex flex-col pt-8 md:pt-32">
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold mb-6 font-sans">
                            Katalog Kami
                        </p>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 mb-8 leading-[1.1] font-display">
                            Produk Unggulan.
                        </h2>
                        <p className="text-neutral-600 leading-relaxed font-medium max-w-xl font-sans">
                            Tubuh Anda – 40 triliun sel. Setiap membran dibangun dari asam lemak. Omega 3, 6, dan 9 dari Amaran adalah bahan bakar sel murni. Melindungi semua sel, mempercepat pembaruan, menghambat penuaan.
                        </p>

                        <div className="mt-14 lg:mt-24">
                            <a href="#contact" className="group inline-flex items-center gap-3 bg-primary text-white rounded-full py-4 px-8 text-sm font-semibold uppercase tracking-wide hover:bg-primary-dark transition-colors shadow-lg hover:shadow-primary/25">
                                <span>Lihat Semua Produk</span>
                                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                    <ArrowRight className="w-3 h-3" />
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Right Slider */}
                    <div className="relative w-full overflow-hidden pt-6 md:pt-32 lg:pt-48 pb-12 px-4">
                        {/* Track */}
                        <motion.div
                            className="flex gap-6 will-change-transform"
                            animate={{ x: `-${currentSlide * (slidesPerView === 1 ? 100 : 50)}%` }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                        >
                            {PRODUCTS.map((product, idx) => (
                                <div
                                    key={idx}
                                    className="flex-shrink-0 w-full md:w-[calc(50%-12px)] h-[450px] bg-white rounded shadow-lg overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                                >
                                    <div className="h-3/5 overflow-hidden relative">
                                        <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                    </div>
                                    <div className="h-2/5 p-6 md:p-8 flex flex-col justify-center bg-white relative z-10">
                                        <h3 className="text-xl font-semibold text-neutral-900 mb-3 tracking-tight">{product.title}</h3>
                                        <p className="text-sm text-neutral-500 leading-relaxed font-medium">{product.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Controls */}
                        <div className="mt-10 flex items-center justify-between px-2">
                            <div className="flex gap-2">
                                {PRODUCTS.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentSlide(Math.min(i, maxIndex))}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            i === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                                        )}
                                    />
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={prevSlide} className="w-12 h-12 flex items-center justify-center bg-white hover:bg-neutral-100 text-neutral-900 rounded-sm shadow-lg transition-colors">
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                                <button onClick={nextSlide} className="w-12 h-12 flex items-center justify-center bg-white hover:bg-neutral-100 text-neutral-900 rounded-sm shadow-lg transition-colors">
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
