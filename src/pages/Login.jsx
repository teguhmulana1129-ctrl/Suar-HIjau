import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
// Using the same logo as dashboard layout
import logoSuar from '../assets/suar_full_white.png';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const navigate = useNavigate();
    const { login, user } = useAuth();

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoggingIn(true);

        const result = await login(username, password);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'Login failed');
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-50">
            {/* Subtle background decoration */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-50/50 to-transparent pointer-events-none" />

            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 z-20 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Website
            </button>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[420px] relative z-10"
            >
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                    {/* Header */}
                    <div className="text-center mb-10 mt-2">
                        <div
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-sm"
                            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0a1a0f 60%, #071510 100%)' }}
                        >
                            <img src={logoSuar} alt="SuaR Hijau Logo" className="w-10 h-10 object-contain" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            SuaR Hijau
                        </h1>
                        <p className="text-green-600/80 mt-2 text-xs font-semibold uppercase tracking-widest">
                            Content Management
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm flex items-start gap-3 border border-red-100"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" style={{ boxShadow: '0 0 8px rgba(239, 68, 68, 0.4)' }}></div>
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5 pl-1">Username</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-4 w-4 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-slate-900 placeholder-slate-400 transition-all text-sm outline-none"
                                        placeholder="admin"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5 pl-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-slate-900 placeholder-slate-400 transition-all text-sm outline-none"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoggingIn}
                                className="w-full relative flex items-center justify-center text-white font-medium py-3.5 rounded-2xl transition-all duration-200 shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:-translate-y-0"
                                style={{ background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)' }}
                            >
                                <div className="flex items-center gap-2">
                                    {isLoggingIn ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                                            <span>Signing in...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <ArrowRight className="w-4 h-4 ml-1 opacity-90" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Minimalist Footer */}
                <p className="text-center text-xs text-slate-400 mt-8">
                    &copy; {new Date().getFullYear()} Siohioma Dashboard. All rights reserved.
                </p>
            </motion.div>
        </div>
    );
}
