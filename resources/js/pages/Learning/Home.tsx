import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, Clock3, Cpu, GraduationCap, Monitor, Network, Play, Router } from 'lucide-react';

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
            {/* BACKGROUND */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03]" />

                <div className="absolute top-0 left-0 h-[400px] w-[400px] bg-cyan-500/10 blur-[160px]" />

                <div className="absolute right-0 bottom-0 h-[400px] w-[400px] bg-blue-500/10 blur-[160px]" />
            </div>

            <div className="relative z-10 flex min-h-screen items-center">
                <div className="mx-auto w-full max-w-7xl px-6 py-12">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        {/* LEFT SIDE */}
                        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            {/* BADGE */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                                <BookOpen size={16} />
                                Media Pembelajaran Interaktif
                            </div>

                            {/* TITLE */}
                            <h1 className="mt-6 text-5xl leading-tight font-black lg:text-6xl">
                                Jaringan Komputer
                                <span className="block text-cyan-400">& Internet</span>
                            </h1>

                            <h2 className="mt-4 text-2xl font-semibold text-slate-300">Memahami & Mengatasi Masalah Jaringan Komputer</h2>

                            {/* DESCRIPTION */}
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
                                Media pembelajaran berbasis
                                <span className="font-semibold text-cyan-300"> Problem Based Learning (PBL)</span> untuk melatih kemampuan berpikir
                                kritis peserta didik melalui studi kasus troubleshooting jaringan komputer.
                            </p>

                            {/* BUTTONS */}
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href="/instruction"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:scale-105"
                                >
                                    <Play size={18} />
                                    Mulai Belajar
                                </Link>

                                <Link
                                    href="/instruction"
                                    className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold transition hover:bg-white/10"
                                >
                                    Petunjuk
                                </Link>
                            </div>

                            {/* CASE CARD */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4"
                            >
                                <div className="flex items-center gap-2">
                                    <Cpu size={18} className="text-amber-300" />
                                    <h3 className="font-bold text-amber-300">Studi Kasus PBL</h3>
                                </div>

                                <p className="mt-3 text-sm text-slate-300">
                                    • Sebagian PC tidak terhubung internet
                                    <br />
                                    • Koneksi jaringan lambat
                                    <br />• Printer jaringan tidak terdeteksi
                                </p>

                                <p className="mt-3 text-sm font-medium text-amber-200">
                                    Anda berperan sebagai teknisi jaringan untuk menemukan akar masalah.
                                </p>
                            </motion.div>

                            {/* INFO CARDS */}
                            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <p className="text-xs text-slate-500">Mata Pelajaran</p>
                                    <p className="mt-1 font-semibold">Informatika</p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <p className="text-xs text-slate-500">Fase</p>
                                    <p className="mt-1 font-semibold">E</p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <p className="text-xs text-slate-500">Kelas</p>
                                    <p className="mt-1 font-semibold">X TKJ</p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <p className="text-xs text-slate-500">Model</p>
                                    <p className="mt-1 font-semibold">PBL</p>
                                </div>
                            </div>

                            {/* FOOTER INFO */}
                            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Clock3 size={16} />
                                    30–40 Menit
                                </div>

                                <div className="flex items-center gap-2">
                                    <GraduationCap size={16} />
                                    SMK Indonesia Mas
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT SIDE */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="hidden lg:block"
                        >
                            <div className="relative h-[700px] overflow-hidden rounded-[36px] border border-cyan-400/20 bg-slate-900/60 p-8 backdrop-blur-xl">
                                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 700" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="topologyLine" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.95" />
                                            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.55" />
                                        </linearGradient>
                                    </defs>

                                    {/* Backbone */}
                                    <line x1="500" y1="92" x2="500" y2="526" stroke="url(#topologyLine)" strokeWidth="2.5" />

                                    {/* Internet -> Router */}
                                    <line x1="500" y1="92" x2="500" y2="128" stroke="#22d3ee" strokeWidth="2.5" />

                                    {/* Router -> Switch */}
                                    <line x1="500" y1="240" x2="500" y2="272" stroke="#22d3ee" strokeWidth="2.5" />

                                    {/* Switch -> PCs */}
                                    <line x1="500" y1="365" x2="255" y2="525" stroke="#22d3ee" strokeWidth="2.5" />
                                    <line x1="500" y1="365" x2="400" y2="525" stroke="#22d3ee" strokeWidth="2.5" />
                                    <line x1="500" y1="365" x2="600" y2="525" stroke="#22d3ee" strokeWidth="2.5" />
                                    <line x1="500" y1="365" x2="740" y2="525" stroke="#22d3ee" strokeWidth="2.5" />
                                </svg>

                                <div className="relative z-10 flex h-full flex-col items-center">
                                    {/* INTERNET */}
                                    <motion.div
                                        animate={{
                                            boxShadow: [
                                                '0 0 10px rgba(34,211,238,.18)',
                                                '0 0 36px rgba(34,211,238,.55)',
                                                '0 0 10px rgba(34,211,238,.18)',
                                            ],
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2.4,
                                        }}
                                        className="mt-4 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-sm font-medium tracking-[0.18em] text-cyan-100"
                                    >
                                        INTERNET
                                    </motion.div>

                                    {/* ROUTER */}
                                    <div className="mt-8 flex flex-col items-center">
                                        <div className="flex h-28 w-28 flex-col items-center justify-center rounded-3xl border border-cyan-400/30 bg-cyan-400/10">
                                            <Router size={48} className="text-cyan-400" />
                                            <p className="mt-3 text-sm font-medium text-slate-200">Router</p>
                                        </div>
                                    </div>

                                    {/* SWITCH */}
                                    <div className="mt-8 flex flex-col items-center">
                                        <div className="flex h-24 w-36 flex-col items-center justify-center rounded-3xl border border-cyan-400/30 bg-cyan-400/10">
                                            <Network size={46} className="text-cyan-400" />
                                            <p className="mt-3 text-sm font-medium text-slate-200">Switch</p>
                                        </div>
                                    </div>

                                    {/* PCs */}
                                    {[
                                        { label: 'PC 1', left: '23%' },
                                        { label: 'PC 2', left: '39%' },
                                        { label: 'PC 3', left: '61%' },
                                        { label: 'PC 4', left: '77%' },
                                    ].map((pc) => (
                                        <div
                                            key={pc.label}
                                            className="absolute bottom-16 flex flex-col items-center"
                                            style={{ left: pc.left, transform: 'translateX(-50%)' }}
                                        >
                                            <Monitor size={56} className="text-cyan-400" />
                                            <span className="mt-2 text-sm font-medium text-slate-200">{pc.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* LABEL */}
                                <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-xl bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                                    Topologi Star
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
