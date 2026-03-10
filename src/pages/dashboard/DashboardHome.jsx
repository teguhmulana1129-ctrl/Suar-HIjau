import { useStore } from '../../hooks/useStore';
import { FolderTree, ShoppingBag, CalendarDays, Newspaper, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardHome() {
    const { data, loading, error } = useStore();

    if (loading) return <div className="flex justify-center py-20 text-dark-500">Memuat data dashboard...</div>;
    if (error) return <div className="flex justify-center py-20 text-red-500">Error: {error}</div>;

    const stats = [
        { label: 'Program', count: data.programs?.length || 0, icon: FolderTree, color: 'bg-emerald-500', link: '/dashboard/programs' },
        { label: 'Produk', count: data.products?.length || 0, icon: ShoppingBag, color: 'bg-blue-500', link: '/dashboard/products' },
        { label: 'Event', count: data.events?.length || 0, icon: CalendarDays, color: 'bg-purple-500', link: '/dashboard/events' },
        { label: 'Berita', count: data.news?.length || 0, icon: Newspaper, color: 'bg-orange-500', link: '/dashboard/news' },
        { label: 'Anggota Tim', count: data.team?.length || 0, icon: Users, color: 'bg-pink-500', link: '/dashboard/team' },
    ];

    const recentEvents = data.events.filter(e => e.status === 'upcoming').slice(0, 3);
    const recentNews = data.news.slice(0, 3);

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-dark-900 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
                <div className="relative">
                    <p className="text-primary-200 text-sm font-medium mb-1">Selamat Datang di</p>
                    <h1 className="text-2xl lg:text-3xl font-bold mb-2">Dashboard SuaR Hijau 🌿</h1>
                    <p className="text-white/70 max-w-lg text-sm">
                        Kelola konten website Suar Hijau — program, produk, event, berita, dan tim — semua dari satu tempat.
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map(stat => (
                    <Link
                        key={stat.label}
                        to={stat.link}
                        className="group bg-white rounded-2xl p-5 border border-dark-100 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-dark-300 group-hover:text-primary-500 transition-colors" />
                        </div>
                        <p className="text-2xl font-bold text-dark-900">{stat.count}</p>
                        <p className="text-xs text-dark-400 font-medium mt-0.5">{stat.label}</p>
                    </Link>
                ))}
            </div>

            {/* Bottom Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Upcoming Events */}
                <div className="bg-white rounded-2xl border border-dark-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-dark-900">Event Mendatang</h3>
                        <Link to="/events" className="text-xs text-primary-600 hover:text-primary-700 font-semibold">
                            Lihat Semua →
                        </Link>
                    </div>
                    {recentEvents.length === 0 ? (
                        <p className="text-sm text-dark-400 py-4">Belum ada event mendatang</p>
                    ) : (
                        <div className="space-y-3">
                            {recentEvents.map(event => (
                                <div key={event.id} className="flex items-start gap-3 p-3 rounded-xl bg-dark-50 hover:bg-dark-100 transition-colors">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <CalendarDays className="w-4 h-4 text-purple-500" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-dark-900 truncate">{event.title}</p>
                                        <p className="text-xs text-dark-400">{event.date} • {event.location}</p>
                                    </div>
                                    <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex-shrink-0">
                                        {event.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent News */}
                <div className="bg-white rounded-2xl border border-dark-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-dark-900">Berita Terbaru</h3>
                        <Link to="/news" className="text-xs text-primary-600 hover:text-primary-700 font-semibold">
                            Lihat Semua →
                        </Link>
                    </div>
                    {recentNews.length === 0 ? (
                        <p className="text-sm text-dark-400 py-4">Belum ada berita</p>
                    ) : (
                        <div className="space-y-3">
                            {recentNews.map(news => (
                                <div key={news.id} className="flex items-start gap-3 p-3 rounded-xl bg-dark-50 hover:bg-dark-100 transition-colors">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Newspaper className="w-4 h-4 text-orange-500" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-dark-900 truncate">{news.title}</p>
                                        <p className="text-xs text-dark-400">{news.author} • {news.date}</p>
                                    </div>
                                    <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
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
