import LearningLayout from '@/layouts/LearningLayout';

import { ChevronLeft, ChevronRight, Home, LogOut, MousePointerClick, Volume2, VolumeX } from 'lucide-react';

import { useState } from 'react';

export default function Instruction() {
    const [audioOn, setAudioOn] = useState(true);

    const [activePreview, setActivePreview] = useState<string | null>(null);

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
                                Coba Klik
                                <span className="block text-cyan-400">Tombol Navigasi</span>
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
                                    <div className="flex min-h-[300px] flex-col justify-center p-8">
                                        {/* DEFAULT */}
                                        {!activePreview && (
                                            <div className="text-center">
                                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-400/10">
                                                    <MousePointerClick size={38} className="text-cyan-400" />
                                                </div>

                                                <h3 className="mt-6 text-2xl font-black">Coba Interaksi</h3>

                                                <p className="mt-3 leading-relaxed text-slate-400">
                                                    Klik tombol navigasi di sebelah kanan untuk melihat simulasi fungsi.
                                                </p>
                                            </div>
                                        )}

                                        {/* HOME */}
                                        {activePreview === 'home' && (
                                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                                                <p className="text-sm text-cyan-400">HOME BUTTON</p>

                                                <h3 className="mt-3 text-3xl font-black">Halaman Utama</h3>

                                                <p className="mt-4 text-slate-300">Tombol Home digunakan untuk kembali ke halaman utama media.</p>
                                            </div>
                                        )}

                                        {/* NEXT */}
                                        {activePreview === 'next' && (
                                            <div className="flex items-center gap-5">
                                                <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                                                    <p className="text-slate-500">Slide Sekarang</p>
                                                </div>

                                                <ChevronRight className="animate-pulse text-cyan-400" size={40} />

                                                <div className="flex-1 rounded-2xl border border-cyan-400 bg-cyan-400/10 p-5">
                                                    <p className="text-cyan-300">Slide Berikutnya</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* PREVIOUS */}
                                        {activePreview === 'previous' && (
                                            <div className="flex items-center gap-5">
                                                <div className="flex-1 rounded-2xl border border-cyan-400 bg-cyan-400/10 p-5">
                                                    <p className="text-cyan-300">Slide Sebelumnya</p>
                                                </div>

                                                <ChevronLeft className="animate-pulse text-cyan-400" size={40} />

                                                <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                                                    <p className="text-slate-500">Slide Sekarang</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* AUDIO */}
                                        {activePreview === 'audio' && (
                                            <div className="text-center">
                                                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-400/10">
                                                    {audioOn ? (
                                                        <Volume2 size={42} className="text-cyan-400" />
                                                    ) : (
                                                        <VolumeX size={42} className="text-red-400" />
                                                    )}
                                                </div>

                                                <h3 className="mt-6 text-3xl font-black">{audioOn ? 'Audio Aktif' : 'Audio Dimatikan'}</h3>

                                                <p className="mt-3 text-slate-400">Tombol audio digunakan untuk mengatur musik latar media.</p>
                                            </div>
                                        )}

                                        {/* EXIT */}
                                        {activePreview === 'exit' && (
                                            <div className="mx-auto max-w-md rounded-3xl border border-red-500/20 bg-red-500/10 p-6">
                                                <p className="font-semibold text-red-400">Konfirmasi Keluar</p>

                                                <h3 className="mt-3 text-2xl font-black">Keluar dari Media?</h3>

                                                <div className="mt-6 flex gap-3">
                                                    <button className="flex-1 rounded-2xl bg-slate-800 py-3">Batal</button>

                                                    <button className="flex-1 rounded-2xl bg-red-500 py-3 text-white">Keluar</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
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
                                        <h3 className="mt-6 text-2xl font-bold">{button.title}</h3>

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
