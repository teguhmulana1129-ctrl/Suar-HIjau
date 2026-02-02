
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Contact() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <div className="pt-24 min-h-screen bg-background pb-20">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 font-sans">{language === 'ID' ? 'Hubungi Kami' : 'Contact Us'}</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8">{language === 'ID' ? 'Kontak Kami' : 'Contact Us'}</h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-sans leading-relaxed">
                        {language === 'ID'
                            ? 'Ada pertanyaan atau ingin bermitra? Jangan ragu untuk menghubungi kami.'
                            : 'Have questions or want to partner? Don\'t hesitate to contact us.'}
                    </p>
                </motion.div>
            </section>

            <section className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-neutral-100"
                    >
                        <h2 className="text-2xl font-bold text-neutral-900 font-display mb-8 text-center">{language === 'ID' ? 'Kirim Pesan' : 'Send Message'}</h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">{language === 'ID' ? 'Nama Lengkap' : 'Full Name'}</label>
                                    <input
                                        type="text"
                                        placeholder={language === 'ID' ? 'Nama Anda' : 'Your Name'}
                                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-2">{language === 'ID' ? 'Subjek' : 'Subject'}</label>
                                <input
                                    type="text"
                                    placeholder={language === 'ID' ? 'Subjek pesan Anda' : 'Message subject'}
                                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-2">{language === 'ID' ? 'Pesan' : 'Message'}</label>
                                <textarea
                                    rows={6}
                                    placeholder={language === 'ID' ? 'Tulis pesan Anda di sini...' : 'Write your message here...'}
                                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                            >
                                <Send className="w-4 h-4" />
                                <span>{language === 'ID' ? 'Kirim Pesan' : 'Send Message'}</span>
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
