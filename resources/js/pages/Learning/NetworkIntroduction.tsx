import MateriStepIndicator from '@/components/MateriStepIndicator';
import LearningLayout from '@/layouts/LearningLayout';
import { getLearner } from '@/utils/learner';

import { speak } from '@/utils/speech';
import { motion } from 'framer-motion';

import { Globe2, Monitor, Network, Printer, Radio, Share2, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';

const manfaat = [
    { icon: Share2, text: 'Berbagi data dan informasi antarperangkat.' },
    { icon: Printer, text: 'Berbagi perangkat keras, misalnya printer dan media penyimpanan.' },
    { icon: Globe2, text: 'Berbagi koneksi internet.' },
    { icon: Smartphone, text: 'Memudahkan komunikasi antarpengguna.' },
];

const klasifikasi = [
    {
        id: 'pan',
        title: 'PAN',
        subtitle: 'Personal Area Network',
        desc: 'Cakupan sangat kecil, antarperangkat pribadi (mis. koneksi Bluetooth).',
    },
    {
        id: 'lan',
        title: 'LAN',
        subtitle: 'Local Area Network',
        desc: 'Cakupan lokal dalam satu ruang atau gedung; contohnya jaringan lab komputer sekolah.',
    },
    {
        id: 'man',
        title: 'MAN',
        subtitle: 'Metropolitan Area Network',
        desc: 'Cakupan seukuran wilayah kota.',
    },
    {
        id: 'wan',
        title: 'WAN',
        subtitle: 'Wide Area Network',
        desc: 'Cakupan luas antarwilayah atau antarnegara; internet merupakan contoh WAN.',
    },
];

export default function NetworkIntroduction() {
    const [learner, setLearner] = useState({ name: '', kelas: '' });

    useEffect(() => {
        setLearner(getLearner());

        speak(`
        Jaringan komputer adalah sekumpulan komputer dan perangkat lain yang saling terhubung melalui media transmisi,
        sehingga dapat berkomunikasi dan berbagi sumber daya.

        Jaringan komputer bermanfaat untuk berbagi data, berbagi perangkat keras, berbagi koneksi internet,
        serta memudahkan komunikasi antarpengguna.

        Berdasarkan cakupan area, jaringan komputer dapat digolongkan menjadi PAN, LAN, MAN, dan WAN.
    `);
    }, []);

    const greeting = learner.name ? `Halo, ${learner.name} · ${learner.kelas || 'Kelas belum diisi'}` : 'Halo, Peserta Didik';

    return (
        <LearningLayout>
            <div className="min-h-screen overflow-y-auto pb-24 text-white">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    {/* LABEL */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                            Slide 7 — Materi 1: Mengenal Jaringan Komputer
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                            {greeting}
                        </div>
                    </div>

                    {/* TITLE */}
                    <h1 className="mt-5 text-4xl leading-[1.05] font-black tracking-tight lg:text-5xl">
                        Mengenal
                        <span className="block text-cyan-400">Jaringan Komputer</span>
                    </h1>

                    {/* PENGERTIAN & ILUSTRASI */}
                    <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="rounded-3xl border border-white/10 bg-white/5 p-6"
                        >
                            <p className="text-sm font-semibold text-cyan-300">Pengertian</p>
                            <p className="mt-3 leading-relaxed text-slate-300">
                                Jaringan komputer adalah sekumpulan komputer dan perangkat lain yang saling terhubung melalui media transmisi
                                sehingga dapat berkomunikasi dan berbagi sumber daya.
                            </p>
                        </motion.div>

                        {/* ILUSTRASI: BEBERAPA KOMPUTER TERHUBUNG */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="rounded-3xl border border-white/10 bg-slate-900/70 p-6"
                        >
                            <p className="text-sm font-semibold text-cyan-300">Ilustrasi Jaringan</p>

                            <div className="relative mt-4 h-56">
                                <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full">
                                    <line x1="131" y1="85" x2="55" y2="35" stroke="#22d3ee" strokeWidth="2" />
                                    <line x1="170" y1="85" x2="245" y2="35" stroke="#22d3ee" strokeWidth="2" />
                                    <line x1="131" y1="115" x2="55" y2="165" stroke="#22d3ee" strokeWidth="2" />
                                    <line x1="170" y1="115" x2="245" y2="165" stroke="#22d3ee" strokeWidth="2" />
                                </svg>

                                {/* CENTER NODE */}
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            '0 0 10px rgba(34,211,238,.18)',
                                            '0 0 28px rgba(34,211,238,.5)',
                                            '0 0 10px rgba(34,211,238,.18)',
                                        ],
                                    }}
                                    transition={{ repeat: Infinity, duration: 2.2 }}
                                    className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                                >
                                    <Network size={20} />
                                </motion.div>

                                {/* PC NODES */}
                                {[
                                    { label: 'PC 1', top: '17%', left: '18%' },
                                    { label: 'PC 2', top: '17%', left: '82%' },
                                    { label: 'PC 3', top: '83%', left: '18%' },
                                    { label: 'PC 4', top: '83%', left: '82%' },
                                ].map((pc) => (
                                    <div
                                        key={pc.label}
                                        className="absolute flex flex-col items-center gap-1"
                                        style={{ top: pc.top, left: pc.left, transform: 'translate(-50%, -50%)' }}
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                                            <Monitor size={18} />
                                        </div>
                                        <span className="text-[11px] text-slate-400">{pc.label}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-center text-xs text-slate-500">Beberapa komputer yang saling terhubung dalam satu jaringan.</p>
                        </motion.div>
                    </div>

                    {/* MANFAAT */}
                    <div className="mt-6">
                        <h2 className="text-xl font-bold text-white">Manfaat Jaringan Komputer</h2>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {manfaat.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 }}
                                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                            <Icon size={20} />
                                        </div>

                                        <p className="text-sm leading-relaxed text-slate-300">{item.text}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* KLASIFIKASI */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-white">Klasifikasi Berdasarkan Cakupan Area</h2>

                        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {klasifikasi.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className="rounded-3xl border border-white/10 bg-slate-900/70 p-5"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                        {item.id === 'wan' ? <Globe2 size={20} /> : item.id === 'pan' ? <Radio size={20} /> : <Network size={20} />}
                                    </div>

                                    <h3 className="mt-4 text-lg font-black text-white">{item.title}</h3>
                                    <p className="text-xs text-cyan-300">{item.subtitle}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* INDICATOR */}
                    <div className="mt-10 flex justify-center">
                        <MateriStepIndicator current={1} total={4} />
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
