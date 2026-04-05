import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import casalImg from "../../assets/casal.jpeg";

function Countdown({ targetDate }) {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
                horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((difference / 1000 / 60) % 60),
                segundos: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="countdown-wrapper fade-in delay-2" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
            {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'hsl(var(--clr-text-title))', fontFamily: 'var(--font-serif)' }}>
                        {value < 10 ? `0${value}` : value}
                    </div>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, marginTop: '-5px' }}>
                        {label}
                    </div>
                </div>
            ))}
        </div>
    );
}

function CodedPetals() {
    const [petals, setPetals] = useState([]);

    useEffect(() => {
        const newPetals = Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100 + "%",
            delay: Math.random() * 15 + "s",
            duration: 15 + Math.random() * 15 + "s",
            size: 8 + Math.random() * 12 + "px",
            rotation: Math.random() * 360 + "deg"
        }));
        setPetals(newPetals);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50 }}>
            {petals.map(p => (
                <div 
                    key={p.id}
                    className="css-petal"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        animationDelay: p.delay,
                        animationDuration: p.duration,
                        transform: `rotate(${p.rotation})`
                    }}
                />
            ))}
        </div>
    );
}

export default function LandingConvite() {
    const { configs } = useOutletContext();

    return (
        <section className="landing-container animate-ready" style={{ padding: '0 20px', textAlign: 'center', position: 'relative' }}>
            <CodedPetals />
            {/* Abstract Organic UI Mesh Gradient Background */}
            <div className="mesh-bg fade-in">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="border-frame"></div>

            {/* Hero Section */}
            <header className="hero fade-in" style={{ marginTop: '100px', marginBottom: '60px', position: 'relative', zIndex: 20 }}>
                <p className="fade-in delay-1" style={{ letterSpacing: '8px', textTransform: 'uppercase', color: 'hsl(var(--clr-accent))', fontSize: '1rem', marginBottom: '15px', opacity: 0.8 }}>
                    Save the Date
                </p>
                
                {/* Contagem Regressiva */}
                <Countdown targetDate="2026-06-12T00:00:00" />

                <h1 className="hero-names fade-in delay-2" style={{ marginTop: '30px' }}>
                    {configs?.nomes[0]} <span style={{ fontFamily: 'initial', fontSize: '3rem', verticalAlign: 'middle', opacity: 0.4 }}>&</span> {configs?.nomes[1]}
                </h1>
            </header>

            {/* Glassmorphism Hero Container para destacar a foto sobre o Mesh Gradient */}
            <div className="hero-container glass fade-in delay-3" style={{ padding: '30px', borderRadius: 'calc(var(--radius-lg) + 10px)', margin: '0 auto 80px', maxWidth: '800px', position: 'relative', zIndex: 10 }}>
                <div className="hero-img-wrapper" style={{
                    width: '100%', height: '600px', position: 'relative',
                    background: `url(${casalImg}) center/cover no-repeat`,
                    borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)'
                }}></div>
            </div>

            {/* Mensagem e Detalhes */}
            <div className="message glass fade-in" style={{ padding: '80px 50px', margin: '0 auto 120px', maxWidth: '850px', borderRadius: 'var(--radius-lg)', position: 'relative', zIndex: 20 }}>
                <h2 style={{ marginBottom: '50px', fontStyle: 'italic', fontWeight: 400, fontSize: '2.5rem', lineHeight: 1.3 }}>
                    "{configs?.mensagemBoasVindas}"
                </h2>

                
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '50px', margin: '40px 0', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: '30px 0' }}>
                    <div className="info-block">
                        <h4 style={{ color: 'hsl(var(--clr-accent))', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '10px' }}>Data</h4>
                        <p style={{ fontSize: '1.4rem' }}>{new Date(configs?.dataEvento).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div style={{ height: '50px', width: '1px', background: '#ddd' }}></div>
                    <div className="info-block">
                        <h4 style={{ color: 'hsl(var(--clr-accent))', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '10px' }}>Local</h4>
                        <p style={{ fontSize: '1.4rem' }}>{configs?.local?.nome}</p>
                    </div>
                </div>

                <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(configs?.local?.nome + ' ' + configs?.local?.endereco)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ opacity: 0.7, textDecoration: 'none', fontSize: '1rem', color: 'inherit', display: 'block', marginBottom: '40px' }}
                >
                    📍 {configs?.local?.endereco} <span style={{ textDecoration: 'underline', marginLeft: '5px' }}>(Ver no Mapa)</span>
                </a>

                <div style={{ marginTop: '20px' }}>
                    <a href="#rsvp" className="btn-primary">Confirmação de Presença</a>
                </div>
            </div>

            <footer style={{ paddingBottom: '100px', opacity: 0.4, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Estamos ansiosos por este momento
            </footer>
        </section>
    );
}

