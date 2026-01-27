
export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white/60 py-12 px-6">
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
                <p className="text-xs uppercase tracking-widest">© 2024 Suar Hijau. All rights reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="text-xs uppercase tracking-widest hover:text-white transition-colors">Kebijakan Privasi</a>
                    <a href="#" className="text-xs uppercase tracking-widest hover:text-white transition-colors">Kontak</a>
                </div>
            </div>
        </footer>
    )
}
