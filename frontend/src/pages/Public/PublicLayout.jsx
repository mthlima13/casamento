import { useEffect, useState } from 'react';
import { useParams, Outlet, Link } from 'react-router-dom';
import { api } from '../../services/api';

export default function PublicLayout() {
    const { token } = useParams();
    const [configs, setConfigs] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Busca configurações do convite
        api.get(`/publico/convites/${token}`)
            .then(res => {
                setConfigs(res.data);
                if (res.data.tema) {
                    document.documentElement.style.setProperty('--clr-primary', res.data.tema.corPrincipal || '28, 45%, 85%');
                    document.documentElement.style.setProperty('--clr-accent', res.data.tema.corDestaque || '350, 40%, 75%');
                }
            })
            .catch(err => {
                console.warn("API offline - usaremos mock data para o design UX.", err);
                // Dados fictícios para garantir o design UX funcionando mesmo sem DB rodando
                setConfigs({
                    nomes: ["Matheus", "Isabela"],
                    dataEvento: "2026-06-12T19:00:00",
                    mensagemBoasVindas: "Com grande alegria, convidamos você para celebrar conosco o nosso casamento. Sua presença tornará esse momento ainda mais especial!",
                    local: { nome: "Vip Festas", endereco: "Rua 7, Caetanópolis - MG", lat: -23, lng: -46 }
                });
            })
            .finally(() => setLoading(false));
    }, [token]);

    if (loading) return (
        <div className="loader-container" style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ fontStyle: 'italic', fontWeight: 300 }}>Preparando o convite...</h2>
        </div>
    );

    return (
        <main className="layout-public" style={{ minHeight: '100vh', background: 'var(--grad-main)' }}>
            <nav className="glass" style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                display: 'flex', justifyContent: 'center', padding: '15px', gap: '30px'
            }}>
                <Link to={`/c/${token}`} style={{ fontWeight: 600 }}>Início</Link>
                <Link to={`/c/${token}/rsvp`} style={{ color: 'hsl(var(--clr-accent))', fontWeight: 700 }}>Confirmação</Link>
            </nav>

            <section className="page-wrapper" style={{ paddingTop: '80px', maxWidth: '1200px', margin: '0 auto' }}>
                <Outlet context={{ configs, token }} />
            </section>

            <footer style={{ padding: '60px 20px', textAlign: 'center', opacity: 0.3, fontSize: '0.8rem' }}>
                <Link to="/admin/login" style={{ textDecoration: 'none', color: 'inherit' }}>Área do Noivo</Link>
            </footer>
        </main>
    );
}
