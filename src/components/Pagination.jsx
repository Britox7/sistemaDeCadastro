function Pagination({ paginaAtual, totalPaginas, setPaginaAtual }) {
  return (
    <div className="flex items-center justify-center mt-4 gap-2">
      <button
        onClick={() => setPaginaAtual((p) => p - 1)}
        disabled={paginaAtual === 1}
        className="px-3 py-1.5 rounded-lg bg-gray-300 text-black shadow hover:bg-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
      >
        ← Previous
      </button>

      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
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
        className="px-3 py-1.5 rounded-lg bg-gray-300 text-black shadow hover:bg-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;