import MateriStepIndicator from '@/components/MateriStepIndicator';
import LearningLayout from '@/layouts/LearningLayout';

import { speak } from '@/utils/speech';
import { motion } from 'framer-motion';

import { Bluetooth, Cable, Network, Router, Wifi, Zap } from 'lucide-react';
import { useEffect } from 'react';

const mediaTransmisi = [
    {
        title: 'Kabel UTP',
        icon: Cable,
        desc: 'Media kabel yang umum digunakan pada jaringan LAN.',
    },
    {
        title: 'Serat Optik',
        icon: Zap,
        desc: 'Kecepatan tinggi dengan jangkauan jauh.',
    },
    {
        title: 'Wi-Fi',
        icon: Wifi,
        desc: 'Media nirkabel untuk menghubungkan perangkat tanpa kabel.',
    },
    {
        title: 'Bluetooth',
        icon: Bluetooth,
        desc: 'Media nirkabel jarak dekat antarperangkat pribadi.',
    },
];

const komponen = [
    {
        title: 'NIC',
        subtitle: 'Network Interface Card',
        icon: Network,
        desc: 'Antarmuka yang menghubungkan perangkat ke jaringan.',
    },
    {
        title: 'Hub',
        icon: Router,
        desc: 'Meneruskan data ke seluruh port (kurang efisien).',
    },
    {
        title: 'Switch',
        icon: Network,
        desc: 'Meneruskan data hanya ke port tujuan dalam satu LAN.',
    },
    {
        title: 'Router',
        icon: Router,
        desc: 'Menghubungkan antarjaringan yang berbeda dan menentukan jalur pengiriman data.',
    },
    {
        title: 'Access Point',
        icon: Wifi,
        desc: 'Menyediakan koneksi nirkabel ke jaringan.',
    },
];

export default function MediaKomponenJaringan() {
    useEffect(() => {
        speak(`
        Media transmisi jaringan terdiri dari media kabel, yaitu kabel UTP dan serat optik,
        serta media nirkabel, yaitu Wi-Fi dan Bluetooth.

        Komponen jaringan meliputi NIC, Hub, Switch, Router, dan Access Point,
        yang masing-masing memiliki fungsi berbeda dalam menghubungkan dan mengatur lalu lintas data.
    `);
    }, []);

    return (
        <LearningLayout>
            <div className="min-h-screen overflow-y-auto pb-24 text-white">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    {/* LABEL */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                        Slide 4 — Materi 3: Media dan Komponen Jaringan
                    </div>

                    {/* TITLE */}
                    <h1 className="mt-5 text-4xl leading-[1.05] font-black tracking-tight lg:text-5xl">
                        Media &amp; Komponen
                        <span className="block text-cyan-400">Jaringan</span>
                    </h1>

                    {/* MEDIA TRANSMISI */}
                    <div className="mt-6">
                        <h2 className="text-xl font-bold text-white">Media Transmisi</h2>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {mediaTransmisi.map((item, index) => {
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
                    </div>

                    {/* KOMPONEN */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-white">Komponen / Perangkat Jaringan</h2>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {komponen.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.06 }}
                                        className="rounded-3xl border border-white/10 bg-slate-900/70 p-5"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                            <Icon size={20} />
                                        </div>

                                        <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                                        {item.subtitle && <p className="text-xs text-cyan-300">{item.subtitle}</p>}
                                        <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* INDICATOR */}
                    <div className="mt-10 flex justify-center">
                        <MateriStepIndicator current={3} total={4} />
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
