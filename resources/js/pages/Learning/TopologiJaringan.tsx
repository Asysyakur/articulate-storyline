import MateriStepIndicator from '@/components/MateriStepIndicator';
import LearningLayout from '@/layouts/LearningLayout';

import { speak } from '@/utils/speech';
import { motion } from 'framer-motion';

import { GitBranch, Network, Share2, Sparkles, Waypoints, Workflow } from 'lucide-react';
import { useEffect, useState } from 'react';

const topologi = [
    {
        id: 'bus',
        title: 'Bus',
        icon: Waypoints,
        desc: 'Seluruh perangkat terhubung pada satu kabel utama; sederhana, tetapi seluruh jaringan terganggu bila kabel utama bermasalah.',
    },
    {
        id: 'star',
        title: 'Star',
        icon: Sparkles,
        desc: 'Setiap perangkat terhubung ke perangkat pusat (switch/hub); relatif mudah dikelola dan banyak digunakan pada LAN.',
        highlight: true,
    },
    {
        id: 'ring',
        title: 'Ring',
        icon: GitBranch,
        desc: 'Perangkat terhubung membentuk lingkaran; data mengalir mengikuti alur cincin.',
    },
    {
        id: 'mesh',
        title: 'Mesh',
        icon: Network,
        desc: 'Setiap perangkat saling terhubung; keandalan tinggi, tetapi biaya besar.',
    },
    {
        id: 'tree',
        title: 'Tree',
        icon: Workflow,
        desc: 'Gabungan beberapa topologi star yang tersusun hierarkis.',
    },
    {
        id: 'hybrid',
        title: 'Hybrid',
        icon: Share2,
        desc: 'Kombinasi dua atau lebih jenis topologi.',
    },
];

export default function TopologiJaringan() {
    const [active, setActive] = useState('star');

    const selected = topologi.find((item) => item.id === active) ?? topologi[1];

    useEffect(() => {
        speak(`
        Topologi jaringan adalah pola pengaturan hubungan antarperangkat dalam suatu jaringan, baik secara fisik maupun logis.

        Terdapat enam jenis topologi, yaitu bus, star, ring, mesh, tree, dan hybrid.

        Pemilihan topologi mempertimbangkan kebutuhan pengguna, skalabilitas, keandalan, dan biaya.
        Topologi star umum digunakan pada jaringan LAN karena relatif mudah dikelola.
    `);
    }, []);

    return (
        <LearningLayout>
            <div className="min-h-screen overflow-y-auto pb-24 text-white">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    {/* LABEL */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                        Slide 3 — Materi 2: Topologi Jaringan
                    </div>

                    {/* TITLE */}
                    <h1 className="mt-5 text-4xl leading-[1.05] font-black tracking-tight lg:text-5xl">
                        Topologi
                        <span className="block text-cyan-400">Jaringan</span>
                    </h1>

                    {/* PENGERTIAN */}
                    <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
                        <p className="text-sm font-semibold text-cyan-300">Pengertian</p>
                        <p className="mt-3 leading-relaxed text-slate-300">
                            Topologi jaringan adalah pola pengaturan hubungan antarperangkat dalam suatu jaringan, baik secara fisik maupun logis.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                        {/* JENIS TOPOLOGI */}
                        <div>
                            <h2 className="text-xl font-bold text-white">Jenis Topologi</h2>

                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                {topologi.map((item, index) => {
                                    const Icon = item.icon;
                                    const isActive = active === item.id;

                                    return (
                                        <motion.button
                                            key={item.id}
                                            type="button"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.06 }}
                                            onClick={() => setActive(item.id)}
                                            className={`rounded-2xl border p-5 text-left transition-all duration-300 ${
                                                isActive
                                                    ? 'border-cyan-400 bg-cyan-400/10'
                                                    : 'border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-cyan-400/5'
                                            }`}
                                        >
                                            <div
                                                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                                                    isActive ? 'bg-cyan-400 text-slate-950' : 'bg-cyan-400/10 text-cyan-300'
                                                }`}
                                            >
                                                <Icon size={20} />
                                            </div>

                                            <div className="mt-3 flex items-center gap-2">
                                                <h3 className="text-lg font-bold text-white">{item.title}</h3>

                                                {item.highlight && (
                                                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
                                                        Contoh LAN
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* DIAGRAM SKEMATIS */}
                        <div className="space-y-4">
                            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                                <p className="text-sm font-semibold text-cyan-300">Diagram Skematis</p>
                                <h3 className="mt-1 text-xl font-black text-white">{selected.title}</h3>

                                <div className="relative mt-6 h-56 overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
                                    {active === 'star' && (
                                        <svg viewBox="0 0 300 200" className="h-full w-full">
                                            <line x1="150" y1="100" x2="60" y2="40" stroke="#22d3ee" strokeWidth="2" />
                                            <line x1="150" y1="100" x2="240" y2="40" stroke="#22d3ee" strokeWidth="2" />
                                            <line x1="150" y1="100" x2="60" y2="160" stroke="#22d3ee" strokeWidth="2" />
                                            <line x1="150" y1="100" x2="240" y2="160" stroke="#22d3ee" strokeWidth="2" />
                                            <circle cx="150" cy="100" r="14" fill="#22d3ee" />
                                            {[
                                                [60, 40],
                                                [240, 40],
                                                [60, 160],
                                                [240, 160],
                                            ].map(([x, y], i) => (
                                                <circle key={i} cx={x} cy={y} r="9" fill="#0891b2" />
                                            ))}
                                        </svg>
                                    )}

                                    {active === 'bus' && (
                                        <svg viewBox="0 0 300 200" className="h-full w-full">
                                            <line x1="30" y1="100" x2="270" y2="100" stroke="#22d3ee" strokeWidth="3" />
                                            {[60, 120, 180, 240].map((x, i) => (
                                                <circle key={i} cx={x} cy="100" r="9" fill="#0891b2" />
                                            ))}
                                        </svg>
                                    )}

                                    {active === 'ring' && (
                                        <svg viewBox="0 0 300 200" className="h-full w-full">
                                            <circle cx="150" cy="100" r="70" fill="none" stroke="#22d3ee" strokeWidth="2" />
                                            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                                                const x = 150 + 70 * Math.cos((deg * Math.PI) / 180);
                                                const y = 100 + 70 * Math.sin((deg * Math.PI) / 180);
                                                return <circle key={i} cx={x} cy={y} r="9" fill="#0891b2" />;
                                            })}
                                        </svg>
                                    )}

                                    {active === 'mesh' && (
                                        <svg viewBox="0 0 300 200" className="h-full w-full">
                                            {[
                                                [70, 50],
                                                [230, 50],
                                                [70, 150],
                                                [230, 150],
                                            ].map(([x1, y1], i) =>
                                                [
                                                    [70, 50],
                                                    [230, 50],
                                                    [70, 150],
                                                    [230, 150],
                                                ].map(([x2, y2], j) =>
                                                    i < j ? (
                                                        <line
                                                            key={`${i}-${j}`}
                                                            x1={x1}
                                                            y1={y1}
                                                            x2={x2}
                                                            y2={y2}
                                                            stroke="#22d3ee"
                                                            strokeWidth="1.5"
                                                        />
                                                    ) : null,
                                                ),
                                            )}
                                            {[
                                                [70, 50],
                                                [230, 50],
                                                [70, 150],
                                                [230, 150],
                                            ].map(([x, y], i) => (
                                                <circle key={i} cx={x} cy={y} r="9" fill="#0891b2" />
                                            ))}
                                        </svg>
                                    )}

                                    {active === 'tree' && (
                                        <svg viewBox="0 0 300 200" className="h-full w-full">
                                            <line x1="150" y1="40" x2="90" y2="100" stroke="#22d3ee" strokeWidth="2" />
                                            <line x1="150" y1="40" x2="210" y2="100" stroke="#22d3ee" strokeWidth="2" />
                                            <line x1="90" y1="100" x2="50" y2="160" stroke="#22d3ee" strokeWidth="2" />
                                            <line x1="90" y1="100" x2="130" y2="160" stroke="#22d3ee" strokeWidth="2" />
                                            <line x1="210" y1="100" x2="180" y2="160" stroke="#22d3ee" strokeWidth="2" />
                                            <line x1="210" y1="100" x2="250" y2="160" stroke="#22d3ee" strokeWidth="2" />
                                            <circle cx="150" cy="40" r="10" fill="#22d3ee" />
                                            <circle cx="90" cy="100" r="9" fill="#0891b2" />
                                            <circle cx="210" cy="100" r="9" fill="#0891b2" />
                                            {[
                                                [50, 160],
                                                [130, 160],
                                                [180, 160],
                                                [250, 160],
                                            ].map(([x, y], i) => (
                                                <circle key={i} cx={x} cy={y} r="7" fill="#155e75" />
                                            ))}
                                        </svg>
                                    )}

                                    {active === 'hybrid' && (
                                        <svg viewBox="0 0 300 200" className="h-full w-full">
                                            <line x1="90" y1="90" x2="40" y2="50" stroke="#22d3ee" strokeWidth="2" />
                                            <line x1="90" y1="90" x2="40" y2="130" stroke="#22d3ee" strokeWidth="2" />
                                            <line x1="90" y1="90" x2="210" y2="90" stroke="#22d3ee" strokeWidth="2" />
                                            <line x1="210" y1="90" x2="260" y2="50" stroke="#22d3ee" strokeWidth="2" />
                                            <line x1="210" y1="90" x2="260" y2="130" stroke="#22d3ee" strokeWidth="2" />
                                            <circle cx="90" cy="90" r="10" fill="#22d3ee" />
                                            <circle cx="210" cy="90" r="10" fill="#22d3ee" />
                                            {[
                                                [40, 50],
                                                [40, 130],
                                                [260, 50],
                                                [260, 130],
                                            ].map(([x, y], i) => (
                                                <circle key={i} cx={x} cy={y} r="8" fill="#0891b2" />
                                            ))}
                                        </svg>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                <p className="text-sm font-semibold text-cyan-300">Pertimbangan Pemilihan Topologi</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                    Kebutuhan pengguna, skalabilitas, keandalan, dan biaya.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* INDICATOR */}
                    <div className="mt-10 flex justify-center">
                        <MateriStepIndicator current={2} total={4} />
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
