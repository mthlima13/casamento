import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
    // Dados Mockados para demonstração inicial
    const [stats, setStats] = useState({ total_convites: 0, confirmados: 0, recusados: 0, total_pessoas: 0 });
    const [convidados, setConvidados] = useState([]);

    useEffect(() => {
        // Simulação de carregamento de dados (Futuro: Buscar via API)
        const mockData = [
            { id: 1, nome: "João Silva", acompanhantes: 2, status: "CONFIRMADO" },
            { id: 2, nome: "Maria Oliveira", acompanhantes: 0, status: "CONFIRMADO" },
            { id: 3, nome: "Carlos Souza", acompanhantes: 1, status: "RECUSADO" },
            { id: 4, nome: "Ana Costa", acompanhantes: 3, status: "CONFIRMADO" }
        ];
        
        setConvidados(mockData);
        
        const confirmados = mockData.filter(c => c.status === "CONFIRMADO");
        setStats({
            total_convites: mockData.length,
            confirmados: confirmados.length,
            recusados: mockData.length - confirmados.length,
            total_pessoas: confirmados.reduce((sum, c) => sum + 1 + c.acompanhantes, 0)
        });
    }, []);

    return (
        <div className="admin-dashboard fade-in" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem' }}>Painel do Noivo</h1>
                    <p style={{ opacity: 0.6 }}>Acompanhamento em tempo real da lista de convidados.</p>
                </div>
                <Link to="/" className="btn-primary" style={{ padding: '12px 25px', background: 'transparent', color: '#333', border: '1px solid #ddd' }}>Ver Convite</Link>
            </header>

            {/* KPIs */}
            <div className="stats-grid" style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px'
            }}>
                <StatCard label="Pessoas Confirmadas" value={stats.total_pessoas} icon="👥" color="#d9a7ac" />
                <StatCard label="Confirmados" value={stats.confirmados} icon="✅" />
                <StatCard label="Recusados" value={stats.recusados} icon="❌" />
                <StatCard label="Total de Respostas" value={stats.total_convites} icon="📩" />
            </div>

            {/* Tabela de Convidados */}
            <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ marginBottom: '30px' }}>Lista de Presença</h3>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '15px' }}>Convidado</th>
                            <th style={{ padding: '15px' }}>Acompanhantes</th>
                            <th style={{ padding: '15px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {convidados.map(c => (
                            <tr key={c.id} style={{ borderBottom: '1px solid #fafafa' }}>
                                <td style={{ padding: '15px', fontWeight: 600 }}>{c.nome}</td>
                                <td style={{ padding: '15px' }}>{c.acompanhantes}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{
                                        padding: '5px 12px', borderRadius: '50px', fontSize: '0.8rem',
                                        background: c.status === 'CONFIRMADO' ? '#e6fffa' : '#fff5f5',
                                        color: c.status === 'CONFIRMADO' ? '#2c7a7b' : '#c53030'
                                    }}>{c.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color }) {
    return (
        <div className="glass" style={{
            padding: '30px', borderRadius: 'var(--radius-lg)', textAlign: 'center',
            borderLeft: color ? `6px solid ${color}` : 'none'
        }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{icon}</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '5px' }}>{value}</h2>
            <p style={{ opacity: 0.6, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</p>
        </div>
    );
}
