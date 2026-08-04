import LearningLayout from '@/layouts/LearningLayout';
import { type SharedData } from '@/types';
import { saveLearningProgress } from '@/utils/learningState';
import { playClickSound } from '@/utils/sound';
import { speak } from '@/utils/speech';

import { router } from '@inertiajs/react';
import { AlertTriangle, BookOpen, CheckCircle2, Gauge, PlayCircle, Printer, WifiOff } from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function ProblemOrientation() {
    const { props } = usePage<SharedData>();
    const savedProgress = props.learning?.progress ?? [];
    const [visited, setVisited] = useState({
        internet: false,
        slow: false,
        printer: false,
    });
    const [isHydrated, setIsHydrated] = useState(false);

    const tickets = [
        {
            key: 'internet' as const,
            ticketId: 'TCK-01',
            category: 'Konektivitas',
            title: 'PC Tidak Dapat Mengakses Internet',
            description: 'Beberapa komputer tidak dapat membuka website maupun mengakses internet.',
        },

        {
            key: 'slow' as const,
            ticketId: 'TCK-02',
            category: 'Performa Jaringan',
            title: 'Koneksi Jaringan Sangat Lambat',
            description: 'Sebagian komputer masih terhubung ke jaringan namun akses internet berjalan sangat lambat.',
        },

        {
            key: 'printer' as const,
            ticketId: 'TCK-03',
            category: 'Perangkat Keras',
            title: 'Printer Jaringan Tidak Terdeteksi',
            description: 'Printer yang terhubung ke jaringan tidak muncul pada perangkat pengguna.',
        },
    ];

    const handleHotspot = (key: 'internet' | 'slow' | 'printer') => {
        playClickSound();

        setVisited((prev) => ({
            ...prev,
            [key]: true,
        }));

        if (key === 'internet') {
            speak('Komputer tidak dapat mengakses internet. Periksa koneksi jaringan dan konfigurasi perangkat.');
        }

        if (key === 'slow') {
            speak('Koneksi jaringan sangat lambat. Kemungkinan terjadi kepadatan trafik atau gangguan jaringan.');
        }

        if (key === 'printer') {
            speak('Printer jaringan tidak terdeteksi oleh komputer pengguna.');
        }
    };

    const progress = useMemo(() => {
        return Number(visited.internet) + Number(visited.slow) + Number(visited.printer);
    }, [visited]);

    const completed = visited.internet && visited.slow && visited.printer;

    const openSupportingMaterial = () => {
        window.sessionStorage.setItem('material-return-path', '/problem-orientation');
        router.visit('/materi/mengenal-jaringan-komputer');
    };

    useEffect(() => {
        speak(`
        Lab komputer baru dipasangi jaringan,
        namun muncul beberapa gangguan saat digunakan.

        Beberapa komputer tidak dapat mengakses internet,
        sebagian komputer mengalami koneksi yang sangat lambat,
        dan printer jaringan tidak terdeteksi.

        Klik seluruh hotspot untuk mengidentifikasi gejala masalah jaringan.
    `);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const progressEntry = savedProgress.find((item) => item.activity_key === 'problem-orientation');
        const payload = progressEntry?.payload;

        if (payload && typeof payload === 'object' && payload.visited && typeof payload.visited === 'object') {
            const visitedPayload = payload.visited as Record<string, unknown>;

            setVisited((prev) => ({
                internet: typeof visitedPayload.internet === 'boolean' ? visitedPayload.internet : prev.internet,
                slow: typeof visitedPayload.slow === 'boolean' ? visitedPayload.slow : prev.slow,
                printer: typeof visitedPayload.printer === 'boolean' ? visitedPayload.printer : prev.printer,
            }));
        } else if (progressEntry?.completed) {
            setVisited({ internet: true, slow: true, printer: true });
        }

        setIsHydrated(true);
    }, [savedProgress]);

    useEffect(() => {
        if (!isHydrated) {
            return;
        }

        localStorage.setItem('problem-orientation-completed', completed ? 'true' : 'false');
        void saveLearningProgress('problem-orientation', completed, { visited, completed });

        window.dispatchEvent(new Event('problem-orientation-completed-change'));
    }, [completed, isHydrated, visited]);

    return (
        <LearningLayout>
            <div className="min-h-screen bg-[#020617] py-10 text-white">
                {/* BACKGROUND */}
                <div className="fixed inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-28 sm:px-6 sm:pb-32 lg:px-8">
                    {/* LABEL */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-[0px]">
                        <AlertTriangle size={15} />
                        <span className="text-sm text-red-300">Sintaks PBL: orientasi pada masalah</span>
                        Slide 5 — Orientasi Masalah (Fase 1)
                    </div>

                    {/* TITLE */}
                    <h1 className="mt-5 text-3xl leading-[1] font-black tracking-tight sm:text-4xl lg:text-6xl">
                        Masalah Jaringan di
                        <span className="block text-cyan-400">Laboratorium Komputer</span>
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
                        Klik seluruh hotspot pada ilustrasi laboratorium untuk mengidentifikasi gejala masalah jaringan yang ditemukan.
                    </p>

                    <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="max-w-2xl text-sm leading-relaxed text-cyan-100">
                            Perlu mengingat kembali konsep jaringan sebelum menganalisis masalah? Buka materi pendukung kapan saja.
                        </p>
                        <button
                            type="button"
                            onClick={openSupportingMaterial}
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:scale-105"
                        >
                            <BookOpen size={18} />
                            Buka Materi Pendukung
                        </button>
                    </div>

                    {/* LAB AREA */}
                    <div className="relative mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 shadow-2xl">
                        <div className="relative h-[420px] sm:h-[520px]">
                            {/* LAB IMAGE */}
                            <div className="relative h-[420px] bg-slate-950 sm:h-[520px]">
                                {/* INTERNET */}
                                <div className="absolute top-8 left-1/2 -translate-x-1/2">
                                    <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-300">
                                        INTERNET
                                    </div>
                                </div>

                                {/* ROUTER */}
                                <div className="absolute top-28 left-1/2 -translate-x-1/2">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-400/30 bg-cyan-400/10 text-5xl">
                                        🌐
                                    </div>
                                </div>

                                {/* SWITCH */}
                                <div className="absolute top-56 left-1/2 -translate-x-1/2">
                                    <div className="flex h-24 w-40 items-center justify-center rounded-3xl border border-cyan-400/30 bg-cyan-400/10 font-bold text-cyan-300">
                                        SWITCH
                                    </div>
                                </div>

                                {/* CONNECTIONS */}
                                <svg className="absolute inset-0 h-full w-full">
                                    <line x1="50%" y1="80" x2="50%" y2="115" stroke="#22d3ee" strokeWidth="2" />
                                    <line x1="50%" y1="206" x2="50%" y2="225" stroke="#22d3ee" strokeWidth="2" />

                                    <line x1="50%" y1="320" x2="20%" y2="400" stroke="#22d3ee" strokeWidth="2" />
                                    <line x1="50%" y1="320" x2="40%" y2="400" stroke="#22d3ee" strokeWidth="2" />
                                    <line x1="50%" y1="320" x2="60%" y2="400" stroke="#22d3ee" strokeWidth="2" />
                                    <line x1="50%" y1="320" x2="80%" y2="400" stroke="#22d3ee" strokeWidth="2" />
                                </svg>

                                {/* PC INTERNET */}
                                <div className="absolute bottom-12 left-[20%] -translate-x-1/2">
                                    <div className="flex flex-col items-center">
                                        <div className="text-6xl">🖥️</div>
                                        <div className="mt-2 text-sm font-semibold text-red-400">❌ Internet</div>
                                    </div>

                                    <button
                                        onClick={() => handleHotspot('internet')}
                                        className={`absolute -top-8 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white transition ${
                                            visited.internet
                                                ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,.8)]'
                                                : 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,.8)]'
                                        }`}
                                    >
                                        <WifiOff size={18} />
                                    </button>
                                </div>

                                {/* PC LAMBAT */}
                                <div className="absolute bottom-12 left-[40%] -translate-x-1/2">
                                    <div className="flex flex-col items-center">
                                        <div className="text-6xl">🖥️</div>
                                        <div className="mt-2 text-sm font-semibold text-yellow-400">⚠ Lambat</div>
                                    </div>

                                    <button
                                        onClick={() => handleHotspot('slow')}
                                        className={`absolute -top-8 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white transition ${
                                            visited.slow
                                                ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,.8)]'
                                                : 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,.8)]'
                                        }`}
                                    >
                                        <Gauge size={18} />
                                    </button>
                                </div>

                                {/* PC NORMAL */}
                                <div className="absolute bottom-12 left-[60%] -translate-x-1/2">
                                    <div className="flex flex-col items-center">
                                        <div className="text-6xl">🖥️</div>
                                        <div className="mt-2 text-sm font-semibold text-emerald-400">✓ Normal</div>
                                    </div>
                                </div>

                                {/* PRINTER */}
                                <div className="absolute bottom-12 left-[80%] -translate-x-1/2">
                                    <div className="flex flex-col items-center">
                                        <div className="text-6xl">🖨️</div>
                                        <div className="mt-2 text-sm font-semibold text-red-400">❌ Printer</div>
                                    </div>

                                    <button
                                        onClick={() => handleHotspot('printer')}
                                        className={`absolute -top-8 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white transition ${
                                            visited.printer
                                                ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,.8)]'
                                                : 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,.8)]'
                                        }`}
                                    >
                                        <Printer size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* INFO */}
                    <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                        {/* NARASI */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10">
                                    <PlayCircle className="text-cyan-400" size={24} />
                                </div>

                                <div>
                                    <p className="text-sm text-cyan-300">Narasi Masalah</p>

                                    <h2 className="text-xl font-bold">Laboratorium Komputer Bermasalah</h2>
                                </div>
                            </div>

                            <p className="mt-5 leading-relaxed text-slate-300">
                                Laboratorium komputer baru saja dipasangi jaringan. Namun saat digunakan ditemukan beberapa gangguan. Sebagian
                                komputer tidak dapat mengakses internet, sebagian komputer terhubung tetapi sangat lambat, dan printer jaringan tidak
                                terdeteksi.
                            </p>

                            {/* PERTANYAAN */}
                            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                <p className="text-sm font-semibold text-cyan-300">Pertanyaan Pemantik</p>

                                <h3 className="mt-3 text-2xl leading-tight font-black">
                                    Apa kemungkinan akar masalah jaringan ini, dan gejala mana yang saling berkaitan?
                                </h3>
                            </div>
                        </div>

                        {/* HASIL IDENTIFIKASI */}
                        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="text-emerald-400" size={24} />

                                <div>
                                    <p className="text-sm text-emerald-300">Hasil Identifikasi</p>

                                    <h2 className="text-xl font-bold">Gejala Ditemukan</h2>
                                </div>
                            </div>

                            {progress === 0 ? (
                                <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-6 text-center">
                                    <p className="text-slate-400">Klik seluruh hotspot untuk mengidentifikasi masalah.</p>
                                </div>
                            ) : (
                                <div className="mt-6 space-y-4">
                                    {tickets.map(
                                        (ticket) =>
                                            visited[ticket.key] && (
                                                <div key={ticket.key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-mono text-xs text-slate-400">{ticket.ticketId}</span>

                                                        <span className="rounded-full border border-red-400/30 bg-red-400/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-red-300 uppercase">
                                                            Open
                                                        </span>
                                                    </div>

                                                    <p className="mt-3 text-[11px] font-semibold tracking-wide text-cyan-300 uppercase">
                                                        {ticket.category}
                                                    </p>

                                                    <h4 className="mt-1 font-semibold">{ticket.title}</h4>

                                                    <p className="mt-2 text-sm text-slate-300">{ticket.description}</p>
                                                </div>
                                            ),
                                    )}
                                </div>
                            )}

                            {/* PROGRESS */}
                            <div className="mt-6">
                                <div className="mb-2 flex justify-between text-sm">
                                    <span>Progress Identifikasi</span>
                                    <span>{progress}/3</span>
                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className="h-full bg-emerald-400 transition-all"
                                        style={{
                                            width: `${(progress / 3) * 100}%`,
                                        }}
                                    />
                                </div>

                                {completed && (
                                    <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                                        Semua gejala berhasil diidentifikasi. Anda dapat melanjutkan ke tahap berikutnya.
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
