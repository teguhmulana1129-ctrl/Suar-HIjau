import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Events() {
    const { language } = useLanguage();
    const t = translations[language];
    const { data, loading, error, getImageUrl } = useStore();

    // Helper to format date
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(language === 'ID' ? 'id-ID' : 'en-US', options);
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
                        {language === 'ID' ? 'Event Kami' : 'Our Agenda'}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8">
                        {language === 'ID' ? 'Kalender Kegiatan' : 'Event Calendar'}
                    </h1>
                </motion.div>
            </section>

            {/* Events List */}
            <section className="container mx-auto px-6">
                {loading && <p className="text-center text-neutral-500">Memuat event...</p>}
                {error && <p className="text-center text-red-500 text-sm">Gagal memuat event: {error}</p>}

                {!loading && !error && (
                    <div className="space-y-8 max-w-5xl mx-auto">
                        {data.events.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 ${event.status === 'completed'
                                    ? 'grayscale opacity-70 cursor-default pointer-events-none'
                                    : 'hover:shadow-lg transition-all duration-300 group'
                                    }`}
                            >
                                <Link to={`/events/${event.id}`} className="flex flex-col md:flex-row h-full">
                                    {/* Date Card (Left/Top) - Styled to match brand */}
                                    <div className="bg-neutral-50 p-6 md:w-32 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-neutral-100 shrink-0 group-hover:bg-primary/5 transition-colors">
                                        <span className="text-4xl font-bold text-primary block font-display">
                                            {new Date(event.date).getDate()}
                                        </span>
                                        <span className="text-sm font-bold text-neutral-900 uppercase tracking-wider mt-1">
                                            {new Date(event.date).toLocaleDateString(language === 'ID' ? 'id-ID' : 'en-US', { month: 'short' })}
                                        </span>
                                        <span className="text-xs text-neutral-500 mt-1 font-medium">
                                            {new Date(event.date).getFullYear()}
                                        </span>
                                    </div>

                                    {/* Image */}
                                    <div className="h-48 md:h-auto md:w-72 overflow-hidden relative shrink-0">
                                        <img
                                            src={getImageUrl(event.image)}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className={`backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-white/20 ${event.status === 'upcoming'
                                                ? 'bg-primary/90 text-white'
                                                : 'bg-neutral-900/90 text-white'
                                                }`}>
                                                {event.status === 'upcoming' ? (language === 'ID' ? 'Akan Datang' : 'Upcoming') : (language === 'ID' ? 'Selesai' : 'Completed')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                                        <h3 className="text-2xl font-bold text-neutral-900 mb-3 font-display group-hover:text-primary transition-colors">
                                            {language === 'EN' && event.title_en ? event.title_en : event.title}
                                        </h3>

                                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-4 text-sm text-neutral-600">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-primary" />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-primary" />
                                                <span>{language === 'EN' && event.location_en ? event.location_en : event.location}</span>
                                            </div>
                                        </div>

                                        <p className="text-neutral-600 leading-relaxed mb-6 line-clamp-2">
                                            {language === 'EN' && event.description_en ? event.description_en : event.description}
                                        </p>

                                        <span className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide group-hover:gap-3 transition-all mt-auto">
                                            {language === 'ID' ? 'Lihat Detail' : 'View Details'} <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

