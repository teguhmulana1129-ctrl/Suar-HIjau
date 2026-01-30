import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useState, useEffect } from 'react';
import logoFull from '../../assets/logo_suarhijau.png';

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                y: '-100%',
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/[0.03] rounded-full blur-[120px]" />
            </div>

            <div className="relative flex flex-col items-center">
                {/* Logo Container */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-12"
                >
                    <img
                        src={logoFull}
                        alt="Suar Hijau"
                        className="h-16 w-auto object-contain"
                    />
                </motion.div>

                {/* Progress Circle & Percentage */}
                <div className="relative flex flex-col items-center gap-6">
                    <div className="w-64 h-[1px] bg-neutral-100 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-primary origin-left"
                            style={{ scaleX: progress / 100 }}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Leaf className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-400">
                            {progress}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Credit - Optional, looks premium */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-10 text-[10px] uppercase tracking-[0.2em] text-neutral-300 font-medium"
            >
                SUAR HIJAU &copy; 2026
            </motion.div>
        </motion.div>
    );
}
