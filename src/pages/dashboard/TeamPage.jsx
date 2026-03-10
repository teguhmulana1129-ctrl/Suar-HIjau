import { useState, useMemo } from 'react';
import { useStore } from '../../hooks/useStore';
import {
    Plus, Pencil, Trash2, X, Image as ImageIcon,
    Users, UserPlus, Mail, Globe, Linkedin, Search, Filter,
    CheckCircle2, AlertCircle, ShieldCheck
} from 'lucide-react';

const emptyMember = {
    name: '', role: '', image: '',
    email: '', linkedin: '', bio: ''
};

export default function TeamPage() {
    const { data, loading, error, addItem, updateItem, deleteItem, getImageUrl } = useStore();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyMember);
    const [searchQuery, setSearchQuery] = useState('');

    // Stats Calculation
    const stats = useMemo(() => {
        const total = data.team.length;
        const roles = [...new Set(data.team.map(item => item.role))].length;
        return { total, roles };
    }, [data.team]);

    // Filtering logic
    const filteredTeam = useMemo(() => {
        return data.team.filter(member =>
            member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.role?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data.team, searchQuery]);

    const openAdd = () => { setForm(emptyMember); setEditId(null); setShowForm(true); };
    const openEdit = (item) => {
        setForm({ ...emptyMember, ...item });
        setEditId(item.id);
        setShowForm(true);
    };
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
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-dark-900 to-primary-800 bg-clip-text text-transparent">
                        Struktur Organisasi
                    </h1>
                    <p className="text-dark-400 font-medium">
                        Kelola tim dan kolaborator SuaR Hijau.
                    </p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary-200"
                >
                    <UserPlus className="w-5 h-5" /> Tambah Anggota
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { label: 'TOTAL ANGGOTA', value: stats.total, icon: Users, color: 'emerald', bg: 'bg-emerald-50' },
                    { label: 'DIVISI / PERAN', value: stats.roles, icon: ShieldCheck, color: 'blue', bg: 'bg-blue-50' },
                    { label: 'STATUS TIM', value: 'Aktif', icon: CheckCircle2, color: 'rose', bg: 'bg-rose-50' },
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
                        placeholder="Cari nama atau posisi..."
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
                    <p className="text-dark-400 font-medium tracking-wide">Mengkoneksikan tim hebat...</p>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-3 p-6 bg-rose-50 text-rose-600 rounded-3xl border border-rose-100 italic font-medium">
                    <AlertCircle className="w-6 h-6" /> Kendala sistem: {error}
                </div>
            )}

            {/* Team Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredTeam.map(member => (
                        <div key={member.id} className="bg-white rounded-[2.5rem] border border-dark-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                            {/* Avatar Part */}
                            <div className="pt-8 flex justify-center relative">
                                <div className="w-32 h-32 rounded-[2rem] bg-dark-50 p-1.5 ring-4 ring-dark-50 group-hover:ring-primary-100 transition-all duration-500">
                                    <div className="w-full h-full rounded-[1.6rem] overflow-hidden">
                                        {member.image ? (
                                            <img src={getImageUrl(member.image)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-dark-100">
                                                <Users className="w-10 h-10 text-dark-200" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute top-4 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openEdit(member)} className="p-2.5 bg-white text-dark-900 rounded-xl hover:bg-primary-600 hover:text-white transition-all shadow-lg active:scale-95"><Pencil className="w-4 h-4" /></button>
                                    <button onClick={() => deleteItem('team', member.id)} className="p-2.5 bg-white text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-lg active:scale-95"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>

                            {/* Info Part */}
                            <div className="p-8 text-center">
                                <h3 className="text-lg font-black text-dark-900 mb-1 group-hover:text-primary-700 transition-colors uppercase tracking-tight">{member.name}</h3>
                                <p className="text-xs font-bold text-primary-600 bg-primary-50 inline-block px-3 py-1 rounded-full uppercase tracking-widest mb-4">{member.role}</p>

                                <p className="text-dark-400 text-xs leading-relaxed line-clamp-2 mb-6 font-medium px-2 italic">
                                    "{member.bio || 'Berkontribusi untuk masa depan lingkungan yang lebih hijau.'}"
                                </p>

                                <div className="flex items-center justify-center gap-3 pt-6 border-t border-dark-50">
                                    <a href={`mailto:${member.email}`} className="p-2.5 hover:bg-dark-50 rounded-xl transition-colors text-dark-300 hover:text-primary-600"><Mail className="w-4.5 h-4.5" /></a>
                                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-2.5 hover:bg-dark-50 rounded-xl transition-colors text-dark-300 hover:text-blue-600"><Linkedin className="w-4.5 h-4.5" /></a>
                                    <button className="p-2.5 hover:bg-dark-50 rounded-xl transition-colors text-dark-300 hover:text-emerald-600"><Globe className="w-4.5 h-4.5" /></button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredTeam.length === 0 && (
                        <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-dark-100">
                            <div className="w-20 h-20 bg-dark-50 rounded-full flex items-center justify-center mb-4">
                                <Users className="w-8 h-8 text-dark-200" />
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-1">Anggota Tidak Ditemukan</h3>
                            <p className="text-dark-400 font-medium">Belum ada profil untuk kriteria "{searchQuery}"</p>
                            <button onClick={openAdd} className="mt-6 px-6 py-2.5 bg-primary-50 text-primary-700 font-bold rounded-xl hover:bg-primary-100 transition-colors">
                                Tambah Anggota Baru
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
                                    <UserPlus className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-dark-900">{editId ? 'Ubah Profil Anggota' : 'Anggota Tim Baru'}</h2>
                                    <p className="text-xs text-dark-400 font-medium">Bangun sinergi untuk hasil luar biasa.</p>
                                </div>
                            </div>
                            <button onClick={close} className="p-3 hover:bg-dark-50 rounded-2xl transition-colors text-dark-400">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">NAMA LENGKAP *</label>
                                    <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-5 py-4 bg-dark-50 border-none rounded-2xl text-sm font-bold text-dark-800 focus:ring-2 focus:ring-primary-500 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">PERAN / JABATAN *</label>
                                    <input required value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full px-5 py-4 bg-dark-50 border-none rounded-2xl text-sm font-bold text-primary-700 focus:ring-2 focus:ring-primary-500 transition-all font-serif italic" placeholder="Contoh: Koordinator Lapangan" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">EMAIL PROFESIONAL</label>
                                    <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-5 py-4 bg-dark-50 border-none rounded-2xl text-sm font-bold text-dark-800 focus:ring-2 focus:ring-primary-500 transition-all" placeholder="email@suarhijau.id" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">LINKEDIN URL</label>
                                    <input value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))} className="w-full px-5 py-4 bg-dark-50 border-none rounded-2xl text-sm font-bold text-blue-700 focus:ring-2 focus:ring-primary-500 transition-all" placeholder="linkedin.com/in/username" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">FOTO PROFIL</label>
                                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-dark-50 rounded-2xl">
                                    <div className="w-24 h-24 rounded-[1.5rem] bg-white border-2 border-dashed border-dark-200 flex items-center justify-center overflow-hidden">
                                        {form.image ? (
                                            <img src={getImageUrl(form.image)} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <ImageIcon className="w-8 h-8 text-dark-200" />
                                        )}
                                    </div>
                                    <label className="inline-flex items-center gap-3 px-6 py-3 bg-white text-dark-700 rounded-xl font-bold border border-dark-200 cursor-pointer hover:border-primary-400 hover:text-primary-600 transition-all text-sm shadow-sm">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        📷 Unggah Foto Tim
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">BIOGRAFI SINGKAT</label>
                                <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} className="w-full px-5 py-4 bg-dark-50 border-none rounded-3xl text-sm font-medium text-dark-800 focus:ring-2 focus:ring-primary-500 transition-all resize-none leading-relaxed" placeholder="Tuliskan sedikit tentang semangat dan dedikasi anggota ini..." />
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-dark-50">
                                <button type="button" onClick={close} className="flex-1 px-8 py-4 bg-dark-50 text-dark-600 rounded-2xl font-bold hover:bg-dark-100 transition-all">Batal</button>
                                <button type="submit" className="flex-[2] px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-100 active:scale-95 transition-all outline-none">
                                    {editId ? '✨ Simpan Perubahan' : '🚀 Tambahkan Tim'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
