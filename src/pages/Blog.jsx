
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
    {
        id: 1,
        title: "Manfaat Anyaman Bambu untuk Kehidupan Sehari-hari",
        excerpt: "Temukan berbagai manfaat produk anyaman bambu yang ramah lingkungan dan tahan lama untuk kebutuhan rumah tangga Anda.",
        image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800",
        author: "Tim Suar Hijau",
        date: "20 Jan 2026",
        category: "Tips & Trik"
    },
    {
        id: 2,
        title: "Proses Pembuatan Anyaman Bambu Tradisional",
        excerpt: "Mengenal lebih dekat proses pembuatan anyaman bambu dari awal hingga menjadi produk berkualitas tinggi.",
        image: "https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=800",
        author: "Budi Santoso",
        date: "15 Jan 2026",
        category: "Edukasi"
    },
    {
        id: 3,
        title: "Mendukung UMKM Lokal Melalui Produk Ramah Lingkungan",
        excerpt: "Bagaimana memilih produk lokal dapat membantu ekonomi masyarakat dan menjaga kelestarian lingkungan.",
        image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
        author: "Sarah Lim",
        date: "10 Jan 2026",
        category: "Komunitas"
    },
    {
        id: 4,
        title: "Tren Dekorasi Rumah dengan Material Alami",
        excerpt: "Inspirasi dekorasi rumah menggunakan material alami seperti bambu, rotan, dan anyaman tradisional.",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
        author: "Tim Suar Hijau",
        date: "5 Jan 2026",
        category: "Inspirasi"
    }
];

export default function Blog() {
    return (
        <div className="pt-24 min-h-screen bg-background pb-20">
            {/* Header */}
            <section className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-4 font-sans">Artikel</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 font-display mb-8">Blog & Berita</h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-sans leading-relaxed">
                        Informasi terbaru seputar produk, tips, dan cerita inspiratif dari komunitas Suar Hijau.
                    </p>
                </motion.div>
            </section>

            {/* Blog Grid */}
            <section className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    {BLOG_POSTS.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-neutral-100"
                        >
                            <div className="aspect-video overflow-hidden bg-neutral-100">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">{post.category}</span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {post.date}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 font-display mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                                <p className="text-neutral-500 text-sm leading-relaxed font-sans mb-4 line-clamp-2">{post.excerpt}</p>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-sm text-neutral-600">
                                        <User className="w-4 h-4" />
                                        {post.author}
                                    </span>
                                    <button className="flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                                        Baca <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>
        </div>
    );
}
