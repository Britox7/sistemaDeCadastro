import { useState, useEffect } from "react";
import BackButton from "./BackButton";
import TableStudentsList from "./TableStudentsList";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 5;

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function TableStudents({ dropdown, filtro }) {
  const [alunos, setAlunos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarAlunos();
  }, []);

  async function carregarAlunos() {
    const dados = await window.api.buscarAlunos();
    setAlunos(dados);
  }

  async function handleDelete(id) {
    await window.api.excluirAluno(id);
    carregarAlunos();
  }

  async function handleEditSave() {
    await window.api.editarAluno(editando);
    setEditando(null);
    carregarAlunos();
  }

  function filtrarAlunos() {
    if (!filtro) return [...alunos].sort((a, b) => a.nome.localeCompare(b.nome));

    const mesSelecionado = meses.indexOf(filtro) + 1;

    return alunos
      .filter((aluno) => {
        const [, mes] = aluno.dataNasc.split('-');
        return Number(mes) === mesSelecionado;
      })
      .sort((a, b) => {
        const [, mesA, diaA] = a.dataNasc.split('-');
        const [, mesB, diaB] = b.dataNasc.split('-');
        if (Number(mesA) !== Number(mesB)) return Number(mesA) - Number(mesB);
        if (Number(diaA) !== Number(diaB)) return Number(diaA) - Number(diaB);
        return a.nome.localeCompare(b.nome);
      });
  }

  const alunosFiltrados = filtrarAlunos();
  const totalPages = Math.ceil(alunosFiltrados.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const studentsPage = alunosFiltrados.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <BackButton />
        {dropdown}
      </div>

      {editando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 flex flex-col gap-4 shadow-xl">
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