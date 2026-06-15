import ProgressBar from '../UI/ProgressBar';
import Navbar from './Navbar';

export default function LearningLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {' '}
            <Navbar />{' '}
            <main className="mx-auto max-w-7xl px-6 py-6">
                {' '}
                <ProgressBar /> <div className="mt-8"> {children} </div>{' '}
            </main>{' '}
        </div>
    );
}
