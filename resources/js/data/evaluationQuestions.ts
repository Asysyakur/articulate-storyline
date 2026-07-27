export const evaluationQuestions = [
    {
        id: 1,
        question:
            'Di laboratorium, PC-A berhasil melakukan ping ke gateway (192.168.1.1), tetapi gagal melakukan ping ke 8.8.8.8. Kesimpulan paling tepat adalah…',
        options: [
            'Gangguan berada pada kartu jaringan PC-A.',
            'Gangguan berada pada kabel UTP PC-A.',
            'Gangguan berada pada jalur ke luar jaringan (gateway/DNS ke internet), bukan pada LAN.',
            'Gangguan berada pada konfigurasi alamat IP PC-A.',
        ],
        answer: 'Gangguan berada pada jalur ke luar jaringan (gateway/DNS ke internet), bukan pada LAN.',
        explanation: 'Jika ping ke gateway berhasil tetapi ke internet gagal, masalah kemungkinan ada pada jalur keluar, bukan koneksi LAN lokal.',
        points: 20,
    },
    {
        id: 2,
        question: 'Dua PC pada laboratorium memiliki alamat IP yang sama persis: 192.168.1.10. Gejala yang paling mungkin terjadi adalah…',
        options: [
            'Koneksi salah satu atau kedua PC terganggu karena terjadi konflik alamat IP.',
            'Koneksi kedua PC tetap normal meskipun menggunakan alamat IP yang sama.',
            'Koneksi kedua PC menjadi lebih cepat karena alamat IP digunakan bersama.',
            'Koneksi kedua PC otomatis terhubung ke seluruh perangkat jaringan.',
        ],
        answer: 'Koneksi salah satu atau kedua PC terganggu karena terjadi konflik alamat IP.',
        explanation: 'Alamat IP yang sama pada dua perangkat memicu konflik alamat sehingga koneksi jaringan menjadi tidak stabil.',
        points: 20,
    },
    {
        id: 3,
        question: 'Seorang teknisi berkata, “Me-restart semua PC pasti menyelesaikan seluruh masalah jaringan.” Penilaian paling kritis terhadap pernyataan itu adalah…',
        options: [
            'Pernyataan terlalu menggeneralisasi karena restart tidak selalu menyelesaikan masalah jaringan.',
            'Pernyataan terlalu menggeneralisasi karena restart tidak memperbaiki kesalahan konfigurasi IP atau gateway.',
            'Pernyataan terlalu menggeneralisasi karena penyebab gangguan jaringan dapat berbeda-beda.',
            'Pernyataan terlalu menggeneralisasi karena setiap gangguan memerlukan diagnosis sebelum menentukan solusi.',
        ],
        answer: 'Pernyataan terlalu menggeneralisasi karena restart tidak memperbaiki kesalahan konfigurasi IP atau gateway.',
        explanation: 'Restart bukan solusi universal; analisis harus melihat akar masalah seperti konfigurasi IP, gateway, atau DNS.',
        points: 20,
    },
    {
        id: 4,
        question: 'Saat mendiagnosis PC yang tidak terhubung internet, urutan pemeriksaan yang paling logis adalah…',
        options: [
            'Periksa motherboard → periksa NIC → uji ping.',
            'Periksa koneksi fisik → periksa konfigurasi IP/gateway/DNS → uji ping',
            'Periksa sistem operasi → periksa konfigurasi jaringan → uji ping',
            'Periksa router → periksa konfigurasi router → uji ping',
        ],
        answer: 'Periksa koneksi fisik → periksa konfigurasi IP/gateway/DNS → uji ping',
        explanation: 'Pemeriksaan dimulai dari hal fisik, lalu konfigurasi logis, kemudian pengujian konektivitas.',
        points: 20,
    },
    {
        id: 5,
        question: 'Laboratorium memilih topologi star. Asumsi yang mendasari keunggulan topologi star adalah…',
        options: [
            'Pada topologi star, setiap PC terhubung tanpa perangkat pusat.',
            'Pada topologi star, setiap PC terhubung ke perangkat pusat sehingga gangguan pada satu kabel hanya memengaruhi PC tersebut.',
            'Pada topologi star, setiap PC berbagi satu kabel utama.',
            'Pada topologi star, setiap PC terhubung secara langsung tanpa switch atau hub.',
        ],
        answer: 'Pada topologi star, setiap PC terhubung ke perangkat pusat sehingga gangguan pada satu kabel hanya memengaruhi PC tersebut.',
        explanation: 'Pada topologi star, tiap klien terhubung ke perangkat pusat sehingga gangguan pada satu kabel biasanya tidak memutus seluruh jaringan.',
        points: 20,
    },
];
