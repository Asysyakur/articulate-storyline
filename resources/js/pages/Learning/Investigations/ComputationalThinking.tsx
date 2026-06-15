import InvestigationSlide from '@/components/InvestigationSlide';
export default function ComputationalThinking() {
    return (
        <InvestigationSlide
            slideNumber={6}
            title="Berpikir Komputasional"
            description="Peserta didik menganalisis masalah pada sistem perpustakaan sekolah menggunakan konsep berpikir komputasional."
            image="/images/library.png"
            note="Berpikir komputasional membantu menyelesaikan masalah secara sistematis, logis, dan terstruktur."
            hotspots={[
                {
                    id: 'queue',
                    title: 'Antrean Panjang',
                    icon: 'queue',
                    x: '20%',
                    y: '65%',
                    problem: 'Proses peminjaman buku membutuhkan waktu lama karena pencatatan dilakukan secara manual.',
                    analysis: 'Masalah dapat dianalisis dengan mengidentifikasi proses yang paling memakan waktu.',
                    solution: 'Gunakan sistem pencatatan digital agar proses peminjaman lebih cepat.',
                },
                {
                    id: 'lost',
                    title: 'Data Mudah Hilang',
                    icon: 'lost',
                    x: '75%',
                    y: '35%',
                    problem: 'Data peminjaman disimpan di buku sehingga mudah rusak atau hilang.',
                    analysis: 'Penyimpanan manual membuat data sulit dikelola dan tidak aman.',
                    solution: 'Simpan data menggunakan database digital.',
                },
                {
                    id: 'search',
                    title: 'Pencarian Buku Lambat',
                    icon: 'search',
                    x: '55%',
                    y: '25%',
                    problem: 'Petugas harus mencari data buku satu per satu secara manual.',
                    analysis: 'Data belum tersusun secara terstruktur sehingga pencarian memakan waktu.',
                    solution: 'Gunakan fitur pencarian dan kategori buku digital.',
                },
            ]}
        />
    );
}
