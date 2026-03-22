import { useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import TelaCadastro from './pages/cadastro/TelaCadastro';
import TelaCadastrados from './pages/cadastrados/TelaCadastrados';

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    window.api.onNavegar(() => {
      navigate('/cadastrados');
    });
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<TelaCadastro />} />
      <Route path="/cadastrados" element={<TelaCadastrados />} />
    </Routes>
  );
}

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;