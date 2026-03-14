import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TelaCadastro from './pages/cadastro/TelaCadastro';
import TelaCadastrados from './pages/cadastrados/TelaCadastrados';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaCadastro />} />
        <Route path="/cadastrados" element={<TelaCadastrados />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;