import LearningLayout from '@/layouts/LearningLayout';

import { useEffect, useMemo, useState } from 'react';

import { CheckCircle2, CheckSquare, GripVertical, RotateCcw, ShieldCheck, XCircle } from 'lucide-react';

import { closestCenter, DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { speak } from '@/utils/speech';

type FeedbackState = 'correct' | 'wrong' | null;

type StepItem = {
    id: string;
    hint: string;
};

const correctOrder = [
    'Identifikasi gejala & batasi masalah',
    'Periksa koneksi fisik (kabel/port/lampu)',
    'Periksa konfigurasi IP/subnet/gateway/DNS',
    'Uji konektivitas dengan ping (gateway lalu internet)',
    'Terapkan perbaikan & uji ulang',
    'Dokumentasikan solusi',
];

const stepDetails: Record<string, string> = {
    'Identifikasi gejala & batasi masalah': 'Mulai dari mengenali gejala agar fokus troubleshooting tidak melebar.',
    'Periksa koneksi fisik (kabel/port/lampu)': 'Validasi hal yang paling dasar sebelum masuk ke konfigurasi.',
    'Periksa konfigurasi IP/subnet/gateway/DNS': 'Cek parameter logis yang sering menjadi sumber gangguan.',
    'Uji konektivitas dengan ping (gateway lalu internet)': 'Pastikan jalur ke gateway dan internet benar-benar tersedia.',
    'Terapkan perbaikan & uji ulang': 'Lakukan tindakan korektif lalu verifikasi hasilnya.',
    'Dokumentasikan solusi': 'Catat hasil agar solusi bisa dipakai kembali saat kasus serupa muncul.',
};

function SortableItem({ id, index, hint, disabled }: { id: string; index: number; hint: string; disabled: boolean }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        disabled,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center justify-between rounded-2xl border p-4 transition ${
                disabled
                    ? 'cursor-not-allowed border-slate-800 bg-slate-900/50 opacity-80'
                    : 'border-white/10 bg-white/5 hover:border-cyan-400/30 hover:bg-cyan-400/5'
            }`}
        >
            <div className="flex items-center gap-4">
                <button
                    {...attributes}
                    {...listeners}
                    disabled={disabled}
                    aria-label={`Pindahkan langkah ${index + 1}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 ${
                        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-grab active:cursor-grabbing'
                    }`}
                >
                    <GripVertical size={18} />
                </button>

                <div>
                    <p className="text-xs tracking-[0.16em] text-slate-400 uppercase">Langkah {index + 1}</p>
                    <h3 className="text-base leading-tight font-bold text-white">{id}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{hint}</p>
                </div>
            </div>
        </div>
    );
}

export default function SolutionDevelopment() {
    const [items, setItems] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<FeedbackState>(null);
    const [hasChecked, setHasChecked] = useState(false);

    const sensors = useSensors(useSensor(PointerSensor));
    const isLocked = hasChecked;

    useEffect(() => {
        const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);

        setItems(shuffled);
        setFeedback(null);
        setHasChecked(false);

        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('solution-development-checked');
            window.dispatchEvent(new Event('solution-development-checked-change'));
        }
    }, []);

    const stepItems = useMemo<StepItem[]>(
        () =>
            items.map((item) => ({
                id: item,
                hint: stepDetails[item],
            })),
        [items],
    );

    function handleDragEnd(event: DragEndEvent) {
        if (isLocked) {
            return;
        }

        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        setFeedback(null);

        setItems((currentItems) => {
            const oldIndex = currentItems.indexOf(String(active.id));
            const newIndex = currentItems.indexOf(String(over.id));

            return arrayMove(currentItems, oldIndex, newIndex);
        });
    }

    const checkAnswer = () => {
        const correct = JSON.stringify(items) === JSON.stringify(correctOrder);

        setFeedback(correct ? 'correct' : 'wrong');
        setHasChecked(true);

        if (typeof window !== 'undefined') {
            window.localStorage.setItem('solution-development-checked', 'true');
            window.dispatchEvent(new Event('solution-development-checked-change'));
        }
    };

    const resetAttempt = () => {
        setItems([...correctOrder].sort(() => Math.random() - 0.5));
        setFeedback(null);
        setHasChecked(false);

        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('solution-development-checked');
            window.dispatchEvent(new Event('solution-development-checked-change'));
        }
    };

    useEffect(() => {
        speak(`
        Setelah berhasil mengidentifikasi penyebab gangguan jaringan,
        langkah berikutnya adalah menyusun strategi penyelesaian secara sistematis.

        Urutkan setiap langkah troubleshooting dari proses identifikasi masalah,
        pemeriksaan koneksi,
        pengecekan konfigurasi,
        pengujian konektivitas,
        hingga penerapan solusi dan dokumentasi.

        Susun urutan yang paling logis agar proses perbaikan dapat dilakukan secara efektif dan efisien.
    `);
    }, []);

    return (
        <LearningLayout>
            <div className="relative min-h-screen overflow-y-auto text-white">
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
                    <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
                </div>

                <div className="mx-auto max-w-6xl px-6 py-8 pb-24">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                            Slide 11 — Penyusunan Solusi
                        </div>

                        <h1 className="mt-4 text-4xl leading-[0.95] font-black tracking-tight lg:text-5xl">
                            Susun Langkah
                            <span className="block text-cyan-400">Troubleshooting</span>
                        </h1>

                        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
                            Gunakan drag and drop untuk mengurutkan langkah penyelesaian masalah. Setelah diperiksa, jawaban akan dikunci sampai Anda
                            menekan Coba Lagi.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.55fr]">
                        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-cyan-950/10">
                            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                                <div>
                                    <p className="text-sm font-semibold text-cyan-300">Convert to Freeform · Drag and Drop</p>
                                    <p className="mt-1 text-sm text-slate-400">Susun urutan langkah troubleshooting dari atas ke bawah.</p>
                                </div>

                                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
                                    <ShieldCheck size={14} />
                                    {isLocked ? 'Jawaban terkunci' : 'Jawaban belum dikunci'}
                                </div>
                            </div>

                            {isLocked && (
                                <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                                    Jawaban sudah disubmit. Gunakan Coba Lagi jika ingin mengubah urutan.
                                </div>
                            )}

                            <div className="mt-5">
                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                                        <div className="space-y-3">
                                            {stepItems.map((item, index) => (
                                                <SortableItem key={item.id} id={item.id} index={index} hint={item.hint} disabled={isLocked} />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={checkAnswer}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-105"
                                >
                                    <CheckSquare size={18} />
                                    Periksa Jawaban
                                </button>

                                <button
                                    type="button"
                                    onClick={resetAttempt}
                                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                                >
                                    <RotateCcw size={18} />
                                    Coba Lagi
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-cyan-950/10">
                                <p className="text-sm font-semibold text-cyan-300">Status Pemeriksaan</p>

                                <div className="mt-3 flex items-center gap-3">
                                    <div
                                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                                            feedback === 'correct'
                                                ? 'bg-emerald-400/20 text-emerald-300'
                                                : feedback === 'wrong'
                                                  ? 'bg-red-400/20 text-red-300'
                                                  : 'bg-white/5 text-slate-400'
                                        }`}
                                    >
                                        {feedback === 'correct' ? (
                                            <CheckCircle2 size={20} />
                                        ) : feedback === 'wrong' ? (
                                            <XCircle size={20} />
                                        ) : (
                                            <ShieldCheck size={20} />
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            {feedback === 'correct' ? 'Benar' : feedback === 'wrong' ? 'Salah' : 'Belum diperiksa'}
                                        </h3>

                                        <p className="mt-1 text-sm leading-relaxed text-slate-400">
                                            {feedback === 'correct'
                                                ? 'Urutan sudah tepat. Next pada bar global kini aktif.'
                                                : feedback === 'wrong'
                                                  ? 'Urutan belum tepat. Coba lagi setelah melihat jawaban benar.'
                                                  : 'Susun langkah lalu tekan Periksa Jawaban.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-cyan-950/10">
                                <p className="text-sm font-semibold text-cyan-300">Petunjuk</p>

                                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                                    <li>• Klik dan seret langkah untuk mengurutkan.</li>
                                    <li>• Tombol Periksa menampilkan layer Benar / Salah.</li>
                                    <li>• Next aktif setelah jawaban diperiksa.</li>
                                </ul>
                            </div>

                            {hasChecked && (
                                <div className="rounded-[28px] border border-emerald-400/20 bg-emerald-400/10 p-5 shadow-2xl shadow-emerald-950/10">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-300">
                                            <CheckCircle2 size={22} />
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-emerald-300">Jawaban Sudah Diperiksa</h3>

                                            <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                                Bar global sekarang dapat digunakan untuk lanjut ke slide berikutnya.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {feedback === 'wrong' && (
                                <div className="rounded-[28px] border border-red-400/20 bg-red-400/10 p-5 shadow-2xl shadow-red-950/10">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/20 text-red-300">
                                            <XCircle size={22} />
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-red-300">Belum Tepat</h3>

                                            <p className="mt-2 text-sm leading-relaxed text-slate-300">Coba susun ulang, lalu periksa kembali.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
