import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormButton from './FormButton';
import FormButtonTwo from './FormButtonTwo';

const cursosPorModalidade = {
  Licenciatura: [
    "Educação Física",
    "História",
    "Letras",
    "Matemática",
    "Pedagogia",
  ],
  Bacharelado: [
    "Administração",
    "Arquitetura",
    "Ciências Contábeis",
    "Ciências Econômicas",
    "Engenharia de Produção",
    "Engenharia de Software",
    "Engenharia Civil",
    "Serviço Social",
    "Teologia",
  ],
  Tecnólogo: [
    "Análise e Desenvolvimento de Sistemas",
    "Comércio Exterior",
    "Gestão Ambiental",
    "Gestão Comercial",
    "Gestão da Qualidade",
    "Gestão de Recursos Humanos",
    "Gestão Financeira",
    "Gestão Hospitalar",
    "Gestão Portuária",
    "Gestão Pública",
    "Logística",
    "Marketing",
    "Marketing Digital",
    "Processos Gerenciais",
    "Redes de Computadores",
    "Gestão da Tecnologia da Informação",
    "Inteligência de Dados",
  ],
  "Curso Técnico": [
    "Administração",
    "Logística",
    "Marketing",
    "Recursos Humanos",
    "Serviços Jurídicos",
    "Segurança do Trabalho",
    "Secretariado Escolar",
    "Transações Imobiliárias",
  ],
};

const InputForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [modalidadeSelecionada, setModalidadeSelecionada] = useState("");

  const onSubmit = async (data) => {
    const retorno = await window.api.cadastrarAluno({
      nome: data.NomeCompleto,
      curso: data.Curso,
      dataNasc: data.birthdate
    });

    const resultado = JSON.parse(retorno);

    if (!resultado.sucesso) {
      alert(resultado.erro);
      return;
    }

    reset();
    setModalidadeSelecionada("");
  };

  const apenasLetras = (e) => {
    if (/[^a-zA-ZÀ-ÿ\s]/.test(e.key)) e.preventDefault();
  };

  return (
    <div className="w-[500px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 flex flex-col gap-4"
      >
        {/* Nome Completo */}
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

        {/* Modalidade */}
        <div>
          <label className="text-base text-left block text-gray-700 text-sm font-bold mb-2">
            Modalidade
          </label>
          <select
            className="shadow border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base"
            value={modalidadeSelecionada}
            onChange={(e) => {
              setModalidadeSelecionada(e.target.value);
              setValue("Curso", "");
            }}
          >
            <option value="">Selecione a modalidade</option>
            {Object.keys(cursosPorModalidade).map((modalidade) => (
              <option key={modalidade} value={modalidade}>{modalidade}</option>
            ))}
          </select>
        </div>

        {/* Curso */}
        <div>
          <label className="text-base text-left block text-gray-700 text-sm font-bold mb-2" htmlFor="Curso">
            Curso
          </label>
          <select
            {...register("Curso", { required: "Selecione o curso do aluno." })}
            disabled={!modalidadeSelecionada}
            className={`shadow border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base ${!modalidadeSelecionada ? "opacity-50 cursor-not-allowed" : ""}`}
            id="Curso"
          >
            <option value="">Selecione o curso</option>
            {modalidadeSelecionada && cursosPorModalidade[modalidadeSelecionada].map((curso) => (
              <option key={curso} value={curso}>{curso}</option>
            ))}
          </select>
          {errors.Curso && (
            <p className="text-red-500 text-xs italic">{errors.Curso.message}</p>
          )}
        </div>

        {/* Data de Nascimento */}
        <div>
          <label className="text-base text-left block text-gray-700 text-sm font-bold mb-2" htmlFor="birthdate">
            Data de nascimento
          </label>
          <input
            {...register("birthdate", { required: "Defina a data de nascimento do aluno." })}
            className="text-base shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="birthdate"
            type="date"
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