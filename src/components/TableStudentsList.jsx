import { HiPencil, HiTrash } from "react-icons/hi";

function formatarData(data) {
  if (!data) return '';
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

function calcularIdade(dataNasc) {
  if (!dataNasc) return '';
  const [ano, mes, dia] = dataNasc.split('-');
  const hoje = new Date();
  const nascimento = new Date(ano, mes - 1, dia);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const aniversarioPassou = hoje.getMonth() > nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() >= nascimento.getDate());
  if (!aniversarioPassou) idade--;
  return idade;
}

function TableStudentsList({ alunos, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-100 text-gray-600">
          <tr>
            <th className="px-6 py-3 text-center text-black">Nome</th>
            <th className="px-6 py-3 text-center text-black">Curso</th>
            <th className="px-6 py-3 text-center text-black">Data de Nascimento</th>
            <th className="px-6 py-3 text-center text-black">Idade</th>
            <th className="px-6 py-3 text-center text-black">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno, index) => (
            <tr key={index} className="border-white border-b bg-gray-300 transition-colors">
              <td className="px-6 py-4 font-medium text-black uppercase text-center">{aluno.nome}</td>
              <td className="px-6 py-4 text-black uppercase text-center">{aluno.curso}</td>
              <td className="px-6 py-4 text-black uppercase text-center">{formatarData(aluno.dataNasc)}</td>
              <td className="px-6 py-4 text-black text-center">{calcularIdade(aluno.dataNasc)} anos</td>
              <td className="px-6 py-4 text-black">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(aluno)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors"
                  >
                    <HiPencil className="flex items-center text-white text-sm"/>
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(aluno.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-black bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    <HiTrash className="flex items-center text-white text-sm"/>
                    Deletar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableStudentsList;