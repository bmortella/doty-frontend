import { PlusCircle, Trash2, ArrowLeft, ArrowRight } from "react-feather";

import { useState, Fragment } from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";
import * as yup from "yup";

import { Dialog, Transition } from "@headlessui/react";

function WelcomeRegisterPet() {
  const [registeredPets, setRegisteredPets] = useState([
    { name: "Pipoca", sex: "Masculino", size: "Pequeno" },
  ]);

  setLocale({
    mixed: { required: "Campo obrigatório" },
    string: {
      min: "Deve conter no mínimo ${min} caracteres",
      max: "Deve conter no máximo ${max} caracteres",
    },
  });

  const schema = yup
    .object({
      name: yup.string().required().min(2).max(12),
      sex: yup.string().required(),
      size: yup.string().required(),
      age: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Controle dialog
  let [isOpen, setIsOpen] = useState(false);
  function closeDialog() {
    setIsOpen(false);
  }

  async function onSubmit(data) {
    setRegisteredPets([...registeredPets, data]);
    reset();
    if (isOpen) closeDialog();
  }

  return (
    <div>
      <div className="px-4">
        <div className="text-center py-6">
          <p>
            Agora precisamos que você cadastre os cachorros disponíveis para
            adoção
          </p>
          <p className="text-sm text-neutral mt-1">É bem rapidinho!</p>
        </div>
        <button
          type="button"
          className="w-full text-primary bg-white border border-primary focus:ring-4 focus:outline-none focus:secondary-blue rounded-lg px-5 py-2.5 inline-flex justify-center items-center mr-2 mb-2"
          onClick={() => setIsOpen(true)}
        >
          <PlusCircle className="mr-2" size={20} />
          Adicionar Cachorro
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md rounded-lg mt-4 border border-gray-200">
        <table className="w-full text-sm text-left text-neutral">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Sexo
              </th>
              <th scope="col" className="px-6 py-3">
                Porte
              </th>
              <th scope="col" className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {registeredPets.map((pet) => (
              <tr className="bg-white border-b odd:bg-white even:bg-gray-50">
                <th scope="row" className="px-6 py-4 text-primary">
                  {pet.name}
                </th>
                <td className="px-6 py-4">{pet.sex}</td>
                <td className="px-6 py-4">{pet.size}</td>
                <td className="px-4 py-4">
                  <button type="button">
                    <Trash2 className="text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-nowrap justify-between mx-4">
          <button className="inline-flex justify-center items-center text-neutral py-4">
            <ArrowLeft className="text-gray-600 mr-2" />
            Anterior
          </button>
          <button className="inline-flex justify-center items-center text-neutral py-4">
            Próximo
            <ArrowRight className="text-gray-600 ml-2" />
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full mt-8 px-4">
        <Link to="/login" className="btn">
          Finalizar Cadastro
        </Link>
        <Link to="/login" className="btn text-primary bg-white">
          Pular
        </Link>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 pb-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl leading-6 text-secondary-blue font-semibold"
                  >
                    Cadastro do Animal
                  </Dialog.Title>
                  <form
                    className="mt-6"
                    id="dialogRegister"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="mb-6">
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
                        <p className="mt-2 text-sm text-error">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-6">
                      <label for="sex" class="block mb-2 text-sm">
                        Sexo
                      </label>
                      <select
                        id="sex"
                        className="block py-2.5 px-0 w-full text-sm text-neutral border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0"
                        {...register("sex")}
                        defaultValue=""
                      >
                        <option value=""></option>
                        <option value="Macho">Macho</option>
                        <option value="Fêmea">Fêmea</option>
                      </select>
                      {errors.sex?.message && (
                        <p className="mt-2 text-sm text-error">
                          {errors.sex.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-6">
                      <label for="size" class="block mb-2 text-sm">
                        Porte
                      </label>
                      <select
                        id="size"
                        className="block py-2.5 px-0 w-full text-sm text-neutral border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0"
                        {...register("size")}
                        defaultValue=""
                      >
                        <option value=""></option>
                        <option value="Pequeno">Pequeno</option>
                        <option value="Médio">Médio</option>
                        <option value="Grande">Grande</option>
                      </select>
                      {errors.size?.message && (
                        <p className="mt-2 text-sm text-error">
                          {errors.size.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-6">
                      <label for="size" class="block mb-2 text-sm">
                        Idade
                      </label>
                      <select
                        id="size"
                        className="block py-2.5 px-0 w-full text-sm text-neutral border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0"
                        {...register("age")}
                        defaultValue=""
                      >
                        <option value=""></option>
                        <option value="3 meses">3 meses</option>
                        <option value="6 meses">6 meses</option>
                        <option value="1 ano">1 ano</option>
                      </select>
                      {errors.age?.message && (
                        <p className="mt-2 text-sm text-error">
                          {errors.age.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-10">
                      <button
                        type="submit"
                        form="dialogRegister"
                        className="btn"
                      >
                        Cadastrar Animal
                      </button>
                      <button
                        type="button"
                        className="btn text-primary bg-white"
                        onClick={() => closeDialog()}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default WelcomeRegisterPet;
