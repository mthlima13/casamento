import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { api } from "../../services/api";

export default function RsvpPage() {
    const { token, configs } = useOutletContext();
    const [status, setStatus] = useState("CONFIRMADO");
    const [acompanhantes, setAcompanhantes] = useState(0);
    const [nomes, setNomes] = useState([""]); // Começa com o nome do convidado principal
    const [festa, setFesta] = useState(true);
    const [alcool, setAlcool] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [sucesso, setSucesso] = useState(false);

    // Ajusta o array de nomes sempre que o número de acompanhantes mudar
    const handleAcompanhantesChange = (num) => {
        const novoNum = parseInt(num);
        setAcompanhantes(novoNum);
        
        const novosNomes = [...nomes];
        if (novosNomes.length < novoNum + 1) {
            // Adiciona espaços vazios
            for (let i = novosNomes.length; i < novoNum + 1; i++) {
                novosNomes.push("");
            }
        } else {
            // Remove os excessos
            novosNomes.splice(novoNum + 1);
        }
        setNomes(novosNomes);
    };

    const handleNomeChange = (index, valor) => {
        const novosNomes = [...nomes];
        novosNomes[index] = valor;
        setNomes(novosNomes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put(`/publico/rsvp/${token}`, { 
                status, 
                acompanhantes, 
                nomesConfirmados: nomes, 
                participaraDaFesta: festa, 
                consomeAlcool: alcool 
            });
            setSucesso(true);
        } catch (err) {
            console.error("Erro ao confirmar presença:", err);
            alert("Ocorreu um erro ao confirmar sua presença. Por favor, tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    if (sucesso) return (
        <div className="fade-in" style={{ padding: '100px 20px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3.5rem', color: 'hsl(var(--clr-accent))' }}>Obrigado!</h2>
            <p style={{ fontSize: '1.2rem', marginTop: '20px' }}>Sua presença foi confirmada com sucesso. Nos vemos lá!</p>
            <button onClick={() => setSucesso(false)} style={{
                marginTop: '40px', padding: '12px 30px', background: 'transparent',
                border: '1px solid hsl(var(--clr-accent))', borderRadius: '50px'
            }}>Voltar ao Convite</button>
        </div>
    );

    return (
        <section className="rsvp-page fade-in" style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', marginTop: '40px' }}>Confirmação</h2>
            <p style={{ marginBottom: '40px', opacity: 0.8 }}>Por favor, confirme sua presença para celebrarmos juntos!</p>

            <form onSubmit={handleSubmit} className="glass" style={{
                padding: '40px', borderRadius: 'var(--radius-lg)', textAlign: 'left',
                display: 'flex', flexDirection: 'column', gap: '30px'
            }}>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600 }}>Você poderá comparecer?</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ width: '100%', padding: '15px', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                    >
                        <option value="CONFIRMADO">Sim, com certeza!</option>
                        <option value="RECUSADO">Infelizmente não poderei ir</option>
                    </select>
                </div>

                {status === "CONFIRMADO" && (
                    <>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600 }}>Quantos acompanhantes trará?</label>
                            <input
                                type="number" min="0" max="10"
                                value={acompanhantes}
                                onChange={(e) => handleAcompanhantesChange(e.target.value)}
                                style={{ width: '100%', padding: '15px', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600 }}>Nome de cada um:</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {nomes.map((nome, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        placeholder={idx === 0 ? "Seu nome completo" : `Nome do acompanhante ${idx}`}
                                        value={nome}
                                        required
                                        onChange={(e) => handleNomeChange(idx, e.target.value)}
                                        style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid #eee' }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600 }}>Irá participar da festa pós-cerimônia?</label>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <label><input type="radio" checked={festa === true} onChange={() => setFesta(true)} /> Sim</label>
                                <label><input type="radio" checked={festa === false} onChange={() => setFesta(false)} /> Não</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600 }}>Ira consumir bebida alcoólica?</label>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <label><input type="radio" checked={alcool === true} onChange={() => setAlcool(true)} /> Sim</label>
                                <label><input type="radio" checked={alcool === false} onChange={() => setAlcool(false)} /> Não</label>
                            </div>
                        </div>
                    </>
                )}

                <button type="submit" disabled={loading} style={{
                    padding: '18px', background: 'hsl(var(--clr-accent))', color: '#fff',
                    borderRadius: 'var(--radius-sm)', fontSize: '1.1rem', fontWeight: 700,
                    boxShadow: 'var(--shadow-sm)', marginTop: '20px'
                }}>
                    {loading ? 'Confirmando...' : 'Confirmar Presença'}
                </button>
            </form>
        </section>
    );
}
