import LearningLayout from '@/layouts/LearningLayout';
import { Cable, CheckCircle2, Info, Network, Router, Search, ShieldAlert } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type HotspotType = 'router' | 'switch' | 'cable';

export default function ComputationalThinking() {
    const [active, setActive] = useState<HotspotType | null>(null);

    const [visited, setVisited] = useState({
        router: false,
        switch: false,
        cable: false,
    });

    const hotspotDetail = {
        router: {
            title: 'Router',
            icon: <Router size={18} />,
            description: 'Router berfungsi sebagai penghubung jaringan lokal laboratorium menuju jaringan internet.',
        },

        switch: {
            title: 'Switch',
            icon: <Network size={18} />,
            description: 'Lampu indikator port switch yang mati menandakan tidak ada koneksi fisik yang aktif pada port tersebut.',
        },

        cable: {
            title: 'Kabel UTP / RJ-45',
            icon: <Cable size={18} />,
            description: 'Konektor RJ-45 yang longgar dapat menyebabkan komputer tidak terhubung ke jaringan.',
        },
    };

    const handleHotspot = (key: HotspotType) => {
        setActive(key);

        setVisited((prev) => ({
            ...prev,
            [key]: true,
        }));
    };

    const progress = useMemo(() => {
        return Number(visited.router) + Number(visited.switch) + Number(visited.cable);
    }, [visited]);

    const completed = visited.router && visited.switch && visited.cable;

    useEffect(() => {
        localStorage.setItem('computational-thinking-completed', completed ? 'true' : 'false');

        window.dispatchEvent(new Event('computational-thinking-completed-change'));
    }, [completed]);

    return (
        <LearningLayout>
            <div className="min-h-screen pb-24">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    {/* LABEL */}
                    <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                        Slide 6 — Investigasi
                    </div>

                    {/* TITLE */}
                    <h1 className="mt-4 text-5xl font-black">
                        Topologi &<span className="block text-cyan-400">Perangkat Jaringan</span>
                    </h1>

                    <p className="mt-4 max-w-3xl text-slate-300">
                        Selidiki penyebab gangguan jaringan dengan mengamati topologi dan perangkat jaringan pada laboratorium komputer.
                    </p>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
                        {/* LEFT */}
                        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
                            <div className="relative h-[560px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
                                {/* INTERNET */}
                                <div className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-2 text-sm font-semibold text-cyan-300">
                                    INTERNET
                                </div>

                                {/* ROUTER */}
                                <div className="absolute top-24 left-1/2 -translate-x-1/2">
                                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-3xl border border-cyan-400/30 bg-cyan-400/10">
                                        <Router size={40} className="text-cyan-400" />
                                        <p className="mt-2 text-center text-sm">Router</p>
                                    </div>

                                    <button
                                        onClick={() => handleHotspot('router')}
                                        className={`absolute -top-3 -right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white transition ${
                                            visited.router ? 'bg-emerald-500' : 'animate-pulse bg-red-500'
                                        }`}
                                    >
                                        <Search size={15} />
                                    </button>
                                </div>

                                {/* SWITCH */}
                                <div className="absolute top-64 left-1/2 -translate-x-1/2">
                                    <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 px-10 py-6">
                                        <Network size={42} className="mx-auto text-cyan-400" />
                                        <p className="mt-2 text-center text-sm">Switch</p>

                                        <div className="flex justify-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-emerald-400" />
                                            <div className="h-3 w-3 rounded-full bg-emerald-400" />
                                            <div className="h-3 w-3 rounded-full bg-emerald-400" />
                                            <div className="h-3 w-3 rounded-full bg-red-500" />
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleHotspot('switch')}
                                        className={`absolute -top-3 -right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white transition ${
                                            visited.switch ? 'bg-emerald-500' : 'animate-pulse bg-red-500'
                                        }`}
                                    >
                                        <ShieldAlert size={15} />
                                    </button>
                                </div>

                                {/* CONNECTION LINES */}
                                <svg className="pointer-events-none absolute inset-0 h-full w-full">
                                    <line x1="50%" y1="56" x2="50%" y2="96" stroke="#22d3ee" strokeWidth="2" />

                                    <line x1="50%" y1="190" x2="50%" y2="258" stroke="#22d3ee" strokeWidth="2" />

                                    <line x1="50%" y1="385" x2="20%" y2="88%" stroke="#22d3ee" strokeWidth="2" />

                                    <line x1="50%" y1="385" x2="40%" y2="88%" stroke="#22d3ee" strokeWidth="2" />

                                    <line x1="50%" y1="385" x2="60%" y2="88%" stroke="#22d3ee" strokeWidth="2" />

                                    <line x1="50%" y1="385" x2="80%" y2="88%" stroke="#ef4444" strokeWidth="3" strokeDasharray="8 6" />
                                </svg>

                                {/* PCs */}
                                {['20%', '40%', '60%', '80%'].map((left, index) => (
                                    <div
                                        key={left}
                                        className="absolute bottom-8"
                                        style={{
                                            left,
                                            transform: 'translateX(-50%)',
                                        }}
                                    >
                                        <div className="flex flex-col items-center">
                                            {index === 3 && (
                                                <>
                                                    <p className="text-xs text-red-400">Tidak Terhubung</p>

                                                    <button
                                                        onClick={() => handleHotspot('cable')}
                                                        className={`z-20 mt-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white ${
                                                            visited.cable ? 'bg-emerald-500' : 'animate-pulse bg-red-500'
                                                        }`}
                                                    >
                                                        <Cable size={14} />
                                                    </button>
                                                </>
                                            )}
                                            <div className="text-5xl">🖥️</div>

                                            <p className="mt-2 text-sm">PC {index + 1}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-4">
                            {/* PROBLEM ANALYSIS SOLUTION */}
                            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                                <h2 className="text-2xl font-black">Investigasi Kasus</h2>

                                <div className="mt-5 space-y-5">
                                    <div>
                                        <p className="text-xs text-cyan-300 uppercase">Problem</p>

                                        <p className="mt-2 text-slate-300">
                                            Salah satu PC tidak terhubung ke jaringan. Ditemukan port switch yang lampunya mati dan kabel UTP yang
                                            longgar.
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-cyan-300 uppercase">Analysis</p>

                                        <p className="mt-2 text-slate-300">
                                            Telusuri jalur fisik: PC → Kabel UTP → Switch → Router. Lampu indikator mati menunjukkan koneksi fisik
                                            terputus.
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-cyan-300 uppercase">Solution</p>

                                        <p className="mt-2 text-slate-300">
                                            Pasang atau ganti kabel UTP dengan benar, cek konektor RJ-45, dan gunakan port switch yang berfungsi.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* HOTSPOT DETAIL */}
                            {active && (
                                <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                    <div className="flex items-center gap-3">
                                        {hotspotDetail[active].icon}

                                        <h3 className="font-bold">{hotspotDetail[active].title}</h3>
                                    </div>

                                    <p className="mt-3 text-sm text-slate-300">{hotspotDetail[active].description}</p>
                                </div>
                            )}

                            {/* NOTE */}
                            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                <div className="flex gap-3">
                                    <Info />

                                    <div>
                                        <h3 className="font-bold">Catatan Penting</h3>

                                        <p className="mt-2 text-sm text-slate-300">
                                            Pada topologi star, jika satu kabel client bermasalah maka hanya PC tersebut yang terganggu. Pusat
                                            jaringan berada pada switch.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* PROGRESS */}
                            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                                <div className="flex items-center justify-between">
                                    <span>Progress Investigasi</span>

                                    <span>{progress}/3</span>
                                </div>

                                <div className="mt-3 h-3 rounded-full bg-white/10">
                                    <div
                                        className="h-full rounded-full bg-emerald-400 transition-all"
                                        style={{
                                            width: `${(progress / 3) * 100}%`,
                                        }}
                                    />
                                </div>

                                {!completed && <p className="mt-3 text-sm text-slate-300">Klik semua hotspot untuk melanjutkan.</p>}

                                {completed && (
                                    <div className="mt-4 flex items-center gap-2 text-emerald-300">
                                        <CheckCircle2 size={18} />
                                        Semua hotspot telah dibuka. Anda dapat melanjutkan.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
