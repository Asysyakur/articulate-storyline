import { Link, router, usePage } from '@inertiajs/react';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, LogOut, Volume2, VolumeX } from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';

export default function SlideControls() {
    const { url } = usePage();
    const [showExitModal, setShowExitModal] = useState(false);

    const [audioOn, setAudioOn] = useState(true);

    useEffect(() => {
        setAudioOn(localStorage.getItem('bg-music-muted') !== 'true');
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
    /*
    |--------------------------------------------------------------------------
    | SLIDES
    |--------------------------------------------------------------------------
    |
    | Hanya slide utama.
    | Investigation dibuka lewat aktivitas PBL.
    |
    */

    const slides = useMemo(
        () => [
            { title: 'Cover', path: '/' },
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
        ],
        [],
    );

    /*
    |--------------------------------------------------------------------------
    | CURRENT INDEX
    |--------------------------------------------------------------------------
    */

    const currentIndex = slides.findIndex((slide) => slide.path === url);

    /*
    |--------------------------------------------------------------------------
    | NAVIGATION
    |--------------------------------------------------------------------------
    */

    const nextSlide = currentIndex < slides.length - 1 ? slides[currentIndex + 1] : null;

    const prevSlide = currentIndex > 0 ? slides[currentIndex - 1] : null;

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
        return () => {
            window.removeEventListener('solution-development-checked-change', readCheckedState);
            window.removeEventListener('evaluation-completed-change', readCheckedState);
            window.removeEventListener('problem-orientation-completed-change', readCheckedState);
            window.removeEventListener('information-gathering-completed-change', readCheckedState);
            window.removeEventListener('computational-thinking-completed-change', readCheckedState);
            window.removeEventListener('algorithm-completed-change', readCheckedState);
            window.removeEventListener('data-representation-completed-change', readCheckedState);
            window.removeEventListener('data-processing-completed-change', readCheckedState);
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

    if (url === '/') {
        return null;
    }

    const nextEnabled =
        nextSlide &&
        (url !== '/problem-orientation' || problemOrientationCompleted) &&
        (url !== '/information-gathering' || informationGatheringCompleted) &&
        (url !== '/investigation/computational-thinking' || computationalThinkingCompleted) &&
        (url !== '/investigation/algorithm' || algorithmCompleted) &&
        (url !== '/investigation/data-representation' || dataRepresentationCompleted) &&
        (url !== '/investigation/data-processing' || dataProcessingCompleted) &&
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
                                router.visit(prevSlide.path);
                            }
                        }}
                        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                            prevSlide ? 'bg-slate-800 hover:bg-cyan-400 hover:text-slate-950' : 'cursor-not-allowed bg-slate-900 text-slate-600'
                        } `}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* SLIDE INFO */}
                    <div className="hidden min-w-[240px] rounded-xl border border-white/10 bg-slate-800/80 px-5 py-3 md:block">
                        <p className="text-xs text-slate-400">Current Slide</p>

                        <div className="mt-2 flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-sm font-semibold text-white">{slides[currentIndex]?.title}</h3>

                                <p className="mt-1 text-xs text-slate-500">Interactive Learning Media</p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-sm font-bold text-cyan-400">
                                {currentIndex + 1}/{slides.length}
                            </div>
                        </div>
                    </div>

                    {/* NEXT */}
                    <button
                        disabled={!nextEnabled}
                        onClick={() => {
                            if (nextEnabled) {
                                router.visit(nextSlide.path);
                            }
                        }}
                        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                            nextEnabled ? 'bg-cyan-400 text-slate-950 hover:scale-105' : 'cursor-not-allowed bg-slate-900 text-slate-600'
                        } `}
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* AUDIO */}
                    <button
                        onClick={toggleAudio}
                        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                            audioOn
                                ? 'bg-slate-800 hover:bg-cyan-400 hover:text-slate-950'
                                : 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white'
                        }`}
                    >
                        {audioOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </button>

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
