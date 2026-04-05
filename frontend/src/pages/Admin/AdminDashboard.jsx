import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export default function AdminDashboard() {
    // Dados Mockados para demonstração inicial
    const [stats, setStats] = useState({ total_convites: 0, confirmados: 0, recusados: 0, total_pessoas: 0 });
    const [convidados, setConvidados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nomeNovo, setNomeNovo] = useState("");
    const [vagasNovo, setVagasNovo] = useState(2);

    const fetchDashboard = async () => {
        try {
            const response = await api.get('/admin/dashboard');
            const data = response.data;
            setStats({
                total_convites: data.totalConvites,
                confirmados: data.confirmados,
                recusados: data.recusados,
                total_pessoas: data.totalPessoas
            });
            setConvidados(data.convidados || []);
        } catch (error) {
            console.error("Erro ao carregar dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const handleAddGuest = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/convidados', { nome: nomeNovo, acompanhantesPermitidos: vagasNovo });
            setNomeNovo("");
            setVagasNovo(2);
            fetchDashboard();
            alert("Convidado adicionado com sucesso!");
        } catch (error) {
            alert("Erro ao adicionar convidado.");
        }
    };

    const copyLink = (token) => {
        const url = `${window.location.origin}/c/${token}`;
        navigator.clipboard.writeText(url);
        alert("Link copiado: " + url);
    };

    if (loading) return (
        <div style={{ textAlign: "center", padding: "100px" }}>
            <h2 className="fade-in">Carregando painel...</h2>
        </div>
    );

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

            {/* Cadastro de Novo Convidado */}
            <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
                <h3 style={{ marginBottom: '20px' }}>Cadastrar Novo Convidado</h3>
                <form onSubmit={handleAddGuest} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <input 
                        type="text" placeholder="Nome do Convidado" required
                        value={nomeNovo} onChange={e => setNomeNovo(e.target.value)}
                        style={{ flex: 2, padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                    <input 
                        type="number" placeholder="Vagas" min="1"
                        value={vagasNovo} onChange={e => setVagasNovo(e.target.value)}
                        style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                    <button type="submit" className="btn-primary" style={{ flex: 1 }}>Adicionar</button>
                </form>
            </div>

            {/* Tabela de Convidados */}
            <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ marginBottom: '30px' }}>Lista de Presença</h3>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <th style={{ padding: '15px' }}>Convidado</th>
                            <th style={{ padding: '15px' }}>Status</th>
                            <th style={{ padding: '15px' }}>Presença / Álcool</th>
                            <th style={{ padding: '15px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {convidados.map(c => (
                            <tr key={c.id} style={{ borderBottom: '1px solid #fafafa' }}>
                                <td style={{ padding: '15px' }}>
                                    <div style={{ fontWeight: 600 }}>{c.nome}</div>
                                    {c.nomesConfirmados && c.nomesConfirmados.length > 0 && (
                                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                                            {c.nomesConfirmados.join(', ')}
                                        </div>
                                    )}
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{
                                        padding: '5px 12px', borderRadius: '50px', fontSize: '0.8rem',
                                        background: c.status === 'CONFIRMADO' ? '#e6fffa' : c.status === 'RECUSADO' ? '#fff5f5' : '#f0f0f0',
                                        color: c.status === 'CONFIRMADO' ? '#2c7a7b' : c.status === 'RECUSADO' ? '#c53030' : '#666'
                                    }}>{c.status}</span>
                                </td>
                                <td style={{ padding: '15px', fontSize: '0.9rem' }}>
                                    {c.status === 'CONFIRMADO' ? (
                                        <>
                                            <div>Festa: {c.participaraDaFesta ? '✅' : '❌'}</div>
                                            <div>Álcool: {c.consomeAlcool ? '🍺' : '🥤'}</div>
                                        </>
                                    ) : '--'}
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <button onClick={() => copyLink(c.tokenAcesso)} style={{
                                        background: '#f8f9fa', border: '1px solid #ddd', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer'
                                    }}>Copiar Link</button>
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
