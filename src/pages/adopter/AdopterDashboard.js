import React, { useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { Disclosure } from "@headlessui/react";
// import api from "../apis/api";

function AdopterDashboard() {
  const { setTitle } = useOutletContext();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    setTitle(`Olá, ${authContext.loggedInUser.user.name.split(" ", 1)}! `);
    document.title = "Doty - Meus processos";
  });

  useEffect(() => {});

  return (
    <div>
      <div>
        <div>Seu processo:</div>
        <div>
          <div>
            <div class="overflow-hidden bg-gray-300 rounded-full">
              <div class="w-1/3 h-2 bg-[#219653] rounded-full" />
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
        <div>
          <div className="border-2 py-4 px-6 rounded-md mt-5">
            <Disclosure>
              <Disclosure.Button className="flex flex-col text-[14px] mb-4 font-[400]">
                Formulário
                <p className="text-xs text-gray-400">Etapa inicial de adoção</p>
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
              <Disclosure.Button className="flex flex-col">
                Entrevista
                <p className="text-xs text-gray-400">Segunda etapa da adoção</p>
              </Disclosure.Button>
              <Disclosure.Panel className="ml-2 text-gray-400 font-[400]">
                <div className="border-2 rounded-md text-sm mt-2">
                  Selecione o dia e horário de sua preferência para conversar
                  com a (NOME DA ONG)
                  <p> Selecionar o dia</p>
                  COLOCAR CALENDARIO AQUI?
                  <p>Selecionar horário</p>
                  COLOCAR POSSIVEIS HORARIOS AQUI
                </div>
                <button className="bg-gray-800 text-white rounded-md mt-2">
                  Enviar Horário para Aprovação
                </button>
              </Disclosure.Panel>
            </Disclosure>
          </div>
          <div className="border-2 py-4 px-6 rounded-md my-10">
            <Disclosure>
              <Disclosure.Button className="flex flex-col">
                Visita e Retirada
                <p className="text-xs text-gray-400">Ultima etapa da adoção</p>
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
  );
}

export default AdopterDashboard;
