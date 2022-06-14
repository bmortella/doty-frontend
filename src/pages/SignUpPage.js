import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import api from "../apis/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";
import * as yup from "yup";
import doty from "../assets/img/Doty.svg";

function SignUpPage() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

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
      email: yup.string().required().email("Digite um email válido"),
      phone: yup
        .string()
        .required()
        .min(10)
        .max(11)
        .matches("[0-9]+", "Deve conter apenas números"),
      password: yup.string().required().min(8),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "As senhas não coindicem"),
    })
    .required();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [termsCheckbox, setTermsCheckbox] = useState(false);

  async function onSubmit(data) {
    try {
      delete data.confirmPassword;

      const response = await api.post("/signup", data);
      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );

      navigate("/welcome", { replace: true }); // TODO: navegar para termos
    } catch (err) {
      // Se ha response, a API retornou uma mensagem.
      if (err.response) {
        if (err.response.data.errors?.msg === "USER_ALREADY_EXISTS") {
          setError(
            "email",
            {
              type: "custom",
              message: "Este email já está cadastrado",
            },
            { shouldFocus: true }
          );
        }
      }
      // TODO: mostrar popup de erro
      //console.error(err);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row lg:items-center bg-secondary-blue h-screen">
      <div className="text-primary py-8 px-4 md:flex md:justify-center lg:w-full">
        <div className="md:w-3/5 lg:w-3/5 2xl:w-3/12 bg-white rounded-xl shadow py-8 px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6" id="signup">
            <div className="mb-6">
              <div className="mb-10 flex justify-center">
                <img src={doty} alt="Logo da DOTY" />
              </div>
              <label for="name" className="block mb-2 text-sm">
                Nome
              </label>
              <input
                type="text"
                id="name"
                className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
                maxLength={32}
                {...register("name")}
              />
              {errors.name?.message && (
                <p className="mt-2 text-sm text-error">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label for="email" className="block mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
                {...register("email")}
              />
              {errors.email?.message && (
                <p className="mt-2 text-sm text-error">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label for="phone" className="block mb-2 text-sm">
                Telefone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
                maxLength={11}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                {...register("phone")}
              />
              {errors.phone?.message && (
                <p className="mt-2 text-sm text-error">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label for="password" className="block mb-2 text-sm">
                Senha
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="mt-2 text-sm text-error">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label for="confirmPassword" className="block mb-2 text-sm">
                Confirmar Senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword?.message && (
                <p className="mt-2 text-sm text-error">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex items-center mb-6">
              <input
                id="terms-checkbox"
                type="checkbox"
                value=""
                className="w-6 h-6 text-secondary-blue bg-gray-100 rounded border-gray-300 focus:ring-secondary-blue focus:ring-2"
                defaultChecked={termsCheckbox}
                onChange={() => setTermsCheckbox(!termsCheckbox)}
              />
              <label for="terms-checkbox" className="ml-2 text-xs font-medium">
                Eu sou maior de idade e concordo com os{" "}
                <a href="#" className="text-hyperlink-blue hover:underline">
                  termos de uso
                </a>
              </label>
            </div>
            <div className="mb-5">
              <button
                type="submit"
                form="signup"
                className="w-full text-white bg-primary disabled:bg-neutral focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-base px-11 py-2.5 mr-2 mb-2 focus:outline-none"
                disabled={!termsCheckbox}
              >
                Criar Conta
              </button>
            </div>
          </form>
          <div className="text-center">
            <span>
              Já tem uma conta?{" "}
              <Link
                to="/loginpage"
                className="text-hyperlink-blue hover:underline"
              >
                Entrar
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
