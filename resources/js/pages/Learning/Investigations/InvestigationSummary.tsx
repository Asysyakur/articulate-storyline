import LearningLayout from '@/layouts/LearningLayout';

import { Link } from '@inertiajs/react';

import { ArrowRight, Brain, CheckCircle2, Database, FileBarChart, Workflow } from 'lucide-react';

export default function InvestigationSummary() {
    const points = [
        {
            icon: Brain,

            title: 'Berpikir Komputasional',

            desc: 'Masalah dianalisis secara logis dan terstruktur.',
        },

        {
            icon: Workflow,

            title: 'Algoritma',

            desc: 'Langkah penyelesaian dibuat berurutan.',
        },

        {
            icon: Database,

            title: 'Representasi Data',

            desc: 'Data disimpan dalam bentuk digital yang terorganisir.',
        },

        {
            icon: FileBarChart,

            title: 'Pengolahan Data',

            desc: 'Data dapat dicari, diurutkan, dan dibuat laporan otomatis.',
        },
    ];

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
                    <div className="max-w-3xl">
                        {/* LABEL */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                            Slide 10 — Ringkasan Investigasi
                        </div>

                        {/* TITLE */}
                        <h1 className="mt-4 text-4xl leading-[0.95] font-black tracking-tight lg:text-5xl">
                            Hasil
                            <span className="block text-cyan-400">Investigasi Masalah</span>
                        </h1>

                        {/* DESC */}
                        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
                            Peserta didik telah melakukan investigasi terhadap permasalahan sistem perpustakaan sekolah dan memahami konsep
                            informatika untuk menyelesaikan masalah tersebut.
                        </p>
                    </div>

                    {/* SUMMARY GRID */}
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {points.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div key={index} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                                    {/* ICON */}
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                        <Icon size={24} />
                                    </div>

                                    {/* TITLE */}
                                    <h3 className="mt-4 text-xl font-bold">{item.title}</h3>

                                    {/* DESC */}
                                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* CONCLUSION */}
                    <div className="mt-8 rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 p-6">
                        <div className="flex items-start gap-4">
                            {/* ICON */}
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-300">
                                <CheckCircle2 size={24} />
                            </div>

                            {/* TEXT */}
                            <div>
                                <h2 className="text-xl font-black text-white">Kesimpulan Investigasi</h2>

                                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-200">
                                    Sistem perpustakaan manual memiliki berbagai masalah seperti pencarian lambat, data mudah hilang, dan proses
                                    peminjaman yang tidak efisien. Dengan bantuan konsep informatika, masalah dapat dianalisis dan diselesaikan
                                    menggunakan sistem digital.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* NEXT */}
                    <div className="mt-8 flex flex-col gap-5 rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 p-6 lg:flex-row lg:items-center lg:justify-between">
                        {/* LEFT */}
                        <div>
                            <p className="text-sm font-semibold text-cyan-300">Tahap Selanjutnya</p>

                            <h2 className="mt-2 text-2xl font-black">Penyusunan Solusi</h2>

                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                                Peserta didik akan menyusun solusi digital untuk membantu sekolah mengelola data perpustakaan dengan lebih efektif.
                            </p>
                        </div>

                        {/* BUTTON */}
                        <Link
                            href="/solution-development"
                            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-105"
                        >
                            Lanjut Penyusunan Solusi
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
