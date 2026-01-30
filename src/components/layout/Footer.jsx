import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../data/translations';

export default function Footer() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <footer className="bg-neutral-900 text-white/60 py-12 px-6">
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
                <p className="text-xs uppercase tracking-widest">© 2026 Suar Hijau. {t.footer.rights}</p>
                <div className="flex gap-8">
                    <a href="#" className="text-xs uppercase tracking-widest hover:text-white transition-colors">{t.footer.privacy}</a>
                    <a href="/contact" className="text-xs uppercase tracking-widest hover:text-white transition-colors">{t.nav.contact}</a>
                </div>
            </div>
        </footer>
    )
}
