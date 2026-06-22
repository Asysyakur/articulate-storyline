import LearningLayout from '@/layouts/LearningLayout';

import { motion } from 'framer-motion';
import { BookOpen, Brain, CheckCircle2, Database, Lightbulb, Target } from 'lucide-react';

import { useState } from 'react';

type Outcome = {
    id: string;
    title: string;
    icon: typeof Brain;
    description: string;
    points: string[];
};

const outcomes: Outcome[] = [
    {
        id: 'konsep',
        title: 'Konsep & Jenis Jaringan (LAN/MAN/WAN)',
        icon: Brain,
        description:
            'Peserta didik mampu memahami konsep dasar jaringan komputer dan jenis-jenis jaringan yang digunakan dalam sistem perpustakaan digital.',
        points: ['Mengidentifikasi masalah', 'Menyusun solusi secara sistematis', 'Memecahkan masalah secara logis'],
    },
    {
        id: 'topologi',
        title: 'Topologi & Perangkat Jaringan',
        icon: Lightbulb,
        description: 'Peserta didik mampu menyusun langkah-langkah solusi secara runtut dan logis.',
        points: ['Menentukan urutan langkah', 'Menyusun solusi terstruktur', 'Membuat alur penyelesaian'],
    },
    {
        id: 'ip',
        title: 'Pengalamatan IP (IP, subnet, gateway)',
        icon: Database,
        description: 'Peserta didik mampu memahami cara mengelola dan merepresentasikan data perpustakaan digital.',
        points: ['Mengelola data buku', 'Memahami data peminjaman', 'Menyusun informasi digital'],
    },
    {
        id: 'konektivitas',
        title: 'Konektivitas Internet & Troubleshooting',
        icon: Database,
        description: 'Peserta didik mampu memahami cara mengelola dan merepresentasikan data perpustakaan digital.',
        points: ['Mengelola data buku', 'Memahami data peminjaman', 'Menyusun informasi digital'],
    },
];

export default function LearningOutcomes() {
    const [active, setActive] = useState('konsep');
    const [visited, setVisited] = useState<string[]>(['konsep']);

    const selected = outcomes.find((item) => item.id === active) ?? outcomes[0];

    const panelLabel = selected.id === 'konsep' ? 'Change state of panel teks' : 'Show layer';
    const SelectedIcon = selected.icon;

    return (
        <LearningLayout fullscreen>
            <div className="relative flex min-h-screen items-center overflow-hidden">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-14 left-12 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
                    <div className="absolute right-12 bottom-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-6">
                    <div className="grid items-start gap-8 xl:grid-cols-[0.92fr_1.08fr]">
                        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                                <Target size={15} />
                                Slide 3 — Capaian Pembelajaran
                            </div>

                            <h1 className="mt-5 text-4xl leading-[1.02] font-black tracking-tight lg:text-5xl">
                                Tujuan
                                <span className="block text-cyan-400">Pembelajaran</span>
                            </h1>

                            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 lg:text-lg">
                                Klik tiap kompetensi untuk melihat capaian pembelajaran yang dipelajari pada media interaktif ini.
                            </p>

                            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300">
                                <BookOpen size={14} className="text-cyan-300" />
                                Panel kiri menampilkan detail kompetensi aktif.
                            </div>

                            <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/75 shadow-2xl shadow-cyan-950/10 backdrop-blur-xl">
                                <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10">
                                        <SelectedIcon size={22} className="text-cyan-400" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm text-cyan-400">{panelLabel}</p>
                                        <h3 className="mt-1 text-xl font-black leading-tight lg:text-2xl">{selected.title}</h3>
                                    </div>
                                </div>

                                <motion.div
                                    key={active}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.22 }}
                                    className="p-5"
                                >
                                    <p className="max-w-xl text-sm leading-relaxed text-slate-300 lg:text-base">{selected.description}</p>

                                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                        {selected.points.map((point) => (
                                            <div key={point} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                                                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                                                    <CheckCircle2 size={15} />
                                                </div>

                                                <p className="text-sm leading-relaxed text-slate-300">{point}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.section>

                        <section className="grid gap-4 sm:grid-cols-2 xl:gap-5">
                            {outcomes.map((item) => {
                                const Icon = item.icon;
                                const isActive = active === item.id;
                                const isVisited = visited.includes(item.id);

                                return (
                                    <motion.button
                                        key={item.id}
                                        type="button"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => {
                                            setActive(item.id);
                                            setVisited((currentVisited) =>
                                                currentVisited.includes(item.id) ? currentVisited : [...currentVisited, item.id],
                                            );
                                        }}
                                        className={`flex h-full min-h-[185px] w-full flex-col rounded-3xl border p-5 text-left transition duration-300 ${
                                            isActive
                                                ? 'border-cyan-400/70 bg-gradient-to-br from-cyan-400/14 to-slate-900 shadow-[0_0_0_1px_rgba(34,211,238,0.18)]'
                                                : 'border-slate-800 bg-slate-900/70 hover:border-cyan-400/50 hover:bg-slate-900/90'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isActive ? 'bg-cyan-400 text-slate-950' : 'bg-cyan-400/10 text-cyan-300'}`}>
                                                <Icon size={22} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-start gap-2">
                                                    <h3 className="text-lg font-black leading-tight text-white lg:text-xl">{item.title}</h3>

                                                    {isActive && (
                                                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-300">
                                                            Selected
                                                        </span>
                                                    )}

                                                    {isVisited && (
                                                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-200">
                                                            Visited
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>

                                                <div className="mt-auto pt-4">
                                                    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3.5 py-1.5 text-xs font-medium text-cyan-300 lg:text-sm">
                                                        <BookOpen size={14} />
                                                        {isActive ? 'Sedang Dipelajari' : 'Klik untuk menampilkan layer'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </section>
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
