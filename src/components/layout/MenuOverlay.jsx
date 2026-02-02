import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS } from '../../data/mockData';
import { X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';

export default function MenuOverlay({ isOpen, onClose }) {
    const { language } = useLanguage();
    const t = translations[language];

    const menuItems = [
        { label: t.nav.home, href: "/", image: MENU_ITEMS[0].image },
        { label: t.nav.about, href: "/about", image: MENU_ITEMS[1].image },
        { label: t.nav.programs, href: "/programs", image: MENU_ITEMS[2].image },
        { label: t.nav.products, href: "/products", image: MENU_ITEMS[3].image },
        { label: t.nav.blog, href: "/news", image: MENU_ITEMS[4].image },
        { label: t.nav.team, href: "/team", image: MENU_ITEMS[1].image },
        { label: t.nav.contact, href: "/contact", image: MENU_ITEMS[5].image },
    ];

    const [activeImage, setActiveImage] = useState(menuItems[0].image);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ translateY: '-100%' }}
                    animate={{ translateY: 0 }}
                    exit={{ translateY: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] flex bg-stone-100"
                >
                    {/* Left: Image (Hidden on mobile) */}
                    <div className="hidden md:block w-1/2 h-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10 z-10" />
                        <motion.img
                            key={activeImage}
                            src={activeImage}
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            alt="Menu Preview"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-10 left-10 z-20">
                            <img
                                src="/logo_suarhijau.png"
                                alt="Logo"
                                className="h-6 w-auto opacity-90 object-cover"
                            />
                        </div>
                    </div>

                    {/* Right: Navigation */}
                    <div className="w-full md:w-1/2 flex flex-col h-full overflow-y-auto bg-stone-100">
                        <div className="flex justify-end p-6 lg:p-10">
                            <button
                                onClick={onClose}
                                className="group p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-7 h-7 text-neutral-800 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col justify-center px-6 lg:px-16 xl:px-20 max-w-2xl">
                            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-8 font-medium">
                                {language === 'ID' ? 'Navigasi' : 'Navigation'}
                            </p>
                            <ul className="space-y-0">
                                {menuItems.map((item, index) => (
                                    <motion.li
                                        key={item.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + (index * 0.05) }}
                                        className="border-b border-neutral-200/60"
                                    >
                                        <Link
                                            to={item.href}
                                            className="group flex items-center justify-between py-4"
                                            onMouseEnter={() => setActiveImage(item.image)}
                                            onClick={() => {
                                                onClose();
                                                if (item.href === "/") window.scrollTo(0, 0);
                                            }}
                                        >
                                            <span className="text-2xl lg:text-3xl font-medium text-neutral-800 group-hover:text-black transition-colors tracking-tight">
                                                {item.label}
                                            </span>
                                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="mt-12 pt-8 border-t border-neutral-200">
                                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4 font-medium">
                                    {language === 'ID' ? 'Hubungi Kami' : 'Contact Us'}
                                </p>
                                <div className="space-y-2">
                                    <a href="tel:081314838361" className="block text-sm font-medium text-neutral-800 hover:text-neutral-500 transition-colors">+62 813-1483-8361</a>
                                    <a href="mailto:mail@molvest.ru" className="block text-sm font-medium text-neutral-800 hover:text-neutral-500 transition-colors">Info@suarhijau.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
