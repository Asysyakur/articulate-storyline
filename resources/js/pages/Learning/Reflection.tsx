import LearningLayout from '@/layouts/LearningLayout';

import { ArrowRight, Brain, CheckCircle2, Database, Lightbulb, MessageSquareQuote, PenLine } from 'lucide-react';

import { Link } from '@inertiajs/react';

import { speak } from '@/utils/speech';
import { useEffect, useState } from 'react';

const reflections = [
    {
        id: 1,
        title: 'Strategi paling membantu',
        prompt: 'Strategi mana yang paling membantu menemukan akar masalah?',
        example: 'Misalnya: ping bertingkat, cek fisik dulu, atau bandingkan gejala yang muncul.',
        feedback: 'Fokus pada langkah yang paling mengurangi ruang tebak-tebakan dan membuat penyebab masalah terlihat lebih cepat.',
        icon: Brain,
    },

    {
        id: 2,
        title: 'Bukti kesimpulan',
        prompt: 'Bukti apa yang membuatmu yakin pada kesimpulan?',
        example: 'Misalnya: hasil pengamatan, pola error, perbandingan sebelum-sesudah, atau data yang konsisten.',
        feedback: 'Kesimpulan yang kuat lahir dari bukti yang bisa diamati, bukan hanya dari dugaan awal.',
        icon: Lightbulb,
    },

    {
        id: 3,
        title: 'Jika gejalanya berubah',
        prompt: 'Jika gejalanya berbeda, langkah mana yang akan kamu ubah?',
        example: 'Misalnya: urutan pengecekan, alat yang dipakai, atau bagian sistem yang diprioritaskan.',
        feedback: 'Refleksi yang baik menunjukkan penyesuaian strategi, bukan mengulang langkah yang sama tanpa evaluasi.',
        icon: Database,
    },
];

export default function Reflection() {
    const [activeId, setActiveId] = useState(reflections[0].id);

    const [answers, setAnswers] = useState<Record<number, string>>({});

    const activeReflection = reflections.find((item) => item.id === activeId) ?? reflections[0];

    const completed = reflections.every((item) => answers[item.id]?.trim().length > 0);

    const handleAnswerChange = (id: number, value: string) => {
        setAnswers((current) => ({
            ...current,
            [id]: value,
        }));
    };

    useEffect(() => {
        speak(
            'Mari refleksikan proses berpikir yang telah kamu lakukan. Pikirkan strategi yang paling membantu, bukti yang mendukung kesimpulanmu, dan bagaimana kamu akan menyesuaikan langkah jika menghadapi masalah yang berbeda.',
        );
    }, []);

    return (
        <LearningLayout>
            <div className="min-h-screen overflow-y-auto text-white">
                {/* BACKGROUND */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                {/* CONTENT */}
                <div className="mx-auto max-w-6xl px-6 py-8 pb-24">
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
                            Pilih dan tanggapi pernyataan refleksi tentang proses berpikir kritis, lalu tulis jawaban singkatmu.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                        {/* CARDS */}
                        <div className="grid gap-4">
                            <div className="rounded-[24px] border border-cyan-400/15 bg-cyan-400/8 p-5">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                        <MessageSquareQuote size={22} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-cyan-300">Narasi / Audio</p>
                                        <p className="mt-1 text-sm leading-relaxed text-slate-300">
                                            Mari merefleksikan bagaimana kamu berpikir, memilih strategi, dan menyimpulkan hasil.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {reflections.map((item) => {
                                const Icon = item.icon;

                                const active = activeId === item.id;

                                const hasAnswer = Boolean(answers[item.id]?.trim());

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setActiveId(item.id)}
                                        className={`rounded-[24px] border p-5 text-left transition-all duration-300 ${
                                            active
                                                ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-950/20'
                                                : 'border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-cyan-400/5'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition ${
                                                        active ? 'bg-cyan-400 text-slate-950' : 'bg-cyan-400/10 text-cyan-300'
                                                    }`}
                                                >
                                                    <Icon size={22} />
                                                </div>

                                                <div>
                                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.prompt}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-2">
                                                {active && (
                                                    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-3 py-1 text-xs font-bold text-slate-950">
                                                        Selected
                                                    </div>
                                                )}

                                                {hasAnswer && (
                                                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                                        <CheckCircle2 size={14} />
                                                        Visited
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* LAYER */}
                        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/10">
                            <div className="flex items-start gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                    <PenLine size={22} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-cyan-300">Show layer</p>
                                    <h2 className="mt-1 text-2xl font-black">{activeReflection.title}</h2>
                                </div>
                            </div>

                            <div className="mt-5 rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-5">
                                <p className="text-base font-semibold text-white">{activeReflection.prompt}</p>
                                <p className="mt-3 text-sm leading-relaxed text-slate-300">{activeReflection.feedback}</p>
                            </div>

                            <div className="mt-5">
                                <label className="mb-2 block text-sm font-semibold text-slate-200">Jawaban singkat</label>
                                <textarea
                                    value={answers[activeReflection.id] ?? ''}
                                    onChange={(event) => handleAnswerChange(activeReflection.id, event.target.value)}
                                    rows={5}
                                    placeholder={activeReflection.example}
                                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm leading-relaxed text-white transition outline-none placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                                />
                            </div>

                            <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-slate-300">
                                Fokuskan jawaban pada alasan, bukti, dan langkah berpikir yang kamu gunakan.
                            </div>

                            {completed && (
                                <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-relaxed text-emerald-100">
                                    Semua prompt refleksi sudah terisi. Kamu siap lanjut ke profil pengembang.
                                </div>
                            )}

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
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
