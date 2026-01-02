import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterPage = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: 'John Doe',
        email: 'user@example.com',
        password: 'password123'
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const [showModal, setShowModal] = useState(false);
    const [modalElement, setModalElement] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await register(formData);
        if (res && res.success) {
            navigate('/dashboard');
        } else {
            setModalElement(
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="relative bg-gray-900 border border-white/10 p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-bounce-in text-center">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Registration Failed</h3>
                        <p className="text-gray-300 mb-6">{res.error || 'User already exists'}</p>
                        <div className="w-full">
                            <Link
                                to="/login"
                                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full block"
                            >
                                Try Logging In
                            </Link>
                        </div>
                    </div>
                </div>
            );
            setShowModal(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {showModal && modalElement}
            {/* Background Elements - Colorful Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute top-[40%] right-[-10%] w-[30%] h-[30%] bg-pink-500/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[100px] animate-pulse delay-1500"></div>

            <div className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-md relative z-10 shadow-2xl border border-white/10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Create Account</h1>
                    <p className="text-gray-400">Start building your network</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-2 pl-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaUser className="text-purple-400" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-11 pr-5 py-3 rounded-xl glass-input focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-gray-500"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>
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
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-2 pl-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaLock className="text-green-400" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-11 pr-5 py-3 rounded-xl glass-input focus:ring-2 focus:ring-green-500 focus:outline-none transition-all placeholder-gray-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg shadow-lg shadow-purple-600/30 transition-all transform hover:-translate-y-0.5 mt-2">
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-8 text-gray-400">
                    Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium ml-1">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
