import React from 'react';

const ContactList = ({ contacts, onDeleteContact, onEditContact }) => {
    if (contacts.length === 0) {
        return (
            <div className="text-center py-20 opacity-60">
                <div className="text-6xl mb-4">📇</div>
                <h3 className="text-xl font-medium text-white mb-1">No contacts found</h3>
                <p className="text-gray-400">Start by adding a new contact on the left.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {contacts.map((contact) => (
                <div key={contact._id} className="glass-panel p-5 rounded-xl hover:bg-white/5 transition-all group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {contact.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white leading-tight">{contact.name}</h3>
                                <span className="text-xs text-gray-500 font-mono">
                                    {new Date(contact.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="ml-14 space-y-1">
                            <p className="text-gray-400 flex items-center gap-2 text-sm hover:text-indigo-300 transition-colors">
                                <span className="opacity-50">✉</span> {contact.email}
                            </p>
                            <p className="text-gray-400 flex items-center gap-2 text-sm hover:text-indigo-300 transition-colors">
                                <span className="opacity-50">📞</span> {contact.phone}
                            </p>
                            {contact.message && (
                                <div className="mt-2 text-gray-400 text-xs italic bg-black/20 p-2 rounded-lg border border-white/5 mx-[-8px] px-3 break-all">
                                    "{contact.message}"
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                        <button
                            onClick={() => onEditContact(contact)}
                            className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white transition-all text-sm font-medium border border-indigo-500/30"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDeleteContact(contact._id)}
                            className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all text-sm font-medium border border-red-500/30"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactList;
