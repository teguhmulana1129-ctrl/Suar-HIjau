import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import {
    Plus, Pencil, Trash2, Search, UserRound,
    ShieldCheck, Mail, Key, Shield, X, Save
} from 'lucide-react';

const emptyAdmin = {
    username: '', fullName: '', role: 'staff', email: '', password: ''
};

export default function AdminsPage() {
    const { data, loading, error, addItem, updateItem, deleteItem } = useStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyAdmin);

    const filteredAdmins = (data.admins || []).filter(a =>
        (a.username || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.fullName || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openAdd = () => {
        setForm(emptyAdmin);
        setEditId(null);
        setShowForm(true);
    };

    const openEdit = (admin) => {
        setForm({
            username: admin.username || '',
            fullName: admin.fullName || '',
            role: admin.role || 'staff',
            email: admin.email || '',
            password: '' // Don't show hashed password
        });
        setEditId(admin.id);
        setShowForm(true);
    };

    const close = () => {
        setShowForm(false);
        setEditId(null);
        setForm(emptyAdmin);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateItem('admins', editId, form);
            } else {
                await addItem('admins', form);
            }
            close();
        } catch (err) {
            console.error("Error saving admin:", err);
        }
    };

    return (
        <div className="space-y-5 animate-fade-in pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Manajemen Admin</h1>
                    <p className="text-slate-500 text-xs mt-0.5">Kelola hak akses dan akun pengelola dashboard.</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm shadow-emerald-100 active:scale-95"
                >
                    <Plus className="w-4 h-4" /> Tambah Admin Baru
                </button>
            </div>

            <div className="bg-white p-1.5 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari username atau nama..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-[13px] focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-400"
                    />
                </div>
            </div>

            {loading && <div className="text-center py-12 flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="font-medium text-[11px] text-slate-400">Menyinkronkan data admin...</span>
            </div>}

            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-center text-xs font-medium border border-red-100">
                ⚠️ Terjadi kesalahan: {error}
            </div>}

            {!loading && !error && (
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-5 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Admin</th>
                                    <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                                    <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Username</th>
                                    <th className="px-5 py-3 text-right text-[9px] font-black text-slate-400 uppercase tracking-widest">Opsi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredAdmins.map(admin => (
                                    <tr key={admin.id} className="group hover:bg-slate-50/80 transition-all">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm group-hover:shadow transition-all">
                                                    <UserRound className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 text-[13px]">{admin.fullName}</p>
                                                    <p className="text-slate-400 text-[11px]">{admin.email || '-'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${admin.role === 'super_admin' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-100' : 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'
                                                }`}>
                                                <Shield className="w-2.5 h-2.5" />
                                                {admin.role.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 text-[11px] font-medium font-mono">
                                            @{admin.username}
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => openEdit(admin)}
                                                    className="w-7 h-7 flex items-center justify-center rounded bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                                                >
                                                    <Pencil className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={() => deleteItem('admins', admin.id)}
                                                    className="w-7 h-7 flex items-center justify-center rounded bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredAdmins.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-5 py-12 text-center text-slate-400 text-xs italic">
                                            Tidak ada admin ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={close}>
                    <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-[15px] font-black text-slate-800 tracking-tight">
                                    {editId ? 'Edit Profile Admin' : 'Tambah Admin Baru'}
                                </h2>
                                <p className="text-slate-400 text-[11px] font-medium mt-0.5">
                                    {editId ? 'Ubah username atau perbarui password.' : 'Tambahkan pengelola dashboard baru.'}
                                </p>
                            </div>
                            <button onClick={close} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-800 transition-all">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-5 overflow-y-auto">
                            <form id="admin-form" onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Nama Lengkap</label>
                                    <input required value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} className="w-full px-3 py-2.5 bg-slate-50 border border-transparent rounded-lg text-xs focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium" placeholder="Super Admin" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Username</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">@</span>
                                        <input required value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} className="w-full pl-7 pr-3 py-2.5 bg-slate-50 border border-transparent rounded-lg text-xs focus:bg-white focus:border-emerald-500 transition-all outline-none font-mono font-medium" placeholder="username" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                        <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-transparent rounded-lg text-xs focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium" placeholder="admin@suarhijau.com" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <label className="text-[9px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Password Baru</label>
                                        <span className="text-[8px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded uppercase">Kosongkan jika tidak diubah</span>
                                    </div>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                        <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-transparent rounded-lg text-xs focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium" placeholder="••••••••" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Role Hak Akses</label>
                                    <div className="relative">
                                        <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                                        <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-transparent rounded-lg text-xs focus:bg-white focus:border-emerald-500 transition-all outline-none appearance-none font-medium cursor-pointer">
                                            <option value="super_admin">Super Admin</option>
                                            <option value="staff">Staff</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="px-5 py-3.5 bg-slate-50/50 border-t border-slate-100 flex items-center gap-2.5">
                            <button type="button" onClick={close} className="flex-1 px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-white hover:border-slate-300 transition-all active:scale-95">Batal</button>
                            <button form="admin-form" type="submit" className="flex-[2] px-3.5 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-100 active:scale-95 flex items-center justify-center gap-2">
                                <Save className="w-3.5 h-3.5" /> Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
