import LearningLayout from '@/layouts/LearningLayout';

import { ArrowRight, BadgeCheck, RotateCcw, Trophy } from 'lucide-react';

import { Link } from '@inertiajs/react';

import { useEffect, useState } from 'react';

export default function Result() {
    const [score, setScore] = useState(0);

    const totalQuestions = 3;

    useEffect(() => {
        const saved = sessionStorage.getItem('evaluationScore');

        if (saved) {
            setScore(Number(saved));
        }
    }, []);

    const percentage = Math.round((score / totalQuestions) * 100);

    const passed = percentage >= 75;

    return (
        <LearningLayout>
            <div className="min-h-screen overflow-y-auto text-white">
                {/* BACKGROUND */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                {/* CONTENT */}
                <div className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-8 pb-24">
                    <div className="w-full rounded-[28px] border border-white/10 bg-slate-900/70 p-8 text-center shadow-2xl">
                        {/* ICON */}
                        <div
                            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
                                passed ? 'bg-emerald-400/20 text-emerald-300' : 'bg-red-400/20 text-red-300'
                            }`}
                        >
                            <Trophy size={40} />
                        </div>

                        {/* TITLE */}
                        <h1 className="mt-6 text-4xl leading-[0.95] font-black tracking-tight lg:text-5xl">
                            Hasil
                            <span className="block text-cyan-400">Evaluasi</span>
                        </h1>

                        {/* SCORE */}
                        <div className="mt-8">
                            <h2 className="text-6xl font-black">{percentage}</h2>

                            <p className="mt-2 text-base text-slate-400">Nilai Akhir</p>
                        </div>

                        {/* STATUS */}
                        <div
                            className={`mt-8 inline-flex items-center gap-3 rounded-2xl px-5 py-3 ${
                                passed ? 'bg-emerald-400/10 text-emerald-300' : 'bg-red-400/10 text-red-300'
                            }`}
                        >
                            <BadgeCheck size={20} />

                            <span className="text-base font-bold">{passed ? 'Tuntas' : 'Belum Tuntas'}</span>
                        </div>

                        {/* FEEDBACK */}
                        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
                            {passed
                                ? 'Selamat! Anda telah berhasil memahami konsep berpikir komputasional dan membantu sekolah menemukan solusi pengelolaan perpustakaan digital.'
                                : 'Anda masih perlu mempelajari kembali materi investigasi dan penyusunan solusi.'}
                        </p>

                        {/* ACTION */}
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            {/* RESTART */}
                            <button
                                onClick={() => location.reload()}
                                className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold transition hover:bg-white/10"
                            >
                                <RotateCcw size={18} />
                                Ulangi
                            </button>

                            {/* NEXT */}
                            <Link
                                href="/reflection"
                                className="inline-flex items-center gap-3 rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:scale-105"
                            >
                                Lanjut Refleksi
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
