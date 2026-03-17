import { useState } from "react";

const meses = [
  "Todos",
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function Dropdown({ onSelect }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");

    function handleSelect(mes) {
        setSelected(mes);
        setOpen(false);
        if (onSelect) onSelect(mes === "Todos" ? "" : mes);
    }

    return (
        <div className="relative inline-block w-fit">
            <button
                onClick={() => setOpen(!open)}
                className="w-full inline-flex items-center justify-center text-black bg-gray-300 box-border border border-white hover:bg-gray-400 shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-3 mt-0.5 focus:outline-none"
                type="button"
            >
                Filtrar por mês: {selected && <span className="ml-1 font-bold">{selected}</span>}
                <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
                </svg>
            </button>

            {open && (
                <div className="absolute z-10 bg-gray-300 border border-gray-400 rounded-lg shadow-lg mt-1 w-40">
                    <ul className="p-2 text-sm font-medium max-h-60 overflow-y-auto">
                        {meses.map((mes) => (
                            <li key={mes}>
                                <button
                                    onClick={() => handleSelect(mes)}
                                    className={`inline-flex items-center w-full p-2 rounded-lg hover:bg-gray-400 hover:text-black ${selected === mes ? "bg-gray-400" : ""}`}
                                >
                                    {mes}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dropdown;