import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft, CheckCircle2, DollarSign, ScrollText } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { useEffect } from 'react';

export default function EventDetail() {
    const { id } = useParams();
    const { language } = useLanguage();
    const t = translations[language];
    const { data, loading, error, getImageUrl } = useStore();

    const event = data?.events?.find(e => e.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-neutral-500">Memuat detail event...</p>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4">Event Not Found</h2>
                    <Link to="/events" className="text-primary hover:underline">Back to Events</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-background pb-20">
            {/* Header/Hero */}
            <div className="container mx-auto px-6 mb-12">
                <Link to="/events" className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary mb-6 transition-colors font-medium text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    {language === 'ID' ? 'Kembali ke Event' : 'Back to Events'}
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative h-[400px] rounded-3xl overflow-hidden shadow-sm"
                >
                    <img
                        src={getImageUrl(event.image)}
                        alt={language === 'EN' && event.title_en ? event.title_en : event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white max-w-4xl">
                        <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-4 shadow-sm border border-white/20 uppercase tracking-wider">
                            {event.status === 'upcoming' ? (language === 'ID' ? 'Akan Datang' : 'Upcoming') : (language === 'ID' ? 'Selesai' : 'Completed')}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 leading-tight">
                            {language === 'EN' && event.title_en ? event.title_en : event.title}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-sm md:text-base font-medium text-white/90">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                {new Date(event.date).toLocaleDateString(language === 'ID' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" />
                                {event.time}
                            </span>
                            <span className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary" />
                                {event.location}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Left Column (Description & Rundown) */}
                    <div className="lg:col-span-2 space-y-12">
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-bold text-neutral-900 mb-6 font-display flex items-center gap-3">
                                <ScrollText className="w-6 h-6 text-primary" />
                                {language === 'ID' ? 'Tentang Acara' : 'About Event'}
                            </h2>
                            <p className="text-neutral-600 leading-relaxed text-lg whitespace-pre-line">
                                {language === 'EN' && event.full_description_en ? event.full_description_en : (event.fullDescription || event.full_description)}
                            </p>
                        </motion.section>

                        {(event.rundown?.length > 0) && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl font-bold text-neutral-900 mb-6 font-display">
                                    {language === 'ID' ? 'Susunan Acara' : 'Event Rundown'}
                                </h2>
                                <div className="space-y-4">
                                    {event.rundown.map((item, index) => (
                                        <div key={index} className="flex gap-6 p-4 rounded-xl border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-50 transition-colors">
                                            <div className="w-32 flex-shrink-0 font-bold text-neutral-900 pt-1">
                                                {item.time}
                                            </div>
                                            <div className="flex-grow text-neutral-600">
                                                {language === 'ID' ? item.activity : item.activityEN}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </div>

                    {/* Right Column (Requirements & CTA) */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm sticky top-32"
                        >
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-neutral-900 mb-4 font-display">
                                    {language === 'ID' ? 'Info Partisipasi' : 'Participation Info'}
                                </h3>
                                {(event.price || event.priceEN) ? (
                                    <div className="flex items-center gap-2 text-2xl font-bold text-primary mb-1">
                                        <DollarSign className="w-6 h-6" />
                                        {language === 'ID' ? event.price : event.price_en || event.price}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-2xl font-bold text-primary mb-1">
                                        {language === 'ID' ? 'Gratis' : 'Free'}
                                    </div>
                                )}
                                <p className="text-xs text-neutral-500">
                                    {language === 'ID' ? 'Per orang' : 'Per person'}
                                </p>
                            </div>

                            {(event.requirements?.length > 0 || event.requirementsEN?.length > 0) && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-neutral-900 mb-4 font-display">
                                        {language === 'ID' ? 'Persyaratan' : 'Requirements'}
                                    </h3>
                                    <ul className="space-y-3">
                                        {language === 'ID'
                                            ? event.requirements?.map((req, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                                                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                    {req}
                                                </li>
                                            ))
                                            : event.requirementsEN?.map((req, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                                                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                    {req}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            )}

                            <a
                                href="/contact"
                                className="block w-full bg-neutral-900 text-white text-center py-4 rounded-xl font-bold hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/10"
                            >
                                {language === 'ID' ? 'Daftar Sekarang' : 'Register Now'}
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
