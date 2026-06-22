import InvestigationSlide from '@/components/InvestigationSlide';

export default function DataProcessing() {
    return (
        <InvestigationSlide
            storageKey="data-processing-completed"
            slideNumber={9}
            title="Troubleshooting Jaringan dengan Ping Test"
            description="Gunakan hasil pengujian ping untuk menentukan lokasi gangguan jaringan secara sistematis."
            image="/images/library.png"
            note="Pola 'ping gateway berhasil tetapi ping internet gagal' menunjukkan bahwa jaringan lokal masih berfungsi, namun terdapat gangguan pada koneksi menuju internet."
            hotspots={[
                {
                    id: 'gateway',

                    title: 'Ping Gateway',

                    icon: 'search',

                    x: '28%',
                    y: '35%',

                    problem: 'Perlu memastikan apakah komputer masih dapat berkomunikasi dengan perangkat jaringan lokal.',

                    analysis:
                        'Hasil ping ke gateway (192.168.1.1) berhasil dengan Reply dari host tujuan. Hal ini menunjukkan koneksi LAN masih berfungsi dengan baik.',

                    solution: 'Lanjutkan pengujian ke internet untuk menentukan apakah gangguan berada pada jaringan lokal atau koneksi keluar.',
                },

                {
                    id: 'internet',

                    title: 'Ping 8.8.8.8',

                    icon: 'queue',

                    x: '55%',
                    y: '55%',

                    problem: 'Komputer masih belum dapat mengakses internet meskipun terhubung ke LAN.',

                    analysis: 'Hasil ping ke 8.8.8.8 mengalami Request Timed Out (RTO) sehingga paket tidak berhasil mencapai jaringan internet.',

                    solution: 'Periksa koneksi internet, gateway upstream, atau konfigurasi routing pada router.',
                },

                {
                    id: 'nic',

                    title: 'Indikator NIC & Switch',

                    icon: 'lost',

                    x: '80%',
                    y: '25%',

                    problem: 'Perlu memastikan apakah terdapat gangguan fisik pada koneksi jaringan.',

                    analysis: 'Lampu indikator pada NIC dan switch menyala serta berkedip normal sehingga koneksi fisik masih aktif.',

                    solution: 'Fokuskan pemeriksaan pada konfigurasi jaringan atau koneksi internet, bukan pada kabel atau port jaringan.',
                },
            ]}
        />
    );
}
