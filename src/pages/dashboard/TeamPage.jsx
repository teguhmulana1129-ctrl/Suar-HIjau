import { useState, useMemo } from 'react';
import { useStore } from '../../hooks/useStore';
import {
    Plus, Pencil, Trash2, X, Image as ImageIcon,
    Users, UserPlus, Mail, Globe, Linkedin, Search, Filter,
    CheckCircle2, AlertCircle, ShieldCheck
} from 'lucide-react';

const emptyMember = {
    name: '', role: '', role_en: '', image: '',
    email: '', linkedin: '', bio: '', bio_en: ''
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
        setForm({
            ...emptyMember,
            ...item,
            role_en: item.role_en || '',
            bio_en: item.bio_en || ''
        });
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
        <div className="space-y-5 animate-in fade-in duration-700 pb-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-0.5">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-dark-900 to-primary-800 bg-clip-text text-transparent">
                        Struktur Organisasi
                    </h1>
                    <p className="text-dark-400 font-medium text-xs">
                        Kelola tim dan kolaborator SuaR Hijau.
                    </p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white px-3.5 py-2 rounded-lg font-bold text-xs hover:bg-emerald-700 transition-all shadow-sm active:scale-95"
                >
                    <Plus className="w-3.5 h-3.5" /> Tambah Anggota
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                    { label: 'TOTAL ANGGOTA', value: stats.total, icon: Users, color: 'emerald', bg: 'bg-emerald-50' },
                    { label: 'DIVISI / PERAN', value: stats.roles, icon: ShieldCheck, color: 'blue', bg: 'bg-blue-50' },
                    { label: 'STATUS TIM', value: 'Aktif', icon: CheckCircle2, color: 'rose', bg: 'bg-rose-50' },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-dark-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow group">
                        <div className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-dark-300 tracking-widest uppercase mb-0.5">{item.label}</p>
                            <p className="text-lg font-bold text-dark-900 leading-none">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2.5 items-center bg-white p-1.5 rounded-xl border border-dark-100 shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark-300" />
                    <input
                        type="text"
                        placeholder="Cari nama atau posisi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-transparent outline-none text-dark-700 font-medium placeholder:text-dark-300 text-[13px]"
                    />
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-dark-50 text-dark-600 rounded-lg font-bold text-[13px] hover:bg-dark-100 transition-colors mr-1">
                    <Filter className="w-3.5 h-3.5 text-dark-400" /> Filter
                </button>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-12 animate-pulse">
                    <div className="w-6 h-6 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-2.5"></div>
                    <p className="text-dark-400 font-medium text-xs tracking-wide">Mengkoneksikan tim hebat...</p>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-600 rounded-xl text-xs border border-rose-100 italic font-medium">
                    <AlertCircle className="w-4 h-4" /> Kendala sistem: {error}
                </div>
            )}

            {/* Team Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredTeam.map(member => (
                        <div key={member.id} className="bg-white rounded-xl border border-dark-100 overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            {/* Avatar Part */}
                            <div className="pt-5 flex justify-center relative">
                                <div className="w-20 h-20 rounded-xl bg-dark-50 p-1 ring-2 ring-dark-50 group-hover:ring-primary-100 transition-all duration-300">
                                    <div className="w-full h-full rounded-lg overflow-hidden">
                                        {member.image ? (
                                            <img src={getImageUrl(member.image)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-dark-100">
                                                <Users className="w-6 h-6 text-dark-200" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openEdit(member)} className="p-1.5 bg-white text-dark-900 rounded-md hover:bg-primary-600 hover:text-white transition-all shadow-md active:scale-95"><Pencil className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => deleteItem('team', member.id)} className="p-1.5 bg-white text-rose-600 rounded-md hover:bg-rose-600 hover:text-white transition-all shadow-md active:scale-95"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                            </div>

                            {/* Info Part */}
                            <div className="p-4 text-center">
                                <h3 className="text-[15px] font-black text-dark-900 mb-1 group-hover:text-primary-700 transition-colors uppercase tracking-tight">{member.name}</h3>
                                <p className="text-[9px] font-bold text-primary-600 bg-primary-50 inline-block px-1.5 py-0.5 rounded-md uppercase tracking-widest mb-2.5">{member.role}</p>

                                <p className="text-dark-400 text-[11px] leading-relaxed line-clamp-2 mb-3 font-medium px-1 italic">
                                    "{member.bio || 'Berkontribusi untuk masa depan lingkungan yang lebih hijau.'}"
                                </p>

                                <div className="flex items-center justify-center gap-1.5 pt-3 border-t border-dark-50">
                                    <a href={`mailto:${member.email}`} className="p-1.5 hover:bg-dark-50 rounded-md transition-colors text-dark-300 hover:text-primary-600"><Mail className="w-3.5 h-3.5" /></a>
                                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-1.5 hover:bg-dark-50 rounded-md transition-colors text-dark-300 hover:text-blue-600"><Linkedin className="w-3.5 h-3.5" /></a>
                                    <button className="p-1.5 hover:bg-dark-50 rounded-md transition-colors text-dark-300 hover:text-emerald-600"><Globe className="w-3.5 h-3.5" /></button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredTeam.length === 0 && (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-dashed border-dark-100">
                            <div className="w-12 h-12 bg-dark-50 rounded-full flex items-center justify-center mb-2.5">
                                <Users className="w-5 h-5 text-dark-200" />
                            </div>
                            <h3 className="text-[15px] font-bold text-dark-900 mb-0.5">Anggota Tidak Ditemukan</h3>
                            <p className="text-dark-400 text-xs font-medium">Belum ada profil untuk kriteria "{searchQuery}"</p>
                            <button onClick={openAdd} className="mt-4 px-4 py-2 bg-primary-50 text-xs text-primary-700 font-bold rounded-lg hover:bg-primary-100 transition-colors">
                                Tambah Anggota Baru
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-5" onClick={close}>
                    <div className="absolute inset-0 bg-dark-900/60 backdrop-blur-md animate-in fade-in duration-300" />
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-xl shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col" onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div className="px-5 py-3.5 border-b border-dark-50 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <UserPlus className="w-4 h-4 text-primary-600" />
                                </div>
                                <div>
                                    <h2 className="text-[15px] font-bold text-dark-900">{editId ? 'Ubah Profil Anggota' : 'Anggota Tim Baru'}</h2>
                                    <p className="text-[11px] text-dark-400 font-medium">Bangun sinergi untuk hasil luar biasa.</p>
                                </div>
                            </div>
                            <button onClick={close} className="p-1.5 hover:bg-dark-50 rounded-lg transition-colors text-dark-400">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5 custom-scrollbar">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">NAMA LENGKAP *</label>
                                    <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 bg-dark-50 border-none rounded-lg text-xs font-bold text-dark-800 focus:ring-2 focus:ring-primary-500 transition-all" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">PERAN / JABATAN (ID) *</label>
                                    <input required value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full px-3 py-2 bg-dark-50 border-none rounded-lg text-xs font-bold text-primary-700 focus:ring-2 focus:ring-primary-500 transition-all font-serif italic" placeholder="Contoh: Koordinator Lapangan" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">ROLE / POSITION (EN)</label>
                                    <input value={form.role_en} onChange={e => setForm(f => ({ ...f, role_en: e.target.value }))} className="w-full px-3 py-2 bg-dark-50 border-none rounded-lg text-xs font-bold text-primary-700 focus:ring-2 focus:ring-primary-500 transition-all font-serif italic" placeholder="E.g.: Field Coordinator" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">EMAIL PROFESIONAL</label>
                                    <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 bg-dark-50 border-none rounded-lg text-xs font-bold text-dark-800 focus:ring-2 focus:ring-primary-500 transition-all" placeholder="email@suarhijau.id" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">LINKEDIN URL</label>
                                    <input value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))} className="w-full px-3 py-2 bg-dark-50 border-none rounded-lg text-xs font-bold text-blue-700 focus:ring-2 focus:ring-primary-500 transition-all" placeholder="linkedin.com/in/username" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">FOTO PROFIL</label>
                                <div className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-dark-50 rounded-lg">
                                    <div className="w-16 h-16 rounded-lg bg-white border-2 border-dashed border-dark-200 flex items-center justify-center overflow-hidden">
                                        {form.image ? (
                                            <img src={getImageUrl(form.image)} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <ImageIcon className="w-5 h-5 text-dark-200" />
                                        )}
                                    </div>
                                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-dark-700 rounded-lg font-bold border border-dark-200 cursor-pointer hover:border-primary-400 hover:text-primary-600 transition-all text-[11px] shadow-sm">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        📷 Unggah Foto Tim
                                    </label>
                                </div>
                            </div>

                             <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">BIOGRAFI SINGKAT (ID)</label>
                                    <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} className="w-full px-3 py-2 bg-dark-50 border-none rounded-lg text-xs font-medium text-dark-800 focus:ring-2 focus:ring-primary-500 transition-all resize-none leading-relaxed" placeholder="Tuliskan sedikit tentang semangat anggota ini..." />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-dark-300 tracking-[0.2em] uppercase px-1">SHORT BIO (EN)</label>
                                    <textarea value={form.bio_en} onChange={e => setForm(f => ({ ...f, bio_en: e.target.value }))} rows={3} className="w-full px-3 py-2 bg-dark-50 border-none rounded-lg text-xs font-medium text-dark-800 focus:ring-2 focus:ring-primary-500 transition-all resize-none leading-relaxed" placeholder="Write a bit about this member's passion..." />
                                </div>
                            </div>

                            <div className="flex gap-2.5 pt-3 border-t border-dark-50">
                                <button type="button" onClick={close} className="flex-1 px-4 py-2 bg-dark-50 text-dark-600 rounded-lg font-bold text-[11px] hover:bg-dark-100 transition-all">Batal</button>
                                <button type="submit" className="flex-[2] px-4 py-2 bg-primary-600 text-white rounded-lg font-bold text-[11px] hover:bg-primary-700 hover:shadow-md hover:shadow-primary-100 active:scale-95 transition-all outline-none">
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
