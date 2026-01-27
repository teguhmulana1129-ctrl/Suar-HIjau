
import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '../data/mockData';

export default function Team() {
    return (
        <div className="pt-24 min-h-screen bg-background pb-20">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 font-sans">Kekuatan Kami</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8">Tim Suar Hijau</h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-sans leading-relaxed">
                        Kami adalah gabungan ilmuwan, ahli pertanian, dan visioner yang berdedikasi membangun masa depan pangan yang lebih baik.
                    </p>
                </motion.div>
            </section>

            {/* Team Grid */}
            <section className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {TEAM_MEMBERS.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-100"
                        >
                            <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">{member.role}</p>
                                <h3 className="text-xl font-bold text-neutral-900 font-display mb-3">{member.name}</h3>
                                <p className="text-neutral-500 text-sm leading-relaxed font-sans">{member.bio}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
