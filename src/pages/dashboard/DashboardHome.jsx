import { useStore } from '../../hooks/useStore';
import { FolderTree, ShoppingBag, CalendarDays, Newspaper, Users, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const statConfigs = [
    {
        label: 'Program',
        icon: FolderTree,
        link: '/dashboard/programs',
        gradient: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
        glow: 'rgba(34,197,94,0.3)',
        bg: 'rgba(34,197,94,0.08)',
        text: '#15803d',
    },
    {
        label: 'Produk',
        icon: ShoppingBag,
        link: '/dashboard/products',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        glow: 'rgba(59,130,246,0.3)',
        bg: 'rgba(59,130,246,0.08)',
        text: '#1d4ed8',
    },
    {
        label: 'Event',
        icon: CalendarDays,
        link: '/dashboard/events',
        gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
        glow: 'rgba(168,85,247,0.3)',
        bg: 'rgba(168,85,247,0.08)',
        text: '#7c3aed',
    },
    {
        label: 'Berita',
        icon: Newspaper,
        link: '/dashboard/news',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        glow: 'rgba(245,158,11,0.3)',
        bg: 'rgba(245,158,11,0.08)',
        text: '#d97706',
    },
    {
        label: 'Anggota Tim',
        icon: Users,
        link: '/dashboard/team',
        gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        glow: 'rgba(239,68,68,0.3)',
        bg: 'rgba(239,68,68,0.08)',
        text: '#dc2626',
    },
];

function getTodayID() {
    const hari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    const d = new Date();
    return `${hari[d.getDay()]}, ${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

export default function DashboardHome() {
    const { data, loading, error } = useStore();

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 gap-2.5">
            <div className="w-6 h-6 rounded-full border-2 border-green-200 border-t-green-500 animate-spin" />
            <p className="text-slate-400 text-xs font-medium">Memuat data dashboard...</p>
        </div>
    );
    if (error) return (
        <div className="flex justify-center py-16 text-red-500 text-xs">Error: {error}</div>
    );

    const statsData = [
        { ...statConfigs[0], count: data.programs?.length || 0 },
        { ...statConfigs[1], count: data.products?.length || 0 },
        { ...statConfigs[2], count: data.events?.length || 0 },
        { ...statConfigs[3], count: data.news?.length || 0 },
        { ...statConfigs[4], count: data.team?.length || 0 },
    ];

    const recentEvents = data.events.filter(e => e.status === 'upcoming').slice(0, 3);
    const recentNews = data.news.slice(0, 3);

    return (
        <div className="space-y-4 page-fade-in pb-8">
            {/* Welcome Banner */}
            <div
                className="rounded-2xl text-white relative overflow-hidden"
                style={{ boxShadow: '0 8px 32px rgba(10,31,18,0.25)', minHeight: 140 }}
            >
                {/* Background */}
                <div className="absolute inset-0 z-0" style={{ backgroundColor: '#022c22' }} />

                {/* Bamboo Photo */}
                <img
                    src="/bamboo-bg.png"
                    alt="Pohon Bambu SuaR Hijau"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
                    style={{ filter: 'contrast(1.1) brightness(1.0) saturate(1.1)' }}
                />

                {/* Left gradient for text readability only */}
                <div className="absolute inset-0 pointer-events-none z-0"
                    style={{ background: 'linear-gradient(90deg, rgba(2,44,34,0.78) 0%, rgba(2,44,34,0.35) 55%, rgba(2,44,34,0.0) 80%)' }} />

                {/* Content */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 lg:p-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-green-300 text-[9px] font-bold uppercase tracking-[0.2em] opacity-90">
                                Selamat Datang Di
                            </span>
                            <span
                                className="inline-flex items-center gap-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-black/40 border border-green-500/30 backdrop-blur-md"
                                style={{ color: '#4ade80' }}
                            >
                                <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
                                Sistem Aktif
                            </span>
                        </div>
                        <h1 className="text-xl lg:text-2xl font-extrabold mb-1.5 tracking-tight drop-shadow-md">
                            Dashboard SuaR Hijau
                        </h1>
                        <p className="max-w-xl text-[11px] leading-relaxed text-emerald-100/80 font-medium">
                            Kelola konten website Suar Hijau — program, produk, event, berita, dan tim
                            <br className="hidden sm:block" />— semua dari satu tempat.
                        </p>
                        <p className="text-[10px] text-emerald-300/60 mt-2 font-medium">{getTodayID()}</p>
                    </div>

                    {/* Total Konten */}
                    <div
                        className="relative flex-shrink-0 flex flex-col items-center justify-center px-5 py-3 rounded-xl backdrop-blur-md"
                        style={{
                            background: 'rgba(0,0,0,0.45)',
                            border: '1px solid rgba(34,197,94,0.3)',
                            boxShadow: '0 0 20px rgba(34,197,94,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
                            minWidth: 100,
                        }}
                    >
                        <div className="flex items-center gap-1.5 mb-1">
                            <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-2xl font-black text-white leading-none tracking-tight">
                                {statsData.reduce((a, s) => a + s.count, 0)}
                            </span>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#4ade80' }}>
                            Total Konten
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {statsData.map(stat => (
                    <Link
                        key={stat.label}
                        to={stat.link}
                        className="group bg-white rounded-lg p-3 border border-slate-100 transition-all duration-300 hover:-translate-y-1"
                        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                        onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = `0 8px 24px ${stat.glow}`;
                            e.currentTarget.style.borderColor = 'transparent';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                            e.currentTarget.style.borderColor = '#f1f5f9';
                        }}
                    >
                        <div className="flex items-start justify-between mb-2.5">
                            <div
                                className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                                style={{ background: stat.gradient, boxShadow: `0 3px 10px ${stat.glow}` }}
                            >
                                <stat.icon className="w-3.5 h-3.5 text-white" />
                            </div>
                            <ArrowUpRight
                                className="w-3 h-3 transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                                style={{ color: stat.text }}
                            />
                        </div>
                        <p className="text-xl font-bold text-slate-900 leading-none mb-1">{stat.count}</p>
                        <p className="text-[9px] font-medium" style={{ color: '#94a3b8' }}>{stat.label}</p>
                    </Link>
                ))}
            </div>

            {/* Bottom Grid */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Upcoming Events */}
                <div className="bg-white rounded-xl border border-slate-100 p-4"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)', boxShadow: '0 2px 6px rgba(168,85,247,0.3)' }}>
                            <CalendarDays className="w-2.5 h-2.5 text-white" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-[13px] flex-1">Event Mendatang</h3>
                        <Link to="/dashboard/events" className="text-[9px] font-semibold text-green-600 hover:text-green-700 transition-colors flex items-center gap-0.5">
                            Lihat Semua <ArrowUpRight className="w-2.5 h-2.5" />
                        </Link>
                    </div>

                    {recentEvents.length === 0 ? (
                        <div className="flex flex-col items-center py-4 gap-2">
                            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="8" y="16" width="48" height="40" rx="6" fill="#f3e8ff" />
                                <rect x="8" y="16" width="48" height="12" rx="6" fill="#e9d5ff" />
                                <rect x="20" y="8" width="6" height="12" rx="3" fill="#a855f7" />
                                <rect x="38" y="8" width="6" height="12" rx="3" fill="#a855f7" />
                                <rect x="16" y="36" width="12" height="3" rx="1.5" fill="#d8b4fe" />
                                <rect x="16" y="44" width="20" height="3" rx="1.5" fill="#e9d5ff" />
                            </svg>
                            <p className="text-[11px] font-medium text-slate-400">Belum ada event mendatang</p>
                            <Link to="/dashboard/events"
                                className="text-[9px] font-semibold px-2 py-1 rounded transition-colors mt-0.5"
                                style={{ background: 'rgba(168,85,247,0.1)', color: '#7c3aed' }}>
                                + Tambah Event
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {recentEvents.map(event => (
                                <div
                                    key={event.id}
                                    className="flex items-start gap-2 p-2 rounded-lg transition-all duration-200 cursor-default border border-transparent hover:border-slate-100"
                                    style={{ background: '#fafafa' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f5f3ff'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#fafafa'}
                                >
                                    <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'rgba(168,85,247,0.1)' }}>
                                        <CalendarDays className="w-3 h-3" style={{ color: '#7c3aed' }} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-semibold text-slate-800 truncate">{event.title}</p>
                                        <p className="text-[9px] text-slate-400 mt-0.5">{event.date} · {event.location}</p>
                                    </div>
                                    <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0"
                                        style={{ background: 'rgba(34,197,94,0.12)', color: '#15803d' }}>
                                        {event.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent News */}
                <div className="bg-white rounded-xl border border-slate-100 p-4"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', boxShadow: '0 2px 6px rgba(245,158,11,0.3)' }}>
                            <Newspaper className="w-2.5 h-2.5 text-white" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-[13px] flex-1">Berita Terbaru</h3>
                        <Link to="/dashboard/news" className="text-[9px] font-semibold text-green-600 hover:text-green-700 transition-colors flex items-center gap-0.5">
                            Lihat Semua <ArrowUpRight className="w-2.5 h-2.5" />
                        </Link>
                    </div>

                    {recentNews.length === 0 ? (
                        <div className="flex flex-col items-center py-4 gap-2">
                            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="8" y="10" width="48" height="44" rx="6" fill="#fef3c7" />
                                <rect x="16" y="20" width="32" height="4" rx="2" fill="#fde68a" />
                                <rect x="16" y="28" width="24" height="3" rx="1.5" fill="#fef08a" />
                                <rect x="16" y="35" width="28" height="3" rx="1.5" fill="#fef08a" />
                                <rect x="16" y="42" width="16" height="3" rx="1.5" fill="#fed7aa" />
                                <circle cx="46" cy="46" r="10" fill="#f59e0b" />
                                <path d="M46 41v6M46 50v1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <p className="text-[11px] font-medium text-slate-400">Belum ada berita</p>
                            <Link to="/dashboard/news"
                                className="text-[9px] font-semibold px-2 py-1 rounded transition-colors mt-0.5"
                                style={{ background: 'rgba(245,158,11,0.1)', color: '#d97706' }}>
                                + Tambah Berita
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {recentNews.map(news => (
                                <div
                                    key={news.id}
                                    className="flex items-start gap-2 p-2 rounded-lg transition-all duration-200 cursor-default border border-transparent hover:border-slate-100"
                                    style={{ background: '#fafafa' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#fffbeb'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#fafafa'}
                                >
                                    <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'rgba(245,158,11,0.1)' }}>
                                        <Newspaper className="w-3 h-3" style={{ color: '#d97706' }} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-semibold text-slate-800 truncate">{news.title}</p>
                                        <p className="text-[9px] text-slate-400 mt-0.5">{news.author} · {news.date}</p>
                                    </div>
                                    <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0"
                                        style={{ background: 'rgba(59,130,246,0.1)', color: '#1d4ed8' }}>
                                        {news.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
