import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [guests, setGuests] = useState([]);
    const [error, setError] = useState('');

    const ADMIN_PASSWORD = 'M@8400';

    useEffect(() => {
        // Load guests from localStorage
        const savedGuests = JSON.parse(localStorage.getItem('wedding_guests') || '[]');
        setGuests(savedGuests);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Senha incorreta. Tente novamente.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-accent flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-white p-10 rounded-sm shadow-xl border-t-8 border-primary text-center"
                >
                    <h2 className="text-secondary font-serif text-3xl mb-8 uppercase tracking-widest">Acesso Restrito</h2>
                    <p className="text-secondary/60 text-xs mb-8 uppercase tracking-[.2em]">Área exclusiva para os noivos</p>
                    
                    <form onSubmit={handleLogin} className="space-y-6">
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite a senha"
                            className="w-full bg-transparent border-b border-primary/30 py-3 focus:border-primary outline-none text-center text-secondary font-sans transition-all"
                        />
                        {error && <p className="text-red-400 text-[10px] italic">{error}</p>}
                        <button 
                            type="submit"
                            className="w-full py-4 bg-secondary text-accent text-xs tracking-widest uppercase font-bold hover:bg-primary transition-all duration-500 rounded-sm"
                        >
                            Entrar
                        </button>
                    </form>
                    <a href="/" className="inline-block mt-8 text-[10px] text-secondary/40 uppercase tracking-widest hover:text-primary transition-all underline decoration-primary/20">Voltar para o convite</a>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-accent p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-primary text-4xl font-serif">Lista de Convidados</h1>
                        <p className="text-secondary/50 text-xs uppercase tracking-widest mt-2">{guests.length} Confirmações totais</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="px-6 py-2 border border-secondary/20 text-secondary/40 text-[10px] uppercase tracking-widest hover:bg-secondary/5 transition-all"
                    >
                        Sair
                    </button>
                </div>

                <div className="bg-white shadow-sm overflow-hidden rounded-sm border border-primary/10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-sans text-sm">
                            <thead className="bg-primary/5 text-secondary/60 text-[10px] uppercase tracking-widest font-semibold border-b border-primary/10">
                                <tr>
                                    <th className="px-6 py-4">Convidado</th>
                                    <th className="px-6 py-4">Acompanhantes</th>
                                    <th className="px-6 py-4">Nomes</th>
                                    <th className="px-6 py-4 text-center">Festa?</th>
                                    <th className="px-6 py-4 text-center">Álcool?</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {guests.length > 0 ? guests.map((guest, idx) => (
                                    <motion.tr 
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-primary/5 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-semibold text-secondary">{guest.name}</td>
                                        <td className="px-6 py-4 text-secondary/70">{guest.guests}</td>
                                        <td className="px-6 py-4 text-secondary/70 italic text-xs">{guest.companionNames || '-'}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-[10px] ${guest.willAttendParty ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {guest.willAttendParty ? 'Sim' : 'Não'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-[10px] ${guest.willDrinkAlcohol ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {guest.willDrinkAlcohol ? 'Sim' : 'Não'}
                                            </span>
                                        </td>
                                    </motion.tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-secondary/40 italic font-serif text-lg">Nenhuma confirmação ainda...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white p-6 border border-primary/10 rounded-sm">
                        <p className="text-[10px] uppercase tracking-widest text-secondary/50 mb-2">Total de Pessoas</p>
                        <p className="text-3xl font-serif text-primary">
                            {guests.reduce((sum, g) => sum + 1 + Number(g.guests), 0)}
                        </p>
                    </div>
                    <div className="bg-white p-6 border border-primary/10 rounded-sm">
                        <p className="text-[10px] uppercase tracking-widest text-secondary/50 mb-2">Vão Beber</p>
                        <p className="text-3xl font-serif text-primary">
                            {guests.filter(g => g.willDrinkAlcohol).length}
                        </p>
                    </div>
                    <div className="bg-white p-6 border border-primary/10 rounded-sm">
                        <p className="text-[10px] uppercase tracking-widest text-secondary/50 mb-2">Na Recepção</p>
                        <p className="text-3xl font-serif text-primary">
                            {guests.filter(g => g.willAttendParty).length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
