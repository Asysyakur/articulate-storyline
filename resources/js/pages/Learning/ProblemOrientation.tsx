import LearningLayout from '@/layouts/LearningLayout';
import { playClickSound } from '@/utils/sound';
import { speak } from '@/utils/speech';

import { AlertTriangle, CheckCircle2, Gauge, PlayCircle, Printer, WifiOff } from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';

export default function ProblemOrientation() {
    const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

    const [visited, setVisited] = useState({
        internet: false,
        slow: false,
        printer: false,
    });

    const problems = {
        internet: {
            title: 'PC Tidak Dapat Mengakses Internet',
            description: 'Beberapa komputer tidak dapat membuka website maupun mengakses internet.',
        },

        slow: {
            title: 'Koneksi Jaringan Sangat Lambat',
            description: 'Sebagian komputer masih terhubung ke jaringan namun akses internet berjalan sangat lambat.',
        },

        printer: {
            title: 'Printer Jaringan Tidak Terdeteksi',
            description: 'Printer yang terhubung ke jaringan tidak muncul pada perangkat pengguna.',
        },
    };

    const handleHotspot = (key: 'internet' | 'slow' | 'printer') => {
        playClickSound();

        setSelectedProblem(key);

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
        localStorage.setItem('problem-orientation-completed', completed ? 'true' : 'false');

        window.dispatchEvent(new Event('problem-orientation-completed-change'));
    }, [completed]);

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
                        Masalah Jaringan di
                        <span className="block text-cyan-400">Laboratorium Komputer</span>
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                        Klik seluruh hotspot pada ilustrasi laboratorium untuk mengidentifikasi gejala masalah jaringan yang ditemukan.
                    </p>

                    {/* LAB AREA */}
                    <div className="relative mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 shadow-2xl">
                        <div className="relative h-[520px]">
                            {/* LAB IMAGE */}
                            <div className="relative h-[520px] bg-slate-950">
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
                                    {visited.internet && (
                                        <div className="rounded-2xl bg-white/5 p-4">
                                            <h4 className="font-semibold">{problems.internet.title}</h4>

                                            <p className="mt-2 text-sm text-slate-300">{problems.internet.description}</p>
                                        </div>
                                    )}

                                    {visited.slow && (
                                        <div className="rounded-2xl bg-white/5 p-4">
                                            <h4 className="font-semibold">{problems.slow.title}</h4>

                                            <p className="mt-2 text-sm text-slate-300">{problems.slow.description}</p>
                                        </div>
                                    )}

                                    {visited.printer && (
                                        <div className="rounded-2xl bg-white/5 p-4">
                                            <h4 className="font-semibold">{problems.printer.title}</h4>

                                            <p className="mt-2 text-sm text-slate-300">{problems.printer.description}</p>
                                        </div>
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
