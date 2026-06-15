import LearningLayout from '@/layouts/LearningLayout';

import { useEffect, useState } from 'react';

import { CheckCircle2, GripVertical, XCircle } from 'lucide-react';

import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

const correctOrder = ['Identifikasi masalah', 'Mengumpulkan data', 'Menyusun algoritma', 'Merancang solusi', 'Evaluasi hasil'];

/*
|--------------------------------------------------------------------------
| SORTABLE ITEM
|--------------------------------------------------------------------------
*/

function SortableItem({
    id,
    index,
}: {
    id: string;

    index: number;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),

        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition"
        >
            {/* LEFT */}
            <div className="flex items-center gap-4">
                {/* HANDLE */}
                <button
                    {...attributes}
                    {...listeners}
                    className="flex h-10 w-10 cursor-grab items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 active:cursor-grabbing"
                >
                    <GripVertical size={18} />
                </button>

                {/* TEXT */}
                <div>
                    <p className="text-xs text-slate-400">Langkah {index + 1}</p>

                    <h3 className="text-base font-bold">{id}</h3>
                </div>
            </div>
        </div>
    );
}

export default function SolutionDevelopment() {
    const [items, setItems] = useState<string[]>([]);

    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    /*
    |--------------------------------------------------------------------------
    | SENSORS
    |--------------------------------------------------------------------------
    */

    const sensors = useSensors(useSensor(PointerSensor));

    /*
    |--------------------------------------------------------------------------
    | SHUFFLE
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);

        setItems(shuffled);
    }, []);

    /*
    |--------------------------------------------------------------------------
    | DRAG END
    |--------------------------------------------------------------------------
    */

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);

                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    /*
    |--------------------------------------------------------------------------
    | CHECK ANSWER
    |--------------------------------------------------------------------------
    */

    const checkAnswer = () => {
        const correct = JSON.stringify(items) === JSON.stringify(correctOrder);

        setFeedback(correct ? 'correct' : 'wrong');
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
                            Slide 11 — Penyusunan Solusi
                        </div>

                        {/* TITLE */}
                        <h1 className="mt-4 text-4xl leading-[0.95] font-black tracking-tight lg:text-5xl">
                            Susun
                            <span className="block text-cyan-400">Langkah Solusi</span>
                        </h1>

                        {/* DESC */}
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                            Drag dan susun tahapan penyelesaian masalah perpustakaan sekolah dengan benar.
                        </p>
                    </div>

                    {/* CARD */}
                    <div className="mt-8 rounded-[24px] border border-white/10 bg-slate-900/70 p-5 shadow-2xl">
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                                <div className="space-y-3">
                                    {items.map((item, index) => (
                                        <SortableItem key={item} id={item} index={index} />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>

                        {/* BUTTON */}
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={checkAnswer}
                                className="rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-105"
                            >
                                Periksa Jawaban
                            </button>
                        </div>

                        {/* CORRECT */}
                        {feedback === 'correct' && (
                            <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-300">
                                        <CheckCircle2 size={22} />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-emerald-300">Hebat!</h3>

                                        <p className="mt-2 text-sm leading-relaxed text-slate-300">Solusi yang kalian susun sudah sesuai.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* WRONG */}
                        {feedback === 'wrong' && (
                            <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-5">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/20 text-red-300">
                                        <XCircle size={22} />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-red-300">Belum Tepat</h3>

                                        <p className="mt-2 text-sm leading-relaxed text-slate-300">Coba periksa kembali urutannya.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
