
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';

export default function Products() {
    return (
        <div className="pt-24 min-h-screen bg-background pb-20">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 font-sans">Katalog</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8">Produk Kami</h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-sans leading-relaxed">
                        Koleksi produk anyaman bambu berkualitas tinggi, dibuat dengan teknik tradisional oleh pengrajin lokal.
                    </p>
                </motion.div>
            </section>

            {/* Products Grid */}
            <section className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.map((product, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-neutral-100"
                        >
                            <div className="aspect-square overflow-hidden bg-neutral-100">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-neutral-900 font-display mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                                <p className="text-neutral-500 text-sm leading-relaxed font-sans mb-4">{product.desc}</p>
                                <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>Pesan Sekarang</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 mt-20">
                <div className="bg-primary/10 rounded-2xl p-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 font-display mb-4">Butuh Pesanan Khusus?</h2>
                    <p className="text-neutral-600 mb-6 max-w-xl mx-auto">
                        Kami melayani pesanan custom untuk kebutuhan bisnis, acara, atau souvenir dalam jumlah besar.
                    </p>
                    <a href="/contact" className="inline-flex bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors">
                        Hubungi Kami
                    </a>
                </div>
            </section>
        </div>
    );
}
