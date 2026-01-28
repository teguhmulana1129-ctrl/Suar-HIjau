
import { ArrowRight, Mail } from 'lucide-react';

export default function Newsletter() {
    const marqueeText = "SUAR HIJAU • KONSERVASI BAMBU • PEMBERDAYAAN UMKM • BERKELANJUTAN • ";

    return (
        <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/20 to-primary/20 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
                    <div className="md:w-1/2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary-light text-sm font-semibold mb-6">
                            <Mail className="w-4 h-4" />
                            <span>Tetap Terhubung</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight mb-4">
                            Bergabung dengan Komunitas Kami
                        </h2>
                        <p className="text-neutral-400 text-lg font-sans max-w-md">
                            Dapatkan informasi terbaru tentang program konservasi, produk baru, dan tips gaya hidup berkelanjutan.
                        </p>
                    </div>

                    <div className="md:w-1/2 max-w-md">
                        <form className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Alamat Email Anda"
                                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            />
                            <button className="bg-primary text-white font-semibold rounded-full px-8 py-4 hover:bg-primary-light transition-colors flex items-center justify-center gap-2 group ring-offset-2 ring-offset-neutral-900 focus:ring-2 focus:ring-white">
                                <span>Langganan</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                        <p className="text-xs text-neutral-500 mt-4">
                            Kami menghargai privasi Anda. Berhenti berlangganan kapan saja.
                        </p>
                    </div>
                </div>
            </div>

            {/* Text Marquee */}
            <div className="mt-16 border-t border-white/10 pt-8 select-none overflow-hidden">
                <div className="animate-marquee whitespace-nowrap flex">
                    <span className="text-6xl md:text-8xl font-bold text-white/5 font-display tracking-tight mx-4">
                        {marqueeText}{marqueeText}{marqueeText}{marqueeText}
                    </span>
                </div>
            </div>

            {/* Marquee Animation Styles */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </section>
    );
}
