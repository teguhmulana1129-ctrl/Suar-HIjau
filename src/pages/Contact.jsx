
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
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8">{language === 'ID' ? 'Alamat Suar' : 'Suar Address'}</h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-sans leading-relaxed">
                        {language === 'ID'
                            ? 'Ada pertanyaan atau ingin bermitra? Jangan ragu untuk menghubungi kami.'
                            : 'Have questions or want to partner? Don\'t hesitate to contact us.'}
                    </p>
                </motion.div>
            </section>

            <section className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100"
                    >
                        <h2 className="text-2xl font-bold text-neutral-900 font-display mb-6">{language === 'ID' ? 'Kirim Pesan' : 'Send Message'}</h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
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
                                    rows={5}
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

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                            <h2 className="text-2xl font-bold text-neutral-900 font-display mb-6">{language === 'ID' ? 'Informasi Alamat Suar' : 'Suar Address Info'}</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-900 mb-1">{language === 'ID' ? 'Alamat' : 'Address'}</h3>
                                        <p className="text-neutral-600">{language === 'ID' ? 'Gedung Hj. Enong Jl. Pangeran Hidayatullah (Lingkar Dalam Utara) Kelurahan Banua Anyar, Kecamatan Banjarmasin Timur Kota Banjarmasin, Kalimantan Selatan.' : 'Hj. Enong Building, Jl. Pangeran Hidayatullah (North Inner Ring Road), Banua Anyar, East Banjarmasin, Banjarmasin City, South Kalimantan.'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-900 mb-1">{language === 'ID' ? 'Telepon' : 'Phone'}</h3>
                                        <p className="text-neutral-600">(0511) 3256089</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                                        <p className="text-neutral-600">info@suarhijau.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Instagram className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-900 mb-1">Instagram</h3>
                                        <a href="https://instagram.com/suarindonesia.official" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-primary transition-colors">@suarindonesia.official</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary p-8 rounded-2xl text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <MessageCircle className="w-6 h-6" />
                                <h3 className="text-xl font-bold">{language === 'ID' ? 'Chat via WhatsApp' : 'Chat via WhatsApp'}</h3>
                            </div>
                            <p className="text-white/80 mb-6">{language === 'ID' ? 'Respon cepat untuk pertanyaan Anda. Tim kami siap membantu.' : 'Fast response for your questions. Our team is ready to help.'}</p>
                            <a
                                href="https://wa.me/05113256089"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors"
                            >
                                {language === 'ID' ? 'Mulai Chat' : 'Start Chat'}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
