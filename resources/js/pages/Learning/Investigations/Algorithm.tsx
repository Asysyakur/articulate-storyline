import InvestigationSlide from '@/components/InvestigationSlide';

export default function Algorithm() {
    return (
        <InvestigationSlide
            storageKey="algorithm-completed"
            slideNumber={12}
            title="Pengalamatan IP"
            description="Identifikasi masalah konfigurasi alamat IP."
            image="/images/konfigurasi-ip.png"
            note="Konflik alamat IP menyebabkan koneksi jaringan terganggu."
            hotspots={[
                {
                    id: 'ip',
                    title: 'Alamat IP',
                    x: '2%',
                    y: '50%',
                    icon: 'search',
                    problem: 'Terdapat IP yang berbeda subnet.',
                    analysis: 'PC-04 menggunakan 192.168.2.25.',
                    solution: 'Ubah menjadi 192.168.1.x.',
                },
                {
                    id: 'mask',
                    title: 'Subnet Mask',
                    x: '60%',
                    y: '5%',
                    icon: 'queue',
                    problem: 'Periksa subnet mask.',
                    analysis: 'Subnet harus konsisten.',
                    solution: 'Gunakan 255.255.255.0.',
                },
                {
                    id: 'gateway',
                    title: 'Default Gateway',
                    x: '60%',
                    y: '20%',
                    icon: 'lost',
                    problem: 'Gateway tidak sesuai.',
                    analysis: 'Gateway berbeda dengan host lain.',
                    solution: 'Gunakan 192.168.1.1.',
                },
            ]}
        />
    );
}
