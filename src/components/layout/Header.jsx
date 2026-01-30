import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';
import logoWhite from '../../assets/suar_full_white.png';
import logoDefault from '../../assets/logo_suarhijau.png';

export default function Header({ onMenuClick }) {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    // On non-homepage, always show dark navbar
    const showDarkNav = scrolled || !isHomePage;

    const { language, toggleLanguage } = useLanguage();
    const t = translations[language];

    const navLinks = [
        { label: t.nav.home, href: "/" },
        { label: t.nav.about, href: "/about" },
        { label: t.nav.programs, href: "/programs" },
        { label: t.nav.products, href: "/products" },
        { label: t.nav.blog, href: "/news" },
        { label: t.nav.team, href: "/team" },
        { label: t.nav.contact, href: "/contact" },
    ];

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
                    <Link to="/" className="flex items-center gap-3 z-50 relative" aria-label="Home" onClick={() => window.scrollTo(0, 0)}>
                        <img
                            src={showDarkNav ? logoDefault : logoWhite}
                            alt="Suar Hijau Logo"
                            className="h-10 sm:h-12 lg:h-14 w-auto object-contain transition-all duration-300"
                            width="160"
                            height="40"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map(link => (
                            <Link
                                key={link.label}
                                to={link.href}
                                onClick={() => link.href === "/" && window.scrollTo(0, 0)}
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
                            "flex items-center gap-2 sm:gap-4 border-r pr-3 sm:pr-6 mr-2 transition-colors duration-300",
                            showDarkNav ? "border-neutral-200" : "border-white/20"
                        )}>
                            {['ID', 'EN'].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => toggleLanguage(lang)}
                                    className={cn(
                                        "text-xs tracking-widest font-bold transition-opacity",
                                        showDarkNav ? "text-neutral-900" : "text-white",
                                        language === lang ? "opacity-100" : "opacity-40 hover:opacity-100"
                                    )}
                                >
                                    {lang}
                                </button>
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
