import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PublicLayout from './pages/Public/PublicLayout';
import LandingConvite from './pages/Public/LandingConvite';
import RsvpPage from './pages/Public/RsvpPage';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';

// Componente para Proteger Rotas do Noivo
function PrivateRoute({ children }) {
  const auth = sessionStorage.getItem("admin_auth") === "true";
  const location = useLocation();
  return auth ? children : <Navigate to="/admin/login" state={{ from: location }} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Fluxo do Convidado */}
        <Route path="/" element={<Navigate to="/c/convite-exemplo-premium" replace />} />
        
        <Route path="/c/:token" element={<PublicLayout />}>
          <Route index element={<LandingConvite />} />
          <Route path="rsvp" element={<RsvpPage />} />
        </Route>

        {/* Fluxo Administrativo (Noivo) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />
        
        {/* Fallback */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
