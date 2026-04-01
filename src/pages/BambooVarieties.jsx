
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeDeciduous, Info, Ruler, Maximize2, Tag, ChevronRight, Leaf } from 'lucide-react';
import { BAMBOO_VARIETIES } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';

export default function BambooVarieties() {
    const { language } = useLanguage();
    const [selectedId, setSelectedId] = useState(BAMBOO_VARIETIES[0].id);

    const selectedVariety = BAMBOO_VARIETIES.find(v => v.id === selectedId);

    const categories = [...new Set(BAMBOO_VARIETIES.map(v => v.category))];

    return (
        <div className="pt-24 min-h-screen bg-[#fafafa] pb-20 overflow-hidden">
            {/* Header Section */}
            <section className="container mx-auto px-6 mb-16 relative">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="h-px w-12 bg-primary" />
                        <span className="text-sm font-bold text-primary uppercase tracking-widest">
                            {language === 'ID' ? 'Katalog Alam' : 'Nature Catalog'}
                        </span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8"
                    >
                        {language === 'ID' ? 'Varietas Bambu SuaR' : 'SuaR Bamboo Varieties'}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-neutral-600 leading-relaxed"
                    >
                        {language === 'ID'
                            ? 'Bambu bukan sekadar tanaman; ia adalah keajaiban biologis yang memegang kunci kelestarian bumi. SuaR Hijau mengeksplorasi keanekaragaman hayati bambu Indonesia untuk mengembangkan solusi berkelanjutan—dari konstruksi tahan gempa hingga restorasi ekosistem kritis yang memberdayakan masyarakat secara global.'
                            : 'Bamboo is more than just a plant; it is a biological miracle that holds the key to the Earth\'s future sustainability. SuaR Hijau explores the biodiversity of Indonesian bamboo to develop sustainable solutions—from earthquake-resistant construction to critical ecosystem restoration that empowers communities globally.'}
                    </motion.p>
                </div>

                {/* Global Varieties Context Detail Section */}
                <div className="mt-20 bg-neutral-900 rounded-[48px] p-8 md:p-16 text-white relative overflow-hidden">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 max-w-4xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-primary font-bold tracking-widest uppercase text-sm mb-6 block"
                        >
                            {language === 'ID' ? 'Standar Varietas Global' : 'Global Variety Standards'}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-bold mb-8 leading-tight font-display"
                        >
                            {language === 'ID'
                                ? 'Menghubungkan Hutan Indonesia ke Industri Berkelanjutan Dunia'
                                : 'Connecting Indonesian Forests to Global Sustainable Industries'}
                        </motion.h2>
                        <div className="grid md:grid-cols-2 gap-12 text-neutral-400 leading-relaxed text-lg">
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }} rik
                                transition={{ delay: 0.2 }}
                            >
                                {language === 'ID'
                                    ? 'Varietas yang kami kembangkan bukan sekadar koleksi botani, melainkan komoditas strategis yang diakui secara internasional. Setiap rumpun bambu yang dikonservasi SuaR Hijau memenuhi standar teknis global untuk kekuatan struktural, fleksibilitas serat, dan integritas ekologis.'
                                    : 'The varieties we develop are not just botanical collections, but internationally recognized strategic commodities. Every bamboo cluster conserved by SuaR Hijau meets global technical standards for structural strength, fiber flexibility, and ecological integrity.'}
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {language === 'ID'
                                    ? 'Dengan klasifikasi "Baja Hijau", varietas unggul kami kini menjadi solusi utama bagi pasar global yang mencari alternatif rendah karbon—menggantikan plastik dan kayu keras dalam rantai pasok industri konstruksi dan gaya hidup modern di berbagai benua.'
                                    : 'With the "Green Steel" classification, our premium varieties are now the leading solution for global markets seeking low-carbon alternatives—replacing plastics and hardwoods in the construction and modern lifestyle supply chains across continents.'}
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* Repositioned Global Impact Points */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                            <Leaf className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">
                            {language === 'ID' ? 'Penyerap Karbon Efektif' : 'Effective Carbon Sink'}
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                            {language === 'ID'
                                ? 'Varietas raksasa seperti Petung memiliki laju biomassa tertinggi, mampu menyerap hingga 60 ton karbon per hektar per tahun, menjadikannya pilar utama restorasi iklim global.'
                                : 'Giant varieties like Petung have the highest biomass rates, capable of sequestering up to 60 tons of carbon per hectare annually, making them a primary pillar of global climate restoration.'}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                            <TreeDeciduous className="w-6 h-6 text-secondary" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">
                            {language === 'ID' ? 'Konservasi Tanah & Air' : 'Soil & Water Conservation'}
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                            {language === 'ID'
                                ? 'Bambu Jangkar dengan sistem perakaran rimpang yang sangat rapat bertindak sebagai "jangkar" alami bumi, mengunci tanah di lereng curam dan bantaran sungai untuk mencegah banjir serta longsor.'
                                : 'Jangkar bamboo with its extremely dense rhizome root system acts as a natural "anchor" for the earth, locking soil on steep slopes and riverbanks to prevent floods and landslides.'}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white p-8 rounded-[32px] border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-neutral-900/5 flex items-center justify-center mb-6">
                            <Tag className="w-6 h-6 text-neutral-900" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">
                            {language === 'ID' ? 'Ekonomi Sirkular' : 'Circular Economy'}
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                            {language === 'ID'
                                ? 'Melalui varietas Apus untuk anyaman dan Hitam untuk interior premium, bambu menciptakan rantai ekonomi rendah karbon yang menggantikan ketergantungan pada kayu keras dan plastik.'
                                : 'Through Apus varieties for weaving and Black for premium interiors, bamboo creates a low-carbon economic chain that replaces dependency on hardwoods and plastics.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Introductory Text Section */}
            <section className="container mx-auto px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 border-b-2 border-primary/20 pb-4 inline-block">
                        {language === 'ID'
                            ? 'Berikut Adalah Varietas Bambu Yang Sering Ditemukan Di Indonesia'
                            : 'Common Bamboo Varieties Found in Indonesia'}
                    </h2>
                </motion.div>
            </section>

            {/* Interactive Showcase Section */}
            <section className="container mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Sidebar / List */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm sticky top-32">
                            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
                                {language === 'ID' ? 'Pilih Jenis' : 'Select Type'}
                            </p>
                            <div className="space-y-2">
                                {BAMBOO_VARIETIES.map((variety) => (
                                    <button
                                        key={variety.id}
                                        onClick={() => setSelectedId(variety.id)}
                                        className={cn(
                                            "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group",
                                            selectedId === variety.id
                                                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                                                : "bg-[#fafafa] text-neutral-600 hover:bg-neutral-100"
                                        )}
                                    >
                                        <div className="flex flex-col items-start ml-2">
                                            <span className="font-bold">{variety.name}</span>
                                            <span className={cn(
                                                "text-[10px] italic",
                                                selectedId === variety.id ? "text-white/80" : "text-neutral-400"
                                            )}>
                                                {variety.latinName}
                                            </span>
                                        </div>
                                        <ChevronRight className={cn(
                                            "w-5 h-5 transition-transform duration-300",
                                            selectedId === variety.id ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                        )} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content / Detail */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-[40px] border border-neutral-100 shadow-xl overflow-hidden"
                            >
                                <div className="grid md:grid-cols-2">
                                    {/* Image Side */}
                                    <div className="h-[400px] md:h-auto relative overflow-hidden">
                                        <motion.img
                                            initial={{ scale: 1.1 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.7 }}
                                            src={selectedVariety.image}
                                            alt={selectedVariety.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-8 left-8">
                                            <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-primary shadow-sm">
                                                {selectedVariety.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Info Side */}
                                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                                        <div className="mb-8">
                                            <h2 className="text-3xl font-bold text-neutral-900 mb-2">{selectedVariety.name}</h2>
                                            <p className="text-primary italic font-medium">{selectedVariety.latinName}</p>
                                        </div>

                                        <p className="text-neutral-600 leading-relaxed mb-8">
                                            {language === 'ID' ? selectedVariety.description : selectedVariety.descriptionEN}
                                        </p>

                                        {/* Specs Grid */}
                                        <div className="grid grid-cols-2 gap-6 mb-8 p-6 bg-[#fafafa] rounded-3xl border border-neutral-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                                                    <Maximize2 className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{language === 'ID' ? 'Tinggi' : 'Height'}</p>
                                                    <p className="font-bold text-neutral-900">{selectedVariety.height}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                                                    <Ruler className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Diameter</p>
                                                    <p className="font-bold text-neutral-900">{selectedVariety.diameter}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Usage Tags */}
                                        <div>
                                            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
                                                {language === 'ID' ? 'Pemanfaatan' : 'Common Usage'}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedVariety.usage.map(u => (
                                                    <span key={u} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-medium">
                                                        {u}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

        </div>
    );
}
