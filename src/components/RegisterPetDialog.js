import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";
import * as yup from "yup";

import api from "../apis/api";

function RegisterPetDialog(props) {
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
      props.action(response.data);
      closeDialog();
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

  function closeDialog() {
    if (props.isOpen) props.closeDialog();
    reset();
  }

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
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
                      <option value="1 mes">1 mes</option>
                      <option value="2 meses">2 meses</option>
                      <option value="3 meses">3 meses</option>
                      <option value="4 meses">4 meses</option>
                      <option value="5 meses">5 meses</option>
                      <option value="6 meses">6 meses</option>
                      <option value="7 meses">7 meses</option>
                      <option value="8 meses">8 meses</option>
                      <option value="9 meses">9 meses</option>
                      <option value="10 meses">10 meses</option>
                      <option value="11 meses">11 meses</option>
                      <option value="1 ano">1 ano</option>
                      <option value="2 anos">2 anos</option>
                      <option value="3 anos">3 anos</option>
                      <option value="4 anos">4 anos</option>
                      <option value="5 anos">5 anos</option>
                      <option value="6 anos">6 anos</option>
                      <option value="7 anos">7 anos</option>
                    </select>
                    {errors.age?.message && (
                      <p className="mt-2 text-sm text-error">
                        {errors.age.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-10">
                    <button type="submit" form="dialogRegister" className="btn">
                      Cadastrar Animal
                    </button>
                    <button
                      type="button"
                      className="btn text-primary bg-white"
                      onClick={closeDialog}
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
  );
}

export default RegisterPetDialog;
