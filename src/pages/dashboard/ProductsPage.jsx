import { useState, useMemo } from 'react';
import { useStore } from '../../hooks/useStore';
import {
    Plus, Pencil, Trash2, X, Image as ImageIcon,
    Search, Filter, ShoppingBag, Package, Archive,
    CheckCircle2, AlertCircle, Info
} from 'lucide-react';

const emptyProduct = {
    title: '', desc: '', image: '', price: '', category: 'Wadah',
    material: '100% Bambu Pilihan',
    stock: 'Tersedia'
};

const categories = ['Wadah', 'Kemasan', 'Aksesoris', 'Peralatan', 'Lainnya'];

function formatRupiah(value) {
    const angka = value.replace(/\D/g, '');
    if (!angka) return '';
    const formatted = angka.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp. ${formatted}`;
}

export default function ProductsPage() {
    const { data, loading, error, addItem, updateItem, deleteItem, getImageUrl } = useStore();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyProduct);
    const [searchQuery, setSearchQuery] = useState('');

    // Stats Calculation
    const stats = useMemo(() => {
        const total = data.products.length;
        const tersedia = data.products.filter(p => p.stock === 'Tersedia').length;
        const habis = data.products.filter(p => p.stock === 'Habis').length;
        return { total, tersedia, habis };
    }, [data.products]);

    // Filtering logic
    const filteredProducts = useMemo(() => {
        return data.products.filter(item =>
            item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data.products, searchQuery]);

    const openAdd = () => { setForm(emptyProduct); setEditId(null); setShowForm(true); };
    const openEdit = (item) => {
        setForm({
            ...emptyProduct,
            title: item.title || '',
            desc: item.desc || item.description || '',
            image: item.image || '',
            price: item.price || '',
            category: item.category || 'Wadah',
            material: item.material || '100% Bambu Pilihan',
            stock: item.stock || 'Tersedia'
        });
        setEditId(item.id);
        setShowForm(true);
    };
    const close = () => { setShowForm(false); setEditId(null); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) await updateItem('products', editId, form);
        else await addItem('products', form);
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
                        Manajemen Produk
                    </h1>
                    <p className="text-dark-400 font-medium">
                        Katalog kerajinan bambu premium SuaR Hijau.
                    </p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary-200"
                >
                    <Plus className="w-5 h-5" /> Tambah Produk Baru
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { label: 'TOTAL PRODUK', value: stats.total, icon: ShoppingBag, color: 'emerald', bg: 'bg-emerald-50' },
                    { label: 'STOK TERSEDIA', value: stats.tersedia, icon: Package, color: 'blue', bg: 'bg-blue-50' },
                    { label: 'STOK HABIS', value: stats.habis, icon: Archive, color: 'rose', bg: 'bg-rose-50' },
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

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-2 rounded-[2rem] border border-dark-100 shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-300" />
                    <input
                        type="text"
                        placeholder="Cari nama produk atau kategori..."
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
                    <p className="text-dark-400 font-medium tracking-wide">Menyelaraskan data katalog...</p>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-3 p-6 bg-rose-50 text-rose-600 rounded-3xl border border-rose-100 italic font-medium">
                    <AlertCircle className="w-6 h-6" /> Sistem mengalami kendala: {error}
                </div>
            )}

            {/* Product Cards Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-[2.5rem] border border-dark-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
                            {/* Image Container */}
                            <div className="relative h-56 bg-dark-50 p-3">
                                <div className="w-full h-full rounded-[1.8rem] overflow-hidden">
                                    {product.image ? (
                                        <img src={getImageUrl(product.image)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-dark-100">
                                            <ImageIcon className="w-12 h-12 text-dark-200" />
                                        </div>
                                    )}
                                </div>

                                {/* Badge Overlay */}
                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                    <span className="text-[10px] font-black px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-dark-800 shadow-sm border border-white/20 tracking-tighter uppercase">
                                        {product.category}
                                    </span>
                                </div>

                                <div className="absolute top-6 right-6">
                                    <span className={`text-[10px] font-black px-3 py-1 rounded-full shadow-sm tracking-tighter uppercase ${product.stock === 'Tersedia' ? 'bg-emerald-500 text-white' :
                                            product.stock === 'Pre-order' ? 'bg-blue-500 text-white' : 'bg-rose-500 text-white'
                                        }`}>
                                        {product.stock}
                                    </span>
                                </div>
                            </div>

                            {/* Info Container */}
                            <div className="p-6 pt-2 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-dark-900 mb-1 group-hover:text-primary-700 transition-colors">
                                    {product.title}
                                </h3>
                                <p className="text-xs text-dark-400 line-clamp-2 mb-4 font-medium leading-relaxed">
                                    {product.desc || product.description}
                                </p>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase">HARGA ESTIMASI</p>
                                        <p className="text-xl font-black text-primary-600">{product.price}</p>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEdit(product)}
                                            className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteItem('products', product.id)}
                                            className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredProducts.length === 0 && (
                        <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-dark-100">
                            <div className="w-20 h-20 bg-dark-50 rounded-full flex items-center justify-center mb-4">
                                <ImageIcon className="w-8 h-8 text-dark-200" />
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-1">Produk Tidak Ditemukan</h3>
                            <p className="text-dark-400 font-medium">Belum ada produk untuk kata kunci "{searchQuery}"</p>
                            <button onClick={openAdd} className="mt-6 px-6 py-2.5 bg-primary-50 text-primary-700 font-bold rounded-xl hover:bg-primary-100 transition-colors">
                                Tambah Produk Baru
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
                                    <ShoppingBag className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-dark-900">{editId ? 'Edit Katalog Produk' : 'Tambah Produk Baru'}</h2>
                                    <p className="text-xs text-dark-400 font-medium">Pastikan detail produk lengkap dan menarik.</p>
                                </div>
                            </div>
                            <button onClick={close} className="p-3 hover:bg-dark-50 rounded-2xl transition-colors text-dark-400">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8">
                            {/* Visual Asset Section */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase">
                                    <ImageIcon className="w-3 h-3" /> FOTO PRODUK (ASSET VISUAL)
                                </label>
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <div className="w-40 h-40 rounded-[2rem] bg-dark-50 border-2 border-dashed border-dark-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {form.image ? (
                                            <img src={getImageUrl(form.image)} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <ImageIcon className="w-10 h-10 text-dark-200" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-4 text-center sm:text-left">
                                        <p className="text-sm text-dark-500 leading-relaxed font-medium capitalize">
                                            Gunakan foto produk dengan pencahayaan alami untuk menonjolkan serat bambu yang premium.
                                        </p>
                                        <label className="inline-flex items-center gap-3 px-6 py-3 bg-primary-600 text-white rounded-2xl font-bold cursor-pointer hover:bg-primary-700 transition-all shadow-lg shadow-primary-100 text-sm">
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                            📁 Pilih Berkas Foto
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* General Info Section */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">NAMA PRODUK *</label>
                                    <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-5 py-4 bg-dark-50 border-none rounded-2xl text-sm font-bold text-dark-800 placeholder:text-dark-300 focus:ring-2 focus:ring-primary-500 transition-all" placeholder="Misal: Wadah Sajian Anyaman Bambu" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">ESTIMASI HARGA *</label>
                                    <input required value={form.price} onChange={e => setForm(f => ({ ...f, price: formatRupiah(e.target.value) }))} className="w-full px-5 py-4 bg-dark-50 border-none rounded-2xl text-sm font-bold text-primary-700 placeholder:text-dark-300 focus:ring-2 focus:ring-primary-500 transition-all" placeholder="Rp. 0" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">KATEGORI PRODUK</label>
                                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-5 py-4 bg-dark-50 border-none rounded-2xl text-sm font-bold text-dark-800 focus:ring-2 focus:ring-primary-500 transition-all appearance-none cursor-pointer">
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">STATUS KETERSEDIAAN</label>
                                    <select value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} className="w-full px-5 py-4 bg-dark-50 border-none rounded-2xl text-sm font-bold text-dark-800 focus:ring-2 focus:ring-primary-500 transition-all appearance-none cursor-pointer">
                                        <option value="Tersedia">Tersedia</option>
                                        <option value="Pre-order">Pre-order</option>
                                        <option value="Habis">Habis</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">MATERIAL & BAHAN</label>
                                    <input value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))} className="w-full px-5 py-4 bg-dark-50 border-none rounded-2xl text-sm font-medium text-dark-800 focus:ring-2 focus:ring-primary-500 transition-all" placeholder="Misal: 100% Bambu Pilihan, Pewarnaan Alami" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">DESKRIPSI LENGKAP</label>
                                <textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} rows={4} className="w-full px-5 py-4 bg-dark-50 border-none rounded-3xl text-sm font-medium text-dark-800 focus:ring-2 focus:ring-primary-500 transition-all resize-none leading-relaxed" placeholder="Jelaskan keunggulan produk ini di sini..." />
                            </div>

                            {/* Footer Section */}
                            <div className="flex gap-4 pt-4 border-t border-dark-50">
                                <button type="button" onClick={close} className="flex-1 px-8 py-4 bg-dark-50 text-dark-600 rounded-2xl font-bold hover:bg-dark-100 transition-all">Batal</button>
                                <button type="submit" className="flex-[2] px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-100 active:scale-95 transition-all outline-none">
                                    {editId ? '✨ Perbarui Katalog' : '🚀 Publikasikan Produk'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
