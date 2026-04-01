import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Leaf, Package, Award, CheckCircle2, X, MessageCircle, Eye } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Products() {
    const { language } = useLanguage();
    const t = translations[language];

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeFilter, setActiveFilter] = useState('Semua');
    const location = useLocation();

    const { data, loading, error, getImageUrl } = useStore();

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedProduct]);

    // Parse URL search params for 'open'
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const openProduct = params.get('open');
        if (openProduct && data.products) {
            const found = data.products.find(p => p.title === openProduct || p.titleEN === openProduct);
            if (found) {
                setSelectedProduct(found);
                // Scroll to the product element
                setTimeout(() => {
                    const element = document.getElementById(`product-${found.id}`);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            }
        }
    }, [location.search, data.products]);

    // Format PRODUCTS from backend (which doesn't have features/craftTime by default in schema)
    const PRODUCTS_DETAILED = data.products.map((product, idx) => {
        const title = language === 'EN' && product.title_en ? product.title_en : product.title;
        const category = language === 'EN' && product.category_en ? product.category_en : product.category;
        const description = language === 'EN' && product.description_en ? product.description_en : (product.description || product.desc);

        return {
            ...product,
            title,
            category: category || (language === 'ID' ? 'Lainnya' : 'Other'),
            description,
            // Backend overrides
            price: product.price || ['Rp 85.000', 'Rp 45.000', 'Rp 35.000', 'Rp 55.000'][idx] || 'Rp 50.000',
            material: product.material || (language === 'ID' ? '100% Bambu Pilihan' : '100% Premium Bamboo'),
            craftTime: [
                language === 'ID' ? '3-5 hari' : '3-5 days',
                language === 'ID' ? '2-3 hari' : '2-3 days',
                language === 'ID' ? '1-2 hari' : '1-2 days',
                language === 'ID' ? '2-4 hari' : '2-4 days'
            ][idx] || (language === 'ID' ? '2-3 hari' : '2-3 days'),
            size: ['30 x 25 x 15 cm', '20 x 15 x 10 cm', 'Diameter 45 cm', 'Diameter 40 cm'][idx] || '25 x 20 cm',
            weight: ['500g', '200g', '800g', '600g'][idx] || '400g',
            features: language === 'ID'
                ? ['Dibuat handmade oleh pengrajin lokal', 'Material bambu berkualitas tinggi', 'Ramah lingkungan & biodegradable', 'Desain tradisional autentik']
                : ['Handmade by local artisans', 'High-quality bamboo material', 'Eco-friendly & biodegradable', 'Authentic traditional design'],
            stock: product.stock || 'Tersedia',
        };
    });

    const categories = language === 'ID'
        ? ['Semua', 'Wadah', 'Kemasan', 'Aksesoris', 'Peralatan']
        : ['All', 'Container', 'Packaging', 'Accessories', 'Tools'];

    const filteredProducts = (activeFilter === 'Semua' || activeFilter === 'All')
        ? PRODUCTS_DETAILED
        : PRODUCTS_DETAILED.filter(p => p.category === activeFilter);

    const stats = [
        { value: '100+', label: language === 'ID' ? 'Produk' : 'Products', icon: Package },
        { value: '50+', label: language === 'ID' ? 'Pengrajin' : 'Artisans', icon: Award },
        { value: '100%', label: language === 'ID' ? 'Organik' : 'Organic', icon: Leaf },
    ];

    return (
        <div className="pt-24 min-h-screen bg-[#fafafa] pb-20">
            {/* Subtle Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-primary/[0.03] to-transparent rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <section className="relative z-10 max-w-screen-xl mx-auto px-6 mb-12">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-xl"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-8 bg-neutral-900" />
                            <span className="text-xs font-semibold text-primary uppercase tracking-widest">{language === 'ID' ? 'Katalog' : 'Catalogue'}</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 font-display tracking-tight mb-4">
                            {t.nav.products}
                        </h1>
                        <p className="text-neutral-600">
                            {language === 'ID' ? 'Kerajinan bambu berkualitas dari pengrajin lokal.' : 'High-quality bamboo crafts from local artisans.'}
                        </p>
                    </motion.div>

                    {/* Stats - Compact */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-6"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <stat.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                                <div className="text-xl font-bold text-neutral-900">{stat.value}</div>
                                <div className="text-xs text-neutral-500">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Filter Tabs - Compact */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 mt-8"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                activeFilter === cat
                                    ? "bg-neutral-900 text-white"
                                    : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>
            </section>

            {/* Products Grid - Compact 3 Column */}
            <section className="relative z-10 max-w-screen-xl mx-auto px-6">
                {loading && <p className="text-center text-neutral-500 py-10">Memuat produk...</p>}
                {error && <p className="text-center text-red-500 text-sm py-10">Gagal memuat produk: {error}</p>}
                {!loading && !error && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                id={`product-${product.id}`}
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-100"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={getImageUrl(product.image)}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full">
                                            {product.category}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <span className={cn(
                                            "text-xs font-semibold px-2.5 py-1 rounded-full",
                                            product.stock === 'Tersedia'
                                                ? "bg-green-500 text-white"
                                                : "bg-yellow-500 text-white"
                                        )}>
                                            {product.stock}
                                        </span>
                                    </div>
                                    {/* Quick View Overlay */}
                                    <div
                                        onClick={() => setSelectedProduct(product)}
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                    >
                                        <span className="flex items-center gap-2 bg-white text-neutral-900 px-4 py-2 rounded-full text-sm font-semibold">
                                            <Eye className="w-4 h-4" />
                                            {language === 'ID' ? 'Lihat Detail' : 'View Details'}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-bold text-neutral-900 mb-1 ">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-neutral-500 line-clamp-2 mb-3">
                                        {product.description}
                                    </p>

                                    {/* Price & Size */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-lg font-bold text-neutral-900 ">{product.price}</span>
                                        <span className="text-xs text-neutral-400">{language === 'ID' ? 'Ukuran' : 'Size'} {product.size}</span>
                                    </div>

                                    {/* CTA */}
                                    <a
                                        href={`https://wa.me/081314838361?text=Halo, saya tertarik dengan produk ${product.title}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-neutral-800 transition-colors"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>{language === 'ID' ? 'Pesan' : 'Order'}</span>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* CTA Section - Compact */}
            <section className="relative z-10 max-w-screen-xl mx-auto px-6 mt-16">
                <div className="bg-primary rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white font-display mb-2">
                            {language === 'ID' ? 'Butuh Pesanan Custom?' : 'Need Custom Order?'}
                        </h2>
                        <p className="text-white/70">
                            {language === 'ID' ? 'Kami melayani pesanan khusus untuk bisnis dan acara.' : 'We serve special orders for businesses and events.'}
                        </p>
                    </div>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors whitespace-nowrap"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span>{t.nav.contactUs || t.nav.contact}</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-3xl max-h-[90vh] overflow-auto bg-white rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close */}
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-white/90 rounded-full shadow-lg hover:bg-neutral-100"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="grid md:grid-cols-2">
                                {/* Image */}
                                <div className="relative h-64 md:h-auto">
                                    <img
                                        src={getImageUrl(selectedProduct.image)}
                                        alt={selectedProduct.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="bg-white/90 backdrop-blur-sm text-sm font-semibold px-3 py-1 rounded-full">
                                            {selectedProduct.category}
                                        </span>
                                        <span className={cn(
                                            "text-sm font-semibold px-3 py-1 rounded-full",
                                            selectedProduct.stock === 'Tersedia'
                                                ? "bg-green-500 text-white"
                                                : "bg-yellow-500 text-white"
                                        )}>
                                            {selectedProduct.stock}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8">
                                    <h2 className="text-2xl font-bold text-neutral-900 font-display mb-2">
                                        {selectedProduct.title_en && language === 'EN' ? selectedProduct.title_en : selectedProduct.title}
                                    </h2>
                                    <p className="text-neutral-600 mb-4">
                                        {selectedProduct.description_en && language === 'EN' ? selectedProduct.description_en : (selectedProduct.description || selectedProduct.desc)}
                                    </p>
                                    <div className="text-2xl font-bold text-primary mb-6">
                                        {selectedProduct.price}
                                    </div>

                                    {/* Specs */}
                                    <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-neutral-50 rounded-xl text-sm">
                                        <div>
                                            <p className="text-xs text-neutral-500 mb-0.5">{language === 'ID' ? 'Material' : 'Material'}</p>
                                            <p className="font-semibold">{selectedProduct.material}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 mb-0.5">{language === 'ID' ? 'Ukuran' : 'Size'}</p>
                                            <p className="font-semibold">{selectedProduct.size}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 mb-0.5">{language === 'ID' ? 'Berat' : 'Weight'}</p>
                                            <p className="font-semibold">{selectedProduct.weight}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 mb-0.5">{language === 'ID' ? 'Pengerjaan' : 'Crafting Time'}</p>
                                            <p className="font-semibold">{selectedProduct.craftTime}</p>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-sm mb-2">{language === 'ID' ? 'Keunggulan:' : 'Advantages:'}</h4>
                                        <ul className="space-y-1.5">
                                            {selectedProduct.features.map((f, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA */}
                                    <a
                                        href={`https://wa.me/081314388361?text=Halo, saya tertarik dengan ${selectedProduct.title}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-colors"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>{language === 'ID' ? 'Pesan via WhatsApp' : 'Order via WhatsApp'}</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
