
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { HERO_CARDS, HERO_STATS } from '../../data/mockData';
import bambooHero from '../../assets/bamboo_herosc.webp';

const Counter = ({ from, to, duration = 2 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(from);

    useEffect(() => {
        if (inView) {
            let start = from;
            const end = to;
            const range = end - start;
            const stepTime = Math.abs(Math.floor((duration * 1000) / range));

            let current = start;
            const timer = setInterval(() => {
                current += 1;
                setDisplayValue(current);
                if (current === end) {
                    clearInterval(timer);
                }
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [inView, from, to, duration]);

    return <span ref={ref}>{displayValue}</span>;
}

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

    // Transforms
    const imageWidth = useTransform(smoothProgress, [0, 1], ["100%", "30%"]);
    const imageHeight = useTransform(smoothProgress, [0, 1], ["100%", "70%"]);
    const imageTop = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
    const imageLeft = useTransform(smoothProgress, [0, 1], ["0%", "35%"]);
    const imageRadius = useTransform(smoothProgress, [0, 1], ["0px", "16px"]);
    const overlayOpacity = useTransform(smoothProgress, [0, 0.5], [0.4, 0]);
    const contentOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-[250vh] font-sans">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

                {/* Main Background Image (Shrinking) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        style={{
                            width: imageWidth,
                            height: imageHeight,
                            top: imageTop,
                            left: imageLeft,
                            borderRadius: imageRadius,
                        }}
                        className="absolute overflow-hidden z-10"
                    >
                        <motion.img
                            src={bambooHero}
                            alt="Hero Background"
                            className="w-full h-full object-cover animate-breathe"
                        />
                        <motion.div
                            style={{ opacity: overlayOpacity }}
                            className="absolute inset-0 bg-black/40"
                        />

                        {/* Video Card Text (appears later) */}
                        <motion.div
                            style={{ opacity: useTransform(smoothProgress, [0.3, 0.6], [0, 1]) }}
                            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"
                        />
                        <motion.div
                            style={{ opacity: useTransform(smoothProgress, [0.3, 0.6], [0, 1]) }}
                            className="absolute bottom-6 left-6 text-white z-20"
                        >
                            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold mb-2">Tentang Kami</p>
                            <p className="text-2xl lg:text-3xl font-medium tracking-tight mb-2 font-display">Suar Hijau</p>
                            <p className="text-xs uppercase tracking-widest text-white/80">Pemeran utama dalam budidaya dan riset Amaran</p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Collage Cards */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {HERO_CARDS.map((card, index) => {
                        const xVal = card.direction[0] * 50;
                        const yVal = card.direction[1] * 50;

                        const x = useTransform(smoothProgress, [0.15, 1], [xVal, 0]);
                        const y = useTransform(smoothProgress, [0.15, 1], [yVal, 0]);
                        const opacity = useTransform(smoothProgress, [0.15, 0.5], [0, 1]);
                        const scale = useTransform(smoothProgress, [0.15, 1], [0.8, 1]);

                        let posClass = "";
                        if (index === 0) posClass = "left-3 top-[13%] md:left-[8%] md:top-[8%]";
                        if (index === 1) posClass = "right-3 top-[13%] md:left-[8%] md:top-[50%]";
                        if (index === 2) posClass = "left-3 bottom-[13%] md:right-[8%] md:bottom-[50%]";
                        if (index === 3) posClass = "right-3 bottom-[13%] md:right-[8%] md:bottom-[8%]";

                        return (
                            <motion.article
                                key={index}
                                style={{ x, y, opacity, scale }}
                                className={`absolute w-[calc(50%-1rem)] h-[22%] md:w-[24%] md:h-[38%] rounded-xl overflow-hidden shadow-2xl ${posClass}`}
                            >
                                {index === 1 || index === 2 ? (
                                    <div className="w-full h-full md:h-[65%]">
                                        <img src={card.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <img src={card.image} alt="" className="w-full h-full object-cover" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5">
                                    <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/80 leading-relaxed font-semibold">
                                        {card.title}
                                    </p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                {/* Hero Content Overlay (Initial State) */}
                <motion.div
                    style={{ opacity: contentOpacity }}
                    className="absolute inset-0 flex flex-col z-30 pointer-events-none"
                >
                    {/* Grid Lines */}
                    <div className="absolute inset-0 grid grid-cols-4 opacity-20">
                        <div className="border-r border-white/30" />
                        <div className="border-r border-white/30 hidden md:block" />
                        <div className="border-r border-white/30" />
                        <div />
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center translate-y-8">
                            <h1 className="text-[16vw] md:text-[12vw] lg:text-[9vw] leading-none font-medium text-white tracking-tight mix-blend-overlay animate-fade-up opacity-0 font-display" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                                Suar Hijau
                            </h1>
                            <p className="uppercase text-lg md:text-xl font-semibold text-zinc-50/90 tracking-widest mt-6 md:mt-8 mb-8 animate-fade-up opacity-0" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
                                Konservasi Bambu & Pemberdayaan UMKM Lokal
                            </p>
                            <div className="animate-fade-up opacity-0 pointer-events-auto" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
                                <a href="#about" className="group inline-flex items-center gap-3 bg-primary text-white rounded-full py-4 px-8 text-sm font-semibold uppercase tracking-wide hover:bg-primary-dark transition-colors shadow-lg hover:shadow-primary/25">
                                    <span>Beli Produk Kami</span>
                                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                        <ArrowDown className="w-3 h-3" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats (Live Counter) */}
                    <div className="mt-auto border-t border-white/10 bg-black/30 backdrop-blur-md animate-fade-up opacity-0" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
                        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10 text-white">
                            {HERO_STATS.map((stat, i) => (
                                <div key={i} className="p-6 text-center group hover:bg-white/5 transition-colors duration-300">
                                    <div className="text-3xl lg:text-4xl font-bold mb-1 text-primary">
                                        <Counter from={0} to={stat.number} />{stat.suffix}
                                    </div>
                                    <p className="uppercase text-[10px] tracking-widest font-semibold text-white/70 group-hover:text-white transition-colors">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
