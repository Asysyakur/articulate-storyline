import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, Database, Play } from 'lucide-react';
export default function Home() {
    return (
        <div className="relative h-screen overflow-hidden bg-[#020617] text-white">
            {' '}
            {/* BACKGROUND */}{' '}
            <div className="absolute inset-0">
                {' '}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" /> {/* GRID */}{' '}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03]" />{' '}
                {/* GLOW */} <div className="absolute top-0 left-0 h-[300px] w-[300px] bg-cyan-500/10 blur-[120px]" />{' '}
                <div className="absolute right-0 bottom-0 h-[300px] w-[300px] bg-blue-500/10 blur-[120px]" />{' '}
            </div>{' '}
            {/* CONTENT */}{' '}
            <div className="relative z-10 flex h-full items-center">
                {' '}
                <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
                    {' '}
                    <div className="grid items-center gap-10 lg:grid-cols-2">
                        {' '}
                        {/* LEFT */}{' '}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                            {' '}
                            {/* BADGE */}{' '}
                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-300 sm:text-sm">
                                {' '}
                                <BookOpen size={15} /> Media Pembelajaran Interaktif{' '}
                            </div>{' '}
                            {/* TITLE */}{' '}
                            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl lg:text-6xl">
                                {' '}
                                Membantu Sekolah Mengelola <span className="mt-2 block text-cyan-400"> Data Perpustakaan Digital </span>{' '}
                            </h1>{' '}
                            {/* DESC */}{' '}
                            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
                                {' '}
                                Media pembelajaran berbasis Problem-Based Learning untuk membantu peserta didik memahami berpikir komputasional
                                melalui studi kasus perpustakaan sekolah.{' '}
                            </p>{' '}
                            {/* BUTTON */}{' '}
                            <div className="mt-8 flex flex-wrap gap-3">
                                {' '}
                                <Link
                                    href="/instruction"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:scale-105 sm:text-base"
                                >
                                    {' '}
                                    <Play size={18} /> Mulai{' '}
                                </Link>{' '}
                                <button className="rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm sm:text-base">
                                    {' '}
                                    Musik{' '}
                                </button>{' '}
                            </div>{' '}
                            {/* TAGS */}{' '}
                            <div className="mt-7 flex flex-wrap gap-2">
                                {' '}
                                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs sm:text-sm">
                                    {' '}
                                    Informatika Fase E{' '}
                                </div>{' '}
                                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs sm:text-sm"> PBL </div>{' '}
                                <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs sm:text-sm">
                                    {' '}
                                    Interactive{' '}
                                </div>{' '}
                            </div>{' '}
                        </motion.div>{' '}
                        {/* RIGHT */}{' '}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7 }}
                            className="hidden lg:block"
                        >
                            {' '}
                            <div className="rounded-[32px] border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">
                                {' '}
                                {/* HEADER */}{' '}
                                <div className="flex items-center justify-between">
                                    {' '}
                                    <div>
                                        {' '}
                                        <p className="text-sm text-cyan-400"> Smart Library </p>{' '}
                                        <h2 className="mt-1 text-3xl font-black"> Dashboard </h2>{' '}
                                    </div>{' '}
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
                                        {' '}
                                        <Database size={28} className="text-cyan-400" />{' '}
                                    </div>{' '}
                                </div>{' '}
                                {/* CONTENT */}{' '}
                                <div className="mt-6 rounded-[28px] border border-slate-800 bg-[#0B1120] p-5">
                                    {' '}
                                    {/* STATS */}{' '}
                                    <div className="grid grid-cols-2 gap-4">
                                        {' '}
                                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                                            {' '}
                                            <p className="text-sm text-slate-400"> Total Buku </p>{' '}
                                            <h3 className="mt-3 text-4xl font-black"> 1,250 </h3>{' '}
                                        </div>{' '}
                                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                                            {' '}
                                            <p className="text-sm text-slate-400"> Peminjaman </p>{' '}
                                            <h3 className="mt-3 text-4xl font-black"> 320 </h3>{' '}
                                        </div>{' '}
                                    </div>{' '}
                                    {/* ALERT */}{' '}
                                    <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
                                        {' '}
                                        <p className="text-sm font-semibold text-red-400"> Permasalahan Sistem </p>{' '}
                                        <p className="mt-3 text-slate-300"> Data peminjaman masih dicatat manual </p>{' '}
                                    </div>{' '}
                                </div>{' '}
                            </div>{' '}
                        </motion.div>{' '}
                    </div>{' '}
                </div>{' '}
            </div>{' '}
        </div>
    );
}
