import { useState } from "react";

function Dropdown() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");

    const opcoes = ["Mês", "Semana"];

    function handleSelect(opcao) {
        setSelected(opcao);
        setOpen(false);
    }

    return (
        <div className="relative inline-block w-fit">
            <button
                onClick={() => setOpen(!open)}
                className="w-full inline-flex items-center justify-center text-white bg-brand box-border border border-white hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                type="button"
            >
                Pesquisar por: {selected && <span className="ml-1 font-bold">{selected}</span>}
                <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
                </svg>
            </button>

            {open && (
                <div className="absolute z-10 w-full bg-neutral-primary-medium border border-default-medium rounded-lg shadow-lg mt-1">
                    <ul className="p-2 text-sm text-body font-medium">
                        {opcoes.map((opcao) => (
                            <li key={opcao}>
                                <button
                                    onClick={() => handleSelect(opcao)}
                                    className={`inline-flex items-center w-full p-2 rounded-lg hover:bg-black hover:text-heading ${selected === opcao ? "bg-neutral-tertiary-medium text-heading" : ""}`}
                                >
                                    {opcao}
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