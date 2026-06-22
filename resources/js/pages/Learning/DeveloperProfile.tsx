import LearningLayout from '@/layouts/LearningLayout';

import { ArrowRight, BookOpen, CheckCircle2, Github, GraduationCap, Mail, School2 } from 'lucide-react';

import { Link } from '@inertiajs/react';

import { motion } from 'framer-motion';

export default function DeveloperProfile() {
    return (
        <LearningLayout>
            <div className="min-h-screen overflow-y-auto text-white">
                {/* BACKGROUND */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                {/* CONTENT */}
                <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-8 pb-24">
                    <div className="grid w-full items-center gap-10 lg:grid-cols-[0.82fr_1fr]">
                        {/* LEFT */}
                        <div className="flex justify-center lg:justify-start">
                            <motion.div
                                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.55, ease: 'easeOut' }}
                                className="relative w-full max-w-[420px]"
                            >
                                <div className="absolute -inset-6 rounded-[36px] bg-cyan-400/10 blur-3xl" />

                                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/20">
                                    <div className="aspect-[4/5] overflow-hidden rounded-[26px] border border-cyan-400/15 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">
                                        <img src="/images/library.png" alt="Logo atau foto pengembang" className="h-full w-full object-cover opacity-90" />
                                    </div>

                                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                            <p className="text-xs text-slate-400">Nama</p>
                                            <p className="mt-1 text-sm font-semibold text-white">Asysyakur</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                            <p className="text-xs text-slate-400">Status</p>
                                            <p className="mt-1 text-sm font-semibold text-white">Pengembang Media</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.08 }}
                        >
                            {/* LABEL */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                                Slide 15 — Profil Pengembang
                            </div>

                            {/* TITLE */}
                            <h1 className="mt-4 text-4xl leading-[0.95] font-black tracking-tight lg:text-5xl">
                                Profil
                                <span className="block text-cyan-400">Pengembang</span>
                            </h1>

                            {/* DESC */}
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                                Media pembelajaran interaktif ini dikembangkan untuk membantu peserta didik memahami konsep berpikir
                                komputasional dalam pengelolaan perpustakaan digital.
                            </p>

                            {/* IDENTITY */}
                            <div className="mt-6 grid gap-3">
                                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                        <GraduationCap size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400">Nama Pengembang</p>
                                        <h3 className="mt-1 text-base font-bold">Asysyakur</h3>
                                        <p className="mt-1 text-sm text-slate-300">NIM: Tidak dicantumkan</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                        <BookOpen size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400">Program Studi</p>
                                        <h3 className="mt-1 text-base font-bold">Pendidikan Ilmu Komputer</h3>
                                        <p className="mt-1 text-sm text-slate-300">Nama Universitas: Belum dicantumkan</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                        <School2 size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400">Instansi mitra</p>
                                        <h3 className="mt-1 text-base font-bold">SMK Indonesia Mas</h3>
                                        <p className="mt-1 text-sm text-slate-300">Media pembelajaran interaktif jaringan komputer dan internet.</p>
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                            <Mail size={20} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-slate-400">Email</p>
                                            <h3 className="mt-1 text-sm font-bold break-all">hilmiasysyakur123@gmail.com</h3>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                            <Github size={20} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-slate-400">Github</p>
                                            <h3 className="mt-1 text-sm font-bold">Belum dicantumkan</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="mt-6 rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 p-5">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-300">
                                        <CheckCircle2 size={20} />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="text-lg font-bold text-emerald-300">Pembelajaran Selesai</h3>

                                        <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                            Terima kasih telah menggunakan media pembelajaran interaktif Jaringan Komputer dan Internet.
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <Link
                                                href="/"
                                                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:scale-105"
                                            >
                                                Exit course
                                                <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
