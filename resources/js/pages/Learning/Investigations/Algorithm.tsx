import InvestigationSlide from '@/components/InvestigationSlide';

export default function Algorithm() {
    return (
        <InvestigationSlide
            storageKey="algorithm-completed"
            compactWorkflow
            slideNumber={12}
            title="Pengalamatan IP"
            description="Selidiki kesesuaian konfigurasi alamat IP antarperangkat pada jaringan laboratorium."
            image="/images/konfigurasi-ip.png"
            note="Perangkat dalam satu LAN harus menggunakan alamat IP, subnet mask, dan gateway yang sesuai dengan segmen jaringan yang sama."
            visual={
                <div className="min-h-[360px] bg-slate-950 p-4 sm:p-7">
                    <p className="mb-5 text-sm font-semibold text-cyan-300">Tabel Konfigurasi IP Laboratorium</p>
                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                            <thead className="bg-cyan-400/10 text-cyan-200">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">Perangkat</th>
                                    <th className="px-4 py-3 font-semibold">Alamat IP</th>
                                    <th className="px-4 py-3 font-semibold">Subnet Mask</th>
                                    <th className="px-4 py-3 font-semibold">Default Gateway</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300">
                                <tr className="border-t border-white/10">
                                    <td className="px-4 py-3">PC-01</td>
                                    <td className="px-4 py-3">192.168.1.10</td>
                                    <td className="px-4 py-3">255.255.255.0</td>
                                    <td className="px-4 py-3">192.168.1.1</td>
                                </tr>
                                <tr className="border-t border-white/10">
                                    <td className="px-4 py-3">PC-02</td>
                                    <td className="px-4 py-3">192.168.1.11</td>
                                    <td className="px-4 py-3">255.255.255.0</td>
                                    <td className="px-4 py-3">192.168.1.1</td>
                                </tr>
                                <tr className="border-t border-amber-400/30 bg-amber-400/10 text-amber-100">
                                    <td className="px-4 py-3 font-semibold">PC-12</td>
                                    <td className="px-4 py-3 font-semibold">192.168.2.20</td>
                                    <td className="px-4 py-3">255.255.255.0</td>
                                    <td className="px-4 py-3 font-semibold">192.168.2.1</td>
                                </tr>
                                <tr className="border-t border-white/10">
                                    <td className="px-4 py-3">PC-04</td>
                                    <td className="px-4 py-3">192.168.1.13</td>
                                    <td className="px-4 py-3">255.255.255.0</td>
                                    <td className="px-4 py-3">192.168.1.1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            hotspots={[
                {
                    id: 'pc-12',
                    title: 'PC-12 menggunakan konfigurasi yang berbeda dari host lain.',
                    x: '7%',
                    y: '55%',
                    icon: 'search',
                    problem: 'PC-12 tidak dapat berkomunikasi dengan host lain pada jaringan lokal.',
                    analysis: 'Konfigurasi PC-12 perlu dibandingkan dengan konfigurasi host lain dalam satu LAN.',
                    solution: 'Samakan konfigurasi PC-12 dengan segmen jaringan laboratorium.',
                },
                {
                    id: 'ip',
                    title: 'IP PC-12 adalah 192.168.2.20, sedangkan host lain memakai 192.168.1.x.',
                    x: '39%',
                    y: '55%',
                    icon: 'queue',
                    problem: 'Alamat IP PC-12 berada pada segmen yang berbeda dari host lain.',
                    analysis: 'Dengan subnet mask 255.255.255.0, 192.168.2.20 berada pada jaringan 192.168.2.0, bukan 192.168.1.0.',
                    solution: 'Ubah alamat IP PC-12 menjadi 192.168.1.x yang belum digunakan.',
                },
                {
                    id: 'gateway',
                    title: 'Gateway PC-12 berada pada segmen yang berbeda.',
                    x: '81%',
                    y: '55%',
                    icon: 'lost',
                    problem: 'Default gateway PC-12 tidak sesuai dengan gateway jaringan laboratorium.',
                    analysis: 'PC-12 menggunakan gateway 192.168.2.1, sedangkan host lain menggunakan 192.168.1.1.',
                    solution: 'Atur default gateway PC-12 menjadi 192.168.1.1.',
                },
            ]}
        />
    );
}
