import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";

import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Signup(props) {
  const [state, setState] = useState({ name: "", password: "", email: "" });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/signup", state);
      setErrors({ name: "", password: "", email: "" });
      navigate("/login");
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        return setErrors({ ...err.response.data.errors });
      }

      console.error(err);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row lg:items-center bg-secondary-blue">
      <div className="bg-primary h-56 text-white flex flex-col items-center justify-center lg:h-screen lg:w-3/5 lg:text-left 2xl:w-2/5">
        <h1 className="text-5xl font-grandstander uppercase lg:text-8xl lg:text-left">
          Doty
        </h1>
        <h2 className="text-center mt-4 leading-8 lg:text-xl lg:text-left font-normal">
          A plataforma ideal para otimizar o seu{" "}
          <span className="block text-secondary-green font-semibold">
            processo de adoção<span className="text-white font-normal">.</span>
          </span>
        </h2>
      </div>
      <div className="text-primary py-8 px-4 md:flex md:justify-center lg:w-full">
        <div className="md:w-1/2 lg:w-3/5 2xl:w-2/5 bg-white rounded-xl shadow py-8 px-10">
          <Tab.Group>
            <Tab.List className="flex justify-around">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-4 text-sm text-secondary-blue border-b-2 border-transparent",
                    selected
                      ? "border-secondary-blue"
                      : "hover:border-secondary-blue"
                  )
                }
              >
                Sou Protetor
              </Tab>
              <Tab
                selected={true}
                className={({ selected }) =>
                  classNames(
                    "w-full py-4 text-sm text-secondary-blue border-b-2 border-transparent",
                    selected
                      ? "border-secondary-blue"
                      : "hover:border-secondary-blue"
                  )
                }
              >
                Sou Adotante
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <form className="mt-6">
                <div class="mb-6">
                  <label for="name" class="block mb-2 text-sm">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label for="email" class="block mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label for="phone" class="block mb-2 text-sm">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    class="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label for="password" class="block mb-2 text-sm">
                    Senha
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    class="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
                    required
                  />
                </div>
                <div class="mb-6">
                  <label for="repeat-password" class="block mb-2 text-sm">
                    Confirmar Senha
                  </label>
                  <input
                    type="text"
                    name="repeat-password"
                    id="repeat-password"
                    class="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
                    required
                  />
                </div>
                <div class="flex items-center mb-6">
                  <input
                    id="terms-checkbox"
                    type="checkbox"
                    value=""
                    class="w-6 h-6 text-secondary-blue bg-gray-100 rounded border-gray-300 focus:ring-secondary-blue focus:ring-2"
                  />
                  <label for="terms-checkbox" class="ml-2 text-xs font-medium">
                    Eu concordo com os{" "}
                    <a href="#" class="text-hyperlink-blue hover:underline">
                      termos de uso
                    </a>
                  </label>
                </div>
                <Tab.Panel>
                  <div className="mb-5">
                    <button
                      type="button"
                      class="w-full text-white bg-primary hover:bg-secondary-blue focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-base px-11 py-2.5 mr-2 mb-2 focus:outline-none"
                    >
                      Criar Conta
                    </button>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="mb-5">
                    <button
                      type="button"
                      class="w-full text-white bg-primary hover:bg-secondary-blue focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-base px-11 py-2.5 mr-2 mb-2 focus:outline-none"
                    >
                      Criar Conta
                    </button>
                  </div>
                </Tab.Panel>
                <div className="text-center">
                  <span>
                    Já tem uma conta?{" "}
                    <Link
                      to="/login"
                      className="text-hyperlink-blue hover:underline"
                    >
                      Entrar
                    </Link>
                  </span>
                </div>
              </form>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}

export default Signup;
