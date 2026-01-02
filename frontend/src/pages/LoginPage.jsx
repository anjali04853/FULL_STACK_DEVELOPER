import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginPage = () => {
    const { login } = useContext(AuthContext);

    // Hardcoded default credentials for easier access
    const [formData, setFormData] = useState({
        email: 'user@example.com',
        password: 'password123'
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
        // Force redirect if token exists (Fail-safe)
        if (localStorage.getItem('token')) {
            window.location.href = '/dashboard';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Elements - Colorful Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-yellow-500/10 rounded-full blur-[100px] animate-pulse delay-2000"></div>

            <div className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-md relative z-10 shadow-2xl border border-white/10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to your address book</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-2 pl-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaEnvelope className="text-pink-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-11 pr-5 py-3 rounded-xl glass-input focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all placeholder-gray-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-2 pl-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaLock className="text-indigo-400" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-11 pr-5 py-3 rounded-xl glass-input focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder-gray-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-lg shadow-lg shadow-pink-600/30 transition-all transform hover:-translate-y-0.5 mt-2">
                        Sign In
                    </button>
                </form>

                <p className="text-center mt-8 text-gray-400">
                    Don't have an account? <Link to="/register" className="text-pink-400 hover:text-pink-300 font-medium ml-1">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
