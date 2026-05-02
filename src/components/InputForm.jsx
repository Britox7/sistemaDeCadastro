import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormButton from './FormButton';
import FormButtonTwo from './FormButtonTwo';
import { createAluno } from '../services/studentService';

const cursosPorModalidade = {
  "UniAteneu Semipresencial (Graduação)": [
    "Pedagogia 01/2022", "Pedagogia 02/2023.2", "Pedagogia 03/2025.1", "Pedagogia 04/2025.2", "Pedagogia 05/2026.1", "Educação Física", "Terapia Ocupacional 01", "Terapia Ocupacional 02",
    "Fisioterapia", "Farmácia"
  ],
  "UniAteneu Online (Graduação)": [
  "Pedagogia 01 - 2021.1","Pedagogia 02 - 2022.1","Pedagogia 03 - 2024.1","Administração","Ciências contábeis","Serviço social","Engenharia de software","ADS",
  "Secretário escolar","EJA"
  ],
  "Faconnect (Graduação)": [
    "Pedagogia Semi 2023.1", "Pós graduação"
  ],
  "UniBTA (Graduação)": [
    "Administração", "Arquitetura", "Ciências Contábeis", "Ciências Econômicas",
    "Engenharia de Produção", "Engenharia de Software", "Engenharia Civil",
    "Serviço Social", "Teologia", "Educação Física", "História", "Letras",
    "Matemática", "Pedagogia",
  ],
  "UniAteneu (Técnicos)": [
    "Técnico em enfermagem"
  ],
  "PHTech (Técnicos)": [
    "Técnico em enfermagem 05", "Técnico em enfermagem 07", "Secretariado Escolar", "Técnico em saúde bucal", "Técnico em agropecuária"
  ],
};

const InputForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [modalidadeSelecionada, setModalidadeSelecionada] = useState("");
  const [cursoSelecionado, setCursoSelecionado] = useState("");
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [dropdownModalidadeAberto, setDropdownModalidadeAberto] = useState(false);

  const onSubmit = async (data) => {
    const nomeFaculdade = modalidadeSelecionada.split(' (')[0];

    const retorno = await createAluno({
      nome: data.NomeCompleto,
      curso: `${data.Curso} (${nomeFaculdade})`,
      dataNasc: data.birthdate
    });

    const resultado = JSON.parse(retorno);

    if (!resultado.sucesso) {
      alert(resultado.erro);
      return;
    }

    reset();
    setModalidadeSelecionada("");
    setCursoSelecionado("");
    setDropdownAberto(false);
    setDropdownModalidadeAberto(false);
  };

  const apenasLetras = (e) => {
    if (/[^a-zA-ZÀ-ÿ\s]/.test(e.key)) e.preventDefault();
  };

  function handleCursoSelect(curso) {
    setCursoSelecionado(curso);
    setValue("Curso", curso);
    setDropdownAberto(false);
  }

  function handleModalidadeSelect(modalidade) {
    setModalidadeSelecionada(modalidade);
    setValue("Curso", "");
    setCursoSelecionado("");
    setDropdownModalidadeAberto(false);
  }

  return (
    <div className="w-full max-w-lg px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 flex flex-col gap-4"
      >
        <div>
          <label className="text-base text-left block text-gray-700 text-sm font-bold mb-2" htmlFor="NomeCompleto">
            Nome Completo
          </label>
          <input
            {...register("NomeCompleto", {
              required: "Nome completo é obrigatório",
              validate: (value) => value.trim() !== '' || "Nome não pode ser apenas espaços",
              pattern: {
                value: /^[a-zA-ZÀ-ÿ\s]+$/,
                message: "Nome não pode conter números ou caracteres especiais"
              }
            })}
            onKeyPress={apenasLetras}
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base"
            id="NomeCompleto"
            type="text"
            placeholder="Informe o nome completo do aluno"
          />
          {errors.NomeCompleto && (
            <p className="text-red-500 text-xs italic">{errors.NomeCompleto.message}</p>
          )}
        </div>

        <div>
          <label className="text-base text-left block text-gray-700 text-sm font-bold mb-2">
            Faculdade / Modalidade
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownModalidadeAberto(!dropdownModalidadeAberto)}
              className="shadow border border-gray-400 rounded w-full py-2 px-3 text-left text-base leading-tight focus:outline-none text-gray-700 bg-white hover:bg-gray-50"
            >
              {modalidadeSelecionada || "Selecione a faculdade / modalidade"}
              <span className="float-right">▼</span>
            </button>

            {dropdownModalidadeAberto && (
              <div className="absolute z-50 w-full bg-white border border-gray-400 rounded shadow-lg max-h-48 overflow-y-auto">
                {Object.keys(cursosPorModalidade).map((modalidade) => (
                  <button
                    key={modalidade}
                    type="button"
                    onClick={() => handleModalidadeSelect(modalidade)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-100 ${modalidadeSelecionada === modalidade ? "bg-blue-200 font-medium" : ""}`}
                  >
                    {modalidade}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="text-base text-left block text-gray-700 text-sm font-bold mb-2" htmlFor="Curso">
            Curso
          </label>
          <input type="hidden" {...register("Curso", { required: "Selecione o curso do aluno." })} />
          <div className="relative">
            <button
              type="button"
              disabled={!modalidadeSelecionada}
              onClick={() => setDropdownAberto(!dropdownAberto)}
              className={`shadow border border-gray-400 rounded w-full py-2 px-3 text-left text-base leading-tight focus:outline-none ${!modalidadeSelecionada ? "opacity-50 cursor-not-allowed text-gray-400" : "text-gray-700 bg-white hover:bg-gray-50"}`}
            >
              {cursoSelecionado || "Selecione o curso"}
              <span className="float-right">▼</span>
            </button>

            {dropdownAberto && modalidadeSelecionada && (
              <div className="absolute z-50 w-full bg-white border border-gray-400 rounded shadow-lg max-h-48 overflow-y-auto">
                {cursosPorModalidade[modalidadeSelecionada].map((curso) => (
                  <button
                    key={curso}
                    type="button"
                    onClick={() => handleCursoSelect(curso)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-100 ${cursoSelecionado === curso ? "bg-blue-200 font-medium" : ""}`}
                  >
                    {curso}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.Curso && (
            <p className="text-red-500 text-xs italic">{errors.Curso.message}</p>
          )}
        </div>

        <div>
          <label className="text-base text-left block text-gray-700 text-sm font-bold mb-2" htmlFor="birthdate">
            Data de nascimento
          </label>
          <input
            {...register("birthdate", {
              required: "Defina a data de nascimento do aluno.",
              validate: (value) => {
                const data = new Date(value);
                const hoje = new Date();
                if (isNaN(data.getTime())) return "Data inválida";
                if (data > hoje) return "Data não pode ser no futuro";
                if (data.getFullYear() < 1900) return "Data inválida";
                return true;
              }
            })}
            className="text-base shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="birthdate"
            type="date"
            max={new Date().toISOString().split('T')[0]}
            min="1900-01-01"
          />
          {errors.birthdate && (
            <p className="text-red-500 text-xs italic">{errors.birthdate.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <FormButton textButton="CADASTRAR" />
          <FormButtonTwo textButton="ALUNOS CADASTRADOS" onClick={() => navigate('/cadastrados')} />
        </div>
      </form>
    </div>
  );
};

export default InputForm;