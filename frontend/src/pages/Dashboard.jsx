import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt, FaNetworkWired } from 'react-icons/fa';

const Dashboard = () => {
    const { logout, user } = useContext(AuthContext);

    // Existing State Logic
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentContact, setCurrentContact] = useState(null);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('/api/contacts');
            setContacts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch contacts');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const addContact = async (contactData) => {
        try {
            if (currentContact) {
                const response = await axios.put(`/api/contacts/${currentContact._id}`, contactData);
                setContacts(contacts.map(c => c._id === currentContact._id ? response.data : c));
                setCurrentContact(null);
            } else {
                const response = await axios.post('/api/contacts', contactData);
                setContacts([response.data, ...contacts]);
            }
        } catch (err) {
            alert("Error saving contact: " + (err.response?.data?.message || err.message));
        }
    };

    const deleteContact = async (id) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;
        try {
            await axios.delete(`/api/contacts/${id}`);
            setContacts(contacts.filter(c => c._id !== id));
        } catch (err) {
            alert("Error deleting contact");
        }
    };

    const editContact = (contact) => {
        setCurrentContact(contact);
    };

    return (
        <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto flex flex-col justify-center">
            {/* Dashboard Header */}
            <header className="mb-10 flex flex-col md:flex-row justify-between items-center bg-white/5 p-6 rounded-2xl glass-panel border-l-4 border-pink-500">
                <div>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200">
                        Dashboard
                    </h1>
                    <p className="text-gray-400">Welcome, <span className="text-pink-400 font-medium">John Doe</span></p>
                </div>
                <button onClick={logout} className="mt-4 md:mt-0 px-6 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-xl transition-all flex items-center gap-2 font-medium">
                    <FaSignOutAlt /> Sign Out
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 order-2 lg:order-1">
                    <ContactForm
                        onAddContact={addContact}
                        currentContact={currentContact}
                        onCancelEdit={() => setCurrentContact(null)}
                    />
                </div>
                <div className="lg:col-span-2 order-1 lg:order-2">
                    <div className="glass-panel rounded-2xl p-6 h-full min-h-[400px] border-t border-white/10 relative overflow-hidden">

                        <div className="flex justify-between items-center mb-6 border-b border-gray-700/50 pb-4 relative z-10">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <FaNetworkWired className="text-yellow-400" /> Your Network
                            </h2>
                            <span className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 px-4 py-1.5 rounded-full text-sm font-medium border border-pink-500/20">
                                {contacts.length} Connections
                            </span>
                        </div>

                        <div className="relative z-10">
                            {loading ? (
                                <p className="text-center text-gray-400 mt-10 animate-pulse">Loading contacts...</p>
                            ) : error ? (
                                <p className="text-center text-red-400 mt-10 border border-red-500/30 bg-red-500/10 p-4 rounded-lg">{error}</p>
                            ) : (
                                <ContactList
                                    contacts={contacts}
                                    onDeleteContact={deleteContact}
                                    onEditContact={editContact}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
