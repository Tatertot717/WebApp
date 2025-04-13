'use client'
import React, { useState } from 'react';
import Options from '../Options';
import Navbar from '../Navbar';

const CreatePage = () => {
    const [pollTitle, setPollTitle] = useState('');
    const [options, setOptions] = useState<string[]>(['', '']);
    const [allowMultiple, setAllowMultiple] = useState(false);
    const [requireLogin, setRequireLogin] = useState(false);

    const handleOptionsChange = (values: string[]) => {
        setOptions(values);
    };

    const handleAddOption = () => {
        setOptions(prev => [...prev, '']);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const pollData = {
            polltitle: pollTitle.trim(),
            options: options.filter(opt => opt.trim() !== ''),
            allowmultiple: allowMultiple,
            requirelogin: requireLogin,
        };

        console.log('Poll JSON:', pollData);
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Navbar />
            <div className="flex justify-center items-center py-10 text-black">
                <div className="w-full max-w-md bg-white p-8 rounded shadow">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Create A Poll</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={pollTitle}
                            onChange={(e) => setPollTitle(e.target.value)}
                            placeholder="Enter poll question here"
                            className="w-full p-3 bg-gray-200 rounded focus:outline-none shadow-lg"
                        />
                        
                        <Options count={options.length} onChange={handleOptionsChange} />

                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={handleAddOption}
                                className="w-10 h-10 rounded-full bg-black text-white text-2xl flex items-center justify-center hover:scale-110 transition"
                            >
                                +
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="multichoice"
                                checked={allowMultiple}
                                onChange={(e) => setAllowMultiple(e.target.checked)}
                                className="h-4 w-4"
                            />
                            <label htmlFor="multichoice" className="text-sm">Allow multiple choices</label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="loginreq"
                                checked={requireLogin}
                                onChange={(e) => setRequireLogin(e.target.checked)}
                                className="h-4 w-4"
                            />
                            <label htmlFor="loginreq" className="text-sm">Require login to vote</label>
                        </div>

                        <input
                            type="submit"
                            value="Create Poll"
                            className="w-full py-3 bg-gray-300 text-gray-700 rounded text-lg cursor-pointer hover:bg-gray-400 transition shadow"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;