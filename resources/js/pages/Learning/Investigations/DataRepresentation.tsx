import InvestigationSlide from '@/components/InvestigationSlide';

export default function DataRepresentation() {
    return (
        <InvestigationSlide
            storageKey="data-representation-completed"
            slideNumber={8}
            title="Representasi Data"
            description="Peserta didik memahami bagaimana data perpustakaan direpresentasikan ke dalam bentuk digital agar mudah dibaca dan dikelola."
            image="/images/library.png"
            note="Representasi data membantu informasi ditampilkan secara terstruktur dan mudah dipahami."
            hotspots={[
                {
                    id: 'book-id',

                    title: 'ID Buku',

                    icon: 'search',

                    x: '22%',
                    y: '35%',

                    problem: 'Buku sulit dibedakan jika tidak memiliki identitas khusus.',

                    analysis: 'Sistem membutuhkan kode unik agar setiap buku dapat dikenali.',

                    solution: 'Gunakan ID atau barcode untuk setiap buku.',
                },

                {
                    id: 'category',

                    title: 'Kategori Buku',

                    icon: 'queue',

                    x: '52%',
                    y: '55%',

                    problem: 'Buku bercampur tanpa pengelompokan sehingga sulit dicari.',

                    analysis: 'Data perlu dikategorikan agar pencarian lebih cepat.',

                    solution: 'Kelompokkan buku berdasarkan kategori atau genre.',
                },

                {
                    id: 'status',

                    title: 'Status Peminjaman',

                    icon: 'lost',

                    x: '78%',
                    y: '30%',

                    problem: 'Petugas kesulitan mengetahui apakah buku sedang dipinjam atau tersedia.',

                    analysis: 'Status buku harus diperbarui secara realtime.',

                    solution: 'Gunakan indikator status tersedia/dipinjam pada sistem.',
                },
            ]}
        />
    );
}
