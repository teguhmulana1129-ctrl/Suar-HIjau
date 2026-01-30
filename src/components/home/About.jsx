import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import bambooAbout from '../../assets/bamboo_hero_high_res.png';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';

const FadeIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

export default function About() {
    const { language } = useLanguage();
    const t = translations[language].about;

    return (
        <section id="about" className="relative bg-white py-20 lg:py-32 z-10 overflow-hidden scroll-mt-32">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Image Column */}
                    <FadeIn className="relative order-2 lg:order-1">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 relative z-10">
                            <img
                                src={bambooAbout}
                                alt="Hutan Bambu Suar Hijau"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay Card */}
                            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">{t.impactBadge}</p>
                                        <p className="font-bold text-neutral-900">{t.impactTitle}</p>
                                    </div>
                                </div>
                                <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="w-[75%] h-full bg-primary rounded-full" />
                                </div>
                                <div className="flex justify-between mt-2 text-xs font-medium text-neutral-500">
                                    <span>{t.impactTarget}</span>
                                    <span>75% {t.impactAchieved}</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Background */}
                        <div className="absolute -top-10 -left-10 w-full h-full border-2 border-neutral-100 rounded-3xl -z-10" />
                    </FadeIn>

                    {/* Content Column */}
                    <FadeIn delay={0.2} className="lg:pr-10 order-1 lg:order-2">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-px bg-primary" />
                            <span className="text-sm font-bold text-primary uppercase tracking-widest">{t.badge}</span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-neutral-900 leading-[1.1] mb-8" dangerouslySetInnerHTML={{ __html: t.title.replace('Ekonomi Lokal', '<span class="text-primary">Ekonomi Lokal</span>').replace('Local Economy', '<span class="text-primary">Local Economy</span>') }}>
                        </h2>

                        <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                            {t.desc}
                        </p>

                        <div className="space-y-6 mb-10">
                            {t.features.map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-neutral-900 text-lg">{item.title}</h4>
                                        <p className="text-neutral-500 break-words">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/about"
                            className="group inline-flex items-center gap-3 bg-neutral-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-neutral-800 transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                            <span>{t.button}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </FadeIn>

                </div>
            </div>
        </section>
    );
}
