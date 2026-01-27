
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
    return (
        <div className="pt-24 min-h-screen bg-background pb-20">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 font-sans">Hubungi Kami</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8">Kontak</h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-sans leading-relaxed">
                        Ada pertanyaan atau ingin bermitra? Jangan ragu untuk menghubungi kami.
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
                        <h2 className="text-2xl font-bold text-neutral-900 font-display mb-6">Kirim Pesan</h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        placeholder="Nama Anda"
                                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="email@contoh.com"
                                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-2">Subjek</label>
                                <input
                                    type="text"
                                    placeholder="Subjek pesan Anda"
                                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-neutral-700 mb-2">Pesan</label>
                                <textarea
                                    rows={5}
                                    placeholder="Tulis pesan Anda di sini..."
                                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                            >
                                <Send className="w-4 h-4" />
                                <span>Kirim Pesan</span>
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
                            <h2 className="text-2xl font-bold text-neutral-900 font-display mb-6">Informasi Kontak</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-900 mb-1">Alamat</h3>
                                        <p className="text-neutral-600">Jl. Bambu Hijau No. 123, Desa Sejahtera, Kabupaten Makmur, Jawa Tengah 12345</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-900 mb-1">Telepon</h3>
                                        <p className="text-neutral-600">+62 812 3456 7890</p>
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
                            </div>
                        </div>

                        <div className="bg-primary p-8 rounded-2xl text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <MessageCircle className="w-6 h-6" />
                                <h3 className="text-xl font-bold">Chat via WhatsApp</h3>
                            </div>
                            <p className="text-white/80 mb-6">Respon cepat untuk pertanyaan Anda. Tim kami siap membantu.</p>
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors"
                            >
                                Mulai Chat
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
