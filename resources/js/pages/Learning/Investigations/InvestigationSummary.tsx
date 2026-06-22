import LearningLayout from '@/layouts/LearningLayout';

import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

import { ArrowRight, Brain, CheckCircle2, Database, FileBarChart, Workflow } from 'lucide-react';

export default function InvestigationSummary() {
    const points = [
        {
            icon: Brain,
            title: 'Topologi Jaringan',
            desc: 'Mengidentifikasi perangkat jaringan dan hubungan antar perangkat pada laboratorium komputer.',
        },

        {
            icon: Workflow,
            title: 'IP Addressing',
            desc: 'Menganalisis konfigurasi IP Address, subnet mask, dan gateway untuk menemukan kesalahan konfigurasi.',
        },

        {
            icon: Database,
            title: 'Gateway & DNS',
            desc: 'Memahami peran gateway dan DNS dalam proses akses internet dari jaringan lokal.',
        },

        {
            icon: FileBarChart,
            title: 'Troubleshooting Ping',
            desc: 'Menggunakan pengujian ping untuk menentukan lokasi gangguan jaringan secara sistematis.',
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
                            Kesimpulan Investigasi
                            <span className="block text-cyan-400">Gangguan Jaringan</span>
                        </h1>

                        {/* DESC */}
                        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
                            Peserta didik telah melakukan investigasi terhadap berbagai gangguan jaringan komputer dan memahami langkah-langkah
                            analisis yang digunakan untuk menemukan akar permasalahan secara sistematis.
                        </p>
                    </div>

                    {/* SUMMARY GRID */}
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {points.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        y: 30,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.5,
                                    }}
                                    className="rounded-[24px] border border-white/10 bg-white/5 p-5"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                        <Icon size={24} />
                                    </div>

                                    <h3 className="mt-4 text-xl font-bold">{item.title}</h3>

                                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
                                </motion.div>
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
                                    Jaringan komputer dapat mengalami berbagai gangguan, mulai dari masalah perangkat jaringan, konfigurasi IP
                                    Address, gateway dan DNS, hingga konektivitas internet. Melalui proses investigasi, setiap gangguan dapat
                                    diidentifikasi menggunakan pendekatan yang sistematis sehingga solusi yang tepat dapat diterapkan sesuai penyebab
                                    masalah yang ditemukan.
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
                                Peserta didik akan merancang solusi jaringan berdasarkan hasil investigasi yang telah dilakukan untuk mengatasi
                                permasalahan pada laboratorium komputer.
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
