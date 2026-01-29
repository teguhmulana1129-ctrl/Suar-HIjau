
import { motion } from 'framer-motion';
import { TreeDeciduous, Users, CloudRain, Map } from 'lucide-react';
import { IMPACT_STATS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';

const iconMap = {
    Tree: TreeDeciduous,
    Users: Users,
    Cloud: CloudRain,
    Map: Map
};

export default function ImpactPreview() {
    const { language } = useLanguage();
    const t = translations[language].impact;

    const statLabelsMap = {
        "Bambu Ditanam": t.stats.planted,
        "Pengrajin Binaan": t.stats.artisans,
        "Oksigen Dihasilkan": t.stats.oxygen,
        "Lahan Konservasi": t.stats.conservation
    };

    return (
        <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2 font-sans">{t.badge}</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-display mb-6">{t.title}</h2>
                    <p className="text-neutral-600 font-sans">
                        {t.desc}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {IMPACT_STATS.map((stat, index) => {
                        const Icon = iconMap[stat.icon] || TreeDeciduous;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-neutral-100"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-neutral-900 mb-1 font-display">
                                    {stat.value.toLocaleString()}{stat.suffix && <span className="text-lg text-neutral-500 ml-1">{stat.suffix}</span>}
                                </div>
                                <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
                                    {statLabelsMap[stat.label] || stat.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
