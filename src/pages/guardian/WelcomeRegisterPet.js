import { PlusCircle, Trash2, ArrowLeft, ArrowRight } from "react-feather";
import instagramPost from "../../assets/img/instagram-post.svg";

import { useState, Fragment, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";
import * as yup from "yup";

import { Dialog, Transition } from "@headlessui/react";

import api from "../../apis/api";

function WelcomeRegisterPet() {
  const [registeredPets, setRegisteredPets] = useState([]);

  // Pagination
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (
      registeredPets.length > 0 &&
      page > Math.ceil(registeredPets.length / 6) - 1
    ) {
      setPage(page - 1);
    }
  }, [registeredPets]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = page * 6;
    const lastPageIndex = firstPageIndex + 6;
    return registeredPets.slice(firstPageIndex, lastPageIndex);
  }, [page, registeredPets]);

  // Form
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

  async function onSubmit(data) {
    try {
      const response = await api.post("/pets", data);
      setRegisteredPets([response.data, ...registeredPets]);
      reset();
      if (isOpen) closeDialog();
    } catch (err) {
      if (err.response) {
        if (err.response.data.errors?.msg === "PET_ALREADY_EXISTS") {
          setError(
            "name",
            {
              type: "custom",
              message: "Este cachorro já está cadastrado",
            },
            { shouldFocus: true }
          );
        }
      }
    }
  }

  async function deletePet(pet) {
    try {
      await api.delete(`/pets/${pet._id}`);
      setRegisteredPets(registeredPets.filter((item) => item._id !== pet._id));
    } catch (err) {
      console.error(err);
    }
  }

  // Control dialog
  let [isOpen, setIsOpen] = useState(false);
  function closeDialog() {
    setIsOpen(false);
  }

  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
      <div className="hidden lg:bg-primary lg:p-8 lg:text-white lg:leading-9 lg:flex lg:flex-col lg:justify-center lg:h-screen lg:w-3/5 lg:text-left 2xl:w-2/5">
        <h1 className="text-[22px] text-left font-semibold">
          Agora precisamos que você cadastre os cachorros disponíveis para
          adoção
        </h1>
        <p className="text-neutral mt-1 text-left">É bem rapidinho!</p>
        <img
          src={instagramPost}
          className="mt-10 px-2 xl:px-16 2xl:px-8"
          alt=""
        ></img>
      </div>

      <div className="py-8 px-4 lg:flex lg:flex-col lg:justify-center lg:w-full 2xl:px-36">
        <div className="px-4 lg:rounded-lg lg:shadow-md lg:border lg:border-gray-200 lg:px-8 lg:py-6">
          <div className="text-center py-6 lg:hidden">
            <p>
              Agora precisamos que você cadastre os cachorros disponíveis para
              adoção
            </p>
            <p className="text-sm text-neutral mt-1">É bem rapidinho!</p>
          </div>
          <form
            className="hidden xl:block"
            id="pageForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex w-full">
              <div className="w-full mr-3">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
                    maxLength={12}
                    {...register("name")}
                  />
                  {errors.name?.message && (
                    <p className="mt-2 text-sm text-error">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="size" className="block text-sm">
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
              </div>
              <div className="w-full ml-3">
                <div className="mb-4">
                  <label htmlFor="sex" className="block text-sm">
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
                <div className="mb-4">
                  <label htmlFor="age" className="block text-sm">
                    Idade
                  </label>
                  <select
                    id="age"
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
              </div>
            </div>
          </form>
          <div className="flex flex-row justify-center">
            <button
              type="button"
              className="xl:hidden w-full text-primary bg-white border border-primary focus:ring-4 focus:outline-none focus:secondary-blue rounded-lg px-5 py-2.5 inline-flex justify-center items-center mr-2 mb-2 lg:mb-0"
              onClick={() => setIsOpen(true)}
            >
              <PlusCircle className="mr-2" size={20} />
              Adicionar Cachorro
            </button>
            <button
              type="submit"
              className="hidden w-60 text-primary bg-white border border-primary focus:ring-4 focus:outline-none focus:secondary-blue rounded-lg px-5 py-2.5 xl:inline-flex justify-center items-center mr-2 mb-2 lg:mb-0"
              form="pageForm"
            >
              <PlusCircle className="mr-2" size={20} />
              Adicionar Cachorro
            </button>
          </div>
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
                <th scope="col" className="px-6 py-3 hidden lg:table-cell">
                  Idade
                </th>
                <th scope="col" className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((pet) => (
                <tr
                  className="bg-white border-b odd:bg-white even:bg-gray-50"
                  key={pet._id}
                >
                  <th scope="row" className="px-6 py-4 text-primary">
                    {pet.name}
                  </th>
                  <td className="px-6 py-4">{pet.sex}</td>
                  <td className="px-6 py-4">{pet.size}</td>
                  <td className="px-6 py-4 hidden lg:table-cell">{pet.age}</td>
                  <td className="px-4 py-4">
                    <button type="button" onClick={() => deletePet(pet)}>
                      <Trash2 className="text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-nowrap justify-between mx-4">
            <button
              className="inline-flex justify-center items-center text-neutral py-4 disabled:text-gray-300 group"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              <ArrowLeft className="text-gray-600 mr-2 group-disabled:text-gray-400" />
              Anterior
            </button>
            <button
              className="inline-flex justify-center items-center text-neutral py-4 disabled:text-gray-300 group"
              disabled={
                page === Math.ceil(registeredPets.length / 6) - 1 ||
                registeredPets.length === 0
              }
              onClick={() => setPage(page + 1)}
            >
              Próximo
              <ArrowRight className="text-gray-600 ml-2 group-disabled:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-col 2xl:flex-row-reverse w-full mt-8 px-4">
          <Link to="/guardian/dashboard" replace className="btn 2xl:w-44">
            Finalizar Cadastro
          </Link>
          <Link
            to="/guardian/dashboard"
            className="btn text-primary bg-white 2xl:w-44"
          >
            Pular
          </Link>
        </div>
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
                      <label htmlFor="name" className="block mb-2 text-sm">
                        Nome
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
                        maxLength={12}
                        {...register("name")}
                      />
                      {errors.name?.message && (
                        <p className="mt-2 text-sm text-error">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="sex" className="block mb-2 text-sm">
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
                      <label htmlFor="size" className="block mb-2 text-sm">
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
                      <label htmlFor="size" className="block mb-2 text-sm">
                        Idade
                      </label>
                      <select
                        id="age"
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
