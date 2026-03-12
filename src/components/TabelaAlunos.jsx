const alunos = [
  { nome: "Kaue Brito Ribeiro", curso: "ADS", dataNasc: "17 Dezembro 2002" },
  { nome: "Kaue Brito Ribeiro", curso: "ADS", dataNasc: "17 Dezembro 2002" },
  { nome: "Kaue Brito Ribeiro", curso: "ADS", dataNasc: "17 Dezembro 2002" },
  { nome: "Kaue Brito Ribeiro", curso: "ADS", dataNasc: "17 Dezembro 2002" },
  { nome: "Kaue Brito Ribeiro", curso: "ADS", dataNasc: "17 Dezembro 2002" },
];

function TabelaAlunos() {
  return (
    <div className="w-full max-w-4xl mx-auto overflow-x-auto rounded-lg shadow">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-100 text-gray-600">
          <tr>
            <th className="px-6 py-3">Nome</th>
            <th className="px-6 py-3">Curso</th>
            <th className="px-6 py-3">Data de Nascimento</th>
            <th className="px-6 py-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium">{aluno.nome}</td>
              <td className="px-6 py-4">{aluno.curso}</td>
              <td className="px-6 py-4">{aluno.dataNasc}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => console.log("Editar", aluno.nome)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => console.log("Excluir", aluno.nome)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    🗑️ Excluir
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

export default TabelaAlunos;