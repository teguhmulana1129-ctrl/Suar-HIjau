import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { HEADER_LINKS } from '../../data/mockData';

export default function Header({ onMenuClick }) {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    // On non-homepage, always show dark navbar
    const showDarkNav = scrolled || !isHomePage;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 py-5 transition-colors duration-300 pointer-events-none",
            showDarkNav ? "bg-transparent" : "bg-transparent"
        )}>
            {/* Background Layer */}
            <div className={cn(
                "absolute inset-0 bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-opacity duration-400",
                showDarkNav ? "opacity-100" : "opacity-0"
            )} />

            <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 pointer-events-auto">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 z-50 relative" aria-label="Home">
                        <img
                            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7cd2626d-0185-4c9d-bbd5-e20389921e7e_320w.png"
                            alt="Logo"
                            className={cn(
                                "h-8 w-auto object-contain transition-all duration-300",
                                !showDarkNav && "invert brightness-0"
                            )}
                            width="120"
                            height="32"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                        {HEADER_LINKS.map(link => (
                            <Link
                                key={link.label}
                                to={link.href}
                                className={cn(
                                    "relative text-xs uppercase tracking-widest font-medium py-2 transition-colors duration-300 hover:text-neutral-500",
                                    showDarkNav ? "text-neutral-900" : "text-white"
                                )}
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Right Controls */}
                    <div className="flex items-center gap-6 z-50 relative">
                        {/* Language Switcher */}
                        <div className={cn(
                            "hidden sm:flex items-center gap-4 border-r pr-6 mr-2 transition-colors duration-300",
                            showDarkNav ? "border-neutral-200" : "border-white/20"
                        )}>
                            {['ID', 'EN'].map((lang, i) => (
                                <a
                                    key={lang}
                                    href="#"
                                    className={cn(
                                        "text-xs tracking-widest font-bold transition-opacity",
                                        showDarkNav ? "text-neutral-900" : "text-white",
                                        i === 0 ? "opacity-100" : "opacity-60 hover:opacity-100"
                                    )}
                                >
                                    {lang}
                                </a>
                            ))}
                        </div>

                        {/* Menu Button */}
                        <button
                            type="button"
                            onClick={onMenuClick}
                            className="group flex flex-col cursor-pointer w-8 h-8 gap-1.5 justify-center"
                            aria-label="Open Menu"
                        >
                            <span className={cn(
                                "block w-full h-px transition-all duration-300 group-hover:w-2/3 ml-auto",
                                showDarkNav ? "bg-neutral-900" : "bg-white"
                            )} />
                            <span className={cn(
                                "block w-full h-px transition-all duration-300",
                                showDarkNav ? "bg-neutral-900" : "bg-white"
                            )} />
                        </button>
                    </div>

                </div>
            </div>
        </header>
    );
}
