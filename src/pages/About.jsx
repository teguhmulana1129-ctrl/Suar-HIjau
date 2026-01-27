
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="pt-24 min-h-screen bg-background pb-20">
            {/* Header */}
            <section className="container mx-auto px-6 mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 font-sans">Identitas Kami</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8">Tentang Suar Hijau</h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-sans leading-relaxed">
                        Kami adalah pelopor dalam budidaya dan pemanfaatan tanaman Amaran (Amaranth) untuk solusi pangan masa depan yang berkelanjutan dan menyehatkan.
                    </p>
                </motion.div>
            </section>

            {/* Mission & Vision */}
            <section className="container mx-auto px-6 mb-24">
                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 rounded-2xl shadow-sm border border-neutral-100"
                    >
                        <h2 className="text-3xl font-bold text-primary mb-6 font-display">Visi Kami</h2>
                        <p className="text-neutral-700 leading-loose text-lg font-sans">
                            Menjadi pemimpin global dalam revolusi pangan hijau melalui inovasi Amaran, menciptakan ekosistem yang mensejahterakan petani, memulihkan bumi, dan menyehatkan generasi masa depan.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-primary p-10 rounded-2xl shadow-lg shadow-primary/20 text-white"
                    >
                        <h2 className="text-3xl font-bold mb-6 font-display">Misi Kami</h2>
                        <ul className="space-y-4 font-sans text-lg">
                            <li className="flex items-start gap-3">
                                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full flex-shrink-0" />
                                <span>Mengembangkan varietas Amaran unggul melalui riset berkelanjutan.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full flex-shrink-0" />
                                <span>Memberdayakan komunitas petani dengan teknologi ramah lingkungan.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1.5 w-2 h-2 bg-secondary rounded-full flex-shrink-0" />
                                <span>Menyediakan produk pangan bernutrisi tinggi yang terjangkau.</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Values / History Placeholder */}
            <section className="container mx-auto px-6">
                <div className="bg-neutral-900 rounded-3xl overflow-hidden relative py-20 px-8 text-center text-white">
                    <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1260')] bg-cover bg-center opacity-20" />
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold font-display mb-8">Warisan 20 Tahun Inovasi</h2>
                        <p className="text-lg md:text-xl text-neutral-300 font-sans leading-relaxed mb-10">
                            Dimulai dari sebuah lahan percobaan kecil di kaki gunung, kini Suar Hijau telah berkembang menjadi gerakan nasional yang melibatkan ribuan petani dan ilmuwan. Perjalanan kami baru saja dimulai.
                        </p>
                        <button className="bg-white text-neutral-900 font-semibold px-8 py-3 rounded-full hover:bg-neutral-200 transition-colors">
                            Baca Sejarah Lengkap
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
