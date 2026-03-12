import { useState, useMemo } from 'react';
import { useStore } from '../../hooks/useStore';
import {
    Plus, Pencil, Trash2, X, Image as ImageIcon,
    CalendarDays, MapPin, Clock, Search, Filter,
    CheckCircle2, AlertCircle, Info, Calendar as CalendarIcon,
    Users, Activity
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

const emptyEvent = {
    title: '', date: '', time: '', location: '', image: '',
    description: '', fullDescription: '',
    rundown: [{ time: '', activity: '' }],
    requirements: [''],
    price: 'Gratis', status: 'upcoming'
};

export default function EventsPage() {
    const { data, loading, error, addItem, updateItem, deleteItem, getImageUrl } = useStore();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyEvent);
    const [mapPosition, setMapPosition] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Stats Calculation
    const stats = useMemo(() => {
        const total = data.events.length;
        const mendatang = data.events.filter(e => e.status === 'upcoming').length;
        const selesai = data.events.filter(e => e.status === 'completed').length;
        return { total, mendatang, selesai };
    }, [data.events]);

    // Filtering logic
    const filteredEvents = useMemo(() => {
        return data.events.filter(item =>
            item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data.events, searchQuery]);

    const openAdd = () => { setForm(emptyEvent); setEditId(null); setMapPosition(null); setShowForm(true); };
    const openEdit = (item) => {
        const rundown = typeof item.rundown === 'string' ? JSON.parse(item.rundown) : item.rundown;
        const requirements = typeof item.requirements === 'string' ? JSON.parse(item.requirements) : item.requirements;

        setForm({
            ...emptyEvent,
            title: item.title || '',
            date: (item.date || '').slice(0, 10),
            time: item.time || '',
            location: item.location || '',
            image: item.image || '',
            description: item.description || '',
            fullDescription: item.fullDescription || item.full_description || '',
            rundown: rundown || [{ time: '', activity: '' }],
            requirements: requirements || [''],
            price: item.price || 'Gratis',
            status: item.status || 'upcoming'
        });
        setMapPosition(null);
        setEditId(item.id);
        setShowForm(true);
    };
    const close = () => { setShowForm(false); setEditId(null); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) await updateItem('events', editId, form);
        else await addItem('events', form);
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
        <div className="space-y-5 animate-in fade-in duration-500 pb-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-0.5">
                    <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-dark-900 to-primary-800 bg-clip-text text-transparent">
                        Manajemen Event
                    </h1>
                    <p className="text-xs text-dark-500 font-medium">
                        Atur inisiatif kegiatan lingkungan dan komunitas.
                    </p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white px-3.5 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm active:scale-95"
                >
                    <Plus className="w-3.5 h-3.5" /> Buat Event
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                    { label: 'TOTAL EVENT', value: stats.total, icon: CalendarIcon, color: 'emerald', bg: 'bg-emerald-50' },
                    { label: 'MENDATANG', value: stats.mendatang, icon: Activity, color: 'blue', bg: 'bg-blue-50' },
                    { label: 'TELAH SELESAI', value: stats.selesai, icon: CheckCircle2, color: 'rose', bg: 'bg-rose-50' },
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

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-2.5 items-center bg-white p-1.5 rounded-xl border border-dark-100 shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark-400" />
                    <input
                        type="text"
                        placeholder="Cari judul event atau lokasi..."
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
                    <p className="text-xs text-dark-400 font-medium tracking-wide">Menghubungkan kalender kegiatan...</p>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 text-xs text-rose-600 rounded-xl border border-rose-100 italic font-medium">
                    <AlertCircle className="w-4 h-4" /> Kendala sistem: {error}
                </div>
            )}

            {/* Events List */}
            {!loading && !error && (
                <div className="space-y-3">
                    {filteredEvents.map(event => (
                        <div key={event.id} className="bg-white rounded-xl border border-dark-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                            <div className="flex flex-col sm:flex-row">
                                <div className="sm:w-48 h-40 sm:h-auto bg-dark-50 flex-shrink-0 relative overflow-hidden p-2">
                                    <div className="w-full h-full rounded-lg overflow-hidden">
                                        {event.image ? (
                                            <img src={getImageUrl(event.image)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-dark-100">
                                                <ImageIcon className="w-6 h-6 text-dark-300" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded shadow-sm tracking-tight uppercase ${event.status === 'upcoming' ? 'bg-emerald-500 text-white' : 'bg-dark-500 text-white'
                                            }`}>
                                            {event.status === 'upcoming' ? 'Mendatang' : 'Selesai'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1 p-4">
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <div>
                                                <div className="flex items-center gap-1.5 mb-1.5">
                                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary-50 text-primary-700 uppercase tracking-wider">{event.price}</span>
                                                    <span className="text-[9px] font-bold text-dark-400 flex items-center gap-1 uppercase tracking-wider"><Clock className="w-3 h-3" /> {event.time}</span>
                                                </div>
                                                <h3 className="text-[15px] font-bold text-dark-900 group-hover:text-primary-600 transition-colors mb-1.5 leading-tight">{event.title}</h3>
                                                <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-dark-500">
                                                    <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5 text-primary-500" /> {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary-500" /> {event.location}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openEdit(event)} className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"><Pencil className="w-3.5 h-3.5" /></button>
                                                <button onClick={() => deleteItem('events', event.id)} className="p-1.5 bg-rose-50 text-rose-600 rounded-md hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95"><Trash2 className="w-3.5 h-3.5" /></button>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-dark-500 leading-relaxed font-medium line-clamp-2 mb-3">
                                            {event.description || event.fullDescription || 'Belum ada deskripsi.'}
                                        </p>

                                        {/* Tampilkan Rundown Singkat */}
                                        {event.rundown && Array.isArray(event.rundown) && event.rundown.length > 0 && event.rundown[0].activity && (
                                            <div className="mb-3">
                                                <p className="text-[10px] font-bold text-dark-900 tracking-wider uppercase mb-1.5 flex items-center gap-1.5 border-b border-dark-100 pb-1">
                                                    <Clock className="w-3.5 h-3.5 text-primary-500" /> Rundown Singkat
                                                </p>
                                                <div className="space-y-1.5">
                                                    {event.rundown.slice(0, 3).map((r, i) => (
                                                        <div key={i} className="flex items-start gap-2 text-[10px]">
                                                            <span className="font-bold text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded whitespace-nowrap">{r.time}</span>
                                                            <span className="text-dark-600 font-medium leading-tight pt-0.5">{r.activity}</span>
                                                        </div>
                                                    ))}
                                                    {event.rundown.length > 3 && (
                                                        <p className="text-[10px] font-medium text-dark-400 italic pt-1">
                                                            + {event.rundown.length - 3} agenda lainnya...
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-auto pt-3 border-t border-dark-100 flex items-center justify-end">
                                            <button onClick={() => openEdit(event)} className="text-[11px] font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 group/btn">
                                                Detail Rundown <Info className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredEvents.length === 0 && (
                        <div className="py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-dark-200">
                            <div className="w-12 h-12 bg-dark-50 rounded-full flex items-center justify-center mb-2.5">
                                <CalendarIcon className="w-5 h-5 text-dark-400" />
                            </div>
                            <h3 className="text-[15px] font-bold text-dark-900 mb-0.5">Event Tidak Ditemukan</h3>
                            <p className="text-xs text-dark-500 font-medium">Belum ada agenda untuk pencarian "{searchQuery}"</p>
                            <button onClick={openAdd} className="mt-4 px-4 py-2 text-xs bg-primary-50 text-primary-700 font-semibold rounded-lg hover:bg-primary-100 transition-colors">
                                Buat Event Baru
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
                                    <CalendarIcon className="w-4 h-4 text-primary-600" />
                                </div>
                                <div>
                                    <h2 className="text-[15px] font-bold text-dark-900">{editId ? 'Edit Rencana Event' : 'Publikasi Event Baru'}</h2>
                                    <p className="text-[11px] text-dark-500 font-medium">Kontribusi nyata untuk lingkungan hidup.</p>
                                </div>
                            </div>
                            <button onClick={close} className="p-1.5 hover:bg-dark-100 rounded-md transition-colors text-dark-500">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5 custom-scrollbar">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2 space-y-1">
                                    <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">JUDUL EVENT *</label>
                                    <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-semibold text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none" placeholder="Misal: Penanaman 1000 Bibit Bambu" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">TANGGAL PELAKSANAAN *</label>
                                    <input required type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-semibold text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">WAKTU ACARA</label>
                                    <input value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-semibold text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none" placeholder="08:00 - 12:00 WIB" />
                                </div>
                                <div className="sm:col-span-2 space-y-1.5">
                                    <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">LOKASI KEGIATAN (PETA INTERAKTIF)</label>
                                    <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-medium text-dark-900 mb-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="Gunakan peta atau ketik manual..." />
                                    <div className="h-[180px] w-full rounded-lg overflow-hidden border border-dark-200 relative z-0 shadow-sm">
                                        <MapContainer center={[-7.817342, 112.0223]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <LocationMarker
                                                position={mapPosition}
                                                setPosition={setMapPosition}
                                                setLocationName={(locName) => setForm(f => ({ ...f, location: locName }))}
                                            />
                                        </MapContainer>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">BIAYA REGISTRASI</label>
                                    <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-semibold text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none" placeholder="Gratis / Nominal" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">STATUS EVENT</label>
                                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-semibold text-dark-900 transition-all outline-none cursor-pointer focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                                        <option value="upcoming">Mendatang</option>
                                        <option value="completed">Telah Selesai</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">POSTER EVENT</label>
                                <div className="flex flex-col sm:flex-row items-center gap-4 p-2.5 bg-dark-50 rounded-lg border border-dark-100">
                                    <div className="w-20 h-20 rounded-md bg-white border border-dashed border-dark-300 flex items-center justify-center overflow-hidden">
                                        {form.image ? (
                                            <img src={getImageUrl(form.image)} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <ImageIcon className="w-5 h-5 text-dark-300" />
                                        )}
                                    </div>
                                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-dark-900 text-white rounded-lg font-semibold cursor-pointer hover:bg-dark-800 transition-colors text-xs shadow-sm">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        Unggah Poster
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">DESKRIPSI EVENT</label>
                                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-3 py-2 bg-white border border-dark-200 rounded-lg text-xs font-medium text-dark-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none resize-none" placeholder="Berikan rincian menarik tentang event ini..." />
                            </div>

                            {/* Rundown Section */}
                            <div className="space-y-2 p-4 bg-dark-50/50 rounded-xl border border-dark-100">
                                <label className="text-[9px] font-bold text-dark-500 tracking-wider uppercase">RUNDOWN ACARA</label>
                                {form.rundown.map((item, i) => (
                                    <div key={i} className="flex gap-1.5 bg-white p-1.5 rounded-lg shadow-sm border border-dark-100">
                                        <input value={item.time} onChange={e => { const arr = [...form.rundown]; arr[i] = { ...arr[i], time: e.target.value }; setForm(f => ({ ...f, rundown: arr })); }} className="w-24 px-2 py-1.5 bg-dark-50 border-transparent rounded-md text-[11px] font-semibold outline-none focus:ring-2 focus:ring-primary-400" placeholder="07:00-08:00" />
                                        <input value={item.activity} onChange={e => { const arr = [...form.rundown]; arr[i] = { ...arr[i], activity: e.target.value }; setForm(f => ({ ...f, rundown: arr })); }} className="flex-1 px-2 py-1.5 bg-dark-50 border-transparent rounded-md text-[11px] font-medium outline-none focus:ring-2 focus:ring-primary-400" placeholder="Kegiatan..." />
                                        <button type="button" onClick={() => setForm(f => ({ ...f, rundown: f.rundown.filter((_, idx) => idx !== i) }))} className="p-1.5 bg-rose-50 text-rose-500 rounded-md hover:bg-rose-500 hover:text-white transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => setForm(f => ({ ...f, rundown: [...f.rundown, { time: '', activity: '' }] }))} className="w-full py-2 border border-dashed border-dark-300 rounded-lg text-[11px] font-bold text-dark-500 hover:border-primary-500 hover:text-primary-600 transition-colors bg-white hover:bg-primary-50">+ Tambah Sesi Rundown</button>
                            </div>

                            <div className="flex justify-end gap-2.5 pt-3 border-t border-dark-100">
                                <button type="button" onClick={close} className="px-4 py-2 bg-white border border-dark-200 text-dark-700 rounded-lg text-xs font-semibold hover:bg-dark-50 transition-colors">Batal</button>
                                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-xs font-semibold hover:bg-primary-700 shadow-sm active:scale-95 transition-all outline-none">
                                    {editId ? 'Simpan Perubahan' : 'Publikasikan Kegiatan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
