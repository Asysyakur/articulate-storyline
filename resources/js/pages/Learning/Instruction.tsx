import LearningLayout from '@/layouts/LearningLayout';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, LogOut, MousePointerClick, Volume2, VolumeX } from 'lucide-react';

import { useState } from 'react';

export default function Instruction() {
    const [audioOn, setAudioOn] = useState(true);

    const [activePreview, setActivePreview] = useState<string | null>(null);

    const [visitedButtons, setVisitedButtons] = useState<string[]>([]);

    const buttons = [
        {
            id: 'home',
            title: 'Home',
            icon: Home,
            desc: 'Kembali ke halaman utama.',
        },

        {
            id: 'next',
            title: 'Next',
            icon: ChevronRight,
            desc: 'Menuju slide berikutnya.',
        },

        {
            id: 'previous',
            title: 'Previous',
            icon: ChevronLeft,
            desc: 'Kembali ke slide sebelumnya.',
        },

        {
            id: 'audio',
            title: 'Audio',
            icon: audioOn ? Volume2 : VolumeX,
            desc: 'Mengaktifkan atau mematikan audio.',
        },

        {
            id: 'exit',
            title: 'Exit',
            icon: LogOut,
            desc: 'Keluar dari media pembelajaran.',
        },
    ];

    const handleClick = (id: string) => {
        setActivePreview(id);

        setVisitedButtons((currentVisited) => (currentVisited.includes(id) ? currentVisited : [...currentVisited, id]));

        if (id === 'audio') {
            setAudioOn(!audioOn);
        }
    };

    return (
        <LearningLayout fullscreen={true}>
            <div className="flex h-screen items-center overflow-hidden">
                <div className="mx-auto w-full max-w-7xl px-6">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        {/* LEFT */}
                        <div>
                            {/* LABEL */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                                <MousePointerClick size={15} />
                                Slide 2 — Petunjuk
                            </div>

                            {/* TITLE */}
                            <h1 className="mt-6 text-5xl leading-[1.05] font-black tracking-tight lg:text-6xl">
                                Kenali Tombol
                                <span className="block text-cyan-400">Navigasi</span>
                            </h1>

                            {/* DESC */}
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                                Klik setiap tombol untuk melihat simulasi fungsi navigasi media pembelajaran.
                            </p>

                            {/* PREVIEW */}
                            <div className="mt-10">
                                <div className="overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900/70">
                                    {/* TOP BAR */}
                                    <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-4">
                                        <div className="h-3 w-3 rounded-full bg-red-400" />

                                        <div className="h-3 w-3 rounded-full bg-yellow-400" />

                                        <div className="h-3 w-3 rounded-full bg-green-400" />

                                        <p className="ml-3 text-sm text-slate-400">Simulasi Interaksi</p>
                                    </div>

                                    {/* CONTENT */}
                                    <motion.div
                                        key={activePreview ?? 'default'}
                                        initial={{ opacity: 0, scale: 0.98, y: 8 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ duration: 0.28 }}
                                        className="flex min-h-[300px] flex-col justify-center p-8"
                                    >
                                        {/* DEFAULT */}
                                        {!activePreview && (
                                            <div className="text-center">
                                                <motion.div
                                                    animate={{ y: [0, -8, 0] }}
                                                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                                                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-400/10"
                                                >
                                                    <MousePointerClick size={38} className="text-cyan-400" />
                                                </motion.div>

                                                <h3 className="mt-6 text-2xl font-black">Coba Interaksi</h3>

                                                <p className="mt-3 leading-relaxed text-slate-400">
                                                    Klik tombol navigasi di sebelah kanan untuk melihat simulasi fungsi.
                                                </p>
                                            </div>
                                        )}

                                        {/* HOME */}
                                        {activePreview === 'home' && (
                                            <div className="mx-auto w-full max-w-md">
                                                <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6">
                                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,.08),transparent_38%)]" />

                                                    <div className="relative flex items-center justify-between gap-6">
                                                        <div className="flex-1">
                                                            <p className="text-sm text-cyan-400">Klik Home</p>

                                                            <h3 className="mt-2 text-3xl font-black">Kembali ke Beranda</h3>
                                                        </div>

                                                        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-cyan-400/10">
                                                            <motion.div
                                                                animate={{ scale: [1, 1.12, 1], rotate: [0, 6, 0] }}
                                                                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                                                                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950"
                                                            >
                                                                <Home size={30} />
                                                            </motion.div>
                                                        </div>
                                                    </div>

                                                    <div className="relative mt-6 flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-3">
                                                        <motion.div
                                                            animate={{ x: [0, -6, 0] }}
                                                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                                                            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400"
                                                        >
                                                            <Home size={20} />
                                                        </motion.div>

                                                        <div className="flex-1">
                                                            <p className="text-sm font-semibold text-white">Menuju halaman utama</p>

                                                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                                                                <motion.div
                                                                    animate={{ x: ['-100%', '0%', '100%'] }}
                                                                    transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                                                                    className="h-full w-1/2 rounded-full bg-cyan-400"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* NEXT */}
                                        {activePreview === 'next' && (
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-center text-sm text-amber-300">
                                                    Pada slide aktivitas, tombol Next aktif setelah aktivitas diselesaikan.
                                                </div>

                                                <div className="relative flex w-full max-w-md items-center gap-4 rounded-3xl border border-slate-800 bg-slate-950 p-5">
                                                    <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-4">
                                                        <p className="text-xs tracking-[0.18em] text-slate-500 uppercase">Slide Sekarang</p>
                                                        <p className="mt-2 text-lg font-bold text-white">2 / 15</p>
                                                    </div>

                                                    <motion.div
                                                        animate={{ x: [0, 8, 0] }}
                                                        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                                                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950"
                                                    >
                                                        <ChevronRight size={28} />
                                                    </motion.div>

                                                    <div className="flex-1 rounded-2xl border border-cyan-400/40 bg-cyan-400/10 p-4">
                                                        <p className="text-xs tracking-[0.18em] text-cyan-300 uppercase">Slide Berikutnya</p>
                                                        <motion.div
                                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                                                            className="mt-2 h-2 rounded-full bg-cyan-400/60"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* PREVIOUS */}
                                        {activePreview === 'previous' && (
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-center text-sm text-cyan-300">
                                                    Tombol Previous mengembalikan pengguna ke slide sebelumnya.
                                                </div>

                                                <div className="relative flex w-full max-w-md items-center gap-4 rounded-3xl border border-slate-800 bg-slate-950 p-5">
                                                    <div className="flex-1 rounded-2xl border border-cyan-400/40 bg-cyan-400/10 p-4">
                                                        <p className="text-xs tracking-[0.18em] text-cyan-300 uppercase">Slide Sebelumnya</p>
                                                        <motion.div
                                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                                                            className="mt-2 h-2 rounded-full bg-cyan-400/60"
                                                        />
                                                    </div>

                                                    <motion.div
                                                        animate={{ x: [0, -8, 0] }}
                                                        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                                                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950"
                                                    >
                                                        <ChevronLeft size={28} />
                                                    </motion.div>

                                                    <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-4">
                                                        <p className="text-xs tracking-[0.18em] text-slate-500 uppercase">Slide Sekarang</p>
                                                        <p className="mt-2 text-lg font-bold text-white">2 / 15</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* AUDIO */}
                                        {activePreview === 'audio' && (
                                            <div className="text-center">
                                                <motion.div
                                                    animate={{ scale: audioOn ? [1, 1.08, 1] : [1, 0.94, 1] }}
                                                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                                                    className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-400/10"
                                                >
                                                    {audioOn ? (
                                                        <Volume2 size={42} className="text-cyan-400" />
                                                    ) : (
                                                        <VolumeX size={42} className="text-red-400" />
                                                    )}
                                                </motion.div>

                                                <h3 className="mt-6 text-3xl font-black">{audioOn ? 'Audio Aktif' : 'Audio Dimatikan'}</h3>

                                                <p className="mt-3 text-slate-400">Tombol audio digunakan untuk mengatur musik latar media.</p>

                                                <div className="mt-5 flex items-center justify-center gap-2">
                                                    {[0, 1, 2, 3].map((bar) => (
                                                        <motion.span
                                                            key={bar}
                                                            animate={{ scaleY: audioOn ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4] }}
                                                            transition={{ duration: 0.9 + bar * 0.12, repeat: Infinity, ease: 'easeInOut' }}
                                                            className={`w-2 rounded-full ${audioOn ? 'bg-cyan-400' : 'bg-red-400'}`}
                                                            style={{ height: 18 + bar * 8 }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* EXIT */}
                                        {activePreview === 'exit' && (
                                            <div className="mx-auto max-w-md rounded-3xl border border-red-500/20 bg-red-500/10 p-6">
                                                <div className="flex items-center gap-3 text-red-400">
                                                    <motion.div
                                                        animate={{ rotate: [0, 8, -8, 0] }}
                                                        transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                                                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10"
                                                    >
                                                        <LogOut size={24} />
                                                    </motion.div>

                                                    <div>
                                                        <p className="font-semibold">Konfirmasi Keluar</p>
                                                        <h3 className="text-2xl font-black text-white">Keluar dari Media?</h3>
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex gap-3">
                                                    <button className="flex-1 rounded-2xl bg-slate-800 py-3">Batal</button>

                                                    <motion.button
                                                        animate={{ x: [0, 2, 0] }}
                                                        transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                                                        className="flex-1 rounded-2xl bg-red-500 py-3 text-white"
                                                    >
                                                        Keluar
                                                    </motion.button>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="grid grid-cols-2 gap-5">
                            {buttons.map((button) => {
                                const Icon = button.icon;

                                const active = activePreview === button.id;

                                return (
                                    <button
                                        key={button.id}
                                        onClick={() => handleClick(button.id)}
                                        className={`rounded-3xl border p-7 text-left transition duration-300 ${
                                            active
                                                ? 'scale-[1.02] border-cyan-400 bg-cyan-400/10'
                                                : 'border-slate-800 bg-slate-900/70 hover:border-cyan-400'
                                        } `}
                                    >
                                        {/* ICON */}
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
                                            <Icon className="text-cyan-400" />
                                        </div>

                                        {/* TITLE */}
                                        <div className="mt-6 flex items-center justify-between gap-3">
                                            <h3 className="text-2xl font-bold">{button.title}</h3>

                                            {visitedButtons.includes(button.id) && (
                                                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
                                                    Visited
                                                </span>
                                            )}
                                        </div>

                                        {/* DESC */}
                                        <p className="mt-3 text-sm leading-relaxed text-slate-400">{button.desc}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
