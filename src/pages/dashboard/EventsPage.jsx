import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { Plus, Pencil, Trash2, X, Image as ImageIcon, CalendarDays, MapPin, Clock } from 'lucide-react';
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

    const openAdd = () => { setForm(emptyEvent); setEditId(null); setMapPosition(null); setShowForm(true); };
    const openEdit = (item) => {
        const rundown = typeof item.rundown === 'string' ? JSON.parse(item.rundown) : item.rundown;
        const requirements = typeof item.requirements === 'string' ? JSON.parse(item.requirements) : item.requirements;

        // Map snake_case DB columns to camelCase form fields
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-dark-900">Manajemen Event</h1>
                    <p className="text-sm text-dark-400">{data.events.length} event terdaftar</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Tambah Event
                </button>
            </div>

            {loading && <div className="text-center text-dark-500 py-10">Memuat data event...</div>}
            {error && <div className="text-center text-red-500 py-10">Error: {error}</div>}

            {/* Events List */}
            {!loading && !error && (
                <div className="space-y-4">
                    {data.events.map(event => (
                        <div key={event.id} className="bg-white rounded-2xl border border-dark-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-48 h-40 md:h-auto bg-dark-100 flex-shrink-0">
                                    {event.image ? (
                                        <img src={getImageUrl(event.image)} className="w-full h-full object-cover" alt="" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="w-8 h-8 text-dark-300" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${event.status === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-dark-100 text-dark-500'}`}>
                                                    {event.status === 'upcoming' ? 'Mendatang' : 'Selesai'}
                                                </span>
                                                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">{event.price}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-dark-900 mb-2">{event.title}</h3>
                                            <div className="flex flex-wrap gap-3 text-xs text-dark-400">
                                                <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {event.date}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {event.time}</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
                                            </div>
                                            <p className="text-sm text-dark-500 mt-2 line-clamp-2">{event.description}</p>
                                        </div>
                                        <div className="flex gap-1.5 flex-shrink-0">
                                            <button onClick={() => openEdit(event)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-4 h-4 text-blue-500" /></button>
                                            <button onClick={() => deleteItem('events', event.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4 text-red-500" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {data.events.length === 0 && (
                        <div className="py-16 text-center text-dark-400 bg-white rounded-2xl border border-dark-100">
                            Belum ada event. Klik "Tambah Event" untuk memulai.
                        </div>
                    )}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={close}>
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-dark-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                            <h2 className="text-lg font-bold text-dark-900">{editId ? 'Edit Event' : 'Tambah Event'}</h2>
                            <button onClick={close} className="p-2 hover:bg-dark-100 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Judul Event *</label>
                                    <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Tanggal *</label>
                                    <input required type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Waktu</label>
                                    <input value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="07:00 - 11:00 WIB" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Lokasi (Pilih di Peta)</label>
                                    <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none mb-3" placeholder="Klik pada peta atau ketik alamat manual..." />

                                    <div className="h-[250px] w-full rounded-xl overflow-hidden border border-dark-200 z-0 relative">
                                        <MapContainer center={[-7.817342, 112.0223]} zoom={13} style={{ height: '100%', width: '100%', zIndex: 0 }}>
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
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Harga</label>
                                    <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="Gratis / Rp 150.000" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Status</label>
                                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
                                        <option value="upcoming">Mendatang</option>
                                        <option value="completed">Selesai</option>
                                    </select>
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
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Deskripsi Singkat</label>
                                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Deskripsi Lengkap</label>
                                <textarea value={form.fullDescription} onChange={e => setForm(f => ({ ...f, fullDescription: e.target.value }))} rows={4} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none" />
                            </div>

                            {/* Rundown */}
                            <div>
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Rundown Acara</label>
                                {form.rundown.map((item, i) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <input value={item.time} onChange={e => { const arr = [...form.rundown]; arr[i] = { ...arr[i], time: e.target.value }; setForm(f => ({ ...f, rundown: arr })); }} className="w-36 px-3 py-2 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="07:00-08:00" />
                                        <input value={item.activity} onChange={e => { const arr = [...form.rundown]; arr[i] = { ...arr[i], activity: e.target.value }; setForm(f => ({ ...f, rundown: arr })); }} className="flex-1 px-3 py-2 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="Kegiatan..." />
                                        <button type="button" onClick={() => setForm(f => ({ ...f, rundown: f.rundown.filter((_, idx) => idx !== i) }))} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => setForm(f => ({ ...f, rundown: [...f.rundown, { time: '', activity: '' }] }))} className="text-xs text-primary-600 font-semibold">+ Tambah Rundown</button>
                            </div>

                            {/* Requirements */}
                            <div>
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Persyaratan</label>
                                {form.requirements.map((item, i) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <input value={item} onChange={e => { const arr = [...form.requirements]; arr[i] = e.target.value; setForm(f => ({ ...f, requirements: arr })); }} className="flex-1 px-3 py-2 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="Syarat..." />
                                        <button type="button" onClick={() => setForm(f => ({ ...f, requirements: f.requirements.filter((_, idx) => idx !== i) }))} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => setForm(f => ({ ...f, requirements: [...f.requirements, ''] }))} className="text-xs text-primary-600 font-semibold">+ Tambah Persyaratan</button>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-dark-100">
                                <button type="button" onClick={close} className="flex-1 px-4 py-2.5 border border-dark-200 rounded-xl text-sm font-semibold text-dark-600 hover:bg-dark-50 transition-colors">Batal</button>
                                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors">{editId ? 'Simpan' : 'Tambah Event'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
