import { useState } from 'react';
import Catchphrase from '../../components/Catchphrase';
import ContainerGeral from '../../components/ContainerGeral';
import Dropdown from '../../components/DropDown';
import TableStudents from '../../components/TableStudents';
import Title from '../../components/Title';

function TelaCadastrados() {
  const [filtro, setFiltro] = useState("");
  const [filtroHoje, setFiltroHoje] = useState(false);
  const [totalHoje, setTotalHoje] = useState(0);

  function handleAlunosChange(alunos) {
    const hoje = new Date();
    const mesHoje = String(hoje.getMonth() + 1).padStart(2, '0');
    const diaHoje = String(hoje.getDate()).padStart(2, '0');

    const total = alunos.filter((aluno) => {
      const [, mes, dia] = aluno.dataNasc.split('-');
      return mes === mesHoje && dia === diaHoje;
    }).length;

    setTotalHoje(total);
  }

  function handleFiltroHoje() {
    setFiltroHoje(!filtroHoje);
    setFiltro("");
  }

  function handleFiltroMes(mes) {
    setFiltro(mes);
    setFiltroHoje(false);
  }

  return(
    <ContainerGeral className="flex flex-col min-h-screen">
      <Title pageTitle="Aniversariantes cadastrados"/>
      <TableStudents
        filtro={filtro}
        filtroHoje={filtroHoje}
        onAlunosChange={handleAlunosChange}
        dropdown={
          <div className="flex items-center gap-2">
            <Dropdown onSelect={handleFiltroMes} />
            <button
              onClick={handleFiltroHoje}
              className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors shadow border ${
                filtroHoje
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "bg-gray-300 text-black border-white hover:bg-gray-400"
              }`}
            >
              Aniversariantes do dia:
              {totalHoje > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalHoje}
                </span>
              )}
            </button>
          </div>
        }
      />
      <Catchphrase/>
    </ContainerGeral>
  );
}
export default TelaCadastrados;