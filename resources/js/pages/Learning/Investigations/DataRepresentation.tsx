import InvestigationSlide from '@/components/InvestigationSlide';

export default function DataRepresentation() {
    return (
        <InvestigationSlide
            storageKey="data-representation-completed"
            compactWorkflow
            slideNumber={13}
            title="Gateway dan DNS"
            description="Selidiki konfigurasi gateway dan DNS untuk menemukan penyebab komputer tidak dapat mengakses internet meskipun masih terhubung ke jaringan lokal."
            image="/images/pengaturan-jaringan.png"
            note="Default gateway menyediakan jalur keluar menuju internet, sedangkan DNS menerjemahkan nama domain menjadi alamat IP. Keduanya perlu dikonfigurasi dengan benar."
            visual={
                <div className="min-h-[360px] bg-slate-950 p-4 sm:p-7">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/80">
                        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                            <span className="h-3 w-3 rounded-full bg-red-400" />
                            <span className="h-3 w-3 rounded-full bg-amber-400" />
                            <span className="h-3 w-3 rounded-full bg-emerald-400" />
                            <p className="ml-2 text-xs text-slate-400">Network Configuration Console</p>
                        </div>
                        <div className="space-y-5 p-5 font-mono text-sm">
                            <div>
                                <p className="text-slate-500">IPv4 Address</p>
                                <p className="mt-1 text-cyan-200">192.168.1.12</p>
                            </div>
                            <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-3">
                                <p className="text-slate-500">Default Gateway</p>
                                <p className="mt-1 font-semibold text-amber-200">(kosong)</p>
                            </div>
                            <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-3">
                                <p className="text-slate-500">DNS Server</p>
                                <p className="mt-1 font-semibold text-amber-200">(kosong)</p>
                            </div>
                            <div className="rounded-xl border border-red-400/30 bg-red-400/10 p-3">
                                <p className="text-slate-500">Connection Status</p>
                                <p className="mt-1 font-semibold text-red-200">LAN connected · No internet</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            hotspots={[
                {
                    id: 'gateway',
                    title: 'Default gateway kosong.',
                    icon: 'search',
                    x: '81%',
                    y: '41%',
                    problem: 'Komputer terhubung ke jaringan lokal namun tidak dapat mengakses internet.',
                    analysis: 'Kolom Default Gateway kosong sehingga paket data tidak memiliki jalur keluar menuju internet.',
                    solution: 'Atur Default Gateway sesuai alamat router, misalnya 192.168.1.1.',
                },
                {
                    id: 'dns',
                    title: 'DNS server kosong.',
                    icon: 'queue',
                    x: '81%',
                    y: '58%',
                    problem: 'Website tidak dapat dibuka meskipun koneksi jaringan terlihat aktif.',
                    analysis: 'DNS Server kosong sehingga nama domain tidak dapat diterjemahkan menjadi alamat IP.',
                    solution: 'Gunakan DNS yang valid, misalnya 8.8.8.8 atau DNS lokal yang tersedia.',
                },
                {
                    id: 'status',
                    title: 'Status: LAN connected · No internet.',
                    icon: 'lost',
                    x: '81%',
                    y: '76%',
                    problem: 'Status jaringan menunjukkan terhubung, tetapi internet tidak dapat diakses.',
                    analysis: 'Koneksi LAN berfungsi normal, namun gateway dan DNS belum terisi sehingga akses ke internet gagal.',
                    solution: 'Isi konfigurasi gateway dan DNS, kemudian lakukan pengujian konektivitas ulang.',
                },
            ]}
        />
    );
}
