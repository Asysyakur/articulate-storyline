import InvestigationSlide from '@/components/InvestigationSlide';

export default function DataProcessing() {
    return (
        <InvestigationSlide
            slideNumber={9}
            title="Pengolahan Data"
            description="Peserta didik memahami bagaimana sistem perpustakaan mengolah data agar informasi dapat digunakan dengan cepat dan akurat."

            image="/images/library.png"

            note="Pengolahan data membantu sekolah mendapatkan informasi penting secara otomatis dan efisien."

            hotspots={[
                {
                    id: 'search',

                    title: 'Pencarian Buku',

                    icon: 'search',

                    x: '28%',
                    y: '30%',

                    problem:
                        'Petugas membutuhkan waktu lama mencari buku tertentu.',

                    analysis:
                        'Pencarian manual membuat proses menjadi lambat.',

                    solution:
                        'Gunakan fitur search untuk menemukan buku secara cepat.',
                },

                {
                    id: 'sorting',

                    title: 'Pengurutan Data',

                    icon: 'queue',

                    x: '58%',
                    y: '50%',

                    problem:
                        'Data buku tidak tersusun sehingga sulit dibaca.',

                    analysis:
                        'Data perlu diurutkan berdasarkan kategori tertentu.',

                    solution:
                        'Urutkan data berdasarkan nama buku, kategori, atau tanggal.',
                },

                {
                    id: 'report',

                    title: 'Laporan Otomatis',

                    icon: 'lost',

                    x: '78%',
                    y: '25%',

                    problem:
                        'Pembuatan laporan perpustakaan memerlukan waktu lama.',

                    analysis:
                        'Petugas harus menghitung data secara manual.',

                    solution:
                        'Gunakan sistem otomatis untuk membuat laporan peminjaman.',
                },
            ]}
        />
    );
}