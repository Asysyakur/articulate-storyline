import LearningLayout from '@/layouts/LearningLayout';

import { ArrowRight, Brain, CheckCircle2, Database, Lightbulb } from 'lucide-react';

import { Link } from '@inertiajs/react';

import { useState } from 'react';

const reflections = [
    {
        id: 1,

        title: 'Berpikir Komputasional',

        icon: Brain,

        description: 'Saya memahami bagaimana menganalisis masalah secara logis.',
    },

    {
        id: 2,

        title: 'Algoritma',

        icon: Lightbulb,

        description: 'Saya memahami langkah-langkah penyelesaian masalah.',
    },

    {
        id: 3,

        title: 'Representasi Data',

        icon: Database,

        description: 'Saya memahami bagaimana data disimpan secara digital.',
    },
];

export default function Reflection() {
    const [selected, setSelected] = useState<number[]>([]);

    const toggleReflection = (id: number) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((item) => item !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const completed = selected.length === reflections.length;

    return (
        <LearningLayout>
            <div className="min-h-screen overflow-y-auto text-white">
                {/* BACKGROUND */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                {/* CONTENT */}
                <div className="mx-auto max-w-5xl px-6 py-8 pb-24">
                    {/* HEADER */}
                    <div className="text-center">
                        {/* LABEL */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                            Slide 14 — Refleksi
                        </div>

                        {/* TITLE */}
                        <h1 className="mt-4 text-4xl leading-[0.95] font-black tracking-tight lg:text-5xl">
                            Refleksi
                            <span className="block text-cyan-400">Pembelajaran</span>
                        </h1>

                        {/* DESC */}
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                            Pilih hal yang telah kamu pahami setelah mempelajari materi perpustakaan digital.
                        </p>
                    </div>

                    {/* CARDS */}
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {reflections.map((item) => {
                            const Icon = item.icon;

                            const active = selected.includes(item.id);

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => toggleReflection(item.id)}
                                    className={`rounded-[24px] border p-5 text-left transition-all ${
                                        active ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/10 bg-white/5 hover:border-cyan-400/40'
                                    }`}
                                >
                                    {/* ICON */}
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                            active ? 'bg-cyan-400 text-slate-950' : 'bg-cyan-400/10 text-cyan-300'
                                        }`}
                                    >
                                        <Icon size={24} />
                                    </div>

                                    {/* TITLE */}
                                    <h3 className="mt-4 text-xl font-bold">{item.title}</h3>

                                    {/* DESC */}
                                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>

                                    {/* STATUS */}
                                    {active && (
                                        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-300">
                                            <CheckCircle2 size={14} />
                                            Dipahami
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* FINISH */}
                    {completed && (
                        <div className="mt-8 rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 p-6 text-center">
                            <h2 className="text-2xl font-black text-emerald-300">Refleksi Selesai</h2>

                            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                                Terima kasih telah melakukan refleksi pembelajaran mengenai pengelolaan perpustakaan digital.
                            </p>

                            {/* BUTTON */}
                            <div className="mt-6">
                                <Link
                                    href="/developer-profile"
                                    className="inline-flex items-center gap-3 rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:scale-105"
                                >
                                    Profil Pengembang
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </LearningLayout>
    );
}
