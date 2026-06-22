export const evaluationQuestions = [
    {
        id: 1,
        question:
            'Di lab, PC-A berhasil ping ke gateway (192.168.1.1) tetapi gagal ping ke 8.8.8.8. Kesimpulan paling tepat adalah…',
        options: [
            'Kartu jaringan PC-A rusak total.',
            'Kabel UTP PC-A putus.',
            'Gangguan ada pada jalur ke luar jaringan (gateway/DNS ke internet), bukan pada LAN.',
            'IP address PC-A pasti kosong.',
        ],
        answer: 'Gangguan ada pada jalur ke luar jaringan (gateway/DNS ke internet), bukan pada LAN.',
        explanation: 'Jika ping ke gateway berhasil tetapi ke internet gagal, masalah kemungkinan ada pada jalur keluar, bukan koneksi LAN lokal.',
        points: 20,
    },
    {
        id: 2,
        question: 'Dua PC pada lab memiliki IP address yang sama persis: 192.168.1.10. Gejala yang paling mungkin terjadi adalah…',
        options: [
            'Kedua PC tidak dapat dinyalakan.',
            'Terjadi IP conflict sehingga koneksi salah satu atau kedua PC terganggu.',
            'Kecepatan internet kedua PC meningkat.',
            'Printer jaringan otomatis terdeteksi.',
        ],
        answer: 'Terjadi IP conflict sehingga koneksi salah satu atau kedua PC terganggu.',
        explanation: 'IP yang sama pada dua perangkat memicu konflik alamat sehingga koneksi jaringan menjadi tidak stabil.',
        points: 20,
    },
    {
        id: 3,
        question: 'Seorang teknisi berkata, “Me-restart semua PC pasti menyelesaikan seluruh masalah jaringan.” Penilaian paling kritis terhadap pernyataan itu adalah…',
        options: [
            'Benar, restart selalu menyelesaikan semua masalah.',
            'Pernyataan terlalu menggeneralisasi; restart hanya membantu sebagian kasus dan tidak memperbaiki salah konfigurasi IP/gateway.',
            'Restart pasti memperburuk semua masalah.',
            'Restart tidak ada hubungannya dengan jaringan.',
        ],
        answer: 'Pernyataan terlalu menggeneralisasi; restart hanya membantu sebagian kasus dan tidak memperbaiki salah konfigurasi IP/gateway.',
        explanation: 'Restart bukan solusi universal; analisis harus melihat akar masalah seperti konfigurasi IP, gateway, atau DNS.',
        points: 20,
    },
    {
        id: 4,
        question: 'Saat mendiagnosis PC yang tidak terhubung internet, urutan pemeriksaan yang paling logis adalah…',
        options: [
            'Ganti motherboard → cek kabel → cek IP.',
            'Cek koneksi fisik (kabel/lampu) → cek konfigurasi IP/gateway/DNS → uji ping.',
            'Langsung instal ulang sistem operasi.',
            'Langsung membeli router baru.',
        ],
        answer: 'Cek koneksi fisik (kabel/lampu) → cek konfigurasi IP/gateway/DNS → uji ping.',
        explanation: 'Pemeriksaan dimulai dari hal fisik, lalu konfigurasi logis, kemudian pengujian konektivitas.',
        points: 20,
    },
    {
        id: 5,
        question: 'Lab memilih topologi star. Asumsi yang mendasari keunggulan topologi star adalah…',
        options: [
            'Tidak membutuhkan perangkat pusat apa pun.',
            'Jika satu kabel client bermasalah, hanya PC itu yang terganggu sedangkan yang lain tetap berjalan.',
            'Semua PC berbagi satu kabel tunggal secara berurutan.',
            'Tidak memerlukan switch maupun hub.',
        ],
        answer: 'Jika satu kabel client bermasalah, hanya PC itu yang terganggu sedangkan yang lain tetap berjalan.',
        explanation: 'Pada topologi star, tiap client terhubung ke perangkat pusat sehingga gangguan pada satu kabel biasanya tidak memutus seluruh jaringan.',
        points: 20,
    },
];
