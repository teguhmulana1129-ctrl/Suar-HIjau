import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { Plus, Pencil, Trash2, X, Image as ImageIcon, UserCircle } from 'lucide-react';

const emptyMember = {
    name: '', role: 'Tim SuaR Hijau', image: '', bio: ''
};

export default function TeamPage() {
    const { data, loading, error, addItem, updateItem, deleteItem, getImageUrl } = useStore();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyMember);

    const openAdd = () => { setForm(emptyMember); setEditId(null); setShowForm(true); };
    const openEdit = (item) => { setForm({ ...emptyMember, ...item }); setEditId(item.id); setShowForm(true); };
    const close = () => { setShowForm(false); setEditId(null); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) await updateItem('team', editId, form);
        else await addItem('team', form);
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
                    <h1 className="text-xl font-bold text-dark-900">Manajemen Tim</h1>
                    <p className="text-sm text-dark-400">{data.team.length} anggota tim</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Tambah Anggota
                </button>
            </div>

            {loading && <div className="text-center text-dark-500 py-10">Memuat data tim...</div>}
            {error && <div className="text-center text-red-500 py-10">Error: {error}</div>}

            {/* Team Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {data.team.map(member => (
                        <div key={member.id} className="bg-white rounded-2xl border border-dark-100 overflow-hidden group hover:shadow-lg transition-all duration-300 text-center">
                            <div className="relative h-36 bg-gradient-to-br from-primary-50 to-primary-100">
                                {member.image ? (
                                    <img src={getImageUrl(member.image)} className="w-full h-full object-cover" alt="" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <UserCircle className="w-16 h-16 text-primary-300" />
                                    </div>
                                )}
                                {/* Overlay actions */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button onClick={() => openEdit(member)} className="p-2 bg-white rounded-lg shadow-lg hover:bg-blue-50 transition-colors">
                                        <Pencil className="w-4 h-4 text-blue-500" />
                                    </button>
                                    <button onClick={() => deleteItem('team', member.id)} className="p-2 bg-white rounded-lg shadow-lg hover:bg-red-50 transition-colors">
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="font-bold text-dark-900 text-sm truncate">{member.name}</p>
                                <p className="text-[11px] text-dark-400 truncate">{member.role}</p>
                            </div>
                        </div>
                    ))}
                    {data.team.length === 0 && (
                        <div className="col-span-full py-16 text-center text-dark-400 bg-white rounded-2xl border border-dark-100">
                            Belum ada anggota tim. Klik "Tambah Anggota" untuk memulai.
                        </div>
                    )}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={close}>
                    <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-dark-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                            <h2 className="text-lg font-bold text-dark-900">{editId ? 'Edit Anggota' : 'Tambah Anggota'}</h2>
                            <button onClick={close} className="p-2 hover:bg-dark-100 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Photo Upload */}
                            <div className="flex flex-col items-center gap-3 mb-2">
                                {form.image ? (
                                    <img src={getImageUrl(form.image)} className="w-24 h-24 rounded-full object-cover border-4 border-primary-100" alt="" />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center border-4 border-primary-100">
                                        <UserCircle className="w-12 h-12 text-primary-300" />
                                    </div>
                                )}
                                <label className="cursor-pointer px-4 py-2 border-2 border-dashed border-dark-200 rounded-xl text-sm text-dark-400 hover:border-primary-400 hover:text-primary-600 transition-colors">
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    📷 Upload Foto
                                </label>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Nama Lengkap *</label>
                                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Jabatan / Role</label>
                                <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Bio</label>
                                <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none" placeholder="Ceritakan tentang anggota ini..." />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-dark-100">
                                <button type="button" onClick={close} className="flex-1 px-4 py-2.5 border border-dark-200 rounded-xl text-sm font-semibold text-dark-600 hover:bg-dark-50 transition-colors">Batal</button>
                                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors">{editId ? 'Simpan' : 'Tambah Anggota'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
