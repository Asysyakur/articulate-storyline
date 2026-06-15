import InvestigationSlide from '@/components/InvestigationSlide';

export default function Algorithm() {
    return (
        <InvestigationSlide
            slideNumber={7}
            title="Algoritma"
            description="Peserta didik memahami bagaimana langkah-langkah terstruktur digunakan untuk menyelesaikan proses peminjaman buku."
            image="/images/library.png"
            note="Algoritma adalah urutan langkah yang sistematis untuk menyelesaikan suatu masalah."
            hotspots={[
                {
                    id: 'input',

                    title: 'Input Data Buku',

                    icon: 'search',

                    x: '18%',
                    y: '68%',

                    problem: 'Petugas harus memasukkan data buku dan data peminjam.',

                    analysis: 'Sistem membutuhkan data awal agar proses peminjaman dapat berjalan.',

                    solution: 'Gunakan form digital untuk memasukkan data secara otomatis.',
                },

                {
                    id: 'process',

                    title: 'Proses Peminjaman',

                    icon: 'queue',

                    x: '50%',
                    y: '40%',

                    problem: 'Proses pencatatan dilakukan satu per satu sehingga memakan waktu.',

                    analysis: 'Tanpa alur yang jelas, proses menjadi lambat dan tidak efisien.',

                    solution: 'Gunakan algoritma terstruktur untuk mempercepat proses peminjaman.',
                },

                {
                    id: 'output',

                    title: 'Output Informasi',

                    icon: 'lost',

                    x: '78%',
                    y: '62%',

                    problem: 'Siswa kesulitan mengetahui status peminjaman buku.',

                    analysis: 'Informasi hasil peminjaman tidak tersampaikan dengan baik.',

                    solution: 'Tampilkan status peminjaman secara otomatis pada sistem.',
                },
            ]}
        />
    );
}
