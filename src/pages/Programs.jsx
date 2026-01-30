
import { motion } from 'framer-motion';
import { MapPin, Target, Users, Calendar, ArrowRight, Leaf, TreeDeciduous, Waves, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import imgPlanting from '../assets/bamboo_planting_jangkar.jpg';
import imgEmpowerment from '../assets/bamboo_craftsman_empowerment.jpg';
import imgErosion from '../assets/bamboo_river_erosion_mitigation.jpg';
import imgCrafts from '../assets/produk/produk_bakul.webp';
import imgNursery from '../assets/bamboo_nursery.png';
import imgSeeds from '../assets/bamboo_seeds.png';
import imgEducation from '../assets/bamboo_education_session.jpg';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Programs() {
    const { language } = useLanguage();
    const t = translations[language];
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    const PROGRAMS_DETAILED = [
        {
            id: 1,
            title: language === 'ID' ? "Penanaman Bambu Jangkar" : "Jangkar Bamboo Planting",
            category: language === 'ID' ? "Konservasi Hutan" : "Forest Conservation",
            location: language === 'ID' ? "Kediri, Jawa Timur" : "Kediri, East Java",
            progress: 75,
            target: language === 'ID' ? "1000 Pohon" : "1000 Trees",
            current: 750,
            volunteers: 125,
            startDate: language === 'ID' ? "Januari 2025" : "January 2025",
            image: imgPlanting,
            icon: TreeDeciduous,
            description: language === 'ID'
                ? "Program penanaman bambu jangkar untuk memulihkan hutan yang rusak akibat penebangan liar. Bambu jangkar dipilih karena kemampuannya menahan erosi tanah dan menyerap karbon dengan efektif."
                : "A program to plant jangkar bamboo to restore forests damaged by illegal logging. Jangkar bamboo was chosen for its ability to prevent soil erosion and effectively absorb carbon.",
            fullDescription: language === 'ID'
                ? "Program Penanaman Bambu Jangkar adalah inisiatif konservasi unggulan kami yang berfokus pada pemulihan ekosistem hutan di Kediri, Jawa Timur. Bambu jangkar (Gigantochloa apus) dipilih karena pertumbuhannya yang cepat, kemampuan menyerap karbon hingga 12 ton per hektar per tahun, dan fungsinya sebagai penahan erosi tanah.\n\nProgram ini melibatkan masyarakat lokal dalam setiap tahap, mulai dari pembibitan hingga pemeliharaan. Setiap pohon yang ditanam dilengkapi dengan GPS tracking untuk monitoring pertumbuhan dan survival rate."
                : "The Jangkar Bamboo Planting Program is our flagship conservation initiative focusing on restoring forest ecosystems in Kediri, East Java. Jangkar bamboo (Gigantochloa apus) was selected for its rapid growth, ability to absorb up to 12 tons of carbon per hectare per year, and its function as a soil erosion preventer.\n\nThe program involves the local community at every stage, from nursery to maintenance. Each tree planted is equipped with GPS tracking for growth and survival rate monitoring.",
            impact: language === 'ID'
                ? ["750 pohon bambu telah ditanam", "15 hektar lahan terehabilitasi", "9 ton CO2 diserap per tahun", "125 volunteer aktif terlibat"]
                : ["750 bamboo trees planted", "15 hectares of land rehabilitated", "9 tons of CO2 absorbed per year", "125 active volunteers involved"],
            timeline: [
                { phase: language === 'ID' ? "Pembibitan" : "Nursery", status: "completed" },
                { phase: language === 'ID' ? "Penanaman Fase 1" : "Planting Phase 1", status: "completed" },
                { phase: language === 'ID' ? "Penanaman Fase 2" : "Planting Phase 2", status: "in-progress" },
                { phase: language === 'ID' ? "Monitoring" : "Monitoring", status: "upcoming" }
            ]
        },
        {
            id: 2,
            title: language === 'ID' ? "Pemberdayaan Pengrajin Bambu" : "Bamboo Artisan Empowerment",
            category: language === 'ID' ? "Sosial Ekonomi" : "Social Economy",
            location: language === 'ID' ? "Kediri, Jawa Timur" : "Kediri, East Java",
            progress: 45,
            target: language === 'ID' ? "500 Pengrajin" : "500 Artisans",
            current: 225,
            volunteers: 50,
            startDate: language === 'ID' ? "Maret 2025" : "March 2025",
            image: imgEmpowerment,
            icon: Users,
            description: language === 'ID'
                ? "Pelatihan dan pendampingan pengrajin lokal untuk meningkatkan keterampilan dan akses pasar produk anyaman bambu berkualitas tinggi."
                : "Training and mentoring of local artisans to improve skills and market access for high-quality woven bamboo products.",
            fullDescription: language === 'ID'
                ? "Program Pemberdayaan Pengrajin Bambu bertujuan meningkatkan kesejahteraan ekonomi masyarakat lokal di Kediri melalui pelatihan keterampilan anyaman bambu dan akses ke pasar yang lebih luas. Program ini mencakup pelatihan teknik anyaman modern, manajemen usaha kecil, dan pemasaran digital.\n\nSetiap pengrajin yang lulus program mendapatkan sertifikasi dan kesempatan untuk memasarkan produknya melalui platform Suar Hijau, sehingga memperluas jangkauan pasar mereka secara nasional dan internasional."
                : "The Bamboo Artisan Empowerment Program aims to improve the economic welfare of local communities in Kediri through bamboo weaving skills training and access to wider markets. This program includes training in modern weaving techniques, small business management, and digital marketing.\n\nEvery artisan who graduates from the program receives certification and the opportunity to market their products through the Suar Hijau platform, expanding their market reach nationally and internationally.",
            impact: language === 'ID'
                ? ["225 pengrajin telah dilatih", "85% peningkatan pendapatan rata-rata", "50 produk baru dikembangkan", "3 koperasi terbentuk"]
                : ["225 artisans trained", "85% average income increase", "50 new products developed", "3 cooperatives formed"],
            timeline: [
                { phase: language === 'ID' ? "Rekrutmen" : "Recruitment", status: "completed" },
                { phase: language === 'ID' ? "Pelatihan Dasar" : "Basic Training", status: "completed" },
                { phase: language === 'ID' ? "Pelatihan Lanjutan" : "Advanced Training", status: "in-progress" },
                { phase: language === 'ID' ? "Sertifikasi" : "Certification", status: "upcoming" }
            ]
        },
        {
            id: 3,
            title: language === 'ID' ? "Mitigasi Erosi Sungai" : "River Erosion Mitigation",
            category: language === 'ID' ? "Penghijauan" : "Greening",
            location: language === 'ID' ? "Kediri, Jawa Timur" : "Kediri, East Java",
            progress: 90,
            target: language === 'ID' ? "20 Hektar" : "20 Hectares",
            current: 18,
            volunteers: 200,
            startDate: "September 2025",
            image: imgErosion,
            icon: Waves,
            description: language === 'ID'
                ? "Program penanaman bambu di sepanjang bantaran sungai untuk mencegah erosi dan menjaga kestabilan tanah di kawasan Kediri."
                : "Bamboo planting program along riverbanks to prevent erosion and maintain soil stability in the Kediri area.",
            fullDescription: language === 'ID'
                ? "Program Mitigasi Erosi Sungai adalah upaya penghijauan bantaran sungai di Kediri menggunakan bambu Petung dan Apus yang memiliki sistem perakaran kuat. Bambu dipilih karena akarnya yang dapat mengikat tanah hingga kedalaman 2 meter, efektif mencegah longsor dan erosi.\n\nProgram ini melibatkan masyarakat sekitar sungai dalam penanaman dan pemeliharaan bambu. Dengan pendekatan berbasis komunitas, program ini tidak hanya melindungi lingkungan tetapi juga menyediakan sumber bahan baku bagi pengrajin lokal."
                : "The River Erosion Mitigation Program is an effort to green the riverbanks in Kediri using Petung and Apus bamboo, which have strong root systems. Bamboo was chosen because its roots can bind the soil up to a depth of 2 meters, effectively preventing landslides and erosion.\n\nThe program involves the community around the river in planting and maintaining the bamboo. With a community-based approach, this program not only protects the environment but also provides a source of raw materials for local artisans.",
            impact: language === 'ID'
                ? ["18 hektar bantaran sungai terlindungi", "10,000+ rumpun bambu ditanam", "Erosi berkurang 70%", "200 keluarga terlindungi dari banjir"]
                : ["18 hectares of riverbanks protected", "10,000+ bamboo groves planted", "Erosion reduced by 70%", "200 families protected from floods"],
            timeline: [
                { phase: language === 'ID' ? "Survey Lokasi" : "Site Survey", status: "completed" },
                { phase: language === 'ID' ? "Pembibitan" : "Nursery", status: "completed" },
                { phase: language === 'ID' ? "Penanaman" : "Planting", status: "completed" },
                { phase: language === 'ID' ? "Pemeliharaan" : "Maintenance", status: "in-progress" }
            ]
        },
        {
            id: 4,
            title: language === 'ID' ? "Edukasi Pemanfaatan Bambu" : "Bamboo Utilization Education",
            category: language === 'ID' ? "Pendidikan" : "Education",
            location: language === 'ID' ? "Kediri, Jawa Timur" : "Kediri, East Java",
            progress: 30,
            target: language === 'ID' ? "50 Komunitas" : "50 Communities",
            current: 15,
            volunteers: 75,
            startDate: language === 'ID' ? "Februari 2025" : "February 2025",
            image: imgEducation,
            icon: GraduationCap,
            description: language === 'ID'
                ? "Program edukasi tentang pemanfaatan bambu secara berkelanjutan untuk masyarakat dan komunitas di Kediri."
                : "An educational program on sustainable bamboo utilization for communities in Kediri.",
            fullDescription: language === 'ID'
                ? "Program Edukasi Pemanfaatan Bambu adalah inisiatif pendidikan yang menyasar masyarakat dan komunitas di Kediri tentang potensi bambu Petung dan Apus. Program ini mencakup pelatihan budidaya bambu, teknik pemanenan berkelanjutan, dan inovasi produk olahan bambu.\n\nMelalui workshop interaktif dan kunjungan lapangan ke sentra bambu, peserta diajak memahami nilai ekonomi dan ekologis bambu. Setiap komunitas yang berpartisipasi mendapatkan kit pembibitan dan panduan budidaya bambu."
                : "The Bamboo Utilization Education Program is an educational initiative targeting communities in Kediri on the potential of Petung and Apus bamboo. The program includes training on bamboo cultivation, sustainable harvesting techniques, and processed bamboo product innovation.\n\nThrough interactive workshops and field visits to bamboo centers, participants are invited to understand the economic and ecological value of bamboo. Each participating community receives a seedling kit and a bamboo cultivation guide.",
            impact: language === 'ID'
                ? ["15 komunitas sudah terjangkau", "500+ warga teredukasi", "30+ kader lingkungan terlatih", "15 kebun bambu komunitas tercipta"]
                : ["15 communities reached", "500+ citizens educated", "30+ environmental cadres trained", "15 community bamboo gardens created"],
            timeline: [
                { phase: language === 'ID' ? "Pengembangan Materi" : "Content Development", status: "completed" },
                { phase: language === 'ID' ? "Pilot Program" : "Pilot Program", status: "completed" },
                { phase: language === 'ID' ? "Ekspansi Desa" : "Village Expansion", status: "in-progress" },
                { phase: language === 'ID' ? "Program Kabupaten" : "Regency Program", status: "upcoming" }
            ]
        }
    ];

    return (
        <div className="pt-24 min-h-screen bg-background pb-20">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 font-sans">{language === 'ID' ? 'Program Konservasi' : 'Conservation Programs'}</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8">{language === 'ID' ? 'Aksi Nyata Untuk Bumi' : 'Real Action for the Earth'}</h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-sans leading-relaxed">
                        {language === 'ID'
                            ? 'Bergabunglah dengan program konservasi kami untuk menciptakan dampak nyata bagi lingkungan dan masyarakat.'
                            : 'Join our conservation programs to create a real impact for the environment and the community.'}
                    </p>
                </motion.div>
            </section>

            {/* Programs Grid */}
            <section className="container mx-auto px-6">
                <div className="space-y-16">
                    {PROGRAMS_DETAILED.map((program, index) => (
                        <motion.article
                            key={program.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            id={`program-${program.id}`}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100"
                        >
                            <div className="grid lg:grid-cols-2">
                                {/* Image */}
                                <div className="relative h-72 lg:h-auto overflow-hidden">
                                    <img
                                        src={program.image}
                                        alt={program.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-primary-dark">
                                            <program.icon className="w-4 h-4" />
                                            {program.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 lg:p-10">
                                    <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {program.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {program.startDate}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 font-display mb-4">{program.title}</h2>

                                    <p className="text-neutral-600 leading-relaxed mb-6 whitespace-pre-line">{program.fullDescription}</p>

                                    {/* Progress */}
                                    <div className="mb-6">
                                        <div className="flex justify-between text-sm font-semibold mb-2">
                                            <span className="text-neutral-600">Progress: {program.current} / {program.target}</span>
                                            <span className="text-primary">{program.progress}%</span>
                                        </div>
                                        <div className="w-full bg-neutral-100 rounded-full h-3">
                                            <div
                                                className="bg-primary h-3 rounded-full transition-all duration-1000"
                                                style={{ width: `${program.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Impact */}
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-neutral-900 mb-3">{language === 'ID' ? 'Dampak Program:' : 'Program Impact:'}</h4>
                                        <ul className="grid grid-cols-2 gap-2">
                                            {program.impact.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                                                    <Leaf className="w-4 h-4 text-primary flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Timeline */}
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-neutral-900 mb-3">Timeline:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {program.timeline.map((phase, i) => (
                                                <span
                                                    key={i}
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${phase.status === 'completed' ? 'bg-primary/10 text-primary' :
                                                        phase.status === 'in-progress' ? 'bg-secondary/10 text-secondary' :
                                                            'bg-neutral-100 text-neutral-500'
                                                        }`}
                                                >
                                                    {phase.phase}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-4 border-t border-neutral-100">
                                        <span className="flex items-center gap-2 text-xs text-neutral-600">
                                            <Users className="w-4 h-4" />
                                            {program.volunteers} Volunteers
                                        </span>
                                        <Link
                                            to="/contact"
                                            className="sm:ml-auto flex items-center gap-2 bg-neutral-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold hover:bg-neutral-800 hover:scale-105 transition-all duration-300 shadow-sm whitespace-nowrap"
                                        >
                                            {language === 'ID' ? 'Gabung Sekarang' : 'Join Now'}
                                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 mt-20">
                <div className="bg-primary rounded-2xl p-10 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">{language === 'ID' ? 'Ingin Bermitra dengan Kami?' : 'Want to Partner with Us?'}</h2>
                    <p className="text-white/80 mb-6 max-w-xl mx-auto">
                        {language === 'ID'
                            ? 'Kami membuka peluang kerjasama untuk organisasi, perusahaan, dan komunitas yang ingin berkontribusi pada konservasi dan pemberdayaan masyarakat.'
                            : 'We open cooperation opportunities for organizations, companies, and communities that want to contribute to conservation and community empowerment.'}
                    </p>
                    <Link to="/contact" className="inline-flex bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors">
                        {t.nav.contactUs || t.nav.contact}
                    </Link>
                </div>
            </section>
        </div>
    );
}
