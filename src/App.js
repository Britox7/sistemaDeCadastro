import logo from './logo.svg';
import './App.css';
import TelaUm from './pages/TelaUm';
import TelaCadastro from './pages/cadastro/TelaCadastro';
import TelaCadastrados from './pages/cadastrados/TelaCadastrados';
import Dropdown from './components/DropDown';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TelaCadastrados/>
      </header>
    </div>
  );
}

export default App;
