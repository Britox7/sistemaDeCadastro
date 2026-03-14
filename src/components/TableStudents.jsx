import { useState } from "react";
import BackButton from "./BackButton";
import TableStudentsList from "./TableStudentsList";
import Pagination from "./Pagination";

const alunos = [
  { nome: "Kaue Brito Ribeiro", curso: "ADS", dataNasc: "17 Dezembro 2002" },
  { nome: "Kaue Brito Ribeiro", curso: "ADS", dataNasc: "17 Dezembro 2002" },
  { nome: "Kaue Brito Ribeiro", curso: "ADS", dataNasc: "17 Dezembro 2002" },
  { nome: "Kaue Brito Ribeiro", curso: "ADS", dataNasc: "17 Dezembro 2002" },
  { nome: "Kaue Brito Ribeiro", curso: "ADS", dataNasc: "17 Dezembro 2002" },
  { nome: "Kaue Brito Ribeiro", curso: "ADS", dataNasc: "17 Dezembro 2002" },
  { nome: "Kaue Brito Ribeiro", curso: "ADS", dataNasc: "17 Dezembro 2002" },
  { nome: "Kaue Brito Ribeiro", curso: "ADS", dataNasc: "17 Dezembro 2002" },
];

const ITEMS_PER_PAGE = 5;

function TableStudents({ dropdown }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(alunos.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const studentsPage = alunos.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <BackButton />
        {dropdown}
      </div>
      <TableStudentsList alunos={studentsPage} />
      <Pagination
        paginaAtual={currentPage}
        totalPaginas={totalPages}
        setPaginaAtual={setCurrentPage}
      />
    </div>
  );
}

export default TableStudents;