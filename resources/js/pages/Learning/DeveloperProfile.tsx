import LearningLayout from '@/layouts/LearningLayout';

import { BookOpen, CheckCircle2, Github, GraduationCap, Mail } from 'lucide-react';

export default function DeveloperProfile() {
    return (
        <LearningLayout>
            <div className="min-h-screen overflow-y-auto bg-[#020617] rounded-3xl text-white">
                {/* BACKGROUND */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                {/* CONTENT */}
                <div className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-8 pb-24">
                    <div className="grid w-full items-center gap-8 lg:grid-cols-[0.8fr_1fr]">
                        {/* LEFT */}
                        <div className="flex justify-center">
                            <div className="relative">
                                {/* GLOW */}
                                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl" />

                                {/* IMAGE */}
                                <div className="relative h-[240px] w-[240px] overflow-hidden rounded-full border-4 border-cyan-400/20 bg-slate-900 shadow-2xl lg:h-[280px] lg:w-[280px]">
                                    <img src="/images/library.png" alt="Developer" className="h-full w-full object-cover" />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div>
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
                                Media pembelajaran interaktif ini dikembangkan untuk membantu peserta didik memahami konsep berpikir komputasional
                                dalam pengelolaan perpustakaan digital.
                            </p>

                            {/* INFO */}
                            <div className="mt-6 space-y-3">
                                {/* NAME */}
                                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                        <GraduationCap size={20} />
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">Nama Pengembang</p>

                                        <h3 className="mt-1 text-base font-bold">-</h3>
                                    </div>
                                </div>

                                {/* MEDIA */}
                                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                        <BookOpen size={20} />
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">Media Pembelajaran</p>

                                        <h3 className="mt-1 text-base font-bold">Perpustakaan Digital</h3>
                                    </div>
                                </div>

                                {/* GITHUB */}
                                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                        <Github size={20} />
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">Github</p>

                                        <h3 className="mt-1 text-base font-bold">-</h3>
                                    </div>
                                </div>

                                {/* EMAIL */}
                                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                        <Mail size={20} />
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">Email</p>

                                        <h3 className="mt-1 text-base font-bold">-</h3>
                                    </div>
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="mt-6 rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 p-5">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-300">
                                        <CheckCircle2 size={20} />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-emerald-300">Pembelajaran Selesai</h3>

                                        <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                            Terima kasih telah menggunakan media pembelajaran interaktif perpustakaan digital.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
