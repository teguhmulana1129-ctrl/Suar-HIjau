import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { Plus, Pencil, Trash2, X, Image as ImageIcon, Calendar, User } from 'lucide-react';

const emptyNews = {
    title: '', excerpt: '', content: '', image: '',
    author: 'Tim SuaR Hijau', date: '', category: ''
};

export default function NewsPage() {
    const { data, loading, error, addItem, updateItem, deleteItem, getImageUrl } = useStore();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyNews);

    const openAdd = () => { setForm(emptyNews); setEditId(null); setShowForm(true); };
    const openEdit = (item) => {
        setForm({ ...emptyNews, ...item, date: (item.date || '').slice(0, 10) });
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-dark-900">Manajemen Berita</h1>
                    <p className="text-sm text-dark-400">{data.news.length} berita terdaftar</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Tambah Berita
                </button>
            </div>

            {loading && <div className="text-center text-dark-500 py-10">Memuat data berita...</div>}
            {error && <div className="text-center text-red-500 py-10">Error: {error}</div>}

            {/* News Table */}
            {!loading && !error && (
                <div className="bg-white rounded-2xl border border-dark-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-dark-100 bg-dark-50/50">
                                    <th className="text-left px-5 py-3.5 font-semibold text-dark-500 text-xs uppercase tracking-wider">Berita</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-dark-500 text-xs uppercase tracking-wider hidden md:table-cell">Kategori</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-dark-500 text-xs uppercase tracking-wider hidden lg:table-cell">Penulis</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-dark-500 text-xs uppercase tracking-wider hidden lg:table-cell">Tanggal</th>
                                    <th className="text-right px-5 py-3.5 font-semibold text-dark-500 text-xs uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-100">
                                {data.news.map(news => (
                                    <tr key={news.id} className="hover:bg-dark-50/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {news.image ? (
                                                    <img src={getImageUrl(news.image)} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" alt="" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                                                        <ImageIcon className="w-5 h-5 text-orange-500" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-dark-900 truncate">{news.title}</p>
                                                    <p className="text-xs text-dark-400 truncate">{news.excerpt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 hidden md:table-cell">
                                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 text-orange-700">{news.category}</span>
                                        </td>
                                        <td className="px-5 py-4 text-dark-600 hidden lg:table-cell">
                                            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {news.author}</span>
                                        </td>
                                        <td className="px-5 py-4 text-dark-400 text-xs hidden lg:table-cell">
                                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {news.date}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => openEdit(news)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-4 h-4 text-blue-500" /></button>
                                                <button onClick={() => deleteItem('news', news.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4 text-red-500" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {data.news.length === 0 && (
                                    <tr><td colSpan={5} className="px-5 py-10 text-center text-dark-400">Belum ada berita. Klik "Tambah Berita" untuk memulai.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={close}>
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-dark-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                            <h2 className="text-lg font-bold text-dark-900">{editId ? 'Edit Berita' : 'Tambah Berita'}</h2>
                            <button onClick={close} className="p-2 hover:bg-dark-100 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Judul Berita *</label>
                                <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
                            </div>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Kategori</label>
                                    <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="Edukasi, Tips..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Penulis</label>
                                    <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Tanggal</label>
                                    <input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="20 Jan 2026" />
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
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Ringkasan (Excerpt)</label>
                                <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Konten (HTML)</label>
                                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={8} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none font-mono" placeholder="<p>Tulis konten berita di sini...</p>" />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-dark-100">
                                <button type="button" onClick={close} className="flex-1 px-4 py-2.5 border border-dark-200 rounded-xl text-sm font-semibold text-dark-600 hover:bg-dark-50 transition-colors">Batal</button>
                                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors">{editId ? 'Simpan' : 'Tambah Berita'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
