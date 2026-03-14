function TableStudentsList({ alunos }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-100 text-gray-600">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Course</th>
            <th className="px-6 py-3">Birth Date</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno, index) => (
            <tr key={index} className="border-b bg-gray-300 transition-colors">
              <td className="px-6 py-4 font-medium text-black">{aluno.nome}</td>
              <td className="px-6 py-4 text-black">{aluno.curso}</td>
              <td className="px-6 py-4 text-black">{aluno.dataNasc}</td>
              <td className="px-6 py-4 text-black">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => console.log("Edit", aluno.nome)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => console.log("Delete", aluno.nome)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-black bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    🗑️ Delete
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