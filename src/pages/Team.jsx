import { motion } from 'framer-motion';
import { useStore } from '../hooks/useStore';

import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Team() {
    const { language } = useLanguage();
    const t = translations[language];
    const { data, loading, error, getImageUrl } = useStore();

    return (
        <div className="pt-24 min-h-screen bg-background pb-20">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 font-sans">{language === 'ID' ? 'Kekuatan Kami' : 'Our Strength'}</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8">{language === 'ID' ? 'Tim SuaR Hijau' : 'SuaR Hijau Team'}</h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-sans leading-relaxed">
                        {language === 'ID' 
                            ? 'Kami adalah gabungan ilmuwan, ahli pertanian, dan visioner yang berdedikasi membangun masa depan pangan yang lebih baik.'
                            : 'We are a combination of scientists, agricultural experts, and visionaries dedicated to building a better food future.'}
                    </p>
                </motion.div>
            </section>

            {/* Team Grid */}
            <section className="container mx-auto px-6">
                {loading && <p className="text-center text-neutral-500">{language === 'ID' ? 'Memuat anggota tim...' : 'Loading team members...'}</p>}
                {error && <p className="text-center text-red-500 text-sm">{language === 'ID' ? 'Gagal memuat tim:' : 'Failed to load team:'} {error}</p>}

                {!loading && !error && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {data.team.map((member, index) => (
                            <motion.div
                                key={member.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-100"
                            >
                                <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
                                    <img
                                        src={getImageUrl(member.image)}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">{language === 'EN' && member.role_en ? member.role_en : member.role}</p>
                                    <h3 className="text-xl font-bold text-neutral-900 font-display mb-3">{member.name}</h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed font-sans">{language === 'EN' && member.bio_en ? member.bio_en : member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
