import InvestigationSlide from '@/components/InvestigationSlide';

export default function Algorithm() {
    return (
        <InvestigationSlide
            storageKey="ip-addressing-completed"
            slideNumber={7}
            title="IP Addressing"
            description="Identifikasi masalah konfigurasi IP Address."
            image="/images/ip-addressing-topology.png"
            note="IP conflict menyebabkan koneksi jaringan terganggu."
            hotspots={[
                {
                    id: 'ip',
                    title: 'IP Address',
                    x: '12%',
                    y: '22%',
                    icon: 'search',
                    problem: 'Terdapat IP yang berbeda subnet.',
                    analysis: 'PC-03 menggunakan 192.168.2.15.',
                    solution: 'Ubah menjadi 192.168.1.x.',
                },
                {
                    id: 'mask',
                    title: 'Subnet Mask',
                    x: '38%',
                    y: '30%',
                    icon: 'queue',
                    problem: 'Periksa subnet mask.',
                    analysis: 'Subnet harus konsisten.',
                    solution: 'Gunakan 255.255.255.0.',
                },
                {
                    id: 'gateway',
                    title: 'Default Gateway',
                    x: '68%',
                    y: '22%',
                    icon: 'lost',
                    problem: 'Gateway tidak sesuai.',
                    analysis: 'Gateway berbeda dengan host lain.',
                    solution: 'Gunakan 192.168.1.1.',
                },
            ]}
        />
    );
}
