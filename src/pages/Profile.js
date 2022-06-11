import { useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";
import * as yup from "yup";
import { AuthContext } from "../contexts/authContext";

import designer from "../assets/img/designer.svg";

function Profile() {
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle("Meu Perfil");
  });

  const authContext = useContext(AuthContext);

  setLocale({
    mixed: { required: "Campo obrigatório" },
    string: {
      min: "Deve conter no mínimo ${min} caracteres",
      max: "Deve conter no máximo ${max} caracteres",
    },
  });

  const schema = yup
    .object({
      name: yup.string().required().min(2).max(24),
      email: yup.string().required().email("Digite um e-mail válido"),
      phone: yup
        .string()
        .required()
        .min(10)
        .max(11)
        .matches("[0-9]+", "Deve conter apenas números"),
    })
    .required();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="p-5 flex justify-between">
      <form
        className="w-full md:w-2/5"
        id="profile"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm">
            Nome
          </label>
          <input
            type="text"
            id="name"
            className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
            maxLength={12}
            defaultValue={authContext.loggedInUser.user.name}
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="mt-2 text-sm text-error">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm">
            E-mail
          </label>
          <input
            type="text"
            id="email"
            className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
            maxLength={12}
            defaultValue={authContext.loggedInUser.user.email}
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="mt-2 text-sm text-error">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block text-sm">
            Telefone
          </label>
          <input
            type="text"
            id="phone"
            className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
            maxLength={12}
            defaultValue={authContext.loggedInUser.user.phone}
            {...register("phone")}
          />
          {errors.phone?.message && (
            <p className="mt-2 text-sm text-error">{errors.phone.message}</p>
          )}
        </div>
        <div className="mb-4">
          <button className="btn btn-outline text-sm py-2 w-28">
            Alterar Senha
          </button>
        </div>
        <div>
          <button type="submit" form="profile" className="btn">
            Salvar Alterações
          </button>
        </div>
      </form>
      <div className="w-2/5 hidden md:block">
        <img src={designer} alt="" className="mx-auto" />
      </div>
    </div>
  );
}

export default Profile;
