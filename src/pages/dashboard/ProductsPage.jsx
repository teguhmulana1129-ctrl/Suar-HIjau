import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { Plus, Pencil, Trash2, X, Image as ImageIcon } from 'lucide-react';

const emptyProduct = {
    title: '', desc: '', image: '', price: '', category: 'Wadah',
    material: '100% Bambu Pilihan',
    stock: 'Tersedia'
};

const categories = ['Wadah', 'Kemasan', 'Aksesoris', 'Peralatan', 'Lainnya'];

// Format angka ke format Rupiah: 85000 -> "Rp. 85.000"
function formatRupiah(value) {
    // Hapus semua karakter non-digit
    const angka = value.replace(/\D/g, '');
    if (!angka) return '';
    // Tambah titik sebagai pemisah ribuan
    const formatted = angka.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp. ${formatted}`;
}

export default function ProductsPage() {
    const { data, loading, error, addItem, updateItem, deleteItem, getImageUrl } = useStore();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyProduct);

    const openAdd = () => { setForm(emptyProduct); setEditId(null); setShowForm(true); };
    const openEdit = (item) => {
        // Map snake_case DB columns to camelCase form fields
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-dark-900">Manajemen Produk</h1>
                    <p className="text-sm text-dark-400">{data.products.length} produk terdaftar</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Tambah Produk
                </button>
            </div>

            {loading && <div className="text-center text-dark-500 py-10">Memuat data produk...</div>}
            {error && <div className="text-center text-red-500 py-10">Error: {error}</div>}

            {/* Product Grid */}
            {!loading && !error && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {data.products.map(product => (
                        <div key={product.id} className="bg-white rounded-2xl border border-dark-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                            <div className="relative h-40 bg-dark-100">
                                {product.image ? (
                                    <img src={getImageUrl(product.image)} className="w-full h-full object-cover" alt="" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="w-8 h-8 text-dark-300" />
                                    </div>
                                )}
                                <div className="absolute top-2 left-2 flex gap-1.5">
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-dark-700">{product.category}</span>
                                </div>
                                <div className="absolute top-2 right-2">
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${product.stock === 'Tersedia' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>{product.stock}</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-dark-900 text-sm mb-1">{product.title}</h3>
                                <p className="text-xs text-dark-400 line-clamp-2 mb-2">{product.desc}</p>
                                <p className="text-lg font-bold text-primary-600 mb-3">{product.price}</p>
                                <div className="flex gap-1.5">
                                    <button onClick={() => openEdit(product)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors">
                                        <Pencil className="w-3 h-3" /> Edit
                                    </button>
                                    <button onClick={() => deleteItem('products', product.id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors">
                                        <Trash2 className="w-3 h-3" /> Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {data.products.length === 0 && (
                        <div className="col-span-full py-16 text-center text-dark-400 bg-white rounded-2xl border border-dark-100">
                            Belum ada produk. Klik "Tambah Produk" untuk memulai.
                        </div>
                    )}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={close}>
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-dark-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                            <h2 className="text-lg font-bold text-dark-900">{editId ? 'Edit Produk' : 'Tambah Produk'}</h2>
                            <button onClick={close} className="p-2 hover:bg-dark-100 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Nama Produk *</label>
                                    <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Harga *</label>
                                    <input required value={form.price} onChange={e => setForm(f => ({ ...f, price: formatRupiah(e.target.value) }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="Rp. 85.000" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Kategori</label>
                                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Stok</label>
                                    <select value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
                                        <option value="Tersedia">Tersedia</option>
                                        <option value="Pre-order">Pre-order</option>
                                        <option value="Habis">Habis</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Material</label>
                                    <input value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Gambar</label>
                                <div className="flex items-center gap-4">
                                    {form.image && <img src={getImageUrl(form.image)} className="w-20 h-20 rounded-xl object-cover" alt="" />}
                                    <label className="cursor-pointer px-4 py-2.5 border-2 border-dashed border-dark-200 rounded-xl text-sm text-dark-400 hover:border-primary-400 hover:text-primary-600 transition-colors">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        📁 Pilih Gambar
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Deskripsi</label>
                                <textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} rows={3} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none" />
                            </div>



                            <div className="flex gap-3 pt-4 border-t border-dark-100">
                                <button type="button" onClick={close} className="flex-1 px-4 py-2.5 border border-dark-200 rounded-xl text-sm font-semibold text-dark-600 hover:bg-dark-50 transition-colors">Batal</button>
                                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors">{editId ? 'Simpan' : 'Tambah Produk'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
