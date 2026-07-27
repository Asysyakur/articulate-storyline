import MateriStepIndicator from '@/components/MateriStepIndicator';
import LearningLayout from '@/layouts/LearningLayout';

import { speak } from '@/utils/speech';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';

import { ArrowRight, Layers, Network, PackageSearch, ShieldQuestion, Signpost } from 'lucide-react';
import { useEffect } from 'react';

const materi = [
    {
        title: 'Alamat IP',
        icon: Network,
        desc: 'Identitas numerik yang digunakan untuk mengenali setiap perangkat dalam jaringan (terdapat versi IPv4 dan IPv6).',
    },
    {
        title: 'Subnet',
        icon: Layers,
        desc: 'Pembagian jaringan menjadi bagian yang lebih kecil untuk memudahkan pengelolaan.',
    },
    {
        title: 'Protokol',
        icon: Signpost,
        desc: 'Aturan komunikasi data; TCP/IP merupakan kumpulan protokol dasar yang digunakan pada internet.',
    },
    {
        title: 'Mekanisme Pertukaran Data',
        icon: PackageSearch,
        desc: 'Data dipecah menjadi paket, dikirim melalui jaringan, lalu disusun kembali di perangkat tujuan.',
    },
];

export default function DasarPengalamatan() {
    useEffect(() => {
        speak(`
        Alamat IP adalah identitas numerik yang digunakan untuk mengenali setiap perangkat dalam jaringan.

        Subnet membagi jaringan menjadi bagian yang lebih kecil agar mudah dikelola,
        sementara protokol seperti TCP/IP mengatur aturan komunikasi data.

        Data dikirim dengan cara dipecah menjadi paket, dikirim melalui jaringan, lalu disusun kembali di perangkat tujuan.

        Pemahaman ini menjadi dasar untuk menelusuri masalah jaringan pada aktivitas berikutnya.
    `);
    }, []);

    return (
        <LearningLayout>
            <div className="min-h-screen overflow-y-auto pb-24 text-white">
                <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
                    {/* LABEL */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                        Slide 10 — Materi 4: Dasar Pengalamatan dan Pertukaran Data
                    </div>

                    {/* TITLE */}
                    <h1 className="mt-5 text-3xl leading-[1.05] font-black tracking-tight sm:text-4xl lg:text-5xl">
                        Dasar Pengalamatan &amp;
                        <span className="block text-cyan-400">Pertukaran Data</span>
                    </h1>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                        {/* MATERI */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            {materi.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.06 }}
                                        className="rounded-3xl border border-white/10 bg-white/5 p-5"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                            <Icon size={20} />
                                        </div>

                                        <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* SKEMA PENGIRIMAN */}
                        <div className="space-y-4">
                            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                                <p className="text-sm font-semibold text-cyan-300">Skema Pengiriman Paket Data</p>

                                <div className="mt-5 flex items-center justify-between gap-2">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                                            <Network size={22} />
                                        </div>
                                        <p className="text-xs text-slate-400">192.168.1.10</p>
                                    </div>

                                    <motion.div
                                        animate={{ x: [0, 8, 0] }}
                                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                                        className="flex flex-1 items-center justify-center gap-2 text-cyan-400"
                                    >
                                        <span className="h-1 flex-1 rounded-full bg-cyan-400/40" />
                                        <ArrowRight size={18} />
                                        <span className="h-1 flex-1 rounded-full bg-cyan-400/40" />
                                    </motion.div>

                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                                            <Network size={22} />
                                        </div>
                                        <p className="text-xs text-slate-400">192.168.1.20</p>
                                    </div>
                                </div>

                                <p className="mt-5 text-sm leading-relaxed text-slate-300">
                                    Contoh penulisan alamat IP: <span className="font-semibold text-cyan-300">192.168.1.10</span>
                                </p>
                            </div>

                            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                <div className="flex items-start gap-3">
                                    <ShieldQuestion size={20} className="mt-0.5 text-cyan-300" />
                                    <div>
                                        <p className="text-sm font-semibold text-cyan-300">Relevansi</p>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                            Pemahaman ini menjadi dasar untuk menelusuri (troubleshooting) masalah jaringan pada aktivitas
                                            berikutnya.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-10 flex flex-col items-center gap-6">
                        <MateriStepIndicator current={4} total={4} />

                        <button
                            type="button"
                            onClick={() => router.visit('/beranda')}
                            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:scale-105"
                        >
                            Mulai Aktivitas
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
