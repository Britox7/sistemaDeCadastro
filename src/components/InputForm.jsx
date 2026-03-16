import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormButton from './FormButton';
import FormButtonTwo from './FormButtonTwo';

const InputForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    await window.api.cadastrarAluno({
      nome: data.NomeCompleto,
      curso: data.Curso,
      dataNasc: data.birthdate
    });
    reset();
  };

  return (
    <div className="w-[500px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 flex flex-col gap-4"
      >
        <div>
          <label className="text-base text-left block text-gray-700 text-sm font-bold mb-2" htmlFor="NomeCompleto">
            Nome Completo
          </label>
          <input
            {...register("NomeCompleto", { required: true })}
            onKeyPress={(e) => {
            if (/[0-9]/.test(e.key)) e.preventDefault();
          }}
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base"
            id="NomeCompleto"
            type="text"
            placeholder="Informe o nome completo do aluno"
          />
          {errors.NomeCompleto && (
            <p className="text-red-500 text-xs italic">Nome completo é obrigatório</p>
          )}
        </div>

        <div>
          <label className="text-base text-left block text-gray-700 text-sm font-bold mb-2" htmlFor="Curso">
            Curso
          </label>
         <input
            {...register("Curso", { required: true })}
            onKeyPress={(e) => {
            if (/[0-9]/.test(e.key)) e.preventDefault();
          }}
            className="text-base shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Curso"
            type="text"
            placeholder="Informe o curso do aluno"
        />
          {errors.Curso && (
            <p className="text-red-500 text-xs italic">Selecione o curso do aluno.</p>
          )}
        </div>

        <div>
          <label className="text-base text-left block text-gray-700 text-sm font-bold mb-2" htmlFor="birthdate">
            Data de nascimento
          </label>
          <input
            {...register("birthdate", { required: true })}
            className="text-base shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="birthdate"
            type="date"
          />
          {errors.birthdate && (
            <p className="text-red-500 text-xs italic">Defina a data de nascimento do aluno.</p>
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