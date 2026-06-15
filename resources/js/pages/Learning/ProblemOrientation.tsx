import LearningLayout from '@/layouts/LearningLayout';

import { AlertTriangle, CheckCircle2, PlayCircle } from 'lucide-react';

import { useState } from 'react';

export default function ProblemOrientation() {
    const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

    const problems = {
        queue: {
            title: 'Antrean Panjang',
            description: 'Proses pencarian dan pencatatan buku masih manual sehingga pelayanan menjadi lambat.',
        },

        lost: {
            title: 'Data Mudah Hilang',
            description: 'Pencatatan menggunakan buku menyebabkan data peminjaman mudah hilang atau rusak.',
        },

        search: {
            title: 'Pencarian Buku Lambat',
            description: 'Petugas harus mencari data buku satu per satu secara manual.',
        },
    };

    return (
        <LearningLayout>
            <div className="min-h-screen bg-[#020617] py-10 text-white">
                {/* BACKGROUND */}
                <div className="fixed inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-32 lg:px-8">
                    {/* LABEL */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm text-red-300">
                        <AlertTriangle size={15} />
                        Slide 4 — Orientasi Masalah
                    </div>

                    {/* TITLE */}
                    <h1 className="mt-5 text-4xl leading-[1] font-black tracking-tight lg:text-6xl">
                        Permasalahan
                        <span className="block text-cyan-400">Perpustakaan Sekolah</span>
                    </h1>

                    {/* DESC */}
                    <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                        Perhatikan video berikut lalu klik hotspot untuk mengidentifikasi masalah yang terjadi pada sistem perpustakaan sekolah.
                    </p>

                    {/* VIDEO AREA */}
                    <div className="relative mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-black shadow-2xl">
                        {/* VIDEO */}
                        <video controls className="w-full bg-black">
                            <source src="/videos/library-case.mp4" type="video/mp4" />
                        </video>

                        {/* HOTSPOT 1 */}
                        <button
                            onClick={() => setSelectedProblem('queue')}
                            className="absolute top-[35%] left-[22%] flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-red-500 shadow-[0_0_25px_rgba(239,68,68,0.8)] transition hover:scale-110"
                        >
                            <div className="h-3 w-3 rounded-full bg-white" />
                        </button>

                        {/* HOTSPOT 2 */}
                        <button
                            onClick={() => setSelectedProblem('lost')}
                            className="absolute top-[55%] left-[55%] flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-red-500 shadow-[0_0_25px_rgba(239,68,68,0.8)] transition hover:scale-110"
                        >
                            <div className="h-3 w-3 rounded-full bg-white" />
                        </button>

                        {/* HOTSPOT 3 */}
                        <button
                            onClick={() => setSelectedProblem('search')}
                            className="absolute top-[25%] right-[20%] flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-red-500 shadow-[0_0_25px_rgba(239,68,68,0.8)] transition hover:scale-110"
                        >
                            <div className="h-3 w-3 rounded-full bg-white" />
                        </button>
                    </div>

                    {/* INFO */}
                    <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                        {/* NARRATION */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10">
                                    <PlayCircle className="text-cyan-400" size={24} />
                                </div>

                                <div>
                                    <p className="text-sm text-cyan-300">Narasi Masalah</p>

                                    <h2 className="text-xl font-bold">Sistem Masih Manual</h2>
                                </div>
                            </div>

                            <p className="mt-5 leading-relaxed text-slate-300">
                                Perpustakaan sekolah masih menggunakan proses manual untuk pencatatan data buku, peminjaman, dan pengembalian. Hal ini
                                menyebabkan berbagai masalah dalam pengelolaan perpustakaan.
                            </p>

                            {/* QUESTION */}
                            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                <p className="text-sm font-semibold text-cyan-300">Pertanyaan Pemantik</p>

                                <h3 className="mt-3 text-2xl leading-tight font-black">Apa masalah utama dari sistem perpustakaan tersebut?</h3>
                            </div>
                        </div>

                        {/* HOTSPOT INFO */}
                        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-emerald-400" size={24} />

                                <div>
                                    <p className="text-sm text-emerald-300">Hasil Identifikasi</p>

                                    <h2 className="text-xl font-bold">Informasi Masalah</h2>
                                </div>
                            </div>

                            {!selectedProblem ? (
                                <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-6 text-center">
                                    <p className="text-slate-400">Klik hotspot pada video untuk melihat masalah yang ditemukan.</p>
                                </div>
                            ) : (
                                <div className="mt-6">
                                    <h3 className="text-2xl font-black text-white">{problems[selectedProblem as keyof typeof problems].title}</h3>

                                    <p className="mt-4 leading-relaxed text-slate-300">
                                        {problems[selectedProblem as keyof typeof problems].description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
