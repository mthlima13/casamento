import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // PIN Confidencial definido pelo usuário
        if (pin === "M@8400") {
            sessionStorage.setItem("admin_auth", "true");
            navigate("/admin/dashboard");
        } else {
            setError(true);
            setPin("");
        }
    };

    return (
        <div className="login-container fade-in" style={{
            height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px', background: '#faf7f5'
        }}>
            <form onSubmit={handleLogin} className="glass" style={{
                padding: '50px', borderRadius: 'var(--radius-lg)', maxWidth: '400px', width: '100%',
                textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ marginBottom: '10px', fontSize: '2rem' }}>Área do Noivo</h2>
                <p style={{ opacity: 0.6, marginBottom: '30px', fontSize: '0.9rem' }}>Insira seu código de acesso para gerenciar os convidados.</p>
                
                <input 
                    type="password" 
                    placeholder="PIN de Acesso" 
                    value={pin}
                    onChange={(e) => { setPin(e.target.value); setError(false); }}
                    style={{
                        width: '100%', padding: '15px', borderRadius: 'var(--radius-sm)', border: error ? '1px solid red' : '1px solid #ddd',
                        textAlign: 'center', fontSize: '1.2rem', letterSpacing: '5px', marginBottom: '15px'
                    }}
                />
                
                {error && <p style={{ color: 'red', fontSize: '0.8rem', marginBottom: '15px' }}>Código incorreto. Tente novamente.</p>}

                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Entrar</button>
            </form>
        </div>
    );
}
