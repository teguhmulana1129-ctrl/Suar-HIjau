import { useState, useMemo } from 'react';
import { useStore } from '../../hooks/useStore';
import {
    Plus, Pencil, Trash2, X, Image as ImageIcon,
    Newspaper, Eye, CheckCircle2, Search, Filter,
    AlertCircle, Calendar, ArrowUpRight
} from 'lucide-react';

const emptyNews = {
    title: '', title_en: '',
    slug: '',
    excerpt: '', excerpt_en: '',
    category: '', category_en: '',
    date: new Date().toISOString().slice(0, 10),
    author: 'SuaR Indonesia', tags: '', image: '', content: '', views: 0,
    sections: [], // Format: { type: 'text'|'heading'|'image'|'video'|'quote', content: '' }
    sections_en: []
};

export default function NewsPage() {
    const { data, loading, error, addItem, updateItem, deleteItem, getImageUrl } = useStore();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyNews);
    const [searchQuery, setSearchQuery] = useState('');

    // Stats Calculation
    const stats = useMemo(() => {
        const total = data.news.length;
        const totalViews = data.news.reduce((acc, item) => acc + (item.views || 0), 0);
        const categories = [...new Set(data.news.map(item => item.category))].length;
        return { total, totalViews, categories };
    }, [data.news]);

    // Filtering logic
    const filteredNews = useMemo(() => {
        return data.news.filter(item =>
            item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data.news, searchQuery]);

    const openAdd = () => { setForm(emptyNews); setEditId(null); setShowForm(true); };
    const openEdit = (item) => {
        let sections = [];
        let sections_en = [];

        if (item.sections) {
            sections = typeof item.sections === 'string' ? JSON.parse(item.sections) : item.sections;
        } else if (item.content) {
            sections = [{ type: 'text', content: item.content }];
        }

        if (item.sections_en) {
            sections_en = typeof item.sections_en === 'string' ? JSON.parse(item.sections_en) : item.sections_en;
        }

        setForm({
            ...emptyNews,
            ...item,
            title_en: item.title_en || '',
            excerpt_en: item.excerpt_en || '',
            category_en: item.category_en || '',
            date: (item.date || '').slice(0, 10),
            sections: sections,
            sections_en: sections_en
        });
        setEditId(item.id);
        setShowForm(true);
    };
    const close = () => { setShowForm(false); setEditId(null); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) await updateItem('news', editId, form);
        else await addItem('news', form);
        close();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setForm(f => ({ ...f, image: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    const addSection = (type) => {
        setForm(f => ({ ...f, sections: [...f.sections, { type, content: '' }] }));
    };

    const updateSection = (index, content) => {
        setForm(f => {
            const newSections = [...f.sections];
            newSections[index].content = content;
            return { ...f, sections: newSections };
        });
    };

    const removeSection = (index) => {
        setForm(f => ({ ...f, sections: f.sections.filter((_, i) => i !== index) }));
    };

    const handleSectionImageUpload = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => updateSection(index, reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-5 animate-in fade-in duration-500 pb-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-0.5">
                    <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-dark-900 to-primary-800 bg-clip-text text-transparent">
                        Artikel & Berita
                    </h1>
                    <p className="text-xs text-dark-500 font-medium">
                        Bagikan kabar terbaru dan edukasi lingkungan.
                    </p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white px-3.5 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm active:scale-95"
                >
                    <Plus className="w-3.5 h-3.5" /> Tulis Artikel
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                    { label: 'TOTAL ARTIKEL', value: stats.total, icon: Newspaper, color: 'emerald', bg: 'bg-emerald-50' },
                    { label: 'TOTAL PEMBACA', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'blue', bg: 'bg-blue-50' },
                    { label: 'KATEGORI AKTIF', value: stats.categories, icon: CheckCircle2, color: 'rose', bg: 'bg-rose-50' },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-dark-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow group">
                        <div className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-dark-400 tracking-wider uppercase mb-0.5">{item.label}</p>
                            <p className="text-lg font-bold text-dark-900 leading-none">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2.5 items-center bg-white p-1.5 rounded-xl border border-dark-100 shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark-400" />
                    <input
                        type="text"
                        placeholder="Cari berita atau kategori..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-[13px] bg-transparent outline-none text-dark-700 font-medium placeholder:text-dark-300"
                    />
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-dark-50 text-dark-600 rounded-lg text-[13px] font-semibold hover:bg-dark-100 transition-colors mr-1">
                    <Filter className="w-3.5 h-3.5 text-dark-500" /> Filter
                </button>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-12 animate-pulse">
                    <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-2.5"></div>
                    <p className="text-xs text-dark-400 font-medium tracking-wide">Menyiapkan inspirasi terbaru...</p>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 text-xs text-rose-600 rounded-xl border border-rose-100 italic font-medium">
                    <AlertCircle className="w-4 h-4" /> Kendala sistem: {error}
                </div>
            )}

            {/* News Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredNews.map(item => (
                        <div key={item.id} className="bg-white rounded-xl border border-dark-100 overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                            {/* Image Part */}
                            <div className="aspect-[16/10] bg-dark-50 relative overflow-hidden m-2 mb-0 rounded-lg">
                                {item.image ? (
                                    <img src={getImageUrl(item.image)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="w-6 h-6 text-dark-200" />
                                    </div>
                                )}
                                <div className="absolute top-2.5 left-2.5">
                                    <span className="text-[9px] font-bold px-2 py-0.5 bg-white/95 backdrop-blur-sm text-primary-700 rounded shadow-sm tracking-wider uppercase">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="flex gap-1.5">
                                        <button onClick={() => openEdit(item)} className="p-1.5 bg-white text-dark-900 rounded-md hover:bg-primary-600 hover:text-white transition-all shadow-md active:scale-95"><Pencil className="w-3.5 h-3.5" /></button>
                                        <button onClick={() => deleteItem('news', item.id)} className="p-1.5 bg-white text-rose-600 rounded-md hover:bg-rose-600 hover:text-white transition-all shadow-md active:scale-95"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                            </div>

                            {/* Content Part */}
                            <div className="p-4 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-[10px] font-semibold text-dark-400 mb-2 tracking-wide uppercase">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {item.views} Views</span>
                                </div>
                                <h3 className="text-[15px] font-bold text-dark-900 group-hover:text-primary-600 transition-colors mb-1.5 leading-tight line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-dark-500 text-[11px] leading-relaxed mb-3 font-medium line-clamp-3 flex-1">
                                    {(item.sections && item.sections.length > 0)
                                        ? item.sections.find(s => s.type === 'text')?.content?.substring(0, 120) || 'Baca selengkapnya...'
                                        : item.content?.substring(0, 120) || 'Belum ada konten.'}...
                                </p>
                                <div className="pt-3 border-t border-dark-100 flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                                            <Newspaper className="w-3 h-3" />
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-bold text-dark-400 leading-none mb-0.5 uppercase tracking-widest">Penulis</p>
                                            <p className="text-[11px] font-semibold text-dark-700">{item.author}</p>
                                        </div>
                                    </div>
                                    <button className="p-1.5 hover:bg-dark-50 rounded-md transition-colors text-dark-400 group/btn">
                                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:scale-110 group-hover/btn:text-primary-600 transition-all" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredNews.length === 0 && (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-dark-200">
                            <div className="w-12 h-12 bg-dark-50 rounded-full flex items-center justify-center mb-2.5">
                                <Search className="w-5 h-5 text-dark-400" />
                            </div>
                            <h3 className="text-[15px] font-bold text-dark-900 mb-0.5">Berita Tidak Ditemukan</h3>
                            <p className="text-xs text-dark-500 font-medium">Belum ada artikel untuk pencarian "{searchQuery}"</p>
                            <button onClick={openAdd} className="mt-4 px-4 py-2 text-xs bg-primary-50 text-primary-700 font-semibold rounded-lg hover:bg-primary-100 transition-colors">
                                Tulis Artikel Baru
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-5" onClick={close}>
                    <div className="absolute inset-0 bg-dark-900/40 backdrop-blur-sm animate-in fade-in duration-200" />
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col" onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div className="px-5 py-3.5 border-b border-dark-100 flex items-center justify-between bg-dark-50/50">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 bg-white border border-dark-100 shadow-sm rounded-lg flex items-center justify-center">
                                    <Newspaper className="w-4 h-4 text-primary-600" />
                                </div>
                                <div>
                                    <h2 className="text-[15px] font-bold text-dark-900">{editId ? 'Sempurnakan Artikel' : 'Tulis Artikel Inspiratif'}</h2>
                                    <p className="text-[11px] text-dark-500 font-medium">Bagikan informasi berharga untuk dunia.</p>
                                </div>
                            </div>
                            <button onClick={close} className="p-1.5 hover:bg-dark-100 rounded-md transition-colors text-dark-500">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5 custom-scrollbar">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">Title (ID) *</label>
                                        <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-semibold text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none" placeholder="e.g., Pelatihan Digital Marketing untuk UMKM" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">Title (EN)</label>
                                        <input value={form.title_en} onChange={e => setForm(f => ({ ...f, title_en: e.target.value }))} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-semibold text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none" placeholder="e.g., Digital Marketing Training for SMEs" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">Slug *</label>
                                    <input required value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-semibold text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none bg-dark-50/50" placeholder="e.g., pelatihan-digital-marketing-umkm" />
                                    <p className="text-[9px] text-dark-400 mt-0.5">URL friendly, gunakan huruf kecil dan tanda hubung (-).</p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">Excerpt (ID) *</label>
                                        <textarea required value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-medium text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none resize-none" placeholder="Ringkasan singkat..." />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">Excerpt (EN)</label>
                                        <textarea value={form.excerpt_en} onChange={e => setForm(f => ({ ...f, excerpt_en: e.target.value }))} rows={2} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-medium text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none resize-none" placeholder="Short summary..." />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">Date *</label>
                                        <input required type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-semibold text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none" />
                                        <p className="text-[9px] text-dark-400 mt-0.5">Format: Tanggal Bulan Tahun</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">Author *</label>
                                        <input required value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-semibold text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none" placeholder="Nama Penulis" />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 space-y-1 mt-2">
                                    <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">Tags (comma separated)</label>
                                    <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-medium text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none" placeholder="e.g., pelatihan, umkm, digital, ekonomi" />
                                    <p className="text-[9px] text-dark-400 mt-0.5">Pisahkan kata kunci dengan koma.</p>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">GAMBAR UTAMA</label>
                                <div className="flex flex-col sm:flex-row items-center gap-4 p-2.5 bg-dark-50 rounded-lg border border-dark-100">
                                    <div className="w-24 h-16 rounded-md bg-white border border-dashed border-dark-300 flex items-center justify-center overflow-hidden">
                                        {form.image ? (
                                            <img src={getImageUrl(form.image)} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <ImageIcon className="w-5 h-5 text-dark-300" />
                                        )}
                                    </div>
                                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-dark-900 text-white rounded-lg font-semibold cursor-pointer hover:bg-dark-800 transition-colors text-xs shadow-sm">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        Unggah Cover
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">ISI KONTEN ARTIKEL (SECTIONS)</label>
                                    <div className="flex flex-wrap gap-1.5">
                                        <button type="button" onClick={() => addSection('text')} className="px-2 py-1 bg-dark-100 hover:bg-dark-200 text-dark-700 rounded-md text-[10px] font-bold transition-colors">+ Text</button>
                                        <button type="button" onClick={() => addSection('heading')} className="px-2 py-1 bg-dark-100 hover:bg-dark-200 text-dark-700 rounded-md text-[10px] font-bold transition-colors">+ Heading</button>
                                        <button type="button" onClick={() => addSection('image')} className="px-2 py-1 bg-dark-100 hover:bg-dark-200 text-dark-700 rounded-md text-[10px] font-bold transition-colors">+ Image</button>
                                        <button type="button" onClick={() => addSection('video')} className="px-2 py-1 bg-dark-100 hover:bg-dark-200 text-dark-700 rounded-md text-[10px] font-bold transition-colors">+ Video</button>
                                        <button type="button" onClick={() => addSection('quote')} className="px-2 py-1 bg-dark-100 hover:bg-dark-200 text-dark-700 rounded-md text-[10px] font-bold transition-colors">+ Quote</button>
                                    </div>
                                </div>

                                <div className="space-y-3 min-h-[120px] p-3 border border-dark-200 border-dashed rounded-xl bg-dark-50/50">
                                    {form.sections.length === 0 ? (
                                        <div className="flex items-center justify-center h-full text-dark-400 text-xs italic">
                                            Belum ada seksi konten. Klik tombol di atas untuk menambah.
                                        </div>
                                    ) : (
                                        form.sections.map((section, idx) => (
                                            <div key={idx} className="relative group bg-white border border-dark-200 rounded-lg p-3 shadow-sm flex gap-3">
                                                <div className="flex-1 space-y-1.5">
                                                    <div className="text-[9px] font-bold text-primary-600 uppercase tracking-widest px-1">
                                                        {section.type}
                                                    </div>

                                                    {section.type === 'text' && (
                                                        <textarea value={section.content} onChange={e => updateSection(idx, e.target.value)} rows={3} className="w-full px-3 py-2 bg-dark-50 border-none rounded-md text-xs font-medium text-dark-900 focus:ring-2 focus:ring-primary-500 outline-none resize-none leading-relaxed" placeholder="Tulis paragraf di sini..." />
                                                    )}

                                                    {section.type === 'heading' && (
                                                        <input value={section.content} onChange={e => updateSection(idx, e.target.value)} className="w-full px-3 py-2 bg-dark-50 border-none rounded-md text-sm font-bold text-dark-900 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Tulis sub-judul..." />
                                                    )}

                                                    {section.type === 'quote' && (
                                                        <textarea value={section.content} onChange={e => updateSection(idx, e.target.value)} rows={2} className="w-full px-3 py-2 bg-dark-50 border-none rounded-md text-xs font-medium text-dark-900 focus:ring-2 focus:ring-primary-500 outline-none resize-none italic border-l-4 border-l-primary-500" placeholder="Tulis kutipan menarik..." />
                                                    )}

                                                    {section.type === 'video' && (
                                                        <input value={section.content} onChange={e => updateSection(idx, e.target.value)} className="w-full px-3 py-2 bg-dark-50 border-none rounded-md text-xs font-medium text-blue-600 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Masukkan URL Video (contoh: YouTube link)..." />
                                                    )}

                                                    {section.type === 'image' && (
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-16 h-16 rounded-md bg-dark-50 border border-dashed border-dark-300 flex items-center justify-center overflow-hidden shrink-0">
                                                                {section.content ? (
                                                                    <img src={section.content.startsWith('http') || section.content.startsWith('data:') ? section.content : getImageUrl(section.content)} className="w-full h-full object-cover" alt="" />
                                                                ) : (
                                                                    <ImageIcon className="w-5 h-5 text-dark-300" />
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col gap-1.5 flex-1">
                                                                <input value={section.content} onChange={e => updateSection(idx, e.target.value)} className="w-full px-3 py-1.5 bg-dark-50 border-none rounded-md text-[11px] font-medium text-dark-700 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Atau paste URL gambar..." />
                                                                <label className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-dark-200 text-dark-700 rounded-md font-semibold cursor-pointer hover:bg-dark-50 transition-colors text-[11px] self-start shadow-sm">
                                                                    <input type="file" accept="image/*" onChange={(e) => handleSectionImageUpload(idx, e)} className="hidden" />
                                                                    Unggah File Lokal
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <button type="button" onClick={() => removeSection(idx)} className="p-1.5 h-fit bg-rose-50 text-rose-500 rounded-md hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2.5 pt-3 border-t border-dark-100">
                                <button type="button" onClick={close} className="px-4 py-2 bg-white border border-dark-200 text-dark-700 rounded-lg text-xs font-semibold hover:bg-dark-50 transition-colors">Batal</button>
                                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-xs font-semibold hover:bg-primary-700 shadow-sm active:scale-95 transition-all outline-none">
                                    {editId ? 'Simpan Perubahan' : 'Publish Sekarang'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
