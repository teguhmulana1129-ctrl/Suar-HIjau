import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import {
    Plus, Pencil, Trash2, X, ChevronDown, ChevronUp, Image as ImageIcon,
    Search, Filter, MapPin, Calendar, Users, Target, Activity, CheckCircle2, Clock
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition, setLocationName }) {
    useMapEvents({
        async click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                const data = await res.json();
                if (data && data.display_name) {
                    setLocationName(data.display_name);
                }
            } catch (error) {
                console.error("Geocoding error: ", error);
            }
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

const emptyProgram = {
    title: '', category: '', location: '', target: '',
    volunteers: 0, startDate: '', image: '',
    fullDescription: '', impact: [''], status: 'upcoming'
};

export default function ProgramsPage() {
    const { data, loading, error, addItem, updateItem, deleteItem, getImageUrl } = useStore();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyProgram);
    const [mapPosition, setMapPosition] = useState(null);
    const [expandedId, setExpandedId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Stats calculations
    const totalPrograms = data.programs.length;
    const activePrograms = data.programs.filter(p => p.status === 'in-progress').length;
    const completedPrograms = data.programs.filter(p => p.status === 'completed').length;

    const filteredPrograms = data.programs.filter(p =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openAdd = () => { setForm(emptyProgram); setEditId(null); setMapPosition(null); setShowForm(true); };
    const openEdit = (item) => {
        const impact = typeof item.impact === 'string' ? JSON.parse(item.impact) : item.impact;
        setForm({
            ...emptyProgram,
            title: item.title || '',
            category: item.category || '',
            location: item.location || '',
            target: item.target || '',
            volunteers: item.volunteers || 0,
            startDate: (item.startDate || item.start_date || '').slice(0, 10),
            image: item.image || '',
            fullDescription: item.fullDescription || item.full_description || '',
            impact: impact || [''],
            status: item.status || 'upcoming'
        });
        setMapPosition(null);
        setEditId(item.id);
        setShowForm(true);
    };

    const close = () => { setShowForm(false); setEditId(null); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateItem('programs', editId, form);
            } else {
                await addItem('programs', form);
            }
            close();
        } catch (err) {
            console.error("Error saving program:", err);
        }
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
        <div className="space-y-8 animate-fade-in pb-10">
            {/* 1. Page Header & Action */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Program</h1>
                    <p className="text-slate-500 text-sm mt-1">Kelola dan pantau seluruh inisiatif lingkungan Suar Hijau.</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
                >
                    <Plus className="w-5 h-5" /> Tambah Program Baru
                </button>
            </div>

            {/* 2. Stats Overview - Premium Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { label: 'Total Program', value: totalPrograms, icon: Activity, color: 'emerald' },
                    { label: 'Sedang Berjalan', value: activePrograms, icon: Clock, color: 'blue' },
                    { label: 'Telah Selesai', value: completedPrograms, icon: CheckCircle2, color: 'amber' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                        <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Search & Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari nama program atau kategori..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-400"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">
                    <Filter className="w-4 h-4" /> Filter
                </button>
            </div>

            {loading && <div className="text-center text-slate-400 py-20 flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="font-medium">Menyinkronkan data...</span>
            </div>}

            {error && <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center font-medium border border-red-100">
                ⚠️ Terjadi kesalahan: {error}
            </div>}

            {/* 4. Airy Table Layout */}
            {!loading && !error && (
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Program & Info</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hidden md:table-cell">Kategori</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hidden lg:table-cell">Target & Peserta</th>
                                    <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-5 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Opsi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredPrograms.map(program => (
                                    <tr key={program.id} className="group hover:bg-slate-50/80 transition-all">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="relative flex-shrink-0">
                                                    {program.image ? (
                                                        <img src={getImageUrl(program.image)} className="w-16 h-16 rounded-2xl object-cover shadow-sm group-hover:shadow-md transition-shadow" alt="" />
                                                    ) : (
                                                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                                                            <ImageIcon className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                                                        <MapPin className="w-3 h-3 text-emerald-600" />
                                                    </div>
                                                </div>
                                                <div className="max-w-[200px] sm:max-w-xs">
                                                    <p className="font-bold text-slate-800 text-base leading-tight mb-1">{program.title}</p>
                                                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>{new Date(program.startDate || program.start_date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 hidden md:table-cell">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold ring-1 ring-emerald-100">
                                                {program.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 hidden lg:table-cell">
                                            <div className="space-y-1.5 font-medium">
                                                <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                                                    <Target className="w-3.5 h-3.5 text-blue-500" />
                                                    <span>{program.target}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-500 text-xs">
                                                    <Users className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>{program.volunteers} Volunteers</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${program.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                                                    program.status === 'in-progress' ? 'bg-blue-100 text-blue-700 animate-pulse' :
                                                        'bg-slate-100 text-slate-700'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${program.status === 'completed' ? 'bg-emerald-500' :
                                                        program.status === 'in-progress' ? 'bg-blue-500' :
                                                            'bg-slate-400'
                                                    }`} />
                                                {program.status === 'completed' ? 'Selesai' : program.status === 'in-progress' ? 'Aktif' : 'Persiapan'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEdit(program)}
                                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all active:scale-90"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => { if (confirm('Hapus program ini?')) deleteItem('programs', program.id) }}
                                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all active:scale-90"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredPrograms.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                                                    <Search className="w-10 h-10 text-slate-200" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800">Tidak ada program ditemukan</p>
                                                    <p className="text-slate-400 text-sm mt-1">Coba sesuaikan kata kunci pencarian Anda.</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 5. Modern Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={close}>
                    <div className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden bg-white rounded-[2.5rem] shadow-2xl flex flex-col animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div className="px-10 py-8 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{editId ? 'Edit Program' : 'Tambah Program Baru'}</h2>
                                <p className="text-slate-400 text-sm font-medium mt-1">Lengkapi informasi inisiatif hijau di bawah ini.</p>
                            </div>
                            <button onClick={close} className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-800 hover:shadow-md transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body - Scrollable */}
                        <div className="flex-1 overflow-y-auto px-10 py-8 custom-scrollbar">
                            <form id="program-form" onSubmit={handleSubmit} className="space-y-10">

                                {/* Section: Dasar */}
                                <div className="space-y-6">
                                    <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">Informasi Dasar</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 ml-1">Nama Program <span className="text-rose-500">*</span></label>
                                            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-emerald-500 transition-all outline-none" placeholder="Contoh: Reboisasi Lereng Kelud" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 ml-1">Kategori Inisiatif <span className="text-rose-500">*</span></label>
                                            <input required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-emerald-500 transition-all outline-none" placeholder="Pendidikan, Konservasi..." />
                                        </div>
                                    </div>
                                </div>

                                {/* Section: Media & Visual */}
                                <div className="space-y-6">
                                    <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">Visual & Ikon</h3>
                                    <div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                        <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 flex-shrink-0">
                                            {form.image ? (
                                                <img src={getImageUrl(form.image)} className="w-full h-full object-cover" alt="" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                                                    <ImageIcon className="w-8 h-8" />
                                                    <span className="text-[10px] font-bold">No Image</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 text-center sm:text-left space-y-3">
                                            <p className="text-sm font-bold text-slate-700">Cover Program</p>
                                            <p className="text-xs text-slate-400">Gunakan gambar berkualitas tinggi untuk menarik minat volunteer. Maksimal 2MB.</p>
                                            <label className="inline-flex items-center gap-2 cursor-pointer bg-white px-5 py-2.5 rounded-xl text-xs font-bold text-emerald-600 border border-emerald-500/20 hover:bg-emerald-50 transition-colors shadow-sm">
                                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                                <Activity className="w-4 h-4" /> Unggah Foto Sekarang
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Section: Lokasi & Waktu */}
                                <div className="space-y-6">
                                    <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">Lokasi & Penjadwalan</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 ml-1">Alamat Lengkap</label>
                                            <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-emerald-500 transition-all outline-none" placeholder="Jl. Raya Bambu No. 1..." />
                                        </div>
                                        <div className="h-[280px] w-full rounded-2xl overflow-hidden border-2 border-slate-100 relative z-0">
                                            <MapContainer center={[-7.817342, 112.0223]} zoom={13} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                <LocationMarker
                                                    position={mapPosition}
                                                    setPosition={setMapPosition}
                                                    setLocationName={(locName) => setForm(f => ({ ...f, location: locName }))}
                                                />
                                            </MapContainer>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-700 ml-1">Tanggal Mulai</label>
                                                <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-emerald-500 transition-all outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-700 ml-1">Target Capaian</label>
                                                <input value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-emerald-500 transition-all outline-none" placeholder="1000 Pohon, 2 Ton Sampah..." />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section: Deskripsi & Status */}
                                <div className="space-y-6">
                                    <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">Detail & Progress</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 ml-1">Kebutuhan Volunteer</label>
                                            <input type="number" value={form.volunteers} onChange={e => setForm(f => ({ ...f, volunteers: Number(e.target.value) }))} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-emerald-500 transition-all outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 ml-1">Status Proyek</label>
                                            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-emerald-500 transition-all outline-none appearance-none">
                                                <option value="upcoming">Akan Datang</option>
                                                <option value="in-progress">Berjalan</option>
                                                <option value="completed">Selesai</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1">Narasi Program</label>
                                        <textarea value={form.fullDescription} onChange={e => setForm(f => ({ ...f, fullDescription: e.target.value }))} rows={5} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-emerald-500 transition-all outline-none resize-none" placeholder="Ceritakan tujuan dan visi dari program ini..." />
                                    </div>
                                </div>

                                {/* Section: Dampak */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">Indikator Dampak</h3>
                                        <button type="button" onClick={() => setForm(f => ({ ...f, impact: [...f.impact, ''] }))} className="text-xs text-emerald-600 font-black hover:text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">
                                            <Plus className="w-3.5 h-3.5" /> Tambah Indikator
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {form.impact.map((item, i) => (
                                            <div key={i} className="flex gap-3 group animate-in slide-in-from-left-5 duration-300" style={{ animationDelay: `${i * 50}ms` }}>
                                                <div className="relative flex-1">
                                                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <input value={item} onChange={e => { const arr = [...form.impact]; arr[i] = e.target.value; setForm(f => ({ ...f, impact: arr })); }} className="w-full pl-5 group-hover:pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-emerald-500 transition-all outline-none" placeholder="Contoh: Mengurangi 500kg emisi CO2..." />
                                                </div>
                                                <button type="button" onClick={() => setForm(f => ({ ...f, impact: f.impact.filter((_, idx) => idx !== i) }))} className="w-14 h-14 flex items-center justify-center bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-100 flex items-center gap-4">
                            <button type="button" onClick={close} className="flex-1 px-6 py-4 border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-white hover:border-slate-300 transition-all active:scale-95">Batal</button>
                            <button form="program-form" type="submit" className="flex-[2] px-6 py-4 bg-emerald-600 text-white rounded-2xl text-sm font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95">
                                {editId ? 'Perbarui Data Program' : 'Konfirmasi & Terbitkan Program'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
