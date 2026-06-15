import LearningLayout from '@/layouts/LearningLayout';

import MultipleChoice from '@/components/Evaluation/MultipleChoice';

import { evaluationQuestions } from '@/data/evaluationQuestions';

import { useState } from 'react';

import { RotateCcw, Trophy } from 'lucide-react';

export default function Evaluation() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [score, setScore] = useState(0);

    const finished = currentIndex >= evaluationQuestions.length;

    const currentQuestion = evaluationQuestions[currentIndex];

    /*
    |--------------------------------------------------------------------------
    | NEXT QUESTION
    |--------------------------------------------------------------------------
    */

    const handleNext = (correct: boolean) => {
        if (correct) {
            setScore((prev) => prev + 1);
        }

        setCurrentIndex((prev) => prev + 1);
    };

    /*
    |--------------------------------------------------------------------------
    | RESTART
    |--------------------------------------------------------------------------
    */

    const restart = () => {
        setCurrentIndex(0);

        setScore(0);
    };

    return (
        <LearningLayout>
            <div className="min-h-screen overflow-y-auto text-white">
                {/* BACKGROUND */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                {/* CONTENT */}
                <div className="mx-auto max-w-4xl px-6 py-8 pb-24">
                    {/* HEADER */}
                    <div className="text-center">
                        {/* LABEL */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                            Slide 12 — Evaluasi
                        </div>

                        {/* TITLE */}
                        <h1 className="mt-4 text-4xl leading-[0.95] font-black tracking-tight lg:text-5xl">
                            Evaluasi
                            <span className="block text-cyan-400">Pembelajaran</span>
                        </h1>

                        {/* DESC */}
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                            Jawablah pertanyaan berikut berdasarkan materi yang telah dipelajari.
                        </p>
                    </div>

                    {/* QUESTIONS */}
                    {!finished && (
                        <div className="mt-8">
                            <MultipleChoice
                                question={currentQuestion}
                                questionNumber={currentIndex + 1}
                                totalQuestions={evaluationQuestions.length}
                                onNext={handleNext}
                            />
                        </div>
                    )}

                    {/* RESULT */}
                    {finished && (
                        <div className="mt-8 rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 p-8 text-center">
                            {/* ICON */}
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                                <Trophy size={40} />
                            </div>

                            {/* SCORE */}
                            <h2 className="mt-6 text-4xl font-black">
                                {score}/{evaluationQuestions.length}
                            </h2>

                            <p className="mt-2 text-lg text-slate-300">Jawaban Benar</p>

                            {/* DESC */}
                            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-300">
                                Selamat! Anda telah menyelesaikan evaluasi pembelajaran perpustakaan digital.
                            </p>

                            {/* BUTTON */}
                            <button
                                onClick={restart}
                                className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-105"
                            >
                                <RotateCcw size={18} />
                                Ulangi Evaluasi
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </LearningLayout>
    );
}
