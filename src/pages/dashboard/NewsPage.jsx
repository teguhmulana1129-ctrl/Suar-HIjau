import { useState, useMemo } from 'react';
import { useStore } from '../../hooks/useStore';
import {
    Plus, Pencil, Trash2, X, Image as ImageIcon,
    Newspaper, Eye, CheckCircle2, Search, Filter,
    AlertCircle, Calendar, ArrowUpRight
} from 'lucide-react';

const emptyNews = {
    title: '', category: 'Berita', date: new Date().toISOString().slice(0, 10),
    image: '', content: '', author: 'Admin Suar Hijau', views: 0
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
        setForm({ ...item, date: (item.date || '').slice(0, 10) });
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

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-dark-900 to-primary-800 bg-clip-text text-transparent">
                        Artikel & Berita
                    </h1>
                    <p className="text-dark-400 font-medium">
                        Bagikan kabar terbaru dan edukasi lingkungan.
                    </p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary-200"
                >
                    <Plus className="w-5 h-5" /> Tulis Artikel
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { label: 'TOTAL ARTIKEL', value: stats.total, icon: Newspaper, color: 'emerald', bg: 'bg-emerald-50' },
                    { label: 'TOTAL PEMBACA', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'blue', bg: 'bg-blue-50' },
                    { label: 'KATEGORI AKTIF', value: stats.categories, icon: CheckCircle2, color: 'rose', bg: 'bg-rose-50' },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-dark-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow group">
                        <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-dark-300 tracking-widest uppercase mb-1">{item.label}</p>
                            <p className="text-2xl font-bold text-dark-900 leading-none">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-2 rounded-[2rem] border border-dark-100 shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-300" />
                    <input
                        type="text"
                        placeholder="Cari berita atau kategori..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-transparent outline-none text-dark-700 font-medium placeholder:text-dark-300"
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-dark-50 text-dark-600 rounded-2xl font-bold hover:bg-dark-100 transition-colors mr-2">
                    <Filter className="w-5 h-5 text-dark-400" /> Filter
                </button>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-dark-400 font-medium tracking-wide">Menyiapkan inspirasi terbaru...</p>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-3 p-6 bg-rose-50 text-rose-600 rounded-3xl border border-rose-100 italic font-medium">
                    <AlertCircle className="w-6 h-6" /> Kendala sistem: {error}
                </div>
            )}

            {/* News Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredNews.map(item => (
                        <div key={item.id} className="bg-white rounded-[2.5rem] border border-dark-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                            {/* Image Part */}
                            <div className="aspect-[16/10] bg-dark-50 relative overflow-hidden m-4 mb-0 rounded-[1.8rem]">
                                {item.image ? (
                                    <img src={getImageUrl(item.image)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-dark-100" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="text-[10px] font-black px-3 py-1 bg-white/90 backdrop-blur text-primary-700 rounded-full shadow-lg tracking-widest uppercase">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="flex gap-2">
                                        <button onClick={() => openEdit(item)} className="p-3 bg-white text-dark-900 rounded-2xl hover:bg-primary-600 hover:text-white transition-all shadow-xl active:scale-95"><Pencil className="w-5 h-5" /></button>
                                        <button onClick={() => deleteItem('news', item.id)} className="p-3 bg-white text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-xl active:scale-95"><Trash2 className="w-5 h-5" /></button>
                                    </div>
                                </div>
                            </div>

                            {/* Content Part */}
                            <div className="p-8">
                                <div className="flex items-center gap-4 text-xs font-bold text-dark-300 mb-4 tracking-tighter uppercase">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
                                    <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {item.views} Views</span>
                                </div>
                                <h3 className="text-xl font-bold text-dark-900 group-hover:text-primary-700 transition-colors mb-3 leading-tight line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-dark-400 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                                    {item.content?.substring(0, 120)}...
                                </p>
                                <div className="pt-6 border-t border-dark-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                                            <Newspaper className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-dark-300 leading-none mb-1 uppercase tracking-widest">Penulis</p>
                                            <p className="text-xs font-bold text-dark-700">{item.author}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-dark-50 rounded-xl transition-colors text-dark-300 group/btn">
                                        <ArrowUpRight className="w-5 h-5 group-hover/btn:scale-110 group-hover/btn:text-primary-600 transition-all" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredNews.length === 0 && (
                        <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-dark-100">
                            <div className="w-20 h-20 bg-dark-50 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-8 h-8 text-dark-200" />
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-1">Berita Tidak Ditemukan</h3>
                            <p className="text-dark-400 font-medium">Belum ada artikel untuk pencarian "{searchQuery}"</p>
                            <button onClick={openAdd} className="mt-6 px-6 py-2.5 bg-primary-50 text-primary-700 font-bold rounded-xl hover:bg-primary-100 transition-colors">
                                Tulis Artikel Baru
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={close}>
                    <div className="absolute inset-0 bg-dark-900/60 backdrop-blur-xl animate-in fade-in duration-300" />
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col" onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-dark-50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                                    <Newspaper className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-dark-900">{editId ? 'Sempurnakan Artikel' : 'Tulis Artikel Inspiratif'}</h2>
                                    <p className="text-xs text-dark-400 font-medium">Bagikan informasi berharga untuk dunia.</p>
                                </div>
                            </div>
                            <button onClick={close} className="p-3 hover:bg-dark-50 rounded-2xl transition-colors text-dark-400">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="sm:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">JUDUL ARTIKEL *</label>
                                    <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-5 py-4 bg-dark-50 border-none rounded-2xl text-sm font-bold text-dark-800 focus:ring-2 focus:ring-primary-500 transition-all font-serif italic text-lg" placeholder="Tulis judul yang menggugah..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">KATEGORI</label>
                                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-5 py-4 bg-dark-50 border-none rounded-2xl text-sm font-bold text-dark-800 transition-all cursor-pointer">
                                        <option value="Berita">Berita Utama</option>
                                        <option value="Tips">Tips Lingkungan</option>
                                        <option value="Event">Laporan Event</option>
                                        <option value="Edukasi">Edukasi & Riset</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">TANGGAL RILIS</label>
                                    <input required type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full px-5 py-4 bg-dark-50 border-none rounded-2xl text-sm font-bold text-dark-800 transition-all" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">GAMBAR UTAMA</label>
                                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-dark-50 rounded-2xl">
                                    <div className="w-40 h-28 rounded-2xl bg-white border-2 border-dashed border-dark-200 flex items-center justify-center overflow-hidden">
                                        {form.image ? (
                                            <img src={getImageUrl(form.image)} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <ImageIcon className="w-8 h-8 text-dark-200" />
                                        )}
                                    </div>
                                    <label className="inline-flex items-center gap-3 px-6 py-3 bg-white text-dark-700 rounded-xl font-bold border border-dark-200 cursor-pointer hover:border-primary-400 hover:text-primary-600 transition-all text-sm shadow-sm">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        🖼️ Unggah Cover
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">ISI KONTEN ARTIKEL</label>
                                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={8} className="w-full px-6 py-5 bg-dark-50 border-none rounded-[2rem] text-dark-800 focus:ring-2 focus:ring-primary-500 transition-all resize-none leading-relaxed font-medium" placeholder="Tuangkan tulisan Anda di sini..." />
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-dark-50">
                                <button type="button" onClick={close} className="flex-1 px-8 py-4 bg-dark-50 text-dark-600 rounded-2xl font-bold hover:bg-dark-100 transition-all">Batal</button>
                                <button type="submit" className="flex-[2] px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-100 active:scale-95 transition-all outline-none">
                                    {editId ? '✨ Simpan Perubahan' : '🚀 Publish Sekarang'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
