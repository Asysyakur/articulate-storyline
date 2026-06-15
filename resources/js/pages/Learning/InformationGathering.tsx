import LearningLayout from '@/layouts/LearningLayout';

import { AlertCircle, CheckCircle2, Database, FileClock, Library, XCircle } from 'lucide-react';

import { useState } from 'react';

export default function InformationGathering() {
    const [selected, setSelected] = useState<string[]>([]);

    const [submitted, setSubmitted] = useState(false);

    const options = [
        {
            id: 'books',
            label: 'Data Buku',
            icon: Library,
            correct: true,
        },

        {
            id: 'borrowers',
            label: 'Data Peminjam',
            icon: Database,
            correct: true,
        },

        {
            id: 'duration',
            label: 'Lama Peminjaman',
            icon: FileClock,
            correct: true,
        },

        {
            id: 'rack',
            label: 'Warna Rak Buku',
            icon: AlertCircle,
            correct: false,
        },

        {
            id: 'pages',
            label: 'Jumlah Halaman Buku',
            icon: AlertCircle,
            correct: false,
        },
    ];

    /*
    |--------------------------------------------------------------------------
    | TOGGLE OPTION
    |--------------------------------------------------------------------------
    */

    const toggleOption = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((item) => item !== id));
        } else {
            setSelected([...selected, id]);
        }

        setSubmitted(false);
    };

    /*
    |--------------------------------------------------------------------------
    | CHECK ANSWER
    |--------------------------------------------------------------------------
    */

    const correctAnswers = options.filter((item) => item.correct).map((item) => item.id);

    const isCorrect = JSON.stringify([...selected].sort()) === JSON.stringify([...correctAnswers].sort());

    return (
        <LearningLayout>
            <div className="min-h-screen overflow-y-auto py-8 text-white">
                {/* BACKGROUND */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 mx-auto flex max-w-5xl flex-col px-6 pt-6 pb-24">
                    {/* LABEL */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                        Slide 5 — Pengumpulan Informasi
                    </div>

                    {/* TITLE */}
                    <h1 className="mt-4 text-4xl leading-[0.95] font-black tracking-tight lg:text-5xl">
                        Tentukan
                        <span className="block text-cyan-400">Informasi yang Dibutuhkan</span>
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                        Pilih informasi yang diperlukan untuk membantu sekolah mengelola sistem perpustakaan digital dengan lebih efektif.
                    </p>

                    {/* CHECKLIST */}
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {options.map((option) => {
                            const Icon = option.icon;

                            const active = selected.includes(option.id);

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => toggleOption(option.id)}
                                    className={`group rounded-2xl border p-5 text-left transition-all duration-300 ${
                                        active
                                            ? 'border-cyan-400 bg-cyan-400/10'
                                            : 'border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-cyan-400/5'
                                    }`}
                                >
                                    {/* TOP */}
                                    <div className="flex items-start justify-between">
                                        {/* ICON */}
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${
                                                active ? 'bg-cyan-400 text-slate-950' : 'bg-cyan-400/10 text-cyan-400'
                                            }`}
                                        >
                                            <Icon size={22} />
                                        </div>

                                        {/* CHECK */}
                                        <div
                                            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                                                active ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                                            }`}
                                        >
                                            {active && <div className="h-2.5 w-2.5 rounded-full bg-slate-950" />}
                                        </div>
                                    </div>

                                    {/* LABEL */}
                                    <h3 className="mt-4 text-xl font-bold">{option.label}</h3>

                                    {/* DESC */}
                                    <p className="mt-2 text-sm leading-relaxed text-slate-400">Klik untuk memilih informasi ini.</p>
                                </button>
                            );
                        })}
                    </div>

                    {/* ACTION */}
                    <div className="mt-8 flex flex-col items-start gap-4">
                        <button
                            onClick={() => setSubmitted(true)}
                            className="rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-105"
                        >
                            Periksa Jawaban
                        </button>

                        {/* RESULT */}
                        {submitted && (
                            <div
                                className={`w-full rounded-2xl border p-5 ${
                                    isCorrect ? 'border-emerald-400/20 bg-emerald-400/10' : 'border-red-400/20 bg-red-400/10'
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* ICON */}
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                            isCorrect ? 'bg-emerald-400/20 text-emerald-400' : 'bg-red-400/20 text-red-400'
                                        }`}
                                    >
                                        {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                                    </div>

                                    {/* TEXT */}
                                    <div>
                                        <h3 className={`text-xl font-black ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {isCorrect ? 'Jawaban Tepat' : 'Jawaban Belum Tepat'}
                                        </h3>

                                        <p className="mt-2 leading-relaxed text-slate-300">
                                            {isCorrect
                                                ? 'Informasi yang dipilih sudah sesuai untuk membantu pengelolaan perpustakaan digital.'
                                                : 'Masih ada informasi yang kurang relevan atau belum dipilih dengan tepat.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
