import LearningLayout from '@/layouts/LearningLayout';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';

import { AlertTriangle, GraduationCap, LogIn, Network } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Login() {
    const [name, setName] = useState('');
    const [kelas, setKelas] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!name.trim() || !kelas.trim()) {
            setError(true);
            return;
        }

        setError(false);
        router.post('/learning/session', { name: name.trim(), kelas: kelas.trim() });
    };

    return (
        <LearningLayout fullscreen>
            <div className="flex h-screen items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full max-w-md"
                >
                    <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
                        {/* ICON */}
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10">
                            <Network size={30} className="text-cyan-400" />
                        </div>

                        {/* TITLE */}
                        <h1 className="mt-6 text-center text-3xl font-black tracking-tight">Selamat Datang</h1>

                        <p className="mt-3 text-center text-sm leading-relaxed text-slate-400">
                            Media Interaktif — Jaringan Komputer &amp; Internet
                            <br />
                            Informatika Fase F (Kelas XI)
                        </p>

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-200">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="Masukkan nama lengkap"
                                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white transition outline-none placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-200">Kelas</label>
                                <div className="relative">
                                    <GraduationCap size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="text"
                                        value={kelas}
                                        onChange={(event) => setKelas(event.target.value)}
                                        placeholder="mis. XI TKJ 1"
                                        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 py-3 pr-4 pl-11 text-sm text-white transition outline-none placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                                    <AlertTriangle size={16} />
                                    Mohon isi nama dan kelas terlebih dahulu
                                </div>
                            )}

                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-[1.02]"
                            >
                                <LogIn size={18} />
                                Masuk
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </LearningLayout>
    );
}
