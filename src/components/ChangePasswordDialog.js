import { useState, Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocale } from "yup";
import * as yup from "yup";

function ChangePasswordDialog(props) {
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
      currentPassword: yup.string().required().min(8),
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
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(data) {
    console.log(data);
    reset();
  }

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.closeDialog}>
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
                  Alterar Senha
                </Dialog.Title>
                <form
                  className="mt-6"
                  id="dialogChangePassword"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb-6">
                    <label
                      htmlFor="currentPassword"
                      className="block mb-2 text-sm"
                    >
                      Senha Atual
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
                      {...register("currentPassword")}
                    />
                    {errors.currentPassword?.message && (
                      <p className="mt-2 text-sm text-error">
                        {errors.currentPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm">
                      Nova Senha
                    </label>
                    <input
                      type="password"
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
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm"
                    >
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
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

                  <div className="mt-10">
                    <button
                      type="submit"
                      form="dialogChangePassword"
                      className="btn"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      className="btn text-primary bg-white"
                      onClick={() => props.closeDialog()}
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

export default ChangePasswordDialog;
