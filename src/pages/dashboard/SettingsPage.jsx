import { useState } from 'react';
import { 
    Save, Globe, Mail, Phone, MapPin, 
    Facebook, Instagram, Youtube, Twitter, 
    Palette, Type, Sliders
} from 'lucide-react';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        siteName: 'SuaR Hijau',
        tagline: 'Gema Lingkungan Untuk Masa Depan',
        email: 'info@suarhijau.com',
        phone: '+62 812 3456 7890',
        address: 'Kediri, Jawa Timur, Indonesia',
        facebook: 'https://facebook.com/suarhijau',
        instagram: 'https://instagram.com/suarhijau',
        youtube: 'https://youtube.com/suarhijau'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        alert('Pengaturan berhasil disimpan!');
    };

    return (
        <div className="space-y-5 animate-fade-in pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Pengaturan App</h1>
                    <p className="text-slate-500 text-xs mt-0.5">Konfigurasi informasi umum dan tampilan website.</p>
                </div>
                <button 
                    onClick={handleSave}
                    className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-100"
                >
                    <Save className="w-3.5 h-3.5" /> Simpan Perubahan
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* General Settings */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-5 py-3 border-b border-slate-50 bg-slate-50/30 flex items-center gap-2">
                            <Globe className="w-3.5 h-3.5 text-emerald-600" />
                            <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">Informasi Umum</h3>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Nama Website</label>
                                    <input name="siteName" value={settings.siteName} onChange={handleChange} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Tagline</label>
                                    <input name="tagline" value={settings.tagline} onChange={handleChange} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Alamat Kantor</label>
                                <textarea name="address" value={settings.address} onChange={handleChange} rows={2} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium resize-none" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Email Kontak</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                        <input name="email" value={settings.email} onChange={handleChange} className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">No. WhatsApp</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                        <input name="phone" value={settings.phone} onChange={handleChange} className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:bg-white focus:border-emerald-500 transition-all outline-none font-medium" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-5 py-3 border-b border-slate-50 bg-slate-50/30 flex items-center gap-2">
                            <Palette className="w-3.5 h-3.5 text-emerald-600" />
                            <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">Media Sosial</h3>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                                        <Facebook className="w-4 h-4" />
                                    </div>
                                    <input name="facebook" value={settings.facebook} onChange={handleChange} placeholder="URL Facebook" className="flex-1 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:bg-white focus:border-emerald-500 transition-all outline-none" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 border border-pink-100">
                                        <Instagram className="w-4 h-4" />
                                    </div>
                                    <input name="instagram" value={settings.instagram} onChange={handleChange} placeholder="URL Instagram" className="flex-1 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:bg-white focus:border-emerald-500 transition-all outline-none" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 border border-red-100">
                                        <Youtube className="w-4 h-4" />
                                    </div>
                                    <input name="youtube" value={settings.youtube} onChange={handleChange} placeholder="URL Youtube" className="flex-1 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs focus:bg-white focus:border-emerald-500 transition-all outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Information Sidebar */}
                <div className="space-y-5">
                    <div className="bg-emerald-900 text-white rounded-xl p-5 shadow-lg shadow-emerald-100 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4">
                                <Sliders className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h3 className="font-bold text-sm mb-1">Pusat Kontrol Suar Hijau</h3>
                            <p className="text-emerald-100/70 text-[11px] leading-relaxed">
                                Pastikan informasi kontak dan media sosial selalu terupdate agar audiens mudah menghubungi Anda.
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <div className="flex items-center justify-between text-[10px] font-bold">
                                    <span className="text-emerald-300">Terakhir Update:</span>
                                    <span>Hari ini, 19:45</span>
                                </div>
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">App Info</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-[11px]">
                                <span className="text-slate-500 font-medium">Versi Dashboard</span>
                                <span className="text-slate-900 font-bold">v2.4.1 (Stable)</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px]">
                                <span className="text-slate-500 font-medium">Environment</span>
                                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-black">PRODUCTION</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px]">
                                <span className="text-slate-500 font-medium">Server Latency</span>
                                <span className="text-emerald-600 font-bold">12ms</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
