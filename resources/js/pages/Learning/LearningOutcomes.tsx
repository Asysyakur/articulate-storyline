import LearningLayout from '@/layouts/LearningLayout';

import { BookOpen, Brain, CheckCircle2, Database, Lightbulb, Target } from 'lucide-react';

import { useState } from 'react';

export default function LearningOutcomes() {
    const [active, setActive] = useState('computational');

    const outcomes = [
        {
            id: 'computational',

            title: 'Berpikir Komputasional',

            icon: Brain,

            description:
                'Peserta didik mampu menerapkan konsep berpikir komputasional untuk menganalisis dan menyelesaikan masalah sederhana dalam kehidupan sehari-hari.',

            points: ['Mengidentifikasi masalah', 'Menyusun solusi secara sistematis', 'Memecahkan masalah secara logis'],
        },

        {
            id: 'algorithm',

            title: 'Algoritma',

            icon: Lightbulb,

            description: 'Peserta didik mampu menyusun langkah-langkah solusi secara runtut dan logis.',

            points: ['Menentukan urutan langkah', 'Menyusun solusi terstruktur', 'Membuat alur penyelesaian'],
        },

        {
            id: 'data',

            title: 'Representasi Data',

            icon: Database,

            description: 'Peserta didik mampu memahami cara mengelola dan merepresentasikan data perpustakaan digital.',

            points: ['Mengelola data buku', 'Memahami data peminjaman', 'Menyusun informasi digital'],
        },
    ];

    const selected = outcomes.find((item) => item.id === active);

    return (
        <LearningLayout fullscreen={true}>
            <div className="flex h-screen items-center overflow-hidden">
                <div className="mx-auto w-full max-w-7xl px-6">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        {/* LEFT */}
                        <div>
                            {/* LABEL */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                                <Target size={15} />
                                Slide 3 — Capaian Pembelajaran
                            </div>

                            {/* TITLE */}
                            <h1 className="mt-6 text-5xl leading-[1.05] font-black tracking-tight lg:text-6xl">
                                Tujuan
                                <span className="block text-cyan-400">Pembelajaran</span>
                            </h1>

                            {/* DESC */}
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                                Klik setiap kompetensi untuk melihat capaian pembelajaran yang akan dipelajari pada media interaktif ini.
                            </p>

                            {/* PREVIEW */}
                            <div className="mt-10">
                                <div className="overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900/70">
                                    {/* HEADER */}
                                    <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-5">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
                                            {selected && <selected.icon className="text-cyan-400" />}
                                        </div>

                                        <div>
                                            <p className="text-sm text-cyan-400">Kompetensi Dipilih</p>

                                            <h3 className="mt-1 text-2xl font-black">{selected?.title}</h3>
                                        </div>
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-7">
                                        <p className="leading-relaxed text-slate-300">{selected?.description}</p>

                                        {/* POINTS */}
                                        <div className="mt-7 space-y-4">
                                            {selected?.points.map((point) => (
                                                <div key={point} className="flex items-start gap-3">
                                                    <CheckCircle2 size={20} className="mt-0.5 text-cyan-400" />

                                                    <p className="text-slate-300">{point}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-5">
                            {outcomes.map((item) => {
                                const Icon = item.icon;

                                const isActive = active === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActive(item.id)}
                                        className={`w-full rounded-3xl border p-7 text-left transition duration-300 ${
                                            isActive
                                                ? 'scale-[1.02] border-cyan-400 bg-cyan-400/10'
                                                : 'border-slate-800 bg-slate-900/70 hover:border-cyan-400'
                                        } `}
                                    >
                                        <div className="flex items-start gap-5">
                                            {/* ICON */}
                                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10">
                                                <Icon className="text-cyan-400" />
                                            </div>

                                            {/* CONTENT */}
                                            <div>
                                                <h3 className="text-2xl font-black">{item.title}</h3>

                                                <p className="mt-3 leading-relaxed text-slate-400">{item.description}</p>

                                                {isActive && (
                                                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                                                        <BookOpen size={16} />
                                                        Sedang Dipelajari
                                                    </div>
                                                )}
                                            </div>
                                        </div>
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
