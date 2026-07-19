import { Link, router, usePage } from '@inertiajs/react';
import { NARRATION_STORAGE_KEY, stopSpeak } from '@/utils/speech';

import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, Home, LogOut, Volume2, VolumeX } from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';

export default function SlideControls() {
    const { url } = usePage();
    const [showExitModal, setShowExitModal] = useState(false);
    const [showMaterialMenu, setShowMaterialMenu] = useState(false);
    const [showAudioMenu, setShowAudioMenu] = useState(false);

    const [audioOn, setAudioOn] = useState(true);
    const [narrationOn, setNarrationOn] = useState(false);

    useEffect(() => {
        setAudioOn(localStorage.getItem('bg-music-muted') !== 'true');
        setNarrationOn(localStorage.getItem(NARRATION_STORAGE_KEY) === 'true');
    }, []);
    const [solutionDevelopmentChecked, setSolutionDevelopmentChecked] = useState(false);
    const [evaluationCompleted, setEvaluationCompleted] = useState(false);
    const [evaluationScore, setEvaluationScore] = useState(0);
    const [problemOrientationCompleted, setProblemOrientationCompleted] = useState(false);
    const [informationGatheringCompleted, setInformationGatheringCompleted] = useState(false);
    const [computationalThinkingCompleted, setComputationalThinkingCompleted] = useState(false);
    const [algorithmCompleted, setAlgorithmCompleted] = useState(false);
    const [dataRepresentationCompleted, setDataRepresentationCompleted] = useState(false);
    const [dataProcessingCompleted, setDataProcessingCompleted] = useState(false);
    const [diagnosticPracticeCompleted, setDiagnosticPracticeCompleted] = useState(false);
    const materialSlides = [
        { title: 'Mengenal Jaringan Komputer', path: '/materi/mengenal-jaringan-komputer' },
        { title: 'Topologi Jaringan', path: '/materi/topologi-jaringan' },
        { title: 'Media & Komponen Jaringan', path: '/materi/media-komponen-jaringan' },
        { title: 'Dasar Pengalamatan', path: '/materi/dasar-pengalamatan' },
    ];
    const learningSlideOrder = [
        '/',
        '/beranda',
        '/instruction',
        '/learning-outcomes',
        '/problem-orientation',
        '/information-gathering',
        '/investigation/computational-thinking',
        '/investigation/algorithm',
        '/investigation/data-representation',
        '/investigation/data-processing',
        '/investigation/summary',
        '/solution-development',
        '/evaluation',
        '/result',
        '/reflection',
        '/developer-profile',
    ];
    const slideTitles: Record<string, string> = {
        '/': 'Login',
        '/beranda': 'Pembuka',
        '/instruction': 'Petunjuk',
        '/learning-outcomes': 'Tujuan',
        '/problem-orientation': 'Interpretation (Fase 1)',
        '/information-gathering': 'Analysis (Fase 2)',
        '/investigation/computational-thinking': 'Inference (Fase 3): Berpikir Komputasional',
        '/investigation/algorithm': 'Inference (Fase 3): Algoritma',
        '/investigation/data-representation': 'Inference (Fase 3): Representasi Data',
        '/investigation/data-processing': 'Inference (Fase 3): Pengolahan Data',
        '/investigation/summary': 'Praktik Diagnosis',
        '/solution-development': 'Explanation (Fase 4)',
        '/evaluation': 'Kuis',
        '/result': 'Hasil Kuis',
        '/reflection': 'Self Regulation (Fase 5)',
        '/developer-profile': 'Profil',
    };
    /*
    |--------------------------------------------------------------------------
    | SLIDES
    |--------------------------------------------------------------------------
    |
    | Urutan mengikuti alur Problem Based Learning (PBL).
    | Materi tersedia sebagai scaffolding dan dapat dibuka ulang.
    |
    */

    const slides = useMemo(
        () => [
            { title: 'Login', path: '/' },
            { title: 'Materi 1 — Mengenal Jaringan Komputer', path: '/materi/mengenal-jaringan-komputer' },
            { title: 'Materi 2 — Topologi Jaringan', path: '/materi/topologi-jaringan' },
            { title: 'Materi 3 — Media & Komponen Jaringan', path: '/materi/media-komponen-jaringan' },
            { title: 'Materi 4 — Dasar Pengalamatan', path: '/materi/dasar-pengalamatan' },
            { title: 'Cover', path: '/beranda' },
            { title: 'Instruction', path: '/instruction' },
            { title: 'Learning Outcomes', path: '/learning-outcomes' },
            { title: 'Problem Orientation', path: '/problem-orientation' },
            { title: 'Information Gathering', path: '/information-gathering' },
            /* |-------------------------------------------------------------------------- | INVESTIGATION |-------------------------------------------------------------------------- */ {
                title: 'Computational Thinking',
                path: '/investigation/computational-thinking',
            },
            { title: 'Algorithm', path: '/investigation/algorithm' },
            { title: 'Data Representation', path: '/investigation/data-representation' },
            { title: 'Data Processing', path: '/investigation/data-processing' },
            { title: 'Investigation Summary', path: '/investigation/summary' },
            /* |-------------------------------------------------------------------------- | NEXT FLOW |-------------------------------------------------------------------------- */ {
                title: 'Solution Development',
                path: '/solution-development',
            },
            { title: 'Evaluation', path: '/evaluation' },
            { title: 'Result', path: '/result' },
            { title: 'Reflection', path: '/reflection' },
            { title: 'Developer Profile', path: '/developer-profile' },
        ]
            .filter((slide) => !slide.path.startsWith('/materi/'))
            .sort((first, second) => learningSlideOrder.indexOf(first.path) - learningSlideOrder.indexOf(second.path))
            .map((slide) => ({ ...slide, title: slideTitles[slide.path] ?? slide.title })),
        [],
    );

    /*
    |--------------------------------------------------------------------------
    | CURRENT INDEX
    |--------------------------------------------------------------------------
    */

    const currentIndex = slides.findIndex((slide) => slide.path === url);
    const materialIndex = materialSlides.findIndex((slide) => slide.path === url);
    const isInMaterial = materialIndex !== -1;
    const activeSlides = isInMaterial ? materialSlides : slides;
    const activeIndex = isInMaterial ? materialIndex : currentIndex;

    /*
    |--------------------------------------------------------------------------
    | NAVIGATION
    |--------------------------------------------------------------------------
    */

    const nextSlide = activeIndex < activeSlides.length - 1 ? activeSlides[activeIndex + 1] : null;

    const prevSlide = activeIndex > 0 ? activeSlides[activeIndex - 1] : null;

    const returnFromMaterial = () => {
        const returnPath = window.sessionStorage.getItem('material-return-path') ?? '/beranda';

        window.sessionStorage.removeItem('material-return-path');
        stopSpeak();
        router.visit(returnPath);
    };

    const openMaterial = (path: string) => {
        window.sessionStorage.setItem('material-return-path', url);
        setShowMaterialMenu(false);
        stopSpeak();
        router.visit(path);
    };

    useEffect(() => {
        const readCheckedState = () => {
            if (typeof window === 'undefined') {
                return;
            }

            setSolutionDevelopmentChecked(window.localStorage.getItem('solution-development-checked') === 'true');
            setProblemOrientationCompleted(localStorage.getItem('problem-orientation-completed') === 'true');
            setInformationGatheringCompleted(localStorage.getItem('information-gathering-completed') === 'true');
            setComputationalThinkingCompleted(localStorage.getItem('computational-thinking-completed') === 'true');
            setAlgorithmCompleted(localStorage.getItem('algorithm-completed') === 'true');
            setDataRepresentationCompleted(localStorage.getItem('data-representation-completed') === 'true');
            setDataProcessingCompleted(localStorage.getItem('data-processing-completed') === 'true');
            setDiagnosticPracticeCompleted(localStorage.getItem('diagnostic-practice-completed') === 'true');

            const completed = window.sessionStorage.getItem('evaluationCompleted') === 'true';
            const score = Number(window.sessionStorage.getItem('evaluationScore') ?? 0);

            setEvaluationCompleted(completed);
            setEvaluationScore(Number.isFinite(score) ? score : 0);
        };

        readCheckedState();

        window.addEventListener('solution-development-checked-change', readCheckedState);
        window.addEventListener('evaluation-completed-change', readCheckedState);
        window.addEventListener('problem-orientation-completed-change', readCheckedState);
        window.addEventListener('information-gathering-completed-change', readCheckedState);
        window.addEventListener('computational-thinking-completed-change', readCheckedState);
        window.addEventListener('algorithm-completed-change', readCheckedState);
        window.addEventListener('data-representation-completed-change', readCheckedState);
        window.addEventListener('data-processing-completed-change', readCheckedState);
        window.addEventListener('diagnostic-practice-completed-change', readCheckedState);
        return () => {
            window.removeEventListener('solution-development-checked-change', readCheckedState);
            window.removeEventListener('evaluation-completed-change', readCheckedState);
            window.removeEventListener('problem-orientation-completed-change', readCheckedState);
            window.removeEventListener('information-gathering-completed-change', readCheckedState);
            window.removeEventListener('computational-thinking-completed-change', readCheckedState);
            window.removeEventListener('algorithm-completed-change', readCheckedState);
            window.removeEventListener('data-representation-completed-change', readCheckedState);
            window.removeEventListener('data-processing-completed-change', readCheckedState);
            window.removeEventListener('diagnostic-practice-completed-change', readCheckedState);
        };
    }, [url]);

    /*
    |--------------------------------------------------------------------------
    | HIDE CONTROLS
    |--------------------------------------------------------------------------
    |
    | Jangan tampilkan di cover.
    |
    */

    const toggleAudio = () => {
        const next = !audioOn;

        setAudioOn(next);

        if (window.bgMusic) {
            window.bgMusic.muted = !next;
        }

        localStorage.setItem('bg-music-muted', String(!next));
    };

    const toggleNarration = () => {
        const next = !narrationOn;

        setNarrationOn(next);
        localStorage.setItem(NARRATION_STORAGE_KEY, String(next));

        if (!next) {
            stopSpeak();
        }
    };

    if (url === '/') {
        return null;
    }

    const nextEnabled =
        (isInMaterial ? Boolean(nextSlide) : nextSlide) &&
        (url !== '/problem-orientation' || problemOrientationCompleted) &&
        (url !== '/information-gathering' || informationGatheringCompleted) &&
        (url !== '/investigation/computational-thinking' || computationalThinkingCompleted) &&
        (url !== '/investigation/algorithm' || algorithmCompleted) &&
        (url !== '/investigation/data-representation' || dataRepresentationCompleted) &&
        (url !== '/investigation/data-processing' || dataProcessingCompleted) &&
        (url !== '/investigation/summary' || diagnosticPracticeCompleted) &&
        (url !== '/solution-development' || solutionDevelopmentChecked) &&
        (url !== '/evaluation' || evaluationCompleted) &&
        (url !== '/result' || evaluationScore >= 75);

    return (
        <>
            <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 shadow-2xl backdrop-blur-xl">
                    {/* HOME */}
                    <Link
                        href="/"
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 transition hover:bg-cyan-400 hover:text-slate-950"
                    >
                        <Home size={20} />
                    </Link>

                    {/* PREVIOUS */}
                    <button
                        disabled={!prevSlide}
                        onClick={() => {
                            if (prevSlide) {
                                stopSpeak();
                                router.visit(prevSlide.path);
                            }
                        }}
                        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                            prevSlide ? 'bg-slate-800 hover:bg-cyan-400 hover:text-slate-950' : 'cursor-not-allowed bg-slate-900 text-slate-600'
                        } `}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {!isInMaterial && (
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowMaterialMenu((open) => !open)}
                            aria-label="Buka materi pendukung"
                            aria-expanded={showMaterialMenu}
                            className="flex h-12 items-center gap-2 rounded-xl bg-slate-800 px-4 text-sm font-semibold transition hover:bg-cyan-400 hover:text-slate-950"
                        >
                            <BookOpen size={20} />
                            Materi
                        </button>

                        {showMaterialMenu && (
                            <div className="absolute bottom-14 left-1/2 w-72 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900 p-2 shadow-2xl">
                                <p className="px-3 py-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">Materi pendukung</p>
                                {materialSlides.map((slide) => (
                                    <button
                                        key={slide.path}
                                        type="button"
                                        onClick={() => openMaterial(slide.path)}
                                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-cyan-400 hover:text-slate-950"
                                    >
                                        {slide.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    )}

                    {/* SLIDE INFO */}
                    <div className="hidden min-w-[240px] rounded-xl border border-white/10 bg-slate-800/80 px-5 py-3 md:block">
                        <p className="text-xs text-slate-400">Current Slide</p>

                        <div className="mt-2 flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-sm font-semibold text-white">{activeSlides[activeIndex]?.title}</h3>

                                <p className="mt-1 text-xs text-slate-500">Interactive Learning Media</p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-sm font-bold text-cyan-400">
                                {activeIndex + 1}/{activeSlides.length}
                            </div>
                        </div>
                    </div>

                    {/* NEXT / KEMBALI DARI MATERI */}
                    {isInMaterial && !nextSlide ? (
                        <button
                            type="button"
                            onClick={returnFromMaterial}
                            className="flex h-12 items-center gap-2 rounded-xl bg-cyan-400 px-4 text-sm font-bold text-slate-950 transition hover:scale-105"
                        >
                            <ChevronLeft size={18} />
                            Kembali
                        </button>
                    ) : (
                    <button
                        disabled={!nextEnabled}
                        onClick={() => {
                            if (nextEnabled) {
                                stopSpeak();
                                router.visit(nextSlide.path);
                            }
                        }}
                        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                            nextEnabled ? 'bg-cyan-400 text-slate-950 hover:scale-105' : 'cursor-not-allowed bg-slate-900 text-slate-600'
                        } `}
                    >
                        <ChevronRight size={20} />
                    </button>
                    )}

                    {/* VOLUME */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowAudioMenu((open) => !open)}
                            aria-label="Pengaturan volume"
                            aria-expanded={showAudioMenu}
                            className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                                audioOn || narrationOn
                                    ? 'bg-slate-800 hover:bg-cyan-400 hover:text-slate-950'
                                    : 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white'
                            }`}
                        >
                            {audioOn || narrationOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                        </button>

                        {showAudioMenu && (
                            <div className="absolute right-0 bottom-14 w-64 rounded-xl border border-white/10 bg-slate-900 p-3 shadow-2xl">
                                <p className="px-2 pb-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">Pengaturan volume</p>

                                <div className="flex items-center justify-between gap-3 rounded-lg px-2 py-2">
                                    <div>
                                        <p className="text-sm font-semibold text-white">Musik</p>
                                        <p className="text-xs text-slate-400">Musik latar</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={toggleAudio}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                                            audioOn ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                                        }`}
                                    >
                                        {audioOn ? 'Aktif' : 'Nonaktif'}
                                    </button>
                                </div>

                                <div className="mt-1 flex items-center justify-between gap-3 rounded-lg px-2 py-2">
                                    <div>
                                        <p className="text-sm font-semibold text-white">Narasi</p>
                                        <p className="text-xs text-slate-400">Nonaktif secara bawaan</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={toggleNarration}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                                            narrationOn ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                                        }`}
                                    >
                                        {narrationOn ? 'Aktif' : 'Nonaktif'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* EXIT */}
                    <button
                        onClick={() => setShowExitModal(true)}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 text-red-400 transition-all hover:bg-red-500 hover:text-white"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showExitModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{
                                scale: 0.9,
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                scale: 0.9,
                                opacity: 0,
                                y: 20,
                            }}
                            transition={{ duration: 0.2 }}
                            className="w-full max-w-md rounded-[28px] border border-red-500/30 bg-gradient-to-b from-[#2b1422] to-[#211425] p-8 shadow-2xl"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                                    <LogOut size={28} />
                                </div>

                                <div>
                                    <p className="text-lg font-semibold text-red-400">Konfirmasi Keluar</p>

                                    <h2 className="mt-1 text-4xl font-black text-white">Keluar dari Media?</h2>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setShowExitModal(false)}
                                    className="rounded-2xl bg-slate-800 py-4 text-lg font-bold text-white transition hover:bg-slate-700"
                                >
                                    Batal
                                </button>

                                <button
                                    onClick={() => {
                                        setShowExitModal(false);
                                        router.visit('/');
                                    }}
                                    className="rounded-2xl bg-red-500 py-4 text-lg font-bold text-white transition hover:bg-red-600"
                                >
                                    Keluar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
