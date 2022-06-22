import React, { useEffect, useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { Disclosure } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
// import api from "../apis/api";

const steps = [
  {
    status: "complete",
  },
  {
    status: "",
  },
  {
    status: "",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AdopterDashboard() {
  const { setTitle } = useOutletContext();
  const authContext = useContext(AuthContext);
  const [progressoBarrinha, setProgressoBarrinha] = useState(0);

  useEffect(() => {
    setTitle(`Olá, ${authContext.loggedInUser.user.name.split(" ", 1)}! `);
    document.title = "Doty - Meus processos";
  });

  useEffect(() => {
    const progressoBarra = steps.filter((step) => step.status === "complete");
    setProgressoBarrinha(progressoBarra.length);
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <div>Seu processo:</div>
        <div>
          <div>
            <div class="overflow-hidden bg-gray-300 rounded-full">
              <div
                class={`w-${progressoBarrinha}/3 h-2 bg-[#219653] rounded-full`}
              />
            </div>
            <ol class="grid grid-cols-3 mt-4 text-sm font-medium text-gray-500">
              <li class="flex items-center justify-start text-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" />
              </li>
              <li class="flex items-center justify-center text-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" />
                <path stroke-linecap="round" stroke-linejoin="round" />
              </li>
              <li class="flex items-center justify-end">
                <path stroke-linecap="round" stroke-linejoin="round" />
              </li>
            </ol>
          </div>
        </div>
        <div className="flex flex-row">
          {/* <div className="flex items-start">
            <nav aria-label="Progress">
              <ol className="overflow-hidden">
                {steps.map((step, stepIdx) => (
                  <li
                    key={step.name}
                    className={classNames(
                      stepIdx !== steps.length - 1 ? "pb-20 mt-4" : "",
                      "relative"
                    )}
                  >
                    {step.status === "complete" ? (
                      <>
                        {stepIdx !== steps.length - 1 ? (
                          <div
                            className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-[#219653]"
                            aria-hidden="true"
                          />
                        ) : null}
                        <a
                          href={step.href}
                          className="relative flex items-start group"
                        >
                          <span className="h-9 flex items-center">
                            <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-[#219653] rounded-full group-hover:bg-[#219653]">
                              <CheckIcon
                                className="w-5 h-5 text-white"
                                aria-hidden="true"
                              />
                            </span>
                          </span>
                          <span className="ml-4 min-w-0 flex flex-col"></span>
                        </a>
                      </>
                    ) : step.status === "current" ? (
                      <>
                        {stepIdx !== steps.length - 1 ? (
                          <div
                            className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                            aria-hidden="true"
                          />
                        ) : null}
                        <a
                          href={step.href}
                          className="relative flex items-start group"
                          aria-current="step"
                        >
                          <span
                            className="h-9 flex items-center"
                            aria-hidden="true"
                          >
                            <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-[#219653] rounded-full">
                              <span className="h-2.5 w-2.5 bg-[#219653] rounded-full" />
                            </span>
                          </span>
                        </a>
                      </>
                    ) : (
                      <>
                        {stepIdx !== steps.length - 1 ? (
                          <div
                            className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                            aria-hidden="true"
                          />
                        ) : null}
                        <a
                          href={step.href}
                          className="relative flex items-start group"
                        >
                          <span
                            className="h-9 flex items-center"
                            aria-hidden="true"
                          >
                            <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                              <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                            </span>
                          </span>
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div> */}
          <div className="flex flex-col w-full">
            <div className="border-2 py-4 px-6 rounded-md mt-5">
              <Disclosure>
                <Disclosure.Button className="flex flex-col text-[14px] mb-4 font-[400]">
                  Formulário
                  <p className="text-xs text-gray-400">
                    Etapa inicial de adoção
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel className="text-[#3B56AA] font-[600]">
                  Animal escolhido:
                  <p> Se já teve animais e quantos:</p>
                  Ambiente onde o animal irá morar:
                  <p>Espaço do local:</p>
                  Quantidade de pessoas:
                  <p>Idade da criança:</p>
                  Horas que passa em casa:
                  <p>Acesso do animal no local:</p>
                </Disclosure.Panel>
              </Disclosure>
            </div>
            <div className="border-2 py-4 px-6 rounded-md mt-10">
              <Disclosure>
                <Disclosure.Button className="flex flex-col text-[14px]">
                  Entrevista
                  <p className="text-xs text-gray-400 mb-4">
                    Segunda etapa da adoção
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel className="ml-2 text-gray-400 font-[400]">
                  <div className="border-2 rounded-md text-sm mt-2">
                    Selecione o dia e horário de sua preferência para conversar
                    com a (NOME DA ONG)
                    <p> Selecionar o dia</p>
                    <div className="flex items-center justify-start py-2 px-2">
                      <div className="2xl:w-1/3 xl:w-1/2 lg:w-3/5 sm:w-4/5 w-full shadow-lg">
                        <div className="md:p-16 md:pb-12 p-5 dark:bg-gray-800 bg-white rounded-t">
                          <div className="px-3 flex items-center justify-between">
                            <h1 className="text-lg font-bold dark:text-gray-100 text-gray-800">
                              Julho 2022
                            </h1>
                            <div className="flex items-center text-gray-800 dark:text-gray-100" />
                          </div>
                          <div className="flex items-center justify-between pt-4 overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr>
                                  <th>
                                    <div className="w-full flex justify-center">
                                      <p className="text-lg font-medium text-center text-gray-800 dark:text-gray-100">
                                        Mo
                                      </p>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="w-full flex justify-center">
                                      <p className="text-lg font-medium text-center text-gray-800 dark:text-gray-100">
                                        Tu
                                      </p>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="w-full flex justify-center">
                                      <p className="text-lg font-medium text-center text-gray-800 dark:text-gray-100">
                                        We
                                      </p>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="w-full flex justify-center">
                                      <p className="text-lg font-medium text-center text-gray-800 dark:text-gray-100">
                                        Th
                                      </p>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="w-full flex justify-center">
                                      <p className="text-lg font-medium text-center text-gray-800 dark:text-gray-100">
                                        Fr
                                      </p>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="w-full flex justify-center">
                                      <p className="text-lg font-medium text-center text-gray-800 dark:text-gray-100">
                                        Sa
                                      </p>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="w-full flex justify-center">
                                      <p className="text-lg font-medium text-center text-gray-800 dark:text-gray-100">
                                        Su
                                      </p>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="pt-2">
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center" />
                                  </td>
                                  <td className="pt-2">
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center" />
                                  </td>
                                  <td className="pt-2">
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center" />
                                  </td>
                                  <td className="pt-2">
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center" />
                                  </td>
                                  <td className="pt-2">
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        1
                                      </p>
                                    </div>
                                  </td>
                                  <td className="pt-2">
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        2
                                      </p>
                                    </div>
                                  </td>
                                  <td className="pt-2">
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100">
                                        3
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100">
                                        4
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        5
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        6
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        7
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="w-full h-full">
                                      <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                                        <p className="text-lg font-medium text-white rounded-full">
                                          8
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        9
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100">
                                        10
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100">
                                        11
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        12
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        13
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        14
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        15
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        16
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100">
                                        17
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100">
                                        18
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        19
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        20
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        21
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        22
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        23
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100">
                                        24
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100">
                                        25
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        26
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        27
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        28
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        29
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        30
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="px-4 py-4 cursor-pointer flex w-full justify-center">
                                      <p className="text-lg text-gray-500 dark:text-gray-100 font-medium">
                                        31
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>Selecionar horário</p>
                    COLOCAR POSSIVEIS HORARIOS AQUI
                  </div>
                  <button className="bg-gray-800 text-white rounded-md mt-2 px-4 py-2">
                    Enviar Horário para Aprovação
                  </button>
                </Disclosure.Panel>
              </Disclosure>
            </div>
            <div className="border-2 py-4 px-6 rounded-md my-10">
              <Disclosure>
                <Disclosure.Button className="flex flex-col">
                  Visita e Retirada
                  <p className="text-xs text-gray-400">
                    Ultima etapa da adoção
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  Domingo ela não vai (vai, vai)
                  <p> Domingo ela não vai não (vai, vai, vai)</p>
                  Olha, domingo ela não vai (vai, vai)
                  <p>Domingo ela não vai não (vai, vai, vai)</p>
                </Disclosure.Panel>
              </Disclosure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdopterDashboard;
