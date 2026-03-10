import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, FolderTree, ShoppingBag, CalendarDays,
    Newspaper, Users, Menu, X, Leaf, LogOut, ChevronRight
} from 'lucide-react';

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
        <div className="flex h-screen overflow-hidden bg-dark-50">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[260px] bg-dark-900 text-white
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                    <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight">SuaR Hijau</h1>
                        <p className="text-[11px] text-dark-400 font-medium">Content Management</p>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden ml-auto p-1.5 hover:bg-white/10 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    <p className="text-[10px] font-semibold text-dark-500 uppercase tracking-wider px-3 mb-2">Menu</p>
                    {navItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/dashboard'}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                                    ? 'bg-primary-500/20 text-primary-400'
                                    : 'text-dark-300 hover:bg-white/5 hover:text-white'
                                }
              `}
                        >
                            <item.icon className="w-[18px] h-[18px]" />
                            <span>{item.label}</span>
                            <ChevronRight className={`w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity`} />
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="px-4 py-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary-400">A</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Admin</p>
                            <p className="text-[11px] text-dark-400">admin@suarhijau.id</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-16 bg-white border-b border-dark-200/50 flex items-center px-4 lg:px-6 gap-4 shrink-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 hover:bg-dark-100 rounded-lg"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-lg font-bold text-dark-900">{currentPage}</h2>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <span className="hidden sm:inline text-xs text-dark-400 bg-dark-100 px-3 py-1.5 rounded-full font-medium">
                            Dashboard v1.0
                        </span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
