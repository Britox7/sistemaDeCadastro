import { HashRouter, Routes, Route } from 'react-router-dom';
import TelaCadastro from './pages/cadastro/TelaCadastro';
import TelaCadastrados from './pages/cadastrados/TelaCadastrados';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<TelaCadastro />} />
        <Route path="/cadastrados" element={<TelaCadastrados />} />
      </Routes>
    </HashRouter>
  );
}

export default App;