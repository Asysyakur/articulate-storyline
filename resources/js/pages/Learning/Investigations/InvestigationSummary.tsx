import LearningLayout from '@/layouts/LearningLayout';
import { saveLearningProgress } from '@/utils/learningState';
import { speak } from '@/utils/speech';

import { Link } from '@inertiajs/react';
import { CheckCircle2, ChevronRight, CircleAlert, Cpu, EthernetPort, Network, Terminal, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';

type PcId = 'pc1' | 'pc2' | 'pc3';
type CommandId = 'cable' | 'gateway' | 'internet';

const diagnosisOptions = ['Normal', 'Gangguan fisik (kabel/port)', 'Gangguan jalur internet (gateway/DNS)'];

const pcCases: Record<
    PcId,
    {
        label: string;
        prompt: string;
        answer: string;
        output: Record<CommandId, string>;
    }
> = {
    pc1: {
        label: 'PC-1',
        prompt: 'Uji koneksi PC-1 untuk memastikan seluruh jalur bekerja normal.',
        answer: 'Normal',
        output: {
            cable: 'C:\\> cek-link\nStatus kabel   : TERHUBUNG\nLED port       : HIJAU, berkedip normal\nKecepatan link : 1.0 Gbps',
            gateway: 'C:\\> ping 192.168.1.1\nReply from 192.168.1.1: bytes=32 time<1ms TTL=64\nReply from 192.168.1.1: bytes=32 time<1ms TTL=64',
            internet: 'C:\\> ping 8.8.8.8\nReply from 8.8.8.8: bytes=32 time=18ms TTL=117\nReply from 8.8.8.8: bytes=32 time=17ms TTL=117',
        },
    },
    pc2: {
        label: 'PC-2',
        prompt: 'Uji PC-2 secara bertahap untuk menemukan letak putusnya jalur koneksi.',
        answer: 'Gangguan jalur internet (gateway/DNS)',
        output: {
            cable: 'C:\\> cek-link\nStatus kabel   : TERHUBUNG\nLED port       : HIJAU, berkedip normal\nKecepatan link : 1.0 Gbps',
            gateway: 'C:\\> ping 192.168.1.1\nReply from 192.168.1.1: bytes=32 time=1ms TTL=64\nReply from 192.168.1.1: bytes=32 time=1ms TTL=64',
            internet: 'C:\\> ping 8.8.8.8\nRequest timed out.\nRequest timed out.\nPing statistics: 100% loss',
        },
    },
    pc3: {
        label: 'PC-3',
        prompt: 'Periksa PC-3 mulai dari indikator fisik sebelum menjalankan pengujian jaringan.',
        answer: 'Gangguan fisik (kabel/port)',
        output: {
            cable: 'C:\\> cek-link\nStatus kabel   : TIDAK TERHUBUNG\nLED port       : MATI\nKecepatan link : Tidak terdeteksi',
            gateway: 'C:\\> ping 192.168.1.1\nReply from 192.168.1.20: Destination host unreachable.\nReply from 192.168.1.20: Destination host unreachable.',
            internet: 'C:\\> ping 8.8.8.8\nPING: transmit failed. General failure.\nPing statistics: 100% loss',
        },
    },
};

const commandLabels: Record<CommandId, string> = {
    cable: 'Cek kabel/indikator',
    gateway: 'ping gateway',
    internet: 'ping 8.8.8.8',
};

export default function InvestigationSummary() {
    const [ran, setRan] = useState<Record<PcId, boolean>>(() => ({
        pc1: typeof window !== 'undefined' && window.localStorage.getItem('vRan1') === 'true',
        pc2: typeof window !== 'undefined' && window.localStorage.getItem('vRan2') === 'true',
        pc3: typeof window !== 'undefined' && window.localStorage.getItem('vRan3') === 'true',
    }));
    const [diagnosis, setDiagnosis] = useState<Record<PcId, string>>({ pc1: '', pc2: '', pc3: '' });
    const [activeConsole, setActiveConsole] = useState<{ pc: PcId; command: CommandId } | null>(null);
    const [feedback, setFeedback] = useState<{ type: 'error' | 'wrong' | 'correct'; message: string } | null>(null);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        speak('Praktik diagnosis dimulai. Jalankan sedikitnya satu pengujian pada setiap komputer, pilih diagnosis yang paling tepat, lalu periksa hasilnya.');
    }, []);

    const runCommand = (pc: PcId, command: CommandId) => {
        setRan((current) => ({ ...current, [pc]: true }));
        window.localStorage.setItem(`vRan${pc.slice(-1)}`, 'true');
        setActiveConsole({ pc, command });
    };

    const checkDiagnosis = () => {
        if (!ran.pc1 || !ran.pc2 || !ran.pc3) {
            setFeedback({ type: 'error', message: 'Uji setiap PC setidaknya sekali sebelum memeriksa diagnosis.' });
            return;
        }

        const correct = (Object.keys(pcCases) as PcId[]).every((pc) => diagnosis[pc] === pcCases[pc].answer);

        if (!correct) {
            window.localStorage.removeItem('diagnostic-practice-completed');
            void saveLearningProgress('diagnostic-practice', false, { ran, diagnosis });
            window.dispatchEvent(new Event('diagnostic-practice-completed-change'));
            setFeedback({ type: 'wrong', message: 'Diagnosis belum tepat. Buka kembali keluaran konsol dan bandingkan gejalanya.' });
            return;
        }

        window.localStorage.setItem('diagnostic-practice-completed', 'true');
        void saveLearningProgress('diagnostic-practice', true, { ran, diagnosis });
        window.dispatchEvent(new Event('diagnostic-practice-completed-change'));
        setCompleted(true);
        setFeedback({ type: 'correct', message: 'Tepat. Semua PC sudah didiagnosis berdasarkan bukti hasil pengujian.' });
    };

    return (
        <LearningLayout>
            <div className="min-h-screen overflow-y-auto text-white">
                <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

                <div className="mx-auto max-w-7xl px-6 py-8 pb-28">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-[0px]">
                            <Terminal size={16} />
                            <span className="text-sm text-cyan-300">Sintaks PBL: membimbing penyelidikan</span>
                            Slide 15 — Praktik Diagnosis
                        </div>
                        <h1 className="mt-4 text-4xl font-black tracking-tight lg:text-5xl">
                            Diagnosis <span className="text-cyan-400">Hands-on</span>
                        </h1>
                        <p className="mt-4 text-base leading-relaxed text-slate-300">
                            Jalankan perintah diagnosis pada setiap PC. Gunakan keluaran konsol sebagai bukti sebelum menentukan jenis gangguannya.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-3">
                        {(Object.keys(pcCases) as PcId[]).map((pc) => {
                            const item = pcCases[pc];
                            return (
                                <section key={pc} className="rounded-[28px] border border-white/10 bg-slate-900/75 p-5 shadow-xl shadow-cyan-950/10">
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-full bg-cyan-400 px-3 py-1 text-sm font-black text-slate-950">{item.label}</span>
                                        <Cpu className={ran[pc] ? 'text-emerald-300' : 'text-slate-500'} size={24} />
                                    </div>
                                    <p className="mt-4 min-h-12 text-sm leading-relaxed text-slate-300">{item.prompt}</p>

                                    <div className="mt-5 space-y-2">
                                        {(Object.keys(commandLabels) as CommandId[]).map((command) => (
                                            <button
                                                key={command}
                                                type="button"
                                                disabled={completed}
                                                onClick={() => runCommand(pc, command)}
                                                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold transition hover:border-cyan-400/50 hover:bg-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                <span className="flex items-center gap-2">
                                                    {command === 'cable' ? <EthernetPort size={16} /> : command === 'gateway' ? <Network size={16} /> : <Wifi size={16} />}
                                                    {commandLabels[command]}
                                                </span>
                                                <ChevronRight size={16} className="text-cyan-300" />
                                            </button>
                                        ))}
                                    </div>

                                    <label className="mt-5 block text-sm font-semibold text-slate-200">
                                        Pilih diagnosis
                                        <select
                                            value={diagnosis[pc]}
                                            disabled={completed}
                                            onChange={(event) => setDiagnosis((current) => ({ ...current, [pc]: event.target.value }))}
                                            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <option value="">Pilih diagnosis</option>
                                            {diagnosisOptions.map((option) => <option key={option}>{option}</option>)}
                                        </select>
                                    </label>
                                </section>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex flex-col items-start gap-4">
                        <button
                            type="button"
                            onClick={checkDiagnosis}
                            disabled={completed}
                            className="rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Periksa Diagnosis
                        </button>

                        {feedback && (
                            <div className={`w-full rounded-2xl border p-4 text-sm ${feedback.type === 'correct' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100' : feedback.type === 'wrong' ? 'border-red-400/30 bg-red-400/10 text-red-100' : 'border-amber-400/30 bg-amber-400/10 text-amber-100'}`}>
                                <div className="flex items-center gap-3">
                                    {feedback.type === 'correct' ? <CheckCircle2 size={20} /> : <CircleAlert size={20} />}
                                    {feedback.message}
                                </div>
                            </div>
                        )}

                        {completed && (
                            <Link href="/solution-development" className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 font-bold text-cyan-100 transition hover:bg-cyan-400 hover:text-slate-950">
                                Lanjut ke Solusi & Presentasi <ChevronRight size={18} />
                            </Link>
                        )}
                    </div>
                </div>

                {activeConsole && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm">
                        <section className="w-full max-w-2xl rounded-2xl border border-cyan-400/30 bg-slate-900 p-5 shadow-2xl">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-cyan-300">Keluaran Konsol · {pcCases[activeConsole.pc].label}</p>
                                    <h2 className="mt-1 text-xl font-black">{commandLabels[activeConsole.command]}</h2>
                                </div>
                                <Terminal className="text-cyan-300" size={24} />
                            </div>
                            <pre className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-emerald-300">
                                {pcCases[activeConsole.pc].output[activeConsole.command]}
                            </pre>
                            <button type="button" onClick={() => setActiveConsole(null)} className="mt-5 w-full rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950">
                                Tutup Keluaran
                            </button>
                        </section>
                    </div>
                )}
            </div>
        </LearningLayout>
    );
}
