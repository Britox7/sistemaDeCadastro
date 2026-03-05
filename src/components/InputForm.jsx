import React from 'react';
import { useForm } from 'react-hook-form';

const InputForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-4"
      >

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>

          <input
            {...register("username", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />

          {errors.username && (
            <p className="text-red-500 text-xs italic">
              Username é obrigatório
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>

          <input
            {...register("password", { required: true })}
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />

          {errors.password && (
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="birthdate"
          >
            Data de nascimento
          </label>

          <input
            {...register("birthdate", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="birthdate"
            type="date"
          />

          {errors.birthdate && (
            <p className="text-red-500 text-xs italic">
              Defina a data de nascimento do aluno.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cadastrar
          </button>

          <button
            className="border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white"
            type="button"
          >
            Alunos Cadastrados
          </button>
        </div>

      </form>

      <p className="text-center text-gray-500 text-xs">
        ©2026 Acme Corp. All rights reserved.
      </p>
    </div>
  );
};

export default InputForm;