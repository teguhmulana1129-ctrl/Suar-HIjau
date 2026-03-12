import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, FolderTree, ShoppingBag, CalendarDays,
    Newspaper, Users, Menu, X, LogOut, ChevronRight,
    Search, Bell, ChevronDown
} from 'lucide-react';
import logoSuar from '../../assets/suar_full_white.png';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard/programs', icon: FolderTree, label: 'Program' },
    { to: '/dashboard/products', icon: ShoppingBag, label: 'Produk' },
    { to: '/dashboard/events', icon: CalendarDays, label: 'Event' },
    { to: '/dashboard/news', icon: Newspaper, label: 'Berita' },
    { to: '/dashboard/team', icon: Users, label: 'Tim' },
];

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const currentPage = navItems.find(i => i.to === location.pathname)?.label || 'Dashboard';

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[260px] text-white
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}
                style={{
                    background: 'linear-gradient(180deg, #0f172a 0%, #0a1a0f 60%, #071510 100%)',
                    boxShadow: '4px 0 24px rgba(34,197,94,0.06)',
                }}
            >
                {/* Subtle green glow background */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 60%)',
                    }}
                />

                {/* Logo */}
                <div className="relative flex items-center gap-3 px-6 py-5 border-b border-white/[0.07]">
                    <img
                        src={logoSuar}
                        alt="Logo SuaR Hijau"
                        className="w-10 h-10 rounded-xl object-contain flex-shrink-0"
                    />
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-white">SuaR Hijau</h1>
                        <p className="text-[10px] text-green-400/60 font-medium uppercase tracking-widest">Content Management</p>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden ml-auto p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="relative flex-1 px-3 py-5 space-y-0.5 overflow-y-auto scrollbar-hide">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.15em] px-3 mb-3">Menu Utama</p>
                    {navItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/dashboard'}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => `
                group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                                    ? 'text-white'
                                    : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'
                                }
              `}
                        >
                            {({ isActive }) => (
                                <>
                                    {/* Active indicator border-left */}
                                    {isActive && (
                                        <span
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full"
                                            style={{ background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}
                                        />
                                    )}
                                    {/* Active background */}
                                    {isActive && (
                                        <span
                                            className="absolute inset-0 rounded-xl"
                                            style={{ background: 'linear-gradient(90deg, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.04) 100%)' }}
                                        />
                                    )}
                                    <item.icon
                                        className={`relative w-[18px] h-[18px] flex-shrink-0 transition-colors ${isActive ? 'text-green-400' : 'text-slate-500 group-hover:text-slate-300'}`}
                                    />
                                    <span className="relative">{item.label}</span>
                                    <ChevronRight
                                        className={`relative w-3.5 h-3.5 ml-auto transition-all duration-200 ${isActive ? 'opacity-100 text-green-400' : 'opacity-0 group-hover:opacity-40'}`}
                                    />
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Admin Footer */}
                <div className="relative px-3 py-4 border-t border-white/[0.07]">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer group">
                        <div className="relative w-8 h-8 rounded-full flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)' }}
                        >
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">A</span>
                            {/* Online indicator */}
                            <span
                                className="absolute bottom-0 right-0 w-2 h-2 rounded-full border border-[#0f172a]"
                                style={{ background: '#22c55e', boxShadow: '0 0 6px #22c55e' }}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">Admin</p>
                            <p className="text-[10px] text-green-400/60 truncate flex items-center gap-1">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-0.5" />
                                Online
                            </p>
                        </div>
                        <LogOut className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-16 bg-white border-b border-slate-200/80 flex items-center px-4 lg:px-6 gap-4 shrink-0"
                    style={{ boxShadow: '0 1px 0 0 rgba(0,0,0,0.04)' }}
                >
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <Menu className="w-5 h-5 text-slate-600" />
                    </button>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1.5 text-sm">
                        {currentPage !== 'Dashboard' ? (
                            <>
                                <span className="text-slate-400 font-medium">Dashboard</span>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                                <span className="font-bold text-slate-800">{currentPage}</span>
                            </>
                        ) : (
                            <span className="font-bold text-slate-800">Dashboard</span>
                        )}
                    </div>

                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 page-fade-in">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
