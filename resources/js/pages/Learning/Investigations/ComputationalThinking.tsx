import LearningLayout from '@/layouts/LearningLayout';
import { saveLearningProgress } from '@/utils/learningState';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Cable, CheckCircle2, Info, Network, Router, Search, ShieldAlert } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type HotspotType = 'router' | 'switch' | 'cable';

export default function ComputationalThinking() {
    const { props } = usePage<SharedData>();
    const savedProgress = props.learning?.progress ?? [];
    const [active, setActive] = useState<HotspotType | null>(null);
    const [problemIdentification, setProblemIdentification] = useState('');
    const [analysisAndSolution, setAnalysisAndSolution] = useState('');
    const [discussionShown, setDiscussionShown] = useState(false);
    const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    const [visited, setVisited] = useState({
        router: false,
        switch: false,
        cable: false,
    });

    const hotspotDetail = {
        router: {
            title: 'Router',
            icon: <Router size={18} />,
            description: 'Router dan switch normal.',
        },

        switch: {
            title: 'Switch',
            icon: <Network size={18} />,
            description: 'Satu port switch mati/merah.',
        },

        cable: {
            title: 'Kabel PC-12',
            icon: <Cable size={18} />,
            description: 'Konektor RJ-45 PC-12 longgar.',
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

    const allEvidenceFound = visited.router && visited.switch && visited.cable;
    const inputsComplete = problemIdentification.trim().length > 0 && analysisAndSolution.trim().length > 0;
    const canCompare = allEvidenceFound && inputsComplete;
    const completed = discussionShown;

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const progressEntry = savedProgress.find((item) => item.activity_key === 'computational-thinking');
        const payload = progressEntry?.payload;

        if (payload && typeof payload === 'object') {
            const visitedPayload = payload.visited;
            if (visitedPayload && typeof visitedPayload === 'object') {
                setVisited((prev) => ({
                    router: typeof (visitedPayload as Record<string, unknown>).router === 'boolean' ? ((visitedPayload as Record<string, unknown>).router as boolean) : prev.router,
                    switch: typeof (visitedPayload as Record<string, unknown>).switch === 'boolean' ? ((visitedPayload as Record<string, unknown>).switch as boolean) : prev.switch,
                    cable: typeof (visitedPayload as Record<string, unknown>).cable === 'boolean' ? ((visitedPayload as Record<string, unknown>).cable as boolean) : prev.cable,
                }));
            }

            const studentAnswers = payload.student_answers;
            if (studentAnswers && typeof studentAnswers === 'object') {
                const problemAnswer = (studentAnswers as Record<string, unknown>).problem_identification;
                const analysisAnswer = (studentAnswers as Record<string, unknown>).analysis_and_solution;

                if (typeof problemAnswer === 'string') {
                    setProblemIdentification(problemAnswer);
                }

                if (typeof analysisAnswer === 'string') {
                    setAnalysisAndSolution(analysisAnswer);
                }
            }

            if (typeof payload.discussionShown === 'boolean') {
                setDiscussionShown(payload.discussionShown);
            } else if (progressEntry?.completed) {
                setDiscussionShown(true);
            }
        } else if (progressEntry?.completed || localStorage.getItem('computational-thinking-completed') === 'true') {
            setDiscussionShown(true);
        }

        setIsHydrated(true);
    }, [savedProgress]);

    useEffect(() => {
        if (!isHydrated) {
            return;
        }

        localStorage.setItem('computational-thinking-completed', completed ? 'true' : 'false');
        void saveLearningProgress('computational-thinking', completed, {
            visited,
            discussionShown,
            student_answers: {
                problem_identification: problemIdentification,
                analysis_and_solution: analysisAndSolution,
            },
        });

        window.dispatchEvent(new Event('computational-thinking-completed-change'));
    }, [analysisAndSolution, completed, discussionShown, isHydrated, problemIdentification, visited]);

    return (
        <LearningLayout>
            <div className="min-h-screen pb-24">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
                    {/* LABEL */}
                    <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                        Slide 11 — Investigasi
                    </div>

                    {/* TITLE */}
                    <h1 className="mt-4 text-3xl font-black sm:text-5xl">
                        Topologi &<span className="block text-cyan-400">Perangkat Jaringan</span>
                    </h1>

                    <p className="mt-4 max-w-3xl text-slate-300">
                        Selidiki penyebab gangguan jaringan dengan mengamati topologi dan perangkat jaringan pada laboratorium komputer.
                    </p>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
                        {/* LEFT */}
                        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
                            <div className="relative h-[430px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950 sm:h-[560px]">
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

                                            <p className="mt-2 text-sm">{index === 3 ? 'PC-12' : `PC ${index + 1}`}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-4">
                            {/* EVIDENCE LIST */}
                            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                                <h2 className="text-2xl font-black">Bukti yang kamu temukan ({progress}/3)</h2>
                                <p className="mt-2 text-sm text-slate-400">Eksplorasi semua penanda pada topologi. Bukti yang ditemukan dicatat di sini.</p>
                                <div className="mt-5 space-y-3">
                                    {(['router', 'switch', 'cable'] as HotspotType[]).map((key) => (
                                        <div
                                            key={key}
                                            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm ${
                                                visited[key]
                                                    ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'
                                                    : 'border-white/10 bg-white/5 text-slate-500'
                                            }`}
                                        >
                                            <CheckCircle2 size={17} className={visited[key] ? 'text-emerald-300' : 'text-slate-600'} />
                                            <span>{visited[key] ? hotspotDetail[key].description : 'Bukti belum ditemukan'}</span>
                                        </div>
                                    ))}
                                </div>
                                {active && (
                                    <p className="mt-4 text-sm text-cyan-200">
                                        Bukti “{hotspotDetail[active].title}” telah dicatat. Gunakan seluruh bukti untuk menyusun analisismu.
                                    </p>
                                )}
                            </div>

                            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                <h2 className="text-lg font-black">Analisis &amp; Pembahasan</h2>
                                <p className="mt-2 text-sm text-slate-300">
                                    {allEvidenceFound
                                        ? 'Seluruh bukti sudah terkumpul. Buka lembar analisis untuk menuliskan kesimpulanmu.'
                                        : 'Lembar analisis akan terbuka setelah semua bukti ditemukan.'}
                                </p>
                                <button
                                    type="button"
                                    disabled={!allEvidenceFound}
                                    onClick={() => setIsWorkflowOpen(true)}
                                    className="mt-4 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition enabled:hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                                >
                                    {discussionShown ? 'Lihat Analisis & Pembahasan' : 'Buka Analisis Peserta Didik'}
                                </button>
                            </div>

                            {/* STUDENT ANALYSIS */}
                            {isWorkflowOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
                                    <div role="dialog" aria-modal="true" aria-labelledby="topologi-workflow-title" className="max-h-[90vh] w-full max-w-5xl space-y-4 overflow-y-auto rounded-3xl border border-cyan-400/30 bg-slate-900 p-5 shadow-2xl sm:p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-sm font-semibold text-cyan-300">Membimbing Penyelidikan</p>
                                                <h2 id="topologi-workflow-title" className="text-2xl font-black">Analisis &amp; Pembahasan</h2>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setIsWorkflowOpen(false)}
                                                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10"
                                            >
                                                Tutup
                                            </button>
                                        </div>

                                        <div className={discussionShown ? 'grid gap-4 lg:grid-cols-2' : ''}>
                            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                                <h2 className="text-xl font-black">Analisis Peserta Didik</h2>
                                <p className="mt-2 text-sm text-slate-400">Tuliskan jawabanmu berdasarkan bukti yang telah ditemukan.</p>
                                <label className="mt-5 block text-xs text-cyan-300 uppercase" htmlFor="topologi-problem">
                                    Identifikasi Masalah
                                </label>
                                <textarea
                                    id="topologi-problem"
                                    value={problemIdentification}
                                    onChange={(event) => setProblemIdentification(event.target.value)}
                                    rows={3}
                                    placeholder="Tuliskan masalah yang kamu temukan..."
                                    className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 p-3 text-sm text-slate-200 outline-none transition focus:border-cyan-400"
                                />
                                <label className="mt-4 block text-xs text-cyan-300 uppercase" htmlFor="topologi-analysis">
                                    Analisis &amp; Solusi
                                </label>
                                <textarea
                                    id="topologi-analysis"
                                    value={analysisAndSolution}
                                    onChange={(event) => setAnalysisAndSolution(event.target.value)}
                                    rows={4}
                                    placeholder="Jelaskan analisis dan solusi yang kamu usulkan..."
                                    className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 p-3 text-sm text-slate-200 outline-none transition focus:border-cyan-400"
                                />
                                <button
                                    type="button"
                                    disabled={!canCompare || discussionShown}
                                    onClick={() => setDiscussionShown(true)}
                                    className="mt-5 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition enabled:hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                                >
                                    {discussionShown ? 'Pembahasan Ditampilkan' : 'Bandingkan Pembahasan'}
                                </button>
                                {!discussionShown && !canCompare && (
                                    <p className="mt-3 text-xs text-slate-400">Tombol aktif setelah semua bukti ditemukan dan kedua isian diisi.</p>
                                )}
                            </div>

                            {/* PROBLEM ANALYSIS SOLUTION */}
                            <div className="space-y-4">
                            {discussionShown && (
                                <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-6">
                                <h2 className="text-2xl font-black">Pembahasan Resmi</h2>

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
                            )}

                            {/* HOTSPOT DETAIL */}
                            {active && !discussionShown && (
                                <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                    <div className="flex items-center gap-3">
                                        {hotspotDetail[active].icon}

                                        <h3 className="font-bold">{hotspotDetail[active].title}</h3>
                                    </div>

                                    <p className="mt-3 text-sm text-slate-300">Bukti telah dicatat pada daftar bukti.</p>
                                </div>
                            )}

                            {/* NOTE */}
                            {discussionShown && (
                                <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                <div className="flex gap-3">
                                    <Info />

                                    <div>
                                        <h3 className="font-bold">Catatan Penting</h3>

                                        <p className="mt-2 text-sm text-slate-300">
                                            Pada topologi star, jika satu kabel klien bermasalah maka hanya PC tersebut yang terganggu. Pusat
                                            jaringan berada pada switch.
                                        </p>
                                    </div>
                                </div>
                                </div>
                            )}
                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

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

                                {!allEvidenceFound && <p className="mt-3 text-sm text-slate-300">Temukan semua bukti terlebih dahulu.</p>}

                                {allEvidenceFound && !completed && (
                                    <p className="mt-3 text-sm text-slate-300">Isi analisis, lalu bandingkan dengan pembahasan resmi untuk melanjutkan.</p>
                                )}

                                {completed && (
                                    <div className="mt-4 flex items-center gap-2 text-emerald-300">
                                        <CheckCircle2 size={18} />
                                        Pembahasan resmi telah dibuka. Anda dapat melanjutkan.
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
