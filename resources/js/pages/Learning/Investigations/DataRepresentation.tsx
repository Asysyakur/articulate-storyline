import InvestigationSlide from '@/components/InvestigationSlide';

export default function DataRepresentation() {
    return (
        <InvestigationSlide
            storageKey="data-representation-completed"
            slideNumber={8}
            title="Gateway & DNS"
            description="Analisis konfigurasi jaringan untuk menemukan penyebab komputer tidak dapat mengakses internet meskipun masih terhubung ke jaringan lokal."
            image="/images/library.png"
            note="Jika komputer dapat terhubung ke LAN tetapi tidak dapat mengakses internet, kemungkinan masalah berada pada konfigurasi Default Gateway atau DNS."
            hotspots={[
                {
                    id: 'gateway',

                    title: 'Default Gateway',

                    icon: 'search',

                    x: '22%',
                    y: '35%',

                    problem: 'Komputer terhubung ke jaringan lokal namun tidak dapat mengakses internet.',

                    analysis:
                        'Kolom Default Gateway kosong atau menggunakan alamat yang salah sehingga paket data tidak memiliki jalur keluar menuju internet.',

                    solution: 'Atur Default Gateway sesuai alamat router, misalnya 192.168.1.1.',
                },

                {
                    id: 'dns',

                    title: 'DNS Server',

                    icon: 'queue',

                    x: '55%',
                    y: '42%',

                    problem: 'Website tidak dapat dibuka meskipun koneksi jaringan terlihat aktif.',

                    analysis:
                        'DNS Server tidak dikonfigurasi atau menggunakan alamat yang tidak valid sehingga nama domain tidak dapat diterjemahkan menjadi alamat IP.',

                    solution: 'Gunakan DNS yang valid, misalnya 8.8.8.8 atau DNS lokal yang tersedia.',
                },

                {
                    id: 'status',

                    title: 'LAN Connected, No Internet',

                    icon: 'lost',

                    x: '80%',
                    y: '25%',

                    problem: 'Status jaringan menunjukkan Connected tetapi internet tidak dapat diakses.',

                    analysis: 'Koneksi LAN berfungsi normal, namun gateway atau DNS bermasalah sehingga akses ke internet gagal.',

                    solution: 'Periksa konfigurasi gateway dan DNS kemudian lakukan pengujian konektivitas ulang.',
                },
            ]}
        />
    );
}
