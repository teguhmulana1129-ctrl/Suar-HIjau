
import { motion } from 'framer-motion';
import { MapPin, Target, Users, Calendar, ArrowRight, Leaf, TreeDeciduous, Waves, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../hooks/useStore';

// Map category keywords to icons
const getCategoryIcon = (category) => {
    if (!category) return TreeDeciduous;
    const lower = category.toLowerCase();
    if (lower.includes('konservasi') || lower.includes('conservation') || lower.includes('tanam') || lower.includes('plant')) return TreeDeciduous;
    if (lower.includes('pemberdayaan') || lower.includes('empowerment') || lower.includes('sosial') || lower.includes('social')) return Users;
    if (lower.includes('erosi') || lower.includes('erosion') || lower.includes('sungai') || lower.includes('river')) return Waves;
    if (lower.includes('edukasi') || lower.includes('education') || lower.includes('pendidikan')) return GraduationCap;
    if (lower.includes('wisata') || lower.includes('tourism') || lower.includes('ecotourism')) return MapPin;
    if (lower.includes('mitigasi') || lower.includes('mitigation') || lower.includes('bencana') || lower.includes('disaster')) return TreeDeciduous;
    return Leaf;
};

export default function Programs() {
    const { language } = useLanguage();
    const t = translations[language];
    const { hash } = useLocation();
    const { data: storeData, loading, error, getImageUrl } = useStore();
    const programs = storeData?.programs || [];

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    // Parse impact from JSON string if needed
    const parseImpact = (impact) => {
        if (!impact) return [];
        if (Array.isArray(impact)) return impact;
        try { return JSON.parse(impact); } catch { return []; }
    };

    // Format date for display
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString(language === 'ID' ? 'id-ID' : 'en-US', { month: 'long', year: 'numeric' });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-background pb-20">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 font-sans">
                        {language === 'ID' ? 'Program Konservasi' : 'Conservation Programs'}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8">
                        {language === 'ID' ? 'Aksi Nyata Untuk Bumi' : 'Real Action for the Earth'}
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-sans leading-relaxed">
                        {language === 'ID'
                            ? 'Bergabunglah dengan program konservasi kami untuk menciptakan dampak nyata bagi lingkungan dan masyarakat.'
                            : 'Join our conservation programs to create a real impact for the environment and the community.'}
                    </p>
                </motion.div>
            </section>

            {/* Loading State */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <div className="w-8 h-8 rounded-full border-3 border-primary/20 border-t-primary animate-spin" />
                    <p className="text-neutral-500 text-sm">{language === 'ID' ? 'Memuat program...' : 'Loading programs...'}</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="container mx-auto px-6">
                    <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center border border-red-100">
                        <p className="font-semibold">{language === 'ID' ? 'Gagal memuat data program' : 'Failed to load programs'}</p>
                        <p className="text-sm mt-1 text-red-400">{error}</p>
                    </div>
                </div>
            )}

            {/* Programs Grid */}
            {!loading && !error && (
                <section className="container mx-auto px-6">
                    {programs.length === 0 ? (
                        <div className="text-center py-20 text-neutral-400">
                            <TreeDeciduous className="w-12 h-12 mx-auto mb-4 opacity-40" />
                            <p className="text-lg font-semibold">{language === 'ID' ? 'Belum ada program tersedia' : 'No programs available yet'}</p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {programs.map((program, index) => {
                                const IconComponent = getCategoryIcon(program.category);
                                const impactItems = parseImpact(program.impact);
                                const startDate = program.startDate || program.start_date;
                                const fullDesc = program.fullDescription || program.full_description || '';

                                return (
                                    <motion.article
                                        key={program.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        id={`program-${program.id}`}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100"
                                    >
                                        <div className="grid lg:grid-cols-2">
                                            {/* Image */}
                                            <div className="relative h-72 lg:h-auto overflow-hidden">
                                                {program.image ? (
                                                    <img
                                                        src={getImageUrl(program.image)}
                                                        alt={program.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                                        <TreeDeciduous className="w-16 h-16 text-primary/30" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                <div className="absolute bottom-6 left-6 right-6">
                                                    <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-primary-dark">
                                                        <IconComponent className="w-4 h-4" />
                                                        {language === 'EN' && program.category_en ? program.category_en : program.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-8 lg:p-10">
                                                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {language === 'EN' && program.location_en ? program.location_en : program.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(startDate)}
                                                    </span>
                                                </div>

                                                <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 font-display mb-4">
                                                    {language === 'EN' && program.title_en ? program.title_en : program.title}
                                                </h2>

                                                <p className="text-neutral-600 leading-relaxed mb-6 whitespace-pre-line">
                                                    {language === 'EN' && program.full_description_en ? program.full_description_en : fullDesc}
                                                </p>

                                                {/* Status & Target */}
                                                <div className="mb-6 flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                                                    <div>
                                                        <p className="text-xs text-neutral-500 font-semibold mb-1 uppercase tracking-wider">{language === 'ID' ? 'Target' : 'Target'}</p>
                                                        <p className="text-sm font-bold text-neutral-900">
                                                            {language === 'EN' && program.target_en ? program.target_en : program.target}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs text-neutral-500 font-semibold mb-1 uppercase tracking-wider">{language === 'ID' ? 'Status' : 'Status'}</p>
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

                                                {/* Impact */}
                                                {impactItems.length > 0 && (
                                                    <div className="mb-6">
                                                        <h4 className="font-semibold text-neutral-900 mb-3">{language === 'ID' ? 'Dampak Program:' : 'Program Impact:'}</h4>
                                                        <ul className="grid grid-cols-2 gap-2">
                                                            {impactItems.map((item, i) => (
                                                                <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                                                                    <Leaf className="w-4 h-4 text-primary flex-shrink-0" />
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* CTA */}
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-4 border-t border-neutral-100">
                                                    <span className="flex items-center gap-2 text-xs text-neutral-600">
                                                        <Users className="w-4 h-4" />
                                                        {program.volunteers} Volunteers
                                                    </span>
                                                    <Link
                                                        to="/contact"
                                                        className="sm:ml-auto flex items-center gap-2 bg-neutral-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold hover:bg-neutral-800 hover:scale-105 transition-all duration-300 shadow-sm whitespace-nowrap"
                                                    >
                                                        {language === 'ID' ? 'Gabung Sekarang' : 'Join Now'}
                                                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>
                    )}
                </section>
            )}

            {/* CTA Section */}
            <section className="container mx-auto px-6 mt-20">
                <div className="bg-primary rounded-2xl p-10 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">{language === 'ID' ? 'Ingin Bermitra dengan Kami?' : 'Want to Partner with Us?'}</h2>
                    <p className="text-white/80 mb-6 max-w-xl mx-auto">
                        {language === 'ID'
                            ? 'Kami membuka peluang kerjasama untuk organisasi, perusahaan, dan komunitas yang ingin berkontribusi pada konservasi dan pemberdayaan masyarakat.'
                            : 'We open cooperation opportunities for organizations, companies, and communities that want to contribute to conservation and community empowerment.'}
                    </p>
                    <Link to="/contact" className="inline-flex bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors">
                        {t.nav.contactUs || t.nav.contact}
                    </Link>
                </div>
            </section>
        </div>
    );
}
