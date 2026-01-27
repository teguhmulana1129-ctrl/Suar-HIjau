import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

export default function About() {
    return (
        <section id="about" className="relative bg-white py-16 lg:py-24 z-10">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">

                    {/* Title Column */}
                    <FadeIn>
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold mb-6">
                            Benih Amaran
                        </p>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[0.95]">
                            Benih Pilihan Sendiri
                        </h2>
                        <div className="mt-10 hidden lg:block w-24 h-0.5 bg-neutral-900" />

                        <div className="mt-8 mb-8 text-xl sm:text-2xl font-medium text-neutral-800 leading-normal">
                            <p>Reproduksi: Elite</p>
                            <p>Daya Tumbuh: 99%</p>
                            <p>Benih Bersertifikat.</p>
                        </div>

                        <a href="#contact" className="group inline-flex items-center gap-3 bg-green-600 text-white rounded-full py-3 px-5 text-sm font-semibold uppercase tracking-wide hover:scale-105 transition-transform shadow-lg hover:shadow-xl">
                            <span>Beli Produk Kami</span>
                            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                <ArrowRight className="w-3 h-3" />
                            </span>
                        </a>
                    </FadeIn>

                    {/* Image Column */}
                    <FadeIn delay={0.2} className="relative aspect-[4/5] rounded-sm overflow-hidden bg-neutral-100">
                        <img
                            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cb0cfc8f-0c7b-4867-9aeb-9cb2823efaf7_1600w.png"
                            alt="Lab"
                            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-6 left-6 flex gap-2 flex-wrap">
                            {['Institut Terkemuka', 'Paten'].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur text-neutral-900 text-[10px] font-bold tracking-widest uppercase shadow-sm rounded-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Text Column */}
                    <FadeIn delay={0.4} className="lg:pl-8 lg:pr-24">
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold mb-7">
                            Deskripsi
                        </p>
                        <div className="w-full h-px bg-neutral-200 mb-2" />
                        <p className="text-sm text-neutral-600 leading-6 text-justify mb-8 font-medium">
                            Amaran adalah tanaman pakan inovatif dengan ketahanan kekeringan tinggi dan kandungan protein tinggi. Sangat ideal untuk pakan seimbang ternak dan unggas. Selain itu, tanaman ini aktif digunakan dalam industri makanan, farmasi, dan kosmetik. Varietas kami mulai aktif digunakan untuk memperluas jangkauan makanan sehat.
                        </p>

                        <a href="#" className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-neutral-900 border-b border-neutral-300 pb-1 hover:border-neutral-900 transition-colors">
                            Selengkapnya
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </FadeIn>

                </div>
            </div>
        </section>
    );
}
