import { Link } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="border-b border-slate-800 bg-slate-900">
            {' '}
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {' '}
                <div className="flex items-center gap-2">
                    {' '}
                    <BookOpen className="text-cyan-400" /> <h1 className="text-lg font-bold"> Digital Library Learning </h1>{' '}
                </div>{' '}
                <div className="flex items-center gap-4 text-sm">
                    {' '}
                    <Link href="/">Home</Link> <Link href="/investigation"> Materi </Link> <Link href="/evaluation"> Evaluasi </Link>{' '}
                </div>{' '}
            </div>{' '}
        </nav>
    );
}
