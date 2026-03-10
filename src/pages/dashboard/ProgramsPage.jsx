import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
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

    const openAdd = () => { setForm(emptyProgram); setEditId(null); setMapPosition(null); setShowForm(true); };
    const openEdit = (item) => {
        // JSON parsing to safely handle arrays from PostgreSQL
        const impact = typeof item.impact === 'string' ? JSON.parse(item.impact) : item.impact;

        // Map snake_case DB columns to camelCase form fields
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
        if (editId) {
            await updateItem('programs', editId, form);
        } else {
            await addItem('programs', form);
        }
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
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-dark-900">Manajemen Program</h1>
                    <p className="text-sm text-dark-400">{data.programs.length} program terdaftar</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Tambah Program
                </button>
            </div>

            {loading && <div className="text-center text-dark-500 py-10">Memuat data program...</div>}
            {error && <div className="text-center text-red-500 py-10">Error: {error}</div>}

            {/* Table */}
            {!loading && !error && (
                <div className="bg-white rounded-2xl border border-dark-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-dark-100 bg-dark-50/50">
                                    <th className="text-left px-5 py-3.5 font-semibold text-dark-500 text-xs uppercase tracking-wider">Program</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-dark-500 text-xs uppercase tracking-wider hidden md:table-cell">Kategori</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-dark-500 text-xs uppercase tracking-wider hidden lg:table-cell">Lokasi</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-dark-500 text-xs uppercase tracking-wider">Status</th>
                                    <th className="text-right px-5 py-3.5 font-semibold text-dark-500 text-xs uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-100">
                                {data.programs.map(program => (
                                    <tr key={program.id} className="hover:bg-dark-50/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {program.image ? (
                                                    <img src={getImageUrl(program.image)} className="w-10 h-10 rounded-lg object-cover" alt="" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                                                        <ImageIcon className="w-4 h-4 text-primary-500" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-semibold text-dark-900">{program.title}</p>
                                                    <p className="text-xs text-dark-400 md:hidden">{program.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 hidden md:table-cell">
                                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary-50 text-primary-700">
                                                {program.category}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-dark-600 hidden lg:table-cell">{program.location}</td>
                                        <td className="px-5 py-4">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${program.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                program.status === 'in-progress' ? 'bg-primary-100 text-primary-700' :
                                                    'bg-dark-100 text-dark-700'
                                                }`}>
                                                {program.status === 'completed' ? 'Selesai' : program.status === 'in-progress' ? 'Berjalan' : 'Akan Datang'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => setExpandedId(expandedId === program.id ? null : program.id)} className="p-2 hover:bg-dark-100 rounded-lg transition-colors">
                                                    {expandedId === program.id ? <ChevronUp className="w-4 h-4 text-dark-400" /> : <ChevronDown className="w-4 h-4 text-dark-400" />}
                                                </button>
                                                <button onClick={() => openEdit(program)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Pencil className="w-4 h-4 text-blue-500" />
                                                </button>
                                                <button onClick={() => deleteItem('programs', program.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {data.programs.length === 0 && (
                                    <tr><td colSpan={5} className="px-5 py-10 text-center text-dark-400">Belum ada program. Klik "Tambah Program" untuk memulai.</td></tr>
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
                            <h2 className="text-lg font-bold text-dark-900">{editId ? 'Edit Program' : 'Tambah Program'}</h2>
                            <button onClick={close} className="p-2 hover:bg-dark-100 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Judul Program *</label>
                                    <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="Nama program..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Kategori *</label>
                                    <input required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="Konservasi, Pendidikan..." />
                                </div>
                                <div className="col-span-1 md:col-span-2">
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
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Tanggal Mulai</label>
                                    <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Target</label>
                                    <input value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="1000 Pohon" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Jumlah Volunteer</label>
                                    <input type="number" value={form.volunteers} onChange={e => setForm(f => ({ ...f, volunteers: Number(e.target.value) }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-dark-500 mb-1.5">Status</label>
                                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
                                        <option value="upcoming">Akan Datang</option>
                                        <option value="in-progress">Berjalan</option>
                                        <option value="completed">Selesai</option>
                                    </select>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Gambar Program</label>
                                <div className="flex items-center gap-4">
                                    {form.image && <img src={getImageUrl(form.image)} className="w-20 h-20 rounded-xl object-cover" alt="" />}
                                    <label className="cursor-pointer px-4 py-2 border-2 border-dashed border-dark-200 rounded-xl text-sm text-dark-500 hover:border-primary-500 hover:text-primary-600 transition-colors">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        📁 Pilih Gambar
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Deskripsi Lengkap</label>
                                <textarea value={form.fullDescription} onChange={e => setForm(f => ({ ...f, fullDescription: e.target.value }))} rows={4} className="w-full px-3 py-2.5 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none" />
                            </div>

                            {/* Impact - Dynamic Array */}
                            <div>
                                <label className="block text-xs font-semibold text-dark-500 mb-1.5">Dampak Program</label>
                                {form.impact.map((item, i) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <input value={item} onChange={e => { const arr = [...form.impact]; arr[i] = e.target.value; setForm(f => ({ ...f, impact: arr })); }} className="flex-1 px-3 py-2 border border-dark-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" placeholder="Dampak..." />
                                        <button type="button" onClick={() => setForm(f => ({ ...f, impact: f.impact.filter((_, idx) => idx !== i) }))} className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => setForm(f => ({ ...f, impact: [...f.impact, ''] }))} className="text-xs text-primary-600 font-semibold hover:text-primary-700">+ Tambah Dampak</button>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-dark-100">
                                <button type="button" onClick={close} className="flex-1 px-4 py-2.5 border border-dark-200 rounded-xl text-sm font-semibold text-dark-600 hover:bg-dark-50 transition-colors">Batal</button>
                                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors">
                                    {editId ? 'Simpan Perubahan' : 'Tambah Program'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
