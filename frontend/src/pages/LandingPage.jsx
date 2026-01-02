import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen text-white relative overflow-x-hidden pb-24">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/30 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-yellow-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-green-500/20 rounded-full blur-[100px] animate-pulse delay-2000"></div>
            </div>

            <nav className="relative z-10 flex justify-between items-center p-8 max-w-7xl mx-auto">
                <div className="text-2xl font-bold font-outfit tracking-tighter">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Contact</span>
                    <span className="text-white"> Manager</span>
                </div>
                <div className="space-x-4">
                    <Link to="/login" className="px-5 py-2 rounded-lg text-sm font-medium hover:text-white text-gray-300 transition-colors">Log In</Link>
                    <Link to="/register" className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white text-sm font-medium transition-all shadow-lg shadow-pink-500/30">Get Started</Link>
                </div>
            </nav>

            <main className="relative z-10 flex flex-col items-center justify-center text-center mt-20 px-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-medium text-yellow-300 mb-6 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    ✨ Contact Management Web App
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1] mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                        Organize.
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                        Connect.
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                        Succeed.
                    </span>
                </h1>

                <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
                    Efficiently store and manage your personal network.
                    Create, read, update, and delete contacts with ease.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/register" className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-lg transition-all shadow-xl shadow-pink-600/30 transform hover:-translate-y-1">
                        Create Account
                    </Link>
                    <Link to="/login" className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-lg transition-all backdrop-blur-lg">
                        Login
                    </Link>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-6xl w-full">
                    <div className="glass-panel p-8 rounded-2xl text-left border-t border-white/10 hover:border-pink-500/30 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center text-2xl mb-4 text-pink-400">🔒</div>
                        <h3 className="text-xl font-bold mb-2 text-pink-100">Bank-Grade Security</h3>
                        <p className="text-gray-400">Encrypted and protected.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-2xl text-left border-t border-white/10 hover:border-yellow-500/30 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center text-2xl mb-4 text-yellow-400">⚡</div>
                        <h3 className="text-xl font-bold mb-2 text-yellow-100">Lightning Fast</h3>
                        <p className="text-gray-400">Instant updates & interactions.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-2xl text-left border-t border-white/10 hover:border-green-500/30 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center text-2xl mb-4 text-green-400">🎨</div>
                        <h3 className="text-xl font-bold mb-2 text-green-100">Vibrant UI</h3>
                        <p className="text-gray-400">Colorful interface that pops.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
