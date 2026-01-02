import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaComment } from 'react-icons/fa';

const ContactForm = ({ onAddContact, currentContact, onCancelEdit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({});

    // Populate form when currentContact changes
    useEffect(() => {
        if (currentContact) {
            setFormData({
                name: currentContact.name,
                email: currentContact.email,
                phone: currentContact.phone,
                message: currentContact.message || ''
            });
        } else {
            setFormData({ name: '', email: '', phone: '', message: '' });
        }
    }, [currentContact]);

    const validate = (data) => {
        const newErrors = {};
        if (!data.name.trim()) newErrors.name = 'Name is required';
        if (!data.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Email is invalid';
        if (!data.phone.trim()) newErrors.phone = 'Phone is required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Real-time validation
        const updatedData = { ...formData, [name]: value };
        setFormData(updatedData);
    };

    // Check validity for disabling button
    const formErrors = validate(formData);
    const isValid = Object.keys(formErrors).length === 0 &&
        formData.name && formData.email && formData.phone;

    const handleSubmit = (e) => {
        e.preventDefault();

        // If invalid, show errors and stop
        if (!isValid) {
            setErrors(formErrors);
            return;
        }

        onAddContact(formData);
        if (!currentContact) {
            setFormData({ name: '', email: '', phone: '', message: '' });
        }
        setErrors({});
    };

    return (
        <div className="glass-panel p-8 rounded-2xl shadow-xl sticky top-8 border-t border-white/10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white tracking-wide">
                    {currentContact ? 'Edit Contact' : 'New Contact'}
                </h2>
                {currentContact && (
                    <button onClick={onCancelEdit} className="text-sm text-gray-400 hover:text-white transition-colors bg-white/10 px-3 py-1 rounded-md">
                        Cancel
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5 uppercase tracking-wider text-[11px]">Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaUser className="text-pink-400" />
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full pl-11 pr-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all ${errors.name ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : ''
                                }`}
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5 uppercase tracking-wider text-[11px]">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaEnvelope className="text-pink-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-11 pr-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all ${errors.email ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : ''
                                }`}
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5 uppercase tracking-wider text-[11px]">Phone Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaPhone className="text-pink-400" />
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-11 pr-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all ${errors.phone ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : ''
                                }`}
                            placeholder="123-456-7890"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5 uppercase tracking-wider text-[11px]">Message (Optional)</label>
                    <div className="relative">
                        <div className="absolute top-3.5 left-4 pointer-events-none">
                            <FaComment className="text-pink-400" />
                        </div>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="3"
                            className="w-full pl-11 pr-4 py-3 rounded-xl glass-input focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                            placeholder="Any notes..."
                        ></textarea>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!isValid}
                    className={`w-full py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 ${isValid
                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-600/20 hover:shadow-pink-600/40 transform hover:-translate-y-0.5'
                        : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {currentContact ? 'Update Contact' : 'Save Contact'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
