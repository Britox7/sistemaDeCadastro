import { useState, useEffect } from "react";
import BackButton from "./BackButton";
import TableStudentsList from "./TableStudentsList";
import Pagination from "./Pagination";
import { getAlunos, updateAluno, deleteAluno } from "../services/studentService";

const ITEMS_PER_PAGE = 5;

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function TableStudents({ dropdown, filtro, filtroHoje, onAlunosChange }) {
  const [alunos, setAlunos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarAlunos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function carregarAlunos() {
    const dados = await getAlunos();

    let alunosArray = [];
    if (typeof dados === 'string') {
      try {
        alunosArray = JSON.parse(dados);
      } catch (e) {
        console.error('Error parsing alunos JSON:', e);
        alunosArray = [];
      }
    } else if (Array.isArray(dados)) {
      alunosArray = dados;
    }

    if (!Array.isArray(alunosArray)) {
      alunosArray = [];
    }

    setAlunos(alunosArray);
    if (onAlunosChange) onAlunosChange(alunosArray);
  }

  async function handleDelete(id) {
    await deleteAluno(id);
    carregarAlunos();
  }

  async function handleEditSave() {
    const nomeExistente = alunos.find(
      (aluno) =>
        aluno.id !== editando.id &&
        aluno.nome.toLowerCase() === editando.nome.toLowerCase()
    );

    if (nomeExistente) {
      alert('Já existe um aluno cadastrado com este nome.');
      return;
    }

    const dataNasc = new Date(editando.dataNasc);
    const anoAtual = new Date().getFullYear();

    if (dataNasc.getFullYear() < 1900 || dataNasc.getFullYear() > anoAtual) {
      alert('A data de nascimento deve ser entre 1900 e o ano atual.');
      return;
    }

    const resultado = await updateAluno(editando);
    const parsed = typeof resultado === 'string' ? JSON.parse(resultado) : resultado;

    if (parsed?.sucesso === false) {
      alert(parsed.erro);
      return;
    }

    setEditando(null);
    carregarAlunos();
  }

  function filtrarAlunos() {
    if (!alunos || !Array.isArray(alunos)) return [];

    if (filtroHoje) {
      const hoje = new Date();
      const mesHoje = String(hoje.getMonth() + 1).padStart(2, '0');
      const diaHoje = String(hoje.getDate()).padStart(2, '0');

      return alunos
        .filter((aluno) => {
          if (!aluno || !aluno.dataNasc) return false;
          const [, mes, dia] = aluno.dataNasc.split('-');
          return mes === mesHoje && dia === diaHoje;
        })
        .sort((a, b) => {
          if (!a?.nome) return -1;
          if (!b?.nome) return 1;
          return a.nome.localeCompare(b.nome);
        });
    }

    if (!filtro) {
      return [...alunos]
        .filter((aluno) => aluno && aluno.nome)
        .sort((a, b) => {
          if (!a?.nome) return -1;
          if (!b?.nome) return 1;
          return a.nome.localeCompare(b.nome);
        });
    }

    const mesSelecionado = meses.indexOf(filtro) + 1;

    return alunos
      .filter((aluno) => {
        if (!aluno || !aluno.dataNasc) return false;
        const [, mes] = aluno.dataNasc.split('-');
        return Number(mes) === mesSelecionado;
      })
      .sort((a, b) => {
        if (!a?.dataNasc) return -1;
        if (!b?.dataNasc) return 1;
        const [, mesA, diaA] = a.dataNasc.split('-');
        const [, mesB, diaB] = b.dataNasc.split('-');
        if (Number(mesA) !== Number(mesB)) return Number(mesA) - Number(mesB);
        if (Number(diaA) !== Number(diaB)) return Number(diaA) - Number(diaB);
        if (!a?.nome) return -1;
        if (!b?.nome) return 1;
        return a.nome.localeCompare(b.nome);
      });
  }

  const alunosFiltrados = filtrarAlunos();
  const totalPages = Math.ceil(alunosFiltrados.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const studentsPage = alunosFiltrados.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="w-full px-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <BackButton />
        {dropdown}
      </div>

      {editando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl mx-4">
            <h2 className="text-lg font-bold text-gray-700">Editar Aluno</h2>
            <div>
              <label className="text-sm font-bold text-gray-700">Nome Completo</label>
              <input
                value={editando.nome}
                onChange={(e) => setEditando({ ...editando, nome: e.target.value })}
                className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700">Curso</label>
              <input
                value={editando.curso}
                onChange={(e) => setEditando({ ...editando, curso: e.target.value })}
                className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700">Data de Nascimento</label>
              <input
                value={editando.dataNasc}
                onChange={(e) => setEditando({ ...editando, dataNasc: e.target.value })}
                className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mt-1"
                type="date"
              />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleEditSave}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-lg transition-colors"
              >
                Salvar
              </button>
              <button
                onClick={() => setEditando(null)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <TableStudentsList
        alunos={studentsPage}
        onEdit={(aluno) => setEditando(aluno)}
        onDelete={handleDelete}
      />
      <Pagination
        paginaAtual={currentPage}
        totalPaginas={totalPages}
        setPaginaAtual={setCurrentPage}
      />
    </div>
  );
}

export default TableStudents;