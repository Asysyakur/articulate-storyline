import { AnimatePresence, motion } from 'framer-motion';
import {
    BookOpen,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    FileText,
    HelpCircle,
    Home,
    Layers,
    Lock,
    LogOut,
    Sparkles,
    Volume2,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
    const [activeTab, setActiveTab] = useState<'guide' | 'buttons' | 'pbl' | 'lkpd'>('guide');

    if (!isOpen) {
        return null;
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative flex flex-col max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-[28px] border border-cyan-400/30 bg-slate-900/95 shadow-2xl backdrop-blur-xl"
                    >
                        {/* MODAL HEADER */}
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                                    <HelpCircle size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white">Petunjuk &amp; Panduan Belajar Mandiri</h2>
                                    <p className="text-xs text-slate-400">Media Pembelajaran Interaktif Informatika (Fase F)</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Tutup Petunjuk"
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition hover:bg-red-500 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* NAVIGATION TABS */}
                        <div className="flex border-b border-white/10 bg-slate-950/50 px-6 py-2 overflow-x-auto gap-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab('guide')}
                                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition shrink-0 ${
                                    activeTab === 'guide'
                                        ? 'bg-cyan-400 text-slate-950 shadow-md'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <Sparkles size={16} />
                                Panduan Umum
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('buttons')}
                                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition shrink-0 ${
                                    activeTab === 'buttons'
                                        ? 'bg-cyan-400 text-slate-950 shadow-md'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <HelpCircle size={16} />
                                Fungsi Tombol Navigasi
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('pbl')}
                                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition shrink-0 ${
                                    activeTab === 'pbl'
                                        ? 'bg-cyan-400 text-slate-950 shadow-md'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <Layers size={16} />
                                Alur 5 Sintaks PBL
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('lkpd')}
                                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition shrink-0 ${
                                    activeTab === 'lkpd'
                                        ? 'bg-amber-400 text-slate-950 shadow-md'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <FileText size={16} />
                                Penanda LKPD
                            </button>
                        </div>

                        {/* MODAL BODY CONTENT */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm leading-relaxed text-slate-300">
                            {activeTab === 'guide' && (
                                <div className="space-y-4">
                                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                                        <h3 className="font-bold text-cyan-200 flex items-center gap-2 text-base">
                                            <Sparkles size={18} className="text-cyan-400" />
                                            Cara Menggunakan Media Pembelajaran
                                        </h3>
                                        <p className="mt-2 text-slate-300 text-xs sm:text-sm">
                                            Media ini dirancang untuk pembelajaran mandiri berbasis masalah (Problem Based Learning). Ikuti alur aktivitas secara bertahap untuk mendiagnosis dan memecahkan masalah jaringan komputer.
                                        </p>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4 space-y-2">
                                            <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                                                <Lock size={16} />
                                                Penguncian Alur (Gating)
                                            </div>
                                            <p className="text-xs text-slate-300">
                                                Tombol <strong>Berikutnya (›)</strong> diawali dalam keadaan nonaktif (terkunci). Tombol akan <strong>aktif otomatis</strong> setelah Anda menyelesaikan seluruh aktivitas interaktif pada slide tersebut.
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4 space-y-2">
                                            <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                                                <BookOpen size={16} />
                                                Materi Pendukung (Scaffolding)
                                            </div>
                                            <p className="text-xs text-slate-300">
                                                Klik tombol <strong>Materi (📚)</strong> di nav bawah kapan saja Anda membutuhkan penjelasan konsep. Gunakan tombol <strong>Kembali</strong> di bilah navigasi untuk melanjutkan aktivitas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'buttons' && (
                                <div className="space-y-3">
                                    <p className="text-xs text-slate-400">
                                        Berikut adalah fungsi dari setiap tombol navigasi yang ada di bilah navigasi bawah:
                                    </p>
                                    <div className="grid gap-3.5 sm:grid-cols-2">
                                        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-800/50 p-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-cyan-400">
                                                <Home size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-xs">Home (Beranda/Login)</h4>
                                                <p className="text-[11px] text-slate-400 mt-0.5">Kembali ke halaman login utama aplikasi.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-800/50 p-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-cyan-400">
                                                <ChevronLeft size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-xs">Sebelumnya</h4>
                                                <p className="text-[11px] text-slate-400 mt-0.5">Kembali ke slide pembelajaran sebelumnya.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-800/50 p-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-cyan-400">
                                                <ChevronRight size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-xs">Berikutnya</h4>
                                                <p className="text-[11px] text-slate-400 mt-0.5">Menuju slide berikutnya (aktif setelah aktivitas selesai).</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-800/50 p-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-cyan-400">
                                                <BookOpen size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-xs">Materi Pendukung</h4>
                                                <p className="text-[11px] text-slate-400 mt-0.5">Membuka menu pilihan 4 modul materi pendukung.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-800/50 p-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-cyan-400">
                                                <HelpCircle size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-xs">Petunjuk (?)</h4>
                                                <p className="text-[11px] text-slate-400 mt-0.5">Membuka overlay petunjuk dan alur belajar mandiri ini.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-800/50 p-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-cyan-400">
                                                <Volume2 size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-xs">Pengaturan Audio</h4>
                                                <p className="text-[11px] text-slate-400 mt-0.5">Mengatur suara musik latar, suara narasi, dan efek suara (SFX).</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-800/50 p-3 sm:col-span-2">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
                                                <LogOut size={18} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-xs">Keluar</h4>
                                                <p className="text-[11px] text-slate-400 mt-0.5">Menutup sesi pembelajaran dan keluar dari media.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'pbl' && (
                                <div className="space-y-3">
                                    <p className="text-xs text-slate-400">
                                        Alur 5 Sintaks Problem Based Learning (PBL) pada slide aktivitas F09–F19:
                                    </p>

                                    <div className="space-y-2.5">
                                        <div className="rounded-xl border border-cyan-400/20 bg-slate-800/60 p-3.5 flex items-start gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950 font-bold text-xs">1</span>
                                            <div>
                                                <h4 className="font-bold text-white text-xs">Tahap 1 — Orientasi Masalah (Slide F09)</h4>
                                                <p className="text-xs text-slate-300 mt-0.5">Mengidentifikasi gejala dan gangguan jaringan di laboratorium komputer melalui ilustrasi interaktif.</p>
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-cyan-400/20 bg-slate-800/60 p-3.5 flex items-start gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950 font-bold text-xs">2</span>
                                            <div>
                                                <h4 className="font-bold text-white text-xs">Tahap 2 — Mengorganisasi Penyelidikan (Slide F10)</h4>
                                                <p className="text-xs text-slate-300 mt-0.5">Menentukan informasi yang dibutuhkan dan membagi peran investigasi tim IT Support.</p>
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-cyan-400/20 bg-slate-800/60 p-3.5 flex items-start gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950 font-bold text-xs">3</span>
                                            <div>
                                                <h4 className="font-bold text-white text-xs">Tahap 3 — Membimbing Penyelidikan (Slide F11–F14 &amp; F15)</h4>
                                                <p className="text-xs text-slate-300 mt-0.5">Melakukan investigasi bukti (Berpikir Komputasional, Algoritma, Representasi Data) serta praktik diagnosis hands-on.</p>
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-cyan-400/20 bg-slate-800/60 p-3.5 flex items-start gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950 font-bold text-xs">4</span>
                                            <div>
                                                <h4 className="font-bold text-white text-xs">Tahap 4 — Menyajikan Hasil Karya (Slide F16)</h4>
                                                <p className="text-xs text-slate-300 mt-0.5">Menyusun langkah-langkah troubleshooting dan merumuskan solusi perbaikan jaringan.</p>
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-cyan-400/20 bg-slate-800/60 p-3.5 flex items-start gap-3">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-slate-950 font-bold text-xs">5</span>
                                            <div>
                                                <h4 className="font-bold text-white text-xs">Tahap 5 — Menganalisis &amp; Mengevaluasi (Slide F19)</h4>
                                                <p className="text-xs text-slate-300 mt-0.5">Melakukan refleksi dan evaluasi terhadap seluruh proses pemecahan masalah yang telah dilakukan.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'lkpd' && (
                                <div className="space-y-4">
                                    <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
                                        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                                            <FileText size={18} className="text-amber-400" />
                                            Informasi Pencatatan LKPD
                                        </div>
                                        <p className="mt-2 text-slate-300 text-xs sm:text-sm">
                                            Saat menemukan badge <strong>✎ Catat di LKPD (Tahap X)</strong> di bagian atas slide aktivitas, catatlah hasil analisis dan temuan Anda ke dalam Lembar Kerja Peserta Didik (LKPD).
                                        </p>
                                    </div>

                                    <div className="space-y-2 text-xs">
                                        <p className="font-semibold text-slate-400">Pemetaan Slide Aktivitas ke Tahap LKPD:</p>
                                        <div className="grid gap-2 sm:grid-cols-2">
                                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2">
                                                <span className="font-bold text-white">Slide F09</span>
                                                <span className="rounded bg-amber-400/20 px-2 py-0.5 font-bold text-amber-300">Tahap 1</span>
                                            </div>

                                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2">
                                                <span className="font-bold text-white">Slide F10</span>
                                                <span className="rounded bg-amber-400/20 px-2 py-0.5 font-bold text-amber-300">Tahap 2</span>
                                            </div>

                                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2">
                                                <span className="font-bold text-white">Slide F11–F14</span>
                                                <span className="rounded bg-amber-400/20 px-2 py-0.5 font-bold text-amber-300">Tahap 3</span>
                                            </div>

                                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2">
                                                <span className="font-bold text-white">Slide F15</span>
                                                <span className="rounded bg-amber-400/20 px-2 py-0.5 font-bold text-amber-300">Tahap 3–4</span>
                                            </div>

                                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2">
                                                <span className="font-bold text-white">Slide F16</span>
                                                <span className="rounded bg-amber-400/20 px-2 py-0.5 font-bold text-amber-300">Tahap 4</span>
                                            </div>

                                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2">
                                                <span className="font-bold text-white">Slide F19</span>
                                                <span className="rounded bg-amber-400/20 px-2 py-0.5 font-bold text-amber-300">Tahap 5</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* MODAL FOOTER */}
                        <div className="flex items-center justify-between border-t border-white/10 bg-slate-950/60 px-6 py-4">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <CheckCircle2 size={15} className="text-cyan-400" />
                                <span>Petunjuk ini dapat dibuka kapan saja melalui icon <strong>(?)</strong>.</span>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-xl bg-cyan-400 px-5 py-2 text-xs font-bold text-slate-950 transition hover:bg-cyan-300"
                            >
                                Mengerti &amp; Tutup
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
