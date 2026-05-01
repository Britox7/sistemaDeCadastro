import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

function Pagination({ paginaAtual, totalPaginas, setPaginaAtual }) {
  const maxVisible = 15;

  const getVisiblePages = () => {
    if (totalPaginas <= maxVisible) {
      return Array.from({ length: totalPaginas }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2); // 7

    let start = paginaAtual - half;
    let end = paginaAtual + half;

    // Ajusta quando está perto do início
    if (start < 1) {
      start = 1;
      end = maxVisible;
    }

    // Ajusta quando está perto do fim
    if (end > totalPaginas) {
      end = totalPaginas;
      start = totalPaginas - maxVisible + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center mt-4 gap-2">
      <button
        onClick={() => setPaginaAtual((p) => p - 1)}
        disabled={paginaAtual === 1}
        className="flex items-center px-3 py-1.5 rounded-lg bg-gray-300 text-black shadow hover:bg-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
      >
        <HiArrowLeft className="text-sm mr-1" />
        Anterior
      </button>

      {visiblePages.map((pagina) => (
        <button
          key={pagina}
          onClick={() => setPaginaAtual(pagina)}
          className={`px-3 py-1.5 rounded-lg shadow transition-colors text-sm ${
            pagina === paginaAtual
              ? "bg-gray-500 text-white"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          {pagina}
        </button>
      ))}

      <button
        onClick={() => setPaginaAtual((p) => p + 1)}
        disabled={paginaAtual === totalPaginas}
        className="flex items-center px-3 py-1.5 rounded-lg bg-gray-300 text-black shadow hover:bg-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
      >
        Próxima
        <HiArrowRight className="text-sm ml-1" />
      </button>
    </div>
  );
}

export default Pagination;